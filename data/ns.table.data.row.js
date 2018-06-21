

ns.table.data.row = function (option) {
    "use strict";

    this.constValue = ns.grid.constValue, 
    this.theadType = this.constValue.sectionType.thead;
    this.tbodyType = this.constValue.sectionType.tbody;
    this.tfooterType = this.constValue.sectionType.tfooter;
    this.core = option.core;
    this.setting = option.setting;
    this.events = this.setting.eventsGet();

    this.data;

    this.__data = {
        thead: {},
        tbody: {},
        tfooter: {}
    };

    this._data;
    this._key;
};

klass(ns.table.data.row, {
    setStructureInfo: function (sectionType) {
        this._data  = this.__data[sectionType].data;
        this._key = this.__data[sectionType].key;
    },

    initValue: function () {
        this.data = this.core.data;
        var sectionTypes = [this.theadType, this.tbodyType, this.tfooterType];
        
        for (var sectionTypeIdx = 0, sectionTypeLen = sectionTypes.length; sectionTypeIdx < sectionTypeLen; sectionTypeIdx++) {
            this.__data[sectionTypes[sectionTypeIdx]].data = [];
            this.__data[sectionTypes[sectionTypeIdx]].key = {
                refKeys: this.setting.row.getKeyColumns(sectionTypes[sectionTypeIdx]),
                index: 0
            };
        };
    },

    init: function () {

        this.initValue();

        if (this.core.drawCancel) {
            this.events && this.events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }

        this.events && this.events.emit(ns.table.rowEvent.prepareInit);

        var _sectionTypes, _sectionType, _columnRows, _columns, _rows, _row;
        
        _sectionTypes = [this.theadType, this.tbodyType, this.tfooterType];
        
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            _sectionType = _sectionTypes[sectionTypeIdx];

            this.setStructureInfo(_sectionType);
            this.data.column.setStructureInfo(_sectionType);

            _columnRows = this.data.column.getAll(_sectionType, { returnType: this.constValue.returnType.multi });

            if ([this.constValue.columnType.single, this.constValue.columnType.each].includes(this.setting.common.getColumnType()))
                _rows = Object.clone(this.setting.row.get(_sectionType).datas, true);
            else if ([this.constValue.columnType.multi].includes(this.setting.common.getColumnType()))
                _rows = Object.clone(this.setting.row.get(_sectionType).datas, true);

            this.events && this.events.emit(ns.table.rowEvent.initData, { data: _rows, sectionType: _sectionType });


            //빈행 처리
            if (_sectionType == this.tbodyType && _rows.length == 0) {
                var mergeInfo = {};
                mergeInfo[this.constValue.merge.startIndex] = 0;
                mergeInfo[this.constValue.merge.rowspan] = _columnRows.length;
                mergeInfo[this.constValue.merge.colspan] = _columnRows[0].length
                _row = {};
                _row[this.constValue.merge.set] = [];
                _row[this.constValue.merge.set].push(mergeInfo);
                _rows.push(_row);
            }
            
            for (var i = 0, len = _rows.length; i < len; i++) {
                if (_sectionType == this.theadType) {
                    if (_columnRows == null || _columnRows.length == 0) {
                        _columns = [];
                        for (var p in _rows[i]) {
                            if (_rows[i].hasOwnProperty(p))
                                _columns.push(this.data.column.getDefaultColumn({ id: p, propertyName: p}));
                        }
                        this.setting.columnSet(_sectionType, _columns);
                        if (_sectionType == this.theadType)
                        this.data.column.initMakeColumn();
                        this.data.column.initPrimitiveColumns(_sectionType);
                        _columnRows = this.data.column.getAll(_sectionType, { returnType: this.constValue.returnType.multi });
                    }
                }
                //행 키 생성
                this.makeKey(_sectionType, _rows[i]);
                //행 상태 생성
                this.makeState(_sectionType, _rows[i], this.constValue.rowState.none);
                $.extend(_rows[i], this.setting.row.getAdditionalDatas(_sectionType));
            }

            this.__data[_sectionType].data = _rows;
        }

        this.events && this.events.emit(ns.table.rowEvent.initCompleted);
    },

    render: function () {
        if (this.core.drawCancel) {
            this.events && this.events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }
        this.events && this.events.emit(ns.table.rowEvent.renderCompleted);
    },

    add: function () {
    },

    getById: function (sectionType, rowId) {
        var self = this;
        var returnValue = { items: [] };

        this.setStructureInfo(sectionType);
        
        this._data.find(function (v, i, a) {
            if (v[self.constValue.rowKeyColumnPropertyName] == rowId) {
                this.items.push(v);
                return true;
            }
        }, returnValue);
        return returnValue.items.length == 0 ? null : returnValue.items[0];
    },

    remove: function () {
    },

    move: function () {
    },

    clear: function () {
    },

    setValue: function (sectionType, columnId, rowId, value) {
        this.setStructureInfo(sectionType);

        var column = this.data.column.getById(sectionType, columnId);
        var propertyName = column && column.propertyName || columnId;
        var row = this.getById(sectionType, rowId);
        var oldValue;

        if (!row)
            throw new "ns.table.data.row 객체 setValue 함수에서 rowId: " + rowId + " 를 찾지 못했습니다.";

        oldValue = row[propertyName];
        row[propertyName] = value;

        if (oldValue != value) {
            //call change event
            this.events && this.events.emit(ns.table.cellEvent.change, {
                oldValue: oldValue,
                newValue: value
            });
        }
        //call completed event
        this.events && this.events.emit(ns.table.cellEvent.changCompleted, {
            oldValue: oldValue,
            newValue: value
        });

        return {
            oldValue: oldValue,
            newValue: value
        };
    },

    destroyAll: function () {
        for (var i in this.__data)
            delete this.__data[i];
        
        this._data = null;
    },

    //util method
    getByIndex: function (sectionType, rowIndex) {
        this.setStructureInfo(sectionType);

        return this._data[rowIndex];
    },

    getAll: function (sectionType) {
        this.setStructureInfo(sectionType);

        return this._data;
    },

    makeKey: function (sectionType, row) {
        this.setStructureInfo(sectionType);

        if (this._key.refKeys && this._key.refKeys.length > 0) {
            var key = "";
            for (var i = 0, len = this._key.refKeys.length; i < len; i++) {
                if (key != "")
                    key += ns.common.separate;
                key += row[this._key.refKeys[i]];
            }
            row[this.constValue.rowKeyColumnPropertyName] = key;
        }
        else {
            row[this.constValue.rowKeyColumnPropertyName] = this._key.index.toString();
            this._key.index += 1;
        }
    },

    makeState: function (sectionType, row, initRowState) {
        this.setStructureInfo(sectionType);

        if (!row[this.constValue.rowStateKeyColumnPropertyName]) {
            row[this.constValue.rowStateKeyColumnPropertyName] = initRowState;
        }
    }
});