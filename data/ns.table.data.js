

ns.table.data = function (options) {
    "use strict";
    
    var column = new ns.table.data.column(options);
    var row = new ns.table.data.row(options);
    var paging = new ns.table.data.paging(options);

    var init = function () {

        var events = options.setting.eventsGet();
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
            events.on(ns.table.pagingEvent.renderCompleted, options.core.render.init.bind(options.core.render));
    }

    var render = function () {
        column.init();
    }
    return {
        init: init,
        render: render,
        column: column,
        row: row,
        //mode: new ns.table.mode(options),
        //template: new ns.table.template(options),
        paging: paging
    }
};