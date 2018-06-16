
ns.table.constEvent = {
    
    PRE_INIT_EXECUTESORT: "table.preInitExecuteSort",
    
    CLICK: "table.click",
    FOCUS: "table.focus",
    BLUR: "table.blur",
    MOUSEDOWN: "table.mousedown",
    MOUSEUP: "table.mouseup",
    KEYDOWN: "table.keydown",
    KEYUP: "table.keyup"
};

ns.table.renderEvent = {
    cancelCompleted: "table.render.cancelCompleted",
    renderSkipRow: "table.render.renderSkipRow"
};

ns.table.rowEvent = {
    //행 데이터 초기화
    initData: "table.row.init.data",
    //행 데이터 초기화 전
    prepareInit: "table.row.prepareInit",
    prepareInitCompleted: "table.row.prepareInitCompleted",
    //행 데이터 초기화 완료
    initCompleted: "table.row.initCompleted",
    //행 데이터
    prepareRender: "table.row.prepareRender",
    //행 데이터
    renderCompleted: "table.row.renderCompleted"
};

ns.table.columnEvent = {
    initData: "table.column.init.data",
    prepareInit: "table.column.prepareInit",
    prepareInitCompleted: "table.column.prepareInitCompleted",
    initCompleted: "table.column.initCompleted",
    prepareRender: "table.column.prepareRender",
    renderCompleted: "table.column.renderCompleted"
};

ns.table.pagingEvent = {
    initCompleted: "table.paging.initCompleted",
    renderCompleted: "table.paging.renderCompleted"
};

ns.table.tdEvent = {
    prepareInitRender: "td.prepareInitRender",
    initRender: "td.initRender"    
};

ns.table.cellEvent = {
    change: "cell.change",
    changeCompleted: "cell.changeCompleted",
    prepareInitRender: "cell.prepareInitRender",
    initRender: "cell.initRender",
    focus: "cell.focus",
    blur: "cell.blur",
    mouseenter: "cell.mouseenter",
    mouseleave: "cell.mouseleave"
};

ns.table.event = {
    init: "table.init",
    focus: "table.focus",
    blur: "table.blur",
    mousedown: "table.mousedown",
    mouseup: "table.mouseup",
    click: "table.click",
    mouseenter: "table.mouseenter",
    mouseout: "table.mouseout"
};
