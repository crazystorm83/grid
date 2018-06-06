/**
 * 
 * @param option 
 * @example 
 * {
 *  core: {
 *      data: {
 *          column: {},
 *          row: {}
 *      },
 *      setting: {
 *      }
 *  }
 * }
 * @param datas
 * @example
 * {
 *  el: jQuery element
 * }
 */
ns.table.ui = function (option, datas) {
    var defaultDatas = {
        el: null //table DOM element
    };
    $.extend(defaultDatas, datas);

    var oTable = new ns.table.ui.table(option, defaultDatas);
    var oRow = new ns.table.ui.row(option, defaultDatas);
    var oColumn = new ns.table.ui.column(option, defaultDatas);

    this.destroyAll = function () {

    }
}