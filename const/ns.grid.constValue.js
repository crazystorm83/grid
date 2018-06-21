

ns.grid = {};

ns.grid.constValue = {
    rowKeyColumnPropertyName: "K-E-Y",
    rowStateKeyColumnPropertyName: "R-O-W-S-T-A-T-E",
    rowIndexColumnPropertyName: "R-O-W-I-N-D-E-X",
    rowState: {
        none: "none",
        create: "create",
        deleted: "deleted",
        changed: "changed",
        deletedNew: "deletedNew",
    },
    validate: {

    },
    sectionType: {
        thead: "thead",
        tbody: "tbody",
        tfooter: "tfooter",
    },
    tableLayout: {
        table: "table",
        grid: "grid"
    },
    columnType: {
        single: "single",
        multi: "multi",
        each: "each"
    },
    tableRenderingDirection: {
        horizontal: "horizontal",
        vertical: "vertical"
    },
    controlViewMode: {
        "native": "native",
        "view": "view",
        "direct": "direct"
    },
    dataType: {
        modeView: "view",
        modeInput: "input"
    },
    templateType: {
        default: "default"
    },
    returnType: {
        single: "single",
        multi: "multi"
    },

    //merge const value
    merge: {
        set: "_MERGE_SET",
        type: "_MERGE_TYPE",
        startIndex: "_MERGE_START_INDEX",
        colspan: "_COLSPAN_COUNT",
        rowspan: "_ROWSPAN_COUNT",
        fontSize: "_FONT_SIZE",
    },

    //resize const value
    resizeType: {
        normal: "normal",
        group: "group"
    },

    //class const value
    className: {
        hide: "hide"
    }
};