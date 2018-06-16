ns.table.setting.column = function () {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    
    var __data = {
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
    
    var __columns;
    
    this.setStructureInfo = function (sectionType) {
        __columns = __data[sectionType].columns;
    }
    
    var validate = function (key, value, predicate) {
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
        //sectionType = sectionType || constValue.sectionType.thead;
        validate("set", value);
        
        __data[sectionType].columns = value;
        return this;
    };
    
    /**
    * @param {String} sectionType
    * @return {Object}
    */
    this.get = function (sectionType) {
        //sectionType = sectionType || constValue.sectionType.thead;

        return __data[sectionType];
    };
    
    /**
    * @param {String} sectionType
    * @param {String} normalizeType
    * @return {Object}
    */
    this.IDNormalize = function (sectionType, normalizeType) {
        //sectionType = sectionType || constValue.sectionType.thead;

        __data[sectionType].IDNormalize = normalizeType;
        return this;
    };
    this.setValueKey = function (sectionType, valueKey) {
        //sectionType = sectionType || constValue.sectionType.thead;

        __data[sectionType].valueKey = valueKey;
        return this;
    };
    this.destroyAll = function () {
        var sectionTypes = [theadType, tbodyType, tfooterType];
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            delete __data[sectionTypes[sectionTypeIdx]];
        }
    }
    this.seialize = function () {
        return Object.clone(__data);
    };
};