ns.table.data.validate = function () {
    this.__data = {
        custom: {},
        widget: {},
        system: {}
    };

    this.set = function (storage, key, info) {
        this.__data[storage][key] = info;
    };

    this.get = function (storage, key) {
        return this.__data[storage][key];
    };

    this.getAll = function (key) {
        var self = this;
        var storages = ["custom", "widget", "system"];
        var result = [];
        storages.forEach(function (v, i, a) {
            if (self.__data[v][key])
                this.push(self.__data[v][key]);
        }, result);
        return result;
    }
};