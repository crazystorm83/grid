

ns.table.render = function (option) {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    var core = option.core, data = option.core.data, setting = option.setting;
    var events = setting.eventsGet();

    var table = new ns.table.render.table(option);

    var init = function () {
        table.init();
    };

    var render = function () {
        table.render();
    };

    var destroy = function () {

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
