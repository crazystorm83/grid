

ns.table.data.column = function (option) {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    var core = option.core, setting = option.setting;
    var events = setting.eventsGet("global");
    
    var __data = {
        thead: {
            columns: [],
            columnsKey: {},
            columnRows: [[]],
            convertorDataTypeView: new ns.table.data.column.dataType(constValue.dataType.modeView),
            convertorDataTypeControl: new ns.table.data.column.dataType(constValue.dataType.modeInput)
        },
        tbody: {
            columns: [],
            columnsKey: {},
            columnRows: [[]],
            convertorDataTypeView: new ns.table.data.column.dataType(constValue.dataType.modeView),
            convertorDataTypeControl: new ns.table.data.column.dataType(constValue.dataType.modeInput)
        },
        tfooter: {
            columns: [],
            columnsKey: {},
            columnRows: [[]],
            convertorDataTypeView: new ns.table.data.column.dataType(constValue.dataType.modeView),
            convertorDataTypeControl: new ns.table.data.column.dataType(constValue.dataType.modeInput)
        },
    };

    this.__columns;
    this.__columnsKey;
    this.__columnRows;
    this.__convertorDataTypeView;
    this.__convertorDataTypeControl;
    
    this.setStructureInfo = function (sectionType) {
        this.__columns = __data[sectionType].columns;
        this.__columnsKey = __data[sectionType].columnsKey;
        this.__columnRows = __data[sectionType].columnRows;
        this.__convertorDataTypeView = __data[sectionType].convertorDataTypeView;
        this.__convertorDataTypeControl = __data[sectionType].convertorDataTypeControl;
    }
    
    
    this.init = function () {
        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }

        events && events.emit(ns.table.columnEvent.prepareInit);
        
        var _sectionTypes, _sectionType, _columns;
        
        _sectionTypes = [theadType, tbodyType, tfooterType];
        
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            _sectionType = _sectionTypes[sectionTypeIdx];

            this.setStructureInfo(_sectionType);

            if ([constValue.columnType.single, constValue.columnType.each].includes(setting.commonGetColumnType()))
                _columns = Object.clone(setting.columnGet().columns, true);
            else if ([constValue.columnType.multi].includes(setting.commonGetColumnType()))
                _columns = Object.clone(setting.columnGet(_sectionType).columns, true);

            events && events.emit(ns.table.columnEvent.initData, { columns: _columns, sectionType: _sectionType });
            
            for (var i = 0, len = _columns.length; i < len; i++) {
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
            }

            __data[_sectionType].columns = _columns;
        }

        events && events.emit(ns.table.columnEvent.initCompleted);
    }
    
    this.render = function () {
        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }
        events && events.emit(ns.table.columnEvent.renderCompleted);
    }
    
    this.add = function (sectionType) {
    }
    
    this.addRow = function (sectionType) {
    }
    
    this.addColumn = function (sectionType) {
    }
    
    this.getAll = function () {
    }
    
    this.generateUniqueId = function () {
    }
    
    this.remove = function (sectionType) {
    }
    
    this.removeRow = function (sectionType) {
    }
    
    this.removeColumn = function (sectionType) {
    }
    
    this.moveTo = function (sectionType) {
    }
    
    this.clear = function (sectionType) {
    }
    
    this.destroyAll = function () {
        for (var i in __data) {
            for (var ii in __data[i]) {
                if (__data[i][ii] instanceof ns.table.data.column.dataType) {
                    __data[i][ii].destroyAll && __data[i][ii].destroyAll();
                }
            }
            delete __data[i];				
    
            this.__columns = null;
            this.__columnsKey = null;
            this.__columnRows = null;
            this.__viewDataType = null;
            this.__controlDataType = null;
        }
    }
    
    this.get = function (sectionType, id) {
        this.setStructureInfo(sectionType);
        return __columnsKey[id];		
    }
    
    /**
    * 컬럼 값을 가져옵니다.
    * @param {String} sectionType
    * @param {String} id 컬럼ID
    * @param {String} key 값 Key
    */
    this.getValue = function (sectionType, id, key) {
        var column = get(sectionType, id);
        return column && column[key];
    }
};