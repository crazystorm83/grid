

ns.table.setting.row = function () {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    
    var __data = {
        thead: {
            datas: [],
            url: null,
            param: null,
            additionalDatas: { 'SAMPLE01': 'SAMPLE_DATA_01', 'SAMPLE02': 'SAMPLE_DATA_02' }
        },
        tbody: {
            datas: [],
            url: null,
            param: null,
            additionalDatas: { 'SAMPLE03': 'SAMPLE_DATA_03', 'SAMPLE04': 'SAMPLE_DATA_04' }
        },
        tfooter: {
            datas: [],
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
    }
    
    var validate = function (key, value, predicate) {
        switch (key) {
            case "set":
                if (!$.isArray(value)) 
                    throw "value 가 Array 형식이 아닙니다.";
                break;
        }
    }
        
    /**
    * @param {String} sectionType
    * @param {String} url
    * @return {this}
    */
    this.url = function (url, sectionType) {
        sectionType = sectionType || constValue.sectionType.thead;
        
        __data[sectionType].datas = null;
        __data[sectionType].url = url;
        return this;
    }
        
    /**
    * @param {String} sectionType
    * @param {String} param
    * @return {this}
    */
    this.param = function (param, sectionType) {
        sectionType = sectionType || constValue.sectionType.thead;

        __data[sectionType].datas = null;
        __data[sectionType].param = param;
        return this;
    }
    
    /**
    * @param {String} sectionType
    * @param {Array} value
    * @return {this}
    */
    this.set = function (value, sectionType) {
        sectionType = sectionType || constValue.sectionType.thead;

        validate("set", value);
        
        __data[sectionType].datas = value;
        return this;
    };
    
    /**
    * @param {String} sectionType
    * @return {Object}
    */
    this.get = function (sectionType) {
        sectionType = sectionType || constValue.sectionType.thead;

        return __data[sectionType];
    }

    this.getAdditionalDatas = function (sectionType) {
        sectionType = sectionType || constValue.sectionType.tbody;
        
        return __data[sectionType].additionalDatas;
    }
    
    /**
    *
    */
    this.destroyAll = function () {
        var sectionTypes = [theadType, tbodyType, tfooterType];
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            delete __data[sectionTypes[sectionTypeIdx]];
        }
    }
    this.seialize = function () {
        return Object.clone(__data);
    }
};