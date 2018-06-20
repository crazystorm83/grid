

ns.transaction = function () {
    "use strict";
    
    this.state = ns.transaction.state.close;
    this.__stack = [];
};

klass(ns.transaction, {
    init: function () {
        return this.reset();
    },
    reset: function () {
        this.state = ns.transaction.state.close;
        this.__stack = [];
        return this;
    },
    begin: function () {
        this.state = ns.transaction.state.open;
        return this;
    },
    push: function (scope, fn, param) {
        if (this.state == ns.transaction.state.open)
            this.__stack.push({ scope: scope, fn: fn, param: param });
        else
            this.execute(scope, fn, param);
        return this;
    },
    commit: function () {
        if (this.state == ns.transaction.state.open) {
            var item;
            while(item = this.__stack.shift())
                this.execute(item.scope, item.fn, item.param);
        }
        return this.reset();
    },
    execute: function (scope, fn, param) {
        scope[fn] && scope[fn].apply(scope, param);
    },
    destroyAll: function () {
        this.__stack = null;
    }
});

ns.transaction.state = { open: 1, close: 0 };