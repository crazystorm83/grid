

ns.table.render = function (option) {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    var core = option.core, setting = option.setting;
    var events = setting.eventsGet();
    
    var init = function () {

    }

    var make = function (sectionType) {
        
    }
    
    var makeRow = function (sectionType) {
        
    }
    
    var makeCell = function () {
        
    }
    
    return {
        init: init,
        make: {
            row: makeRow,
            cell: makeCell
        }
    };
};
