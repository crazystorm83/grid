ns.table.ui.column = function (option, datas) {
    var oCell = new ns.table.ui.cell(option, datas);

    this.addClass = function (columnId, className) {
        if (this.hasClass(columnId, className)) {
            //event 로 데이터 변경
        }
    }

    this.removeClass = function (columnId, className) {
        if (this.hasClass(columnId, className)) {
            //event 로 데이터 변경
        }
    }

    this.hasClass = function (columnId, className) {
        
    }
}