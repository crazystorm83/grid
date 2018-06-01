

ns.table.data.column.dataType = function (viewMode) {
    "use strict";
    
    var constValue = ns.grid.constValue;
    var __viewMode = viewMode;
    var __data = {
        thead: {
            convertor: {},
            key: {}
        },
        tbody: {
            convertor: {},
            key: {}
        },
        tfooter: {
            convertor: {},
            key: {}
        }
    };
    
    this.__key;
    
    this.setStructureInfo = function (sectionType) {
        this.__convertor = __data[sectionType].convertor;
        this.__key = __data[sectionType].key;
    };
    
    this.remove = function () {
        delete __data[sectionType][key];
    };
    
    this.set = function (sectionType, column) {
        this.setStructureInfo(sectionType);

        var _id, _propertyName, _dataType;

        _id = column.id;
        _propertyName = column.propertyName;
        _dataType = "0";

        this.__convertor[_id] = ns.convertor[_dataType];
        this.__key[_propertyName] = column;
        
        if (__viewMode == constValue.dataType.modeView) {				
            if (column.dataType && column.dataType.length > 0) {
                _dataType = column.dataType.substring(0, 1);
                switch (_dataType) {
                    case "1":
                    case "2":
                        this.__convertor[_id] = ns.convertor[_dataType];
                        break;
                    case "8":
                    case "9":
                        this.__convertor[_id] = ns.convertor[_dataType];
                        break;
                }
            }
        } else if (__viewMode == constValue.dataType.modeInput) {
            if (column.dataType && column.dataType.length > 0) {
                _dataType = column.dataType.substring(0, 1);
                switch (_dataType) {
                    case "1":
                    case "2":
                        this.__convertor[_id] = ns.convertor[_dataType];
                        break;
                    case "8":
                    case "9":
                        this.__convertor[_id] = ns.convertor["9"];
                        break;
                }
            }
        }
    };
    
    this.get = function (sectionType, propertyName) {
        this.setStructureInfo(sectionType);

        return this.__key[propertyName];
    };

    this.getConvertor = function (sectionType, id) {
        this.setStructureInfo(sectionType);

        return this.__convertor[id];
    };

    this.removeConvertor = function (sectionType, id) {
        delete __data[sectionType].convetor[id];
    };

    this.removeKey = function (sectionType, propertyName) {
        delete __data[sectionType].key[propertyName];
    };

    this.removeAll = function (sectionType) {
        this.removeAllConvertor(sectionType);
        this.removeAllKey(sectionType);
    };

    this.removeAllConvertor = function (sectionType) {
        delete __data[sectionType].convertor;
    };

    this.removeAllKey = function (sectionType) {
        delete __data[sectionType].key;
    };
    
    this.destroyAll = function () {
        for (var i in __data) {
            delete __data[i];
        }

        this.__key = null;
    };
};