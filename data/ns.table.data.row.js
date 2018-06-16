

ns.table.data.row = function (option) {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    var core = option.core, setting = option.setting, data, view = option.core.view;
    var events = setting.eventsGet();
    var __data = {
        thead: {},
        tbody: {},
        tfooter: {}
    };

    this._data;
    this._key;

    this.setStructureInfo = function (sectionType) {
        this._data  = __data[sectionType].data;
        this._key = __data[sectionType].key;
    };

    var initValue = function () {
        data = option.core.data;
        var sectionTypes = [theadType, tbodyType, tfooterType];
        
        for (var sectionTypeIdx = 0, sectionTypeLen = sectionTypes.length; sectionTypeIdx < sectionTypeLen; sectionTypeIdx++) {
            __data[sectionTypes[sectionTypeIdx]].data = [];
            __data[sectionTypes[sectionTypeIdx]].key = {
                refKeys: setting.rowGetKeyColumns(sectionTypes[sectionTypeIdx]),
                index: 0
            };
        };
    };
    
    this.init = function () {

        initValue();

        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }

        events && events.emit(ns.table.rowEvent.prepareInit);

        var _sectionTypes, _sectionType, _columnRows, _columns, _rows, _row;
        
        _sectionTypes = [theadType, tbodyType, tfooterType];
        
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            _sectionType = _sectionTypes[sectionTypeIdx];

            this.setStructureInfo(_sectionType);
            data.column.setStructureInfo(_sectionType);

            _columnRows = data.column.getAll(_sectionType, { returnType: constValue.returnType.multi });

            if ([constValue.columnType.single, constValue.columnType.each].includes(setting.commonGetColumnType()))
                _rows = Object.clone(setting.rowGet(_sectionType).datas, true);
            else if ([constValue.columnType.multi].includes(setting.commonGetColumnType()))
                _rows = Object.clone(setting.rowGet(_sectionType).datas, true);

            events && events.emit(ns.table.rowEvent.initData, { data: _rows, sectionType: _sectionType });

            for (var i = 0, len = _rows.length; i < len; i++) {
                if (_sectionType == theadType) {
                    if (_columnRows == null || _columnRows.length == 0) {
                        _columns = [];
                        for (var p in _rows[i]) {
                            if (_rows[i].hasOwnProperty(p))
                                _columns.push(data.column.getDefaultColumn({ id: p, propertyName: p}));
                        }
                        setting.columnSet(_sectionType, _columns);
                        if (_sectionType == theadType)
                            data.column.initMakeColumn();
                        data.column.initPrimitiveColumns(_sectionType);
                        _columnRows = data.column.getAll(_sectionType, { returnType: constValue.returnType.multi });
                    }
                }
                //행 키 생성
                this.makeKey(_sectionType, _rows[i]);
                //행 상태 생성
                this.makeState(_sectionType, _rows[i], constValue.rowState.none);
                $.extend(_rows[i], setting.rowGetAdditionalDatas(_sectionType));
            }

            //빈행 처리
            if (_sectionType == tbodyType && _rows.length == 0) {
                var mergeInfo = {};
                mergeInfo[constValue.merge.startIndex] = 0;
                mergeInfo[constValue.merge.colspan] = _columnRows[0].length
                _row = {};
                _row[constValue.merge.set] = [];
                _row[constValue.merge.set].push(mergeInfo);
                _rows.push(_row);
            }

            __data[_sectionType].data = _rows;
        }

        events && events.emit(ns.table.rowEvent.initCompleted);
    };
    
    this.render = function () {
        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }
        events && events.emit(ns.table.rowEvent.renderCompleted);
    };
    
    this.add = function () {
    };

    this.getById = function (sectionType, rowId) {
        var returnValue = { items: [] };

        this.setStructureInfo(sectionType);
        
        this._data.find(function (v, i, a) {
            if (v[constValue.rowKeyColumnPropertyName] == rowId) {
                this.items.push(v);
                return true;
            }
        }, returnValue);
        return returnValue.items.length == 0 ? null : returnValue.items[0];
    };
    
    this.remove = function () {
    };
    
    this. move = function () {
    };
    
    this.clear = function () {
    };

    this.setValue = function (sectionType, propertyName, rowId, value) {
        this.setStructureInfo(sectionType);

        var row = this.getById(rowId);
        var oldValue;

        if (!row)
            throw new "ns.table.data.row 객체 setValue 함수에서 rowId: " + rowId + " 를 찾지 못했습니다.";

        oldValue = row[propertyName];
        row[propertyName] = value;

        if (oldValue != value) {
            //call change event
            events && events.emit(ns.table.cellEvent.change, {});
        }
        //call completed event
        events && events.emit(ns.table.cellEvent.changCompleted, {});
    };
    
    this.destroyAll = function () {
        for (var i in __data)
            delete __data[i];
        
        this._data = null;
    };

    //util method
    this.getByIndex = function (sectionType, rowIndex) {
        this.setStructureInfo(sectionType);

        return this._data[rowIndex];
    };
    
    this.getAll = function (sectionType) {
        this.setStructureInfo(sectionType);

        return this._data;
    };

    this.makeKey = function (sectionType, row) {
        this.setStructureInfo(sectionType);

        if (this._key.refKeys && this._key.refKeys.length > 0) {
            var key = "";
            for (var i = 0, len = this._key.refKeys.length; i < len; i++) {
                if (key != "")
                    key += ns.common.separate;
                key += row[this._key.refKeys[i]];
            }
            row[constValue.rowKeyColumnPropertyName] = key;
        }
        else {
            row[constValue.rowKeyColumnPropertyName] = this._key.index.toString();
            this._key.index += 1;
        }
    };

    this.makeState = function (sectionType, row, initRowState) {
        this.setStructureInfo(sectionType);

        if (!row[constValue.rowStateKeyColumnPropertyName]) {
            row[constValue.rowStateKeyColumnPropertyName] = initRowState;
        }
    };
};