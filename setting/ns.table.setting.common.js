

ns.table.setting.common = function () {
    "use strict";
    
	var constValue = ns.grid.constValue;
	
	var __data = {
		/**
		* view: cell 선택하면 읽기 모드 (값 입력 or 셀 선택 후 F2 면 edit)
		* input: cell 선택하면 edit
		*/
		controlViewMode: constValue.controlViewMode.view, // | constValue.controlViewMode.direct | constValue.controlViewMode.native
		tableLayout: constValue.tableLayout.table, // | constValue.tableLayout.table
		tableRenderingDirection: constValue.tableRenderingDirection.horizontal, // | constValue.tableRenderingDirection.vertical
		columnType: constValue.columnType.single, // | constValue.columnType.multi | constValue.columnType.each

		templateType: constValue.templateType.default,
		defaultTableClass: ""
	};
	
	this.setTableLayout = function (value) {
		if (![constValue.tableLayout.grid, constValue.tableLayout.table].includes(value)) {
			ns.util.notify("table layout 으로 설정할 수 있는 값은 constValue.tableLayout.grid | constValue.tableLayout.table 입니다.");
			return;
		}
		
		//tableLayout 이 table 인 경우 controlViewMode 는 native 만 지원
		if (constValue.tableLayout.table == value) {
			//자동변경이 일어난다는것을 인지시켜주기 위해 사용 => 인지하면 alert 인데 바꿔서 사용하지 않을까?
			ns.util.notify("table layout 을 table 로 설정할 경우 control view mode 는 native 으로 자동 설정 됩니다.");
			this.setControlViewMode(constValue.controlViewMode.native);
		}

		__data.tableLayout = value;

		return this;
	};

	this.getTableLayout = function () {
		return __data.tableLayout;
	};
	
	this.setTableRenderingDirection = function (value) {
		if (![constValue.tableRenderingDirection.horizontal, constValue.tableRenderingDirection.vertical].includes(value)) {
			ns.util.notify("table rendering direction 으로 설정할 수 있는 값은 constValue.tableRenderingDirection.horizontal | constValue.tableRenderingDirection.vertical 입니다.");
			return;
		}

		__data.tableRenderingDirection = value;

		return this;
	};

	this.getTableRenderingDirection = function () {
		return __data.tableRenderingDirection;
	};

	this.setColumnType = function (columnType) {
		if (![constValue.columnType.single, constValue.columnType.multi, constValue.columnType.each].includes(columnType)) {
			ns.util.notify("column type 으로 사용할 수 있는 값은 constValue.columnType.single | constValue.columnType.multi | constValue.columnType.each 입니다.");
			return;
		}

		__data.columnType = columnType;
	};

	this.getColumnType = function () {
		return __data.columnType;
	};
	
	this.setControlViewMode = function (value) {	
		if ([constValue.controlViewMode.native, constValue.controlViewMode.view, constValue.controlViewMode.direct].includes(value)) {
			ns.util.notify("control view mode 로 사용할 수 있는 값은 constValue.controlViewMode.native | constValue.controlViewMode.view | constValue.controlViewMode.direct 입니다.");
			return;
		}
		
		if (__data.tableLayout == constValue.tableLayout.table && ![constValue.controlViewMode.view, constValue.controlViewMode.direct].includes(value)) {
				throw "table layout 을 table 로 설정 후 control view mode 는 input 만 사용 가능합니다.";
		}
		__data.controlViewMode = value;
	};

	this.getControlViewMode = function () {
		return __data.controlViewMode;
	};

	this.setTemplateType = function (templateType) {
		switch (templateType) {
			case "":
				__data.defaultTableClass = "";
				break;
			case "":
				__data.defaultTableClass = "";
				break;
			case "":
				__data.defaultTableClass = "";
				break;
			case "":
				__data.defaultTableClass = "";
				break;
			default:
				__data.defaultTableClass = "";
				break;
		}
		__data.templateType = templateType;
	};

	this.getTemplateType = function () {
		return __data.templateType;
	};
};