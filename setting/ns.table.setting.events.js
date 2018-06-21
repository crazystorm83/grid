ns.table.setting.events = function (option) {
    "use strict";

    this.self = option.scope;
    
    var events = {};
    this.set = function (id, instance) {        
        events[id] = instance;
        return this.self;
    };
    this.get = function (id) {
        return events[id];
    };
}