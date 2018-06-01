ns.table.render.table = function (option) {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    var core = option.core, data = option.core.data, setting = option.setting;
    var events = setting.eventsGet();
    
    //테이블 제어하기 위한 객체
    var oUI;
    var __data = {
        thead: {
            tableMap: []
        },
        tbody: {
            tableMap: []
        },
        tfooter: {
            tableMap: []
        }
    };

    this.__tableMap = null;

    this.setStructureInfo = function (sectionType) {
        this.__tableMap = __data[sectionType].tableMap;
    }

    this.init = function () {
        debugger;
    };

    this.render = function () {
        debugger;
        var sectionTypes = [theadType, tbodyType, tfooterType];
        var columns, rows, columnRows;
        for (var sectionTypeIdx = 0, sectionTypeLen = sectionTypes.length; sectionTypeIdx < sectionTypeLen; sectionTypeIdx++) {
            this.makeRows(sectionTypes[sectionTypeIdx]);
        }
        
        oUI = new ns.table.ui(option, {
            el: null
        });
    };

    this.makeRows = function (sectionType) {
        var madeRows = [];
        var columns = data.column.getAll(sectionType);
        var columnRows = data.column.getAll(sectionType, { returnType: constValue.returnType.multi });
        var rows = data.row.getAll(sectionType);
        
        this.setStructureInfo(sectionType);

        for (var rowIdx = 0, rowLen = rows.length; rowIdx < rowLen; rowIdx++) {
            var merge = rows[rowIdx][constValue.merge.set];
            merge && merge.find(function (v, i, a) {
                var a = self._tableMap;
            });

            this.makeRow(sectionType, rows[rowIdx][constValue.rowKeyPropertyName]);
        }

        return madeRows;
    };
    
    this.makeRow = function (sectionType, rowId) {
        var madeRow = [];
        var columns = data.column.getAll(sectionType);
        var columnRows = data.column.getAll(sectionType, { returnType: constValue.returnType.multi });
        var row = data.row.getById(sectionType, rowId);
        var merge = row[constValue.merge.set], mergeInfos = { items: [] };
        
        this.setStructureInfo(sectionType);
        
        for (var groupRowIdx = 0, groupRowLen = columnRows.length; groupRowIdx < groupRowLen; groupRowIdx++) {   
            for (var columnIdx = 0, columnLen = columnRows[groupRowIdx].length; columnIdx < columnLen; columnIdx++) {
                this.makeCells(sectionType, groupRowIdx, rowId );
            }
        }
        return madeRow;
    };

    this.makeCells = function (sectionType, groupRowIndex, rowId) {
        var columns = data.column.getAll(sectionType);
        var columnRows = data.column.getAll(sectionType, { returnType: constValue.returnType.multi });
        var row = data.row.getById(sectionType, rowId);

        this.setStructureInfo(sectionType);

        for (var columnIdx = 0, columnLen = columnRows[groupRowIndex].length; columnIdx < columnLen; columnIdx++) {
            this.makeCell(sectionType, groupRowIndex, columnRows[groupRowIndex][columnIdx].id, rowId );
        }
    };

    this.makeCell = function (sectionType, groupRowIndex, columnId, rowId) {
        var madeCell = { style: {}, className: [], attr: {} };
        var column = data.column.getById(sectionType, columnId);
        var row = data.row.getById(sectionType, rowId);

        this.setStructureInfo(sectionType);

        return madeCell;
    };

    this.makeCellEmptyCell = function () {

    }
    
}