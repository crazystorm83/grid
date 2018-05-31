

ns.events = function () {
    "use strict";
    
    this.events = [];
    
    this.on = function (type, callback) {
        this.events.push({ type: type, callback, callback });
    }
    this.off = function (type) {
        this.events.remove(function (v, i, a) {
            return v.type == type;
        });
    }
    this.find = function (type, predicate) {
        if (typeof predicate != "function") {
            predicate = function (v, i, a) {
                var result = [];
                if (v.type == type)
                    result.push(v);
                return result;
            };
        }
        return this.events.find(predicate);
    }
    this.exist = function (type) {
        return this.find(type).length > 0;
    }
    this.emit = function (type, args) {
        var result;
        var v = this.find(type);
        for (var i = 0, len = v.length; i < len; i++) {
            result = v[i].callback && v[i].callback(args);
            if (result && result.cancel)
                break;
        }
    }
};