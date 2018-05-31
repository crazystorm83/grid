

ns.table.data.row = function (option) {
    "use strict";
    
    var constValue = ns.grid.constValue, 
        theadType = constValue.sectionType.thead, tbodyType = constValue.sectionType.tbody, tfooterType = constValue.sectionType.tfooter;
    var core = option.core, setting = option.setting;
    var events = setting.eventsGet();
    var __data = {
        thead: {
            data: []
        },
        tbody: {
            data: []
        },
        tfooter: {
            data: []
        }
    };

    this._data;

    this.setStructureInfo = function (sectionType) {
        this._data  = __data[sectionType].data;
    }
    
    this.init = function () {
        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }

        events && events.emit(ns.table.rowEvent.prepareInit);

        var _sectionTypes, _sectionType, _rows;
        
        _sectionTypes = [theadType, tbodyType, tfooterType];
        
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            _sectionType = _sectionTypes[sectionTypeIdx];

            this.setStructureInfo(_sectionType);

            if ([constValue.columnType.single, constValue.columnType.each].includes(setting.commonGetColumnType()))
                _rows = Object.clone(setting.rowGet(_sectionType).datas, true);
            else if ([constValue.columnType.multi].includes(setting.commonGetColumnType()))
                _rows = Object.clone(setting.rowGet(_sectionType).datas, true);

            events && events.emit(ns.table.rowEvent.initData, { data: _rows, sectionType: _sectionType });

            for (var i = 0, len = _rows.length; i < len; i++) {
                $.extend(_rows[i], setting.rowGetAdditionalDatas(_sectionType));
            }

            __data[_sectionType].data = _rows;
        }

        events && events.emit(ns.table.rowEvent.initCompleted);
    }
    
    this.render = function () {
        if (core.drawCancel) {
            events && events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }
        events && events.emit(ns.table.rowEvent.renderCompleted);
    }
    
    this.add = function () {
    }
    
    this.getAll = function () {
    }
    
    this.remove = function () {
    }
    
    this. move = function () {
    }
    
    this.clear = function () {
    }
    
    this.destroyAll = function () {
        for (var i in __data)
            delete __data[i];
        
        this._data = null;
    }
};