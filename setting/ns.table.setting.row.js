

ns.table.setting.row = function () {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    
    var __data = {
        thead: {
            datas: [],
            keyColumns: null,
            url: null,
            param: null,
            additionalDatas: { 'SAMPLE01': 'SAMPLE_DATA_01', 'SAMPLE02': 'SAMPLE_DATA_02' }
        },
        tbody: {
            datas: [],
            keyColumns: null,
            url: null,
            param: null,
            additionalDatas: { 'SAMPLE03': 'SAMPLE_DATA_03', 'SAMPLE04': 'SAMPLE_DATA_04' }
        },
        tfooter: {
            datas: [],
            keyColumns: null,
            url: null,
            param: null,
            additionalDatas: { 'SAMPLE05': 'SAMPLE_DATA_05', 'SAMPLE06': 'SAMPLE_DATA_06' }
        }
    };
    
    var __datas, __url, __param;
        
    /**
    * @param {String} sectionType
    * @return {null}
    */
    this.setStructureInfo = function (sectionType) {
        __datas = __data[sectionType].datas;
        __url = __data[sectionType].url;
        __param = __data[sectionType].param;
    };
    
    var validate = function (key, value, predicate) {
        switch (key) {
            case "set":
                if (!$.isArray(value)) 
                    throw "value 가 Array 형식이 아닙니다.";
                break;
        }
    };
        
    /**
    * @param {String} sectionType
    * @param {String} url
    * @param {Boolean} isWithColumn
    * @return {this}
    */
    this.url = function (sectionType, url, isWithColumn) {
        if (arguments.length == 2)
            sectionType = tbodyType;
            
        if (isWithColumn == null || isWithColumn == undefined)
            isWithColumn = false;
        
        __data[sectionType].datas = null;
        __data[sectionType].url = url;
        return this;
    };
        
    /**
    * @param {String} sectionType
    * @param {String} param
    * @return {this}
    */
    this.param = function (sectionType, param) {
        if (arguments.length == 1)
            sectionType = tbodyType;

        __data[sectionType].datas = null;
        __data[sectionType].param = param;
        return this;
    };
    
    /**
    * @param {String} sectionType
    * @param {Array} value
    * @return {this}
    */
    this.set = function (sectionType, value) {
        if (arguments.length == 1)
            sectionType = tbodyType;

        validate("set", value);
        
        __data[sectionType].datas = value;
        return this;
    };
    
    /**
    * @param {String} sectionType
    * @return {Object}
    */
    this.get = function (sectionType) {
        if (arguments.length == 0)
            sectionType = tbodyType;

        return __data[sectionType];
    };

    this.getAdditionalDatas = function (sectionType) {
        if (arguments.length == 0)
            sectionType = tbodyType;
        
        return __data[sectionType].additionalDatas;
    };

    this.setKeyColumns = function (sectionType, keyColumns) {
        if (arguments.length == 1)
            sectionType = tbodyType;

        __data[sectionType].keyColumns = keyColumns;
    }

    this.getKeyColumns = function (sectionType) {
        if (arguments.length == 0)
            sectionType = tbodyType;

        return __data[sectionType].keyColumns;
    }
    
    /**
    *
    */
    this.destroyAll = function () {
        var sectionTypes = [theadType, tbodyType, tfooterType];
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            delete __data[sectionTypes[sectionTypeIdx]];
        }
    };
    this.seialize = function (sectionType) {
        switch (sectionType) {
            case theadType:
            case tbodyType:
            case tfooterType:
                return Object.clone(__data[sectionType]);
            default:
                return Object.clone(__data);
        }
    };
};