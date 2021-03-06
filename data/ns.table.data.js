

ns.table.data = function (option) {
    "use strict";
    
    var column = new ns.table.data.column(option);
    var row = new ns.table.data.row(option);
    var paging = new ns.table.data.paging(option);

    var list = [];
    list.push(column);
    list.push(row);
    list.push(paging);

    var init = function () {

        var events = option.setting.eventsGet();
        if (!events.exist(ns.table.columnEvent.initCompleted))
            events.on(ns.table.columnEvent.initCompleted, row.init.bind(row));
        if (!events.exist(ns.table.rowEvent.initCompleted))
            events.on(ns.table.rowEvent.initCompleted, paging.init.bind(paging));
        if (!events.exist(ns.table.pagingEvent.initCompleted))
            events.on(ns.table.pagingEvent.initCompleted, column.render.bind(column));
        if (!events.exist(ns.table.columnEvent.renderCompleted))
            events.on(ns.table.columnEvent.renderCompleted, row.render.bind(row));
        if (!events.exist(ns.table.rowEvent.renderCompleted))
            events.on(ns.table.rowEvent.renderCompleted, paging.render.bind(paging));
        if (!events.exist(ns.table.pagingEvent.renderCompleted))
            events.on(ns.table.pagingEvent.renderCompleted, renderCompleted);
    };

    var render = function () {
        column.init();
    };

    var renderCompleted = function () {
        var events = option.setting.eventsGet();
        events && events.emit(ns.table.event.init);
    }

    var destroyAll = function () {
        list.forEach(function (v, i, a) {
            v.destroyAll && v.destroyAll();
        });
    };

    return {
        init: init,
        render: render,
        destroyAll: destroyAll,
        column: column,
        row: row,
        //mode: new ns.table.mode(option),
        //template: new ns.table.template(option),
        paging: paging
    };
};