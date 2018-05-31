ns.table.setting.sort = function () {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    
    var __data = {
        thead: {
            all: {},
            enable: {},
            disable: {}
        },
        tbody: {
            all: {},
            enable: {},
            disable: {}
        },
        tfooter: {
            all: {},
            enable: {},
            disable: {}
        }
    };

    var __all, __enable, __disable;
        
    /**
    * @param {String} sectionType
    * @return {null}
    */
    this.setStructureInfo = function (sectionType) {
        __all = __data[sectionType].all;
        __enable = __data[sectionType].enable;
        __disable = __data[sectionType].disable;
    }

    this.get = function (id, sectionType) {
        this.setStructureInfo(sectionType);
        return __all[id];
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
}