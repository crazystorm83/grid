

ns.transaction = function () {
    "use strict";
    
    var __state = ns.transaction.state.close;
    var __stack = [];
    
    this.init = function () {
        __state == ns.transaction.state.close;
    }
    this.begin = function () {
        __state == ns.transaction.state.open;
    }
    
    this.state = function () {
        return __state;
    }
    
    this.push = function (scope, callback, param) {
        __stack.push({ scope: scope, callback: callback, param: param });
    }
    
    this.commit = function () {
        if (__state == ns.transaction.state.open) {
            var item;
            while(item = __stack.unshift())
                item.callback && item.callback.apply(item.scope, item.param);
        }
        init();
    }
};

ns.transaction.state = { open: 1, close: 0 };