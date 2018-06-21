ns.table.view = function (option) {
    var defaultDatas = {
        containerId: null,
        container: null,
        $container: null,
        $el: null //table DOM element
    };
    
    var oTable, oRow, oColumn;

    var init = function (datas) {
        $.extend(defaultDatas, datas);

        if (defaultDatas.containerId) {
            defaultDatas.container = document.getElementById(defaultDatas.containerId);
            defaultDatas.$container = $(defaultDatas.container);
        }

        oTable = new ns.table.view.table(option, defaultDatas);
        oRow = new ns.table.view.row(option, defaultDatas);
        oColumn = new ns.table.view.column(option, defaultDatas);
    };

    var render = function () {
        
    };

    var rowAddClass = function (sectionType, rowId, className) {
        oRow.addClass(sectionType, rowId, className);
    };

    var rowRemoveClass = function (sectionType, rowId, className) {
        oRow.removeClass(sectionType, rowId, className);
    };

    var rowSetValue = function (sectionType, columnId, rowId, value) {
        defaultDatas.$container.find("table").find(sectionType).find("tr[data-key='"+ rowId +"']").find("td[data-columnid='"+ columnId +"']").html(value);
    };
    
    return {
        init: init,
        render: render,

        row: {
            addClass: rowAddClass,
            removeClass: rowRemoveClass
        },

        cell: {
            setValue: rowSetValue
        }
    };
};