

ns.table.data.column = function (option) {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    var core = option.core, setting = option.setting;
    var events = setting.eventsGet("global");
    
    var __data = {
        thead: {},
        tbody: {},
        tfooter: {}
    };

    this.__columns;
    this.__columnKeys;
    this.__columnRows;
    this.__convertorDataTypeView;
    this.__convertorDataTypeControl;
    
    this.setStructureInfo = function (sectionType) {
        this.__columns = __data[sectionType].columns;
        this.__columnKeys = __data[sectionType].columnKeys;
        this.__columnRows = __data[sectionType].columnRows;
        this.__convertorDataTypeView = __data[sectionType].convertorDataTypeView;
        this.__convertorDataTypeControl = __data[sectionType].convertorDataTypeControl;
    };

    var initValue = function () {
        var sectionTypes = [theadType, tbodyType, tfooterType];

        for (var sectionTypeIdx = 0, sectionTypeLen = sectionTypes.length; sectionTypeIdx < sectionTypeLen; sectionTypeIdx++) {
            __data[sectionTypes[sectionTypeIdx]].columns = [];
            __data[sectionTypes[sectionTypeIdx]].columnKeys = [];
            __data[sectionTypes[sectionTypeIdx]].columnRows = [[]];

            if (!__data[sectionTypes[sectionTypeIdx]].convertorDataTypeView)
                __data[sectionTypes[sectionTypeIdx]].convertorDataTypeView = new ns.table.data.column.dataType(constValue.dataType.modeView);
            else 
                __data[sectionTypes[sectionTypeIdx]].convertorDataTypeView.clear();

            if (!__data[sectionTypes[sectionTypeIdx]].convertorDataTypeControl)
                __data[sectionTypes[sectionTypeIdx]].convertorDataTypeControl = new ns.table.data.column.dataType(constValue.dataType.modeInput);
            else
                __data[sectionTypes[sectionTypeIdx]].convertorDataTypeControl.clear();
        }
    };

    var initMakeColumn = function () {
        if (setting.commonGetColumnType() == constValue.columnType.single) {
            if (setting.columnGet(tbodyType).columns.length == 0) {
                setting.columnSet(tbodyType, Object.clone(setting.columnGet(theadType).columns));
            }
        }
    };
    
    
    this.init = function () {
        initValue();
        initMakeColumn();

        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }

        events && events.emit(ns.table.columnEvent.prepareInit, {});
        
        var _sectionTypes, _sectionType, _columns;
        
        _sectionTypes = [theadType, tbodyType, tfooterType];
        
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            var _columnRows = [[]], _columnRowIdx = 0;
            var _columnKeys = {};

            _sectionType = _sectionTypes[sectionTypeIdx];

            this.setStructureInfo(_sectionType);

            if ([constValue.columnType.single, constValue.columnType.each].includes(setting.commonGetColumnType()))
                _columns = Object.clone(setting.columnGet(theadType).columns, true);
            else if ([constValue.columnType.multi].includes(setting.commonGetColumnType()))
                _columns = Object.clone(setting.columnGet(_sectionType).columns, true);

            events && events.emit(ns.table.columnEvent.initData, { columns: _columns, sectionType: _sectionType });
            
            for (var i = 0, len = _columns.length; i < len; i++) {
                if (_columns[i].linechange === true)
                    _columnRowIdx += 1;

                if (!_columnRows[_columnRowIdx])
                    _columnRows.push([]);

                _columnRows[_columnRowIdx].push(columns[i]);

                _columnKeys[columns[i].id] = columns[i];

                this.__convertorDataTypeView.set(_sectionType, _columns[i], { 
                    dataType: _columns[i].dataType || "00",
                    isCheckZero: _columns[i].isCheckZero || false,
                    isDisplayZero: _columns[i].isDisplayZero || false
                });

                if (!_columns[i].controlOption)
                    _columns[i].controlOption = {};
                this.__convertorDataTypeControl.set(_sectionType, _columns[i], {
                    dataType: _columns[i].dataType || "00",
                    isCheckZero: _columns[i].isCheckZero || false,
                    isDisplayZero: _columns[i].isDisplayZero || false
                });

                if ($.isNull(columns[i].lineNo) || $.isEmpty(columns[i].lineNo)) {
                    columns[i].lineNo = _columnRowIdx;
                }
            }

            __data[_sectionType].columns = _columns;
            __data[_sectionType].columnRows = _columnRows;
            __data[_sectionType].columnKeys = _columnKeys;
        }

        events && events.emit(ns.table.columnEvent.initCompleted);
    };
    
    this.render = function () {
        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }
        events && events.emit(ns.table.columnEvent.renderCompleted);
    };
    
    this.add = function (sectionType) {
    };
    
    this.addRow = function (sectionType) {
    };
    
    this.addColumn = function (sectionType) {
    };

    this.setValue = function () {

    };

    this.getById = function (sectionType, columnId) {
        this.setStructureInfo(sectionType);

        var column = this.__columnKeys[columnId];
        
        if (!column)
            throw new "ns.table.data.column 객체 getById 함수에서 columnId: " + columnId + " 를 찾지 못했습니다.";

        return column;
    };

    this.getByIndex = function (sectionType, columnIndex) {
        this.setStructureInfo(sectionType);

        var column = this.__columns[columnIndex];

        if (!column)
            throw new "ns.table.data.column 객체 getByIndex 함수에서 columnId: " + columnId + " 를 찾지 못했습니다.";

        return column;
    };
    
    this.getAll = function (sectionType, option) {
        option = option || {};
        var returnType = option.returnType || constValue.returnType.single;
        this.setStructureInfo(sectionType);

        switch (returnType) {
            case constValue.returnType.single:
                return this.__columns;
            case constValue.returnType.multi:
                return this.__columnRows;
        }
    };
    
    this.generateUniqueId = function () {
    };
    
    this.remove = function (sectionType) {
    };
    
    this.removeRow = function (sectionType) {
    };
    
    this.removeColumn = function (sectionType) {
    };
    
    this.moveTo = function (sectionType) {
    };
    
    this.clear = function (sectionType) {
    };
    
    this.destroyAll = function () {
        for (var i in __data) {
            for (var ii in __data[i]) {
                if (__data[i][ii] instanceof ns.table.data.column.dataType) {
                    __data[i][ii].destroyAll && __data[i][ii].destroyAll();
                }
            }
            delete __data[i];				
    
            this.__columns = null;
            this.__columnKeys = null;
            this.__columnRows = null;
            this.__viewDataType = null;
            this.__controlDataType = null;
        }
    };
    
    /**
    * 컬럼 값을 가져옵니다.
    * @param {String} sectionType
    * @param {String} id 컬럼ID
    * @param {String} key 값 Key
    */
    this.getValue = function (sectionType, id, key) {
        var column = get(sectionType, id);
        return column && column[key];
    };
};