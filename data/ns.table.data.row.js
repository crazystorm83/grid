

ns.table.data.row = function (option) {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    var core = option.core, setting = option.setting;
    var events = setting.eventsGet();
    var __data = {
        thead: {},
        tbody: {},
        tfooter: {}
    };

    this._data;

    this.setStructureInfo = function (sectionType) {
        this._data  = __data[sectionType].data;
    };

    var initValue = function () {        
        var sectionTypes = [theadType, tbodyType, tfooterType];
        
        for (var sectionTypeIdx = 0, sectionTypeLen = sectionTypes.length; sectionTypeIdx < sectionTypeLen; sectionTypeIdx++) {
            __data[sectionTypes[sectionTypeIdx]].data = [];
        };
    }
    
    this.init = function () {

        initValue();

        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }

        events && events.emit(ns.table.rowEvent.prepareInit);

        var _sectionTypes, _sectionType, _rows;
        
        _sectionTypes = [theadType, tbodyType, tfooterType];
        
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            _sectionType = _sectionTypes[sectionTypeIdx];

            this.setStructureInfo(_sectionType);

            if ([constValue.columnType.single, constValue.columnType.each].includes(setting.commonGetColumnType()))
                _rows = Object.clone(setting.rowGet(_sectionType).datas, true);
            else if ([constValue.columnType.multi].includes(setting.commonGetColumnType()))
                _rows = Object.clone(setting.rowGet(_sectionType).datas, true);

            events && events.emit(ns.table.rowEvent.initData, { data: _rows, sectionType: _sectionType });

            for (var i = 0, len = _rows.length; i < len; i++) {
                $.extend(_rows[i], setting.rowGetAdditionalDatas(_sectionType));
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
            if (v[constValue.rowKey] == rowId)
                this.items.push(v);                
        }, returnValue);
        return returnValue.items.length == 0 ? null : returnValue.items[0];
    };

    this.getByIndex = function (sectionType, rowIndex) {
        this.setStructureInfo(sectionType);

        return this._data[rowIndex];
    };
    
    this.getAll = function (sectionType) {
        this.setStructureInfo(sectionType);

        return this._data;
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
        }
        //call completed event
    };
    
    this.destroyAll = function () {
        for (var i in __data)
            delete __data[i];
        
        this._data = null;
    };
};