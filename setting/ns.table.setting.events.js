ns.table.setting.events = function () {
    "use strict";
    
    var events = {};
    this.set = function (id, instance) {        
        events[id] = instance;
    }
    this.get = function (id) {
        return events[id];
    }
}