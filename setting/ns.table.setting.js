

/**
 * 그리드 설정 정보 객체
 */
ns.table.setting = function (option) {
    "use strict";
    
    this.common = new ns.table.setting.common({ scope: this });
    this.column = new ns.table.setting.column({ scope: this });
    this.row = new ns.table.setting.row({ scope: this });
    this.events = option.events;
    
    this.eventsSet = function (instance) {
        this.events = instance;
        return this;
    };

    this.eventsGet = function () {
        return this.events;
    };
    
    var list = [];
    list.push(this.common);
    list.push(this.column);
    list.push(this.row);
    
    var destroyAll = function () {
        var item;
        while (item = list.pop()){ 
            item.destroyAll && item.destroyAll();
        }
    };
};