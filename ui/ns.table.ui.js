/**
 * 
 * @param option
 * @param options
 */
ns.table.ui = function (option, options) {
    var defaultOptions = {
        el: null //table DOM element
    };
    $.extend(defaultOptions, options);

    var oTable = new ns.table.ui.table(option, defaultOptions);
    var oRow = new ns.table.ui.row(option, defaultOptions);
    var oColumn = new ns.table.ui.column(option, defaultOptions);
}