

ns.table.data.column = function (option) {
    "use strict";
    
    this.constValue = ns.grid.constValue, 
    this.theadType = this.constValue.sectionType.thead;
    this.tbodyType = this.constValue.sectionType.tbody;
    this.tfooterType = this.constValue.sectionType.tfooter;
    this.core = option.core;
    this.setting = option.setting;
    this.events = this.setting.eventsGet();
    
    this.__data = {
        thead: {},
        tbody: {},
        tfooter: {}
    };

    this._columns;
    this._columnKeys;
    this._columnRows;
    this._convertorDataTypeView;
    this._convertorDataTypeControl;
};

klass(ns.table.data.column, {
    /**
     * 전역으로 사용할 변수 설정
     * @param {String} sectionType 
     */
    setStructureInfo: function (sectionType) {
        this._columns = this.__data[sectionType].columns;
        this._columnKeys = this.__data[sectionType].columnKeys;
        this._columnRows = this.__data[sectionType].columnRows;
        this._convertorDataTypeView = this.__data[sectionType].convertorDataTypeView;
        this._convertorDataTypeControl = this.__data[sectionType].convertorDataTypeControl;
    },

    /**
     * 내부 변수 초기화
     */
    initValue: function () {
        var sectionTypes = [this.theadType, this.tbodyType, this.tfooterType];

        for (var sectionTypeIdx = 0, sectionTypeLen = sectionTypes.length; sectionTypeIdx < sectionTypeLen; sectionTypeIdx++) {
            this.__data[sectionTypes[sectionTypeIdx]].columns = [];
            this.__data[sectionTypes[sectionTypeIdx]].columnKeys = [];
            this.__data[sectionTypes[sectionTypeIdx]].columnRows = [[]];

            if (!this.__data[sectionTypes[sectionTypeIdx]].convertorDataTypeView)
                this.__data[sectionTypes[sectionTypeIdx]].convertorDataTypeView = new ns.table.data.column.dataType(this.constValue.dataType.modeView);
            else 
                this.__data[sectionTypes[sectionTypeIdx]].convertorDataTypeView.clear();

            if (!this.__data[sectionTypes[sectionTypeIdx]].convertorDataTypeControl)
                this.__data[sectionTypes[sectionTypeIdx]].convertorDataTypeControl = new ns.table.data.column.dataType(this.constValue.dataType.modeInput);
            else
                this.__data[sectionTypes[sectionTypeIdx]].convertorDataTypeControl.clear();
        }
    },

    /**
     * column type 이 single 이고, body 컬럼 존재하지 않을 경우 header 컬럼으로 body 컬럼 만들기
     */
    initMakeColumn: function () {
        if (this.setting.common.getColumnType() == this.constValue.columnType.single) {
            if (this.setting.column.get(this.tbodyType).columns.length == 0) {
                this.setting.column.set(this.tbodyType, Object.clone(this.setting.column.get(this.theadType).columns));
            }
        }
    },

    /**
     * 컬럼의 title 정보를 가지고 section type 행 데이터 만들기
     * @param {String} sectionType 
     */
    initMakeRowData: function (sectionType) {
        var rows = this.setting.row.get(sectionType);
        if (rows == null || rows.length == 0) {
            rows = [];

            var columns = this.setting.column.get(sectionType);
            var row = {};
            for (var i = 0, len = columns.length; i < len; i++) {
                row[columns[i].propertyName] = columns[i].title;
            }
            rows.push(row);
            this.setting.row.set(sectionType, rows);
        }
    },

    /**
     * 컬럼 초기화 (준비부)
     */
    init: function () {
        this.initValue();
        this.initMakeColumn();

        if (this.core.drawCancel) {
            this.events && this.events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }

        this.events && this.events.emit(ns.table.columnEvent.prepareInit, {});
        
        var _sectionTypes, _sectionType;
        
        _sectionTypes = [this.theadType, this.tbodyType, this.tfooterType];
        
        for (var sectionTypeIdx = 0; sectionTypeIdx < _sectionTypes.length; sectionTypeIdx++) {
            this.initPrimitiveColumns(_sectionTypes[sectionTypeIdx]);
        }

        this.events && this.events.emit(ns.table.columnEvent.initCompleted);
    },

    /**
     * 컬럼 초기화 (실행부)
     * @param {String} sectionType 
     */
    initPrimitiveColumns: function (sectionType) {
        var _columns;
        var _columnRows = [[]], _columnRowIdx = 0;
        var _columnKeys = {};

        this.setStructureInfo(sectionType);

        if ([this.constValue.columnType.single, this.constValue.columnType.each].includes(this.setting.common.getColumnType()))
            _columns = Object.clone(this.setting.column.get(this.theadType).columns, true);
        else if ([this.constValue.columnType.multi].includes(this.setting.common.getColumnType()))
            _columns = Object.clone(this.setting.column.get(sectionType).columns, true);

        this.events && this.events.emit(ns.table.columnEvent.initData, { columns: _columns, sectionType: sectionType });
        
        for (var i = 0, len = _columns.length; i < len; i++) {
            if (_columns[i].linechange === true)
                _columnRowIdx += 1;

            if (!_columnRows[_columnRowIdx])
                _columnRows.push([]);

            _columnRows[_columnRowIdx].push(_columns[i]);

            _columnKeys[_columns[i].id] = _columns[i];

            this._convertorDataTypeView.set(sectionType, _columns[i], { 
                dataType: _columns[i].dataType || "00",
                isCheckZero: _columns[i].isCheckZero || false,
                isDisplayZero: _columns[i].isDisplayZero || false
            });

            if (!_columns[i].controlOption)
                _columns[i].controlOption = {};
            this._convertorDataTypeControl.set(sectionType, _columns[i], {
                dataType: _columns[i].dataType || "00",
                isCheckZero: _columns[i].isCheckZero || false,
                isDisplayZero: _columns[i].isDisplayZero || false
            });

            if ($.isNull(_columns[i].lineNo) || $.isEmpty(_columns[i].lineNo)) {
                _columns[i].lineNo = _columnRowIdx;
            }
        }

        if (sectionType == this.theadType)
            this.initMakeRowData(sectionType);

        this.__data[sectionType].columns = _columns;
        this.__data[sectionType].columnRows = _columnRows;
        this.__data[sectionType].columnKeys = _columnKeys;
    },

    /**
     * 
     */
    render: function () {
        if (this.core.drawCancel) {
            this.events && this.events.emit(ns.table.renderEvent.cancelCompleted);
            return { cancel: true };
        }
        this.events && this.events.emit(ns.table.columnEvent.renderCompleted);
    },

    add: function (sectionType) {
    },

    addRow: function (sectionType) {
    },

    addColumn: function (sectionType) {
    },

    setValue: function () {

    },

    /**
     * column id 로 컬럼 정보 가져오기
     * @param {String} sectionType 
     * @param {String} columnId 
     */
    getById: function (sectionType, columnId) {
        this.setStructureInfo(sectionType);

        var column = this._columnKeys[columnId];
        
        return column;
    },

    /**
     * index 로 컬럼 정보 가져오기
     * @param {String} sectionType 
     * @param {Int} columnIndex 
     * @returns {Object} { id: "", propertyName: "", width: "", ... }
     */
    getByIndex: function (sectionType, columnIndex) {
        this.setStructureInfo(sectionType);

        var column = this._columns[columnIndex];

        if (!column)
            throw new "ns.table.data.column 객체 getByIndex 함수에서 columnId: " + columnId + " 를 찾지 못했습니다.";

        return column;
    },

    /**
     * 컬럼 정보 가져오기 (반환값 원본 입니다.)
     * @param {String} sectionType
     * @param {Object} option
     * @example 
     * {
     *  //반환값 형태
     *  //this.constValue.returnType.single: 일차원배열
     *  //this.constValue.returnType.multi: 이차원배열
     *  returnType: this.constValue.returnType.single | this.constValue.returnType.multi
     * }
     * @returns {Array} [{}, {}, ... | [[{}, {}, ...], [{}, {}, ...]]
     */
    getAll: function (sectionType, option) {
        option = option || {};
        var returnType = option.returnType || this.constValue.returnType.single;
        this.setStructureInfo(sectionType);

        switch (returnType) {
            case this.constValue.returnType.single:
                return this._columns;
            case this.constValue.returnType.multi:
                return this._columnRows;
        }
    },

    generateUniqueId: function () {
    },

    remove: function (sectionType) {
    },

    removeRow: function (sectionType) {
    },

    removeColumn: function (sectionType) {
    },

    moveTo: function (sectionType) {
    },

    clear: function (sectionType) {
    },

    /**
     * 내부 변수 소멸하기
     */
    destroyAll: function () {
        for (var i in this.__data) {
            for (var ii in this.__data[i]) {
                if (this.__data[i][ii] instanceof ns.table.data.column.dataType) {
                    this.__data[i][ii].destroyAll && this.__data[i][ii].destroyAll();
                }
            }
            delete this.__data[i];				

            this._columns = null;
            this._columnKeys = null;
            this._columnRows = null;
            this.__viewDataType = null;
            this.__controlDataType = null;
        }
    },

    /**
    * 컬럼 값을 가져오기.
    * @param {String} sectionType
    * @param {String} id 컬럼ID
    * @param {String} key 값 Key
    */
    getValue: function (sectionType, id, key) {
        var column = get(sectionType, id);
        return column && column[key];
    },

    //common method
    /**
     * 컬럼 기본 값 가져오기
     * @param {Object} defaultValue
     * @example 
     * {
     *  (String) id: "",
     *  (String) propertyName: "",
     *  (String) title: "",
     *  (String) width: "100"
     * }
     */
    getDefaultColumn: function (defaultValue) {
        return $.extend({
            id: "",
            propertyName: "",
            width: 100,
            title: "",
            controlOption: {}
        }, defaultValue || {});
    }
});
