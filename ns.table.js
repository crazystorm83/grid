

ns.table = function (setting) {
    "use strict";
    
    var constEvent = ns.table.constEvent;
    var __core = {
        drawCount: 0,
        drawing: false,
        drawCancel: false
    };
    //var __events = new ns.events();
    var __events = setting.eventsGet();
    var __eventHandler = new ns.table.eventHandler();
    
    if (__events) {
        __events.on(constEvent.PRE_INIT_EXECUTESORT, __eventHandler.preInitExecuteSort.bind(this));	
        __events.on(constEvent.CLICK, __eventHandler.onClick.bind(this));
        __events.on(constEvent.FOCUS, __eventHandler.onFocus.bind(this));
        __events.on(constEvent.BLUR, __eventHandler.onBlur.bind(this));
        __events.on(constEvent.MOUSEDOWN, __eventHandler.onMousedown.bind(this));
        __events.on(constEvent.MOUSEUP, __eventHandler.onMouseup.bind(this));
        __events.on(constEvent.KEYDOWN, __eventHandler.onKeydown.bind(this));
        __events.on(constEvent.KEYUP, __eventHandler.onKeyup.bind(this));
    }
    
    __core.setting = setting;
    __core.data = new ns.table.data({ core: __core, setting: setting });
    __core.render = new ns.table.render({ core: __core, setting: setting });
    __core.ui = new ns.table.ui();
    __core.transaction = new ns.transaction();
    //__core.merge = new ns.table.merge();
    //__core.divide = new ns.table.divide();
    //__core.selector = new ns.table.selector();
    //__core.dragSingle = new ns.table.dragSingle();
    //__core.dragMulti = new ns.table.dragMulti();
    
    var settingGet = function () {
        return setting;
    }

    var draw = function () {
        __core.drawCancel = false;
        __core.drawing = true;
        __core.data.init();
        __core.data.render();
    }
    
    var drawRun = function () {
        if (__core.drawCancel) 
            return;
        
        if (__core.drawing) {
            __events.on(ns.table.renderEvent.cancelCompleted, function () {
                __events.off(ns.table.renderEvent.cancelCompleted);
                draw();
            }.bind(this));
            drawCancel();
        } else {
            draw();
        }
    }
    
    var drawCancel = function () {
        if (__core.drawing) {
            __core.drawing = false;
            __core.drawCancel = true;
        }
    }
    
    var rowGet = function (sectionType, id) {
        return __core.data.row.get(sectionType, id);
    }
    
    var rowGetValue = function (sectionType, id, columnId) {
        var row = rowGet(sectionType, id);
        return row && row[columnId];
    }
    
    var cellAdd = function () {
    }
    
    var cellEditable = function (sectionType, columnId, rowId, value) {
    }
    
    var cellGet = function (sectionType, columnId, rowId) {
    }
    
    var cellMove = function (sectionType, columnId, rowId) {
    }
    
    var cellRemove = function (sectionType, columnId, rowId) {
    }
    
    var cellRefresh = function (sectionType, columnId, rowId) {
        var v = rowGetValue(sectionType, columnId, rowId);
        cellSet(sectionType, columnId, rowId, v);
    }
    
    var cellSet = function (sectionType, columnId, rowId, value) {
        if (__core.transaction.state  == ns.transaction.state.open) {
            ns.transaction.push(this, renderCell, arguments);
        }
    }
    
    var renderLine = function () {
    }
    
    var renderCell = function () {
    }
    
    var destroyAll = function () {
        for (var i in __core.data) {
            if (__core.data.hasOwnProperty(i))
                __core.data[i].destroyAll && __core.data[i].destroyAll();
        }
    }
    
    //mode 에 따른 함수 노출
    
    return {
        draw: {
            cancel: drawCancel,
            run: drawRun			
        },
        cell: {
        },
        column: __core.data.column,
        row: __core.data.row,
        setting: setting,		
        transaction: __core.transaction,
        
        //checkbox: {
        //	init: checkboxInit,
        //	set: checkboxSet,
        //	get: checkboxGet,
        //	checkedList: checkboxCheckedList,
        //	enable: checkboxEnable,
        //	disable: checkboxDisable
        //},
        
        cell: {
            add: cellAdd,
            editable: cellEditable
            //get: cellGet,
            //move: cellMove,
            //refresh: cellRefresh,
            //remove: cellRemove,
            //set: cellSet,
            //visible: cellVisible,
        },
        
        //line: {
        //	add: lineAdd,
        //	move: lineMove,
        //	remove: lineRemove
        //},
        
        destroyAll: destroyAll
    };
};
