ns.modules.histroy = function () {
    this.__data = {
        undoQueue: null,
        undoMaxCount: 20,

        redoQueue: null,
        redoMaxCount: 20
    };
};

klass(ns.modules.histroy, {
    reset: function () {
        this.__data.undoQueue = [];
        this.__data.redoQueue = [];
    },
    undo: {
        add: function (scope, fn, param) {
            if (this.__data.undoQueue.length == this.__data.undoMaxCount)
                this.__data.undoQueue.shift();

            this.__data.undoQueue.push({
                scope: scope, fn: fn, param: param
            });
        },
        remove: function () {

        },
        execute: function () {
            var item = this.__data.undoQueue.pop();
            item.scope[item.fn] && item.scope[item.fn].apply(item.scope, item.param);
        }
    },
    redo: {
        add: function (scope, fn, param) {
            if (this.__data.redoQueue.length == this.__data.undoMaxCount)
                this.__data.redoQueue.shift();

            this.__data.redoQueue.push({
                scope: scope, fn: fn, param: param
            });
        },
        remove: function () {

        },
        execute: function () {
            var item = this.__data.redoQueue.pop();
            item.scope[item.fn] && item.scope[item.fn].apply(item.scope, item.param);
        }
    }
});