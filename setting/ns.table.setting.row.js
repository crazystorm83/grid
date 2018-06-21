

ns.table.setting.row = function (option) {
    "use strict";
    
    this.self = option.scope;
    
    this.constValue = ns.grid.constValue, 
    this.theadType = this.constValue.sectionType.thead;
    this.tbodyType = this.constValue.sectionType.tbody;
    this.tfooterType = this.constValue.sectionType.tfooter;

    this.__data = {
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
    
    this._datas = null;
    this._url = null;
    this._param = null;
        
    /**
    * @param {String} sectionType
    * @return {null}
    */
    this.setStructureInfo = function (sectionType) {
        this._datas = this.__data[sectionType].datas;
        this._url = this.__data[sectionType].url;
        this._param = this.__data[sectionType].param;
    };
    
    this.validate = function (key, value, predicate) {
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
            sectionType = this.tbodyType;
            
        if (isWithColumn == null || isWithColumn == undefined)
            isWithColumn = false;
        
        this.__data[sectionType].datas = null;
        this.__data[sectionType].url = url;
        return this.self;
    };
        
    /**
    * @param {String} sectionType
    * @param {String} param
    * @return {this}
    */
    this.param = function (sectionType, param) {
        if (arguments.length == 1)
            sectionType = this.tbodyType;

        this.__data[sectionType].datas = null;
        this.__data[sectionType].param = param;
        return this.self;
    };
    
    /**
    * @param {String} sectionType
    * @param {Array} value
    * @return {this}
    */
    this.set = function (sectionType, value) {
        if (arguments.length == 1)
            sectionType = this.tbodyType;

        this.validate("set", value);
        
        this.__data[sectionType].datas = value;
        return this.self;
    };
    
    /**
    * @param {String} sectionType
    * @return {Object}
    */
    this.get = function (sectionType) {
        if (arguments.length == 0)
            sectionType = this.tbodyType;

        return this.__data[sectionType];
    };

    this.getAdditionalDatas = function (sectionType) {
        if (arguments.length == 0)
            sectionType = this.tbodyType;
        
        return this.__data[sectionType].additionalDatas;
    };

    this.setKeyColumns = function (sectionType, keyColumns) {
        if (arguments.length == 1)
            sectionType = this.tbodyType;

        this.__data[sectionType].keyColumns = keyColumns;

        return this.self;
    }

    this.getKeyColumns = function (sectionType) {
        if (arguments.length == 0)
            sectionType = this.tbodyType;

        return this.__data[sectionType].keyColumns;
    }
    
    /**
    *
    */
    this.destroyAll = function () {
        var sectionTypes = [this.theadType, this.tbodyType, this.tfooterType];
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            delete this.__data[sectionTypes[sectionTypeIdx]];
        }
    };
    this.seialize = function (sectionType) {
        switch (sectionType) {
            case this.theadType:
            case this.tbodyType:
            case this.tfooterType:
                return Object.clone(this.__data[sectionType]);
            default:
                return Object.clone(this.__data);
        }
    };
};