

/**
 * 
 */
ns.table.setting = function () {
    "use strict";
    
    var common = new ns.table.setting.common();
    var column = new ns.table.setting.column();
    var row = new ns.table.setting.row();
    var events;
    
    var eventsSet = function (instance) {
        events = instance;
        return this;
    }

    var eventsGet = function () {
        return events;
    }
    
    var list = [];
    list.push(common);
    list.push(column);
    list.push(row);
    
    var destroyAll = function () {
        var item;
        while (item = list.pop()){ 
            item.destroyAll && item.destroyAll();
        }
    }
    
    //chaining 을 위해 개별적 함수 노출
    return {
        commonSetTableLayout: common.setTableLayout,
        commonSetTableRenderingDirection: common.setTableRenderingDirection,
        commonSetColumnType: common.setColumnType,
        commonGetColumnType: common.getColumnType,
        commonSetControlViewMode: common.setControlViewMode,
        eventsGet: eventsGet,
        eventsSet: eventsSet,
        columnGet: column.get,
        columnSet: column.set,
        destroyAll: destroyAll,
        rowGet: row.get,
        rowSet: row.set,
        rowGetAdditionalDatas: row.getAdditionalDatas
    }
};