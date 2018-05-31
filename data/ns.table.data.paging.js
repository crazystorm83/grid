ns.table.data.paging  = function (option) {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    var core = option.core, setting = option.setting;
    var events = setting.eventsGet();    
    var __data = {

    };

    this.init = function () {
        debugger;
        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }

        events && events.emit(ns.table.pagingEvent.initCompleted);
    }

    this.render = function () {
        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }

        events && events.emit(ns.table.pagingEvent.renderCompleted);
    }
    
    this.destroyAll = function () {
        
    }
}