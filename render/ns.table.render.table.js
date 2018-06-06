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
            tableMap: [],
            rawData: null
        },
        tbody: {
            tableMap: [],
            rawData: null
        },
        tfooter: {
            tableMap: [],
            rawData: null
        }
    };

    this.__tableMap = null;

    this.setStructureInfo = function (sectionType) {
        this.__tableMap = __data[sectionType].tableMap;
    };

    this.init = function () {
        debugger;
    };

    this.render = function () {
        debugger;
        var sectionTypes = [theadType, tbodyType, tfooterType];
        var columns, columnRows, rows;

        this.makeTable();

        for (var sectionTypeIdx = 0, sectionTypeLen = sectionTypes.length; sectionTypeIdx < sectionTypeLen; sectionTypeIdx++) {
            rows = data.row.getAll(sectionTypes[sectionTypeIdx]);
            if (sectionTypes[sectionTypeIdx] == theadType) {
                this.makeColgroup(sectionTypes[sectionTypeIdx]);
            }
            
            this.makeRows(sectionTypes[sectionTypeIdx], { rowRenderStartIndex: 0, rowRenderEndIndex: rows.length });
        }

        var resultTableHTML = $.template("", {});

        var $el = $(resultTableHTML);
        
        oUI = new ns.table.ui(option, {
            el: $el
        });
    };

    this.makeTable = function () {

    };

    this.makeColgroup = function (sectionType) {
        var madeColgroup = [];
        var columnRows = data.column.getAll(sectionType, { returnType: constValue.returnType.multi });
        for (var columnIdx = 0, columnLen = columnRows[0].length; columnIdx < columnLen; columnIdx++) {
            
            madeColgroup.push(this.makeColByIndex(sectionType, columnIdx));
        }
        return madeColgroup;
    };

    this.makeColByIndex = function (sectionType, columnIndex) {
        var col = { attr: {}, className: [] };
        var columnRows = data.column.getAll(sectionType, { returnType: constValue.returnType.multi });
        
        if (columnRows[0][columnIndex].width)
            col.attr.width = columnRows[0][columnIndex].width;
        if (ns.common.isTrue(columnRows[0][columnIndex].isHide)) {
            if (!col.attr.className.includes(constValue.className.hide))
                col.attr.className.push(constValue.className.hide);
        }
        return col;
    };

    this.makeRows = function (sectionType, option) {
        option = option || {};
        var rowIdx = option.rowRenderStartIndex || 0, rowLen = option.rowRenderEndIndex || 0;
        
        var madeRows = [];
        var columns = data.column.getAll(sectionType);
        var columnRows = data.column.getAll(sectionType, { returnType: constValue.returnType.multi });
        var rows = data.row.getAll(sectionType);
        
        this.setStructureInfo(sectionType);

        for (; rowIdx < rowLen; rowIdx++) {
            var datas = { rowCurrentRowIndex: rowIdx };
            madeRows.push(this.makeRow(sectionType, rows[rowIdx][constValue.rowKeyPropertyName], datas));
        }
        return madeRows;
    };
    
    this.makeRow = function (sectionType, rowId, option) {
        option = option || {};
        var rowCurrentRowIdx = option.rowCurrentRowIndex || 0;

        var madeRow = [];
        var columns = data.column.getAll(sectionType);
        var columnRows = data.column.getAll(sectionType, { returnType: constValue.returnType.multi });
        var row = data.row.getById(sectionType, rowId);
        var merge = row[constValue.merge.set], mergeInfos = { items: [] };
        
        this.setStructureInfo(sectionType);
        
        for (var groupRowIdx = 0, groupRowLen = columnRows.length; groupRowIdx < groupRowLen; groupRowIdx++) {
            var datas = { rowCurrentRowIndex: rowCurrentRowIdx + (rowCurrentRowIdx * groupRowIdx) }
            this.makeTableMap(sectionType, row[constValue.merge.set], datas);
            for (var columnIdx = 0, columnLen = columnRows[groupRowIdx].length; columnIdx < columnLen; columnIdx++) {
                this.makeCells(sectionType, groupRowIdx, rowId, option);
            }
        }
        return madeRow;
    };

    this.makeCells = function (sectionType, groupRowIndex, rowId, option) {
        option = option || {};
        var rowCurrentRowIdx = option.rowCurrentRowIndex || 0;

        var madeCells = [];
        var columns = data.column.getAll(sectionType);
        var columnRows = data.column.getAll(sectionType, { returnType: constValue.returnType.multi });
        var row = data.row.getById(sectionType, rowId);
        var rowIdx = rowCurrentRowIdx + groupRowIndex;
        
        this.setStructureInfo(sectionType);

        for (var columnIdx = 0, columnLen = columnRows[groupRowIndex].length; columnIdx < columnLen; columnIdx++) {
            if (this.__tableMap[rowIdx][columnIdx] != -1) {
                if (!this.__tableMap[rowIdx][columnIdx])
                    this.__tableMap[rowIdx][columnIdx] = 1;

                madeCells[columnIdx] = this.makeCell(sectionType, groupRowIndex, columnRows[groupRowIndex][columnIdx].id, rowId, { rowCurrentRowIndex: rowCurrentRowIdx, columnCurrentColumnIndex: columnIdx });
            } else {
                madeCells[columnIdx] = null;
            }
        }
        return madeCells;
    };

    this.makeCell = function (sectionType, groupRowIndex, columnId, rowId, option) {
        option = option || {};
        var rowCurrentRowIdx = option.rowCurrentRowIndex || 0;
        var columnCurrentColumnIdx = option.columnCurrentColumnIndex || 0;

        var madeCell = { style: {}, className: [], attr: {}, cell: { data: "" } };
        var column = data.column.getById(sectionType, columnId);
        var row = data.row.getById(sectionType, rowId);
        
        this.setStructureInfo(sectionType);

        var mergeInfo = this.__tableMap[rowCurrentRowIdx][columnCurrentColumnIdx];

        if (mergeInfo) {
            if (mergeInfo.rowspan || 1 > 1)
                madeCell.attr.rowspan = mergeInfo.rowspan;
            if (mergeInfo.colspan || 1 > 1)
                madeCell.attr.colspan = mergeInfo.colspan;
        }

        return madeCell;
    };

    this.makeCellEmptyCell = function () {

    };
    
    this.makeTableMap = function (sectionType, mergeset, option) {
        option = option || {};
        var rowCurrentRowIdx = option.rowCurrentRowIndex || 0;

        if (!mergeset) {
            if (!this.__tableMap[rowCurrentRowIdx])
                this.__tableMap[rowCurrentRowIdx] = [];
            return;
        }
        
        var columnRows = data.column.getAll(sectionType, { returnType: constValue.returnType.multi });
        var columnRowLen = columnRows[0].length;

        this.setStructureInfo(sectionType);

        for (var i = 0, len = mergeset.length; i < len; i++) {
            var startIndex = parseInt(mergeset[i][constValue.merge.startIndex], 10),
                colspan = parseInt(mergeset[i][constValue.merge.colspan] || 1, 10),
                rowspan = parseInt(mergeset[i][constValue.merge.rowspan] || 1, 10),
                startRowIdx = Math.floor(startIndex / columnRowLen),
                startColumnIdx = startIndex % columnRowLen;
            var rowIdx = rowCurrentRowIdx + startRowIdx;
            var rowLen = rowCurrentRowIdx + startRowIdx + rowspan;
            var colIdx = startColumnIdx;
            var colLen = colIdx + colspan;
            for (; rowIdx < rowLen; rowIdx++) {
                if (!this.__tableMap[rowIdx])
                    this.__tableMap[rowIdx] = [];
                for (; colIdx < colLen; colIdx++) {
                    if (colIdx == startColumnIdx) {
                        this.__tableMap[rowIdx][colIdx] = {
                            rowspan: rowspan,
                            colspan: colspan
                        };
                    }
                    else 
                        this.__tableMap[rowIdx][colIdx] = -1;
                }
            }
        }
    };
}