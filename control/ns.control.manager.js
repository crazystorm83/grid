ns.control.manager = function () {
    var __data = {
        widget: {},
        controls: {}
    };

    //widget generator
    var __control;

    var create = function (controlType) {

    };

    this.get = function (controlType) {
        var control;

        if (__data.widget[controlType])
            __data.widget[controlType] = __control.define();

        control = __data.widget[controlType];
        control.init();

        return control;
    }

    this.destroyAll = function () {
        for (var p in __data.widget) {
            __data.widget[p].destroy && __data.widget[p].destroy();
        }
    };
};