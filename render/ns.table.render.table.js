ns.table.render.table = function (option) {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    var core = option.core, data = option.core.data, setting = option.setting;
    var events = setting.eventsGet();
    
    var __data = {
        thead: {
            tableMap: [],
            trMap: {},
            rawData: null
        },
        tbody: {
            tableMap: [],
            trMap: {},
            rawData: null
        },
        tfooter: {
            tableMap: [],
            trMap: {},
            rawData: null
        }
    };

    this.__tableMap = null;
    this.__trMap = null;

    this.setStructureInfo = function (sectionType) {
        this.__tableMap = __data[sectionType].tableMap;
        this.__trMap = __data[sectionType].trMap;
    };

    this.init = function () {
        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }
    };

    this.render = function () {
        var sectionTypes = [theadType, tbodyType, tfooterType];
        var columns, columnRows, rows;
        var oTable, arrCols, arrTrs = {};
        oTable = this.makeTable();

        for (var sectionTypeIdx = 0, sectionTypeLen = sectionTypes.length; sectionTypeIdx < sectionTypeLen; sectionTypeIdx++) {
            rows = data.row.getAll(sectionTypes[sectionTypeIdx]);
            if (sectionTypes[sectionTypeIdx] == theadType) {
                arrCols = this.makeColgroup(sectionTypes[sectionTypeIdx]);
            }
            arrTrs[sectionTypes[sectionTypeIdx]] = this.makeRows(sectionTypes[sectionTypeIdx], { 
                rowRenderStartIndex: 0, 
                rowRenderEndIndex: rows.length 
            });
        }
        
        var resultTableHTML = $.tmpl(ns.table.render.template.horizontal, { 
            table: oTable,
            trs: arrTrs,
            cols: arrCols 
        });

        var $el = $(resultTableHTML);

        if (setting.common.getContainerId())
            $("#" + setting.common.getContainerId()).append($el);

        return $el;
    };

    this.makeTable = function () {
        var oTable = { style: {}, className: [], attr: {} };

        return oTable;
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
        
        col.attr["data-columnid"] = columnRows[0][columnIndex].id;

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

            if (core.drawCancel) {
                events && events.emit(ns.table.renderEvent.cancelCompleted);
                return { cancel: true };
            }

            var datas = { rowCurrentRowIndex: rowIdx };
            Array.prototype.push.apply(madeRows, this.makeRow(sectionType, rows[rowIdx][constValue.rowKeyColumnPropertyName], datas));
        }
        return madeRows;
    };
    
    this.makeRow = function (sectionType, rowId, option) {
        option = option || {};
        var rowCurrentRowIdx = option.rowCurrentRowIndex || 0;

        var madeRows = [];
        var columns = data.column.getAll(sectionType);
        var columnRows = data.column.getAll(sectionType, { returnType: constValue.returnType.multi });
        var row = data.row.getById(sectionType, rowId);
        var merge = row[constValue.merge.set], mergeInfos = { items: [] };
        
        this.setStructureInfo(sectionType);
        
        for (var groupRowIdx = 0, groupRowLen = columnRows.length; groupRowIdx < groupRowLen; groupRowIdx++) {
            var madeRow = { style: {}, className: [], attr: { "data-key": row[constValue.rowKeyColumnPropertyName] }, cells: null };
            madeRows.push(madeRow);

            if (groupRowIdx == 0) {
                var datas = { rowCurrentRowIndex: rowCurrentRowIdx * columnRows.length };
                this.makeTableMap(sectionType, row[constValue.merge.set], datas);
            }
            for (var columnIdx = 0, columnLen = columnRows[groupRowIdx].length; columnIdx < columnLen; columnIdx++) {
                madeRow.cells = this.makeCells(sectionType, groupRowIdx, rowId, { rowCurrentRowIndex: rowCurrentRowIdx * columnRows.length });
            }
        }
        return madeRows;
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

        var madeCell = { style: {}, className: [], attr: {}, cell: { data: "abcd" } };
        var column = data.column.getById(sectionType, columnId);
        var row = data.row.getById(sectionType, rowId);
        var tdPreInitReturnValue, tdInitReturnValue, tdReturnValue;
        var returnValue;
        var widget;
        
        this.setStructureInfo(sectionType);

        madeCell.attr["data-key"] = row[constValue.rowKeyColumnPropertyName];
        madeCell.attr["data-columnid"] = column.id;

        var mergeInfo = this.__tableMap[rowCurrentRowIdx][columnCurrentColumnIdx];

        if (mergeInfo) {
            if (mergeInfo.rowspan || 1 > 1)
                madeCell.attr.rowspan = mergeInfo.rowspan;
            if (mergeInfo.colspan || 1 > 1)
                madeCell.attr.colspan = mergeInfo.colspan;
        }

        //td 관련 정보 가져오기
        tdPreInitReturnValue = events && events.emit(ns.table.tdEvent.prepareInitRender, { column: column, row: row });
        
        //컨트롤 생성을 위한 정보 가져오기
        returnValue = events && events.emit(ns.table.cellEvent.prepareInitRender, { column: column, row: row }) || {};

        if (returnValue.controlType)
            data.controlType = returnValue.controlType;

        //widget = ctrlMng.get(data.controlType);

        //컨트롤 생성 후 generate 하기
        events && events.emit(ns.table.cellEvent.initRender, { column: column, row: row, widget: widget });

        //td 관련 정보 가져오기
        tdInitReturnValue = events && events.emit(ns.table.tdEvent.prepareInitRender, { column: column, row: row, widget: widget });

        if (tdPreInitReturnValue && tdInitReturnValue)
            tdReturnValue = $.extend({}, tdPreInitReturnValue, tdInitReturnValue);
        else if (tdInitReturnValue)
            tdReturnValue = tdReturnValue;
        else if (tdPreInitReturnValue)
            tdReturnValue = tdPreInitReturnValue;

        madeCell.className = makeClassName(tdReturnValue, mergeInfo, column);


        return madeCell;
    };

    this.makeCellEmpty = function () {

    };

    /**
     * 클래스 정보 만들기
     * @param {Object} customValues 
     * @param {Object} mergeInfo 
     * @param {Object} columnInfo 
     */
    var makeClassName = function (customValues, mergeInfo, columnInfo) {
        var className = [];

        if (customValues && values.fontSize)
            className.push("font-" + customValues.fontSize);
        else if (mergeInfo && mergeInfo.fontSize)
            className.push("font-" + mergeInfo.fontSize);
        else if (columnInfo.fontSize)
            className.push("font-" + columnInfo.fontSize);

        return className;
    }

    this.makeCellEmptyCell = function () {

    };
    
    this.makeTableMap = function (sectionType, mergeset, option) {
        option = option || {};
        var rowCurrentRowIdx = option.rowCurrentRowIndex || 0;

        var columnRows = data.column.getAll(sectionType, { returnType: constValue.returnType.multi });
        var columnRowLen = columnRows[0].length;

        if (!mergeset) {
            for (var rowIdx = rowCurrentRowIdx, rowLen = rowCurrentRowIdx + columnRows.length; rowIdx < rowLen; rowIdx++) {
                if (!this.__tableMap[rowIdx])
                    this.__tableMap[rowIdx] = [];
            }
            return;
        }

        this.setStructureInfo(sectionType);

        for (var i = 0, len = mergeset.length; i < len; i++) {
            var startIndex = parseInt(mergeset[i][constValue.merge.startIndex], 10),
                colspan = parseInt(mergeset[i][constValue.merge.colspan] || 1, 10),
                rowspan = parseInt(mergeset[i][constValue.merge.rowspan] || 1, 10),
                startRowIdx = Math.floor(startIndex / columnRowLen),
                startColumnIdx = startIndex % columnRowLen;
            var rowIdx = rowCurrentRowIdx + startRowIdx;
            var rowLen = rowCurrentRowIdx + startRowIdx + rowspan;
            var colIdx, colLen;
            for (; rowIdx < rowLen; rowIdx++) {
                colIdx = startColumnIdx;
                colLen = colIdx + colspan;

                if (!this.__tableMap[rowIdx])
                    this.__tableMap[rowIdx] = [];
                for (; colIdx < colLen; colIdx++) {
                    if (rowIdx == rowCurrentRowIdx + startRowIdx && colIdx == startColumnIdx) {
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

    this.destroyAll = function () {
        
    };
};
