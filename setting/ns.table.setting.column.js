ns.table.setting.column = function (option) {
    "use strict";
    
    this.self = option.scope;
    
    this.constValue = ns.grid.constValue, 
    this.theadType = this.constValue.sectionType.thead;
    this.tbodyType = this.constValue.sectionType.tbody;
    this.tfooterType = this.constValue.sectionType.tfooter;

    this.__data = {
        thead: {
            columns: [],
            valueKey: "id",
            IDNormalize: "UPPER"
        },
        tbody: {
            columns: [],
            valueKey: "id",
            IDNormalize: "UPPER"
        },
        tfooter: {
            columns: [],
            valueKey: "id",
            IDNormalize: "UPPER"
        }
    };
    
    this._columns;
    
    this.setStructureInfo = function (sectionType) {
        this._columns = this.__data[sectionType].columns;
    }
    
    this.validate = function (key, value, predicate) {
        if (ns.common.operateMode == "development") {
            switch (key) {
                case "set":
                    if (!$.isArray(value)) 
                        throw "value 가 Array 형식이 아닙니다.";
                    
                    value.forEach(function (v, i, a) {
                        if (!v.id) 
                            throw  i.toString() + " 번째 컬럼 id 를 지정하지 않았습니다.";
                        if (!v.width) 
                            throw i.toString() + " 번째 컬럼 width 를 지정하지 않았습니다.";
                        if (!v.propertyName)
                            throw i.toString() + " 번째 컬럼 propertyName 을 지정하지 않았습니다.";
                        if (typeof v.width != "string")
                            throw i.toString() + " 번째 컬럼 width 자료형은 String 이어야 합니다.";
                    });
                    break;
            }
        }
    };
    
    /**
    * @param {String} sectionType
    * @param {Array} value
    * @return {this}
    */
    this.set = function (sectionType, value) {
        //sectionType = sectionType || this.constValue.sectionType.thead;
        this.validate("set", value);
        
        this.__data[sectionType].columns = value;
        return this.self;
    };
    
    /**
    * @param {String} sectionType
    * @return {Object}
    */
    this.get = function (sectionType) {
        //sectionType = sectionType || this.constValue.sectionType.thead;

        return this.__data[sectionType];
    };
    
    /**
    * @param {String} sectionType
    * @param {String} normalizeType
    * @return {Object}
    */
    this.IDNormalize = function (sectionType, normalizeType) {
        //sectionType = sectionType || this.constValue.sectionType.thead;

        this.__data[sectionType].IDNormalize = normalizeType;
        return this.self;
    };
    this.setValueKey = function (sectionType, valueKey) {
        //sectionType = sectionType || this.constValue.sectionType.thead;

        this.__data[sectionType].valueKey = valueKey;
        return this.self;
    };
    this.destroyAll = function () {
        var sectionTypes = [this.theadType, this.tbodyType, this.tfooterType];
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            delete this.__data[sectionTypes[sectionTypeIdx]];
        }
    }
    this.seialize = function () {
        return Object.clone(this.__data);
    };
};