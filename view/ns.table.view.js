ns.table.view = function (option) {
    var defaultDatas = {
        $el: null //table DOM element
    };
    
    var oTable, oRow, oColumn;

    var init = function (datas) {
        $.extend(defaultDatas, datas);

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
    
    return {
        init: init,
        render: render,

        row: {
            addClass: rowAddClass,
            removeClass: rowRemoveClass
        }
    };
};