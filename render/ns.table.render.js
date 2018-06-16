

ns.table.render = function (option) {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    var core = option.core, data = option.core.data, setting = option.setting;
    var events = setting.eventsGet();
    var list = [];
    var table = new ns.table.render.table(option);

    list.push(table);

    var $el = null;

    var init = function () {
        table.init();
    };

    var render = function () {
        $el = table.render();
        events && events.emit(ns.table.event.renderComplete, { $el: $el });
    };

    var destroyAll = function () {
        list.forEach(function (v, i, a) {
            v.destroyAll && v.destroyAll();
        });
    };

    return {
        init: init,
        render: render
        // make: {
        //     row: makeRow,
        //     cell: makeCell
        // }
    };
};
