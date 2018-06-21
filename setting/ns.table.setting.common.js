

ns.table.setting.common = function (option) {
	"use strict";
	
	this.self = option.scope;
	
	this.constValue = ns.grid.constValue;
	
	this.__data = {
		containerId: null,
		/**
		* view: cell 선택하면 읽기 모드 (값 입력 or 셀 선택 후 F2 면 edit)
		* input: cell 선택하면 edit
		*/
		controlViewMode: this.constValue.controlViewMode.view, // | this.constValue.controlViewMode.direct | this.constValue.controlViewMode.native
		tableLayout: this.constValue.tableLayout.table, // | this.constValue.tableLayout.table
		tableRenderingDirection: this.constValue.tableRenderingDirection.horizontal, // | this.constValue.tableRenderingDirection.vertical
		columnType: this.constValue.columnType.single, // | this.constValue.columnType.multi | this.constValue.columnType.each

		templateType: this.constValue.templateType.default,
		defaultTableClass: ""
	};

	this.setContainerId = function (containerId) {
		this.__data.containerId = containerId;
		return this.self;
	};

	this.getContainerId = function () {
		return this.__data.containerId;
	};
	
	this.setTableLayout = function (value) {
		if (![this.constValue.tableLayout.grid, this.constValue.tableLayout.table].includes(value)) {
			ns.util.notify("table layout 으로 설정할 수 있는 값은 this.constValue.tableLayout.grid | this.constValue.tableLayout.table 입니다.");
			return;
		}
		
		//tableLayout 이 table 인 경우 controlViewMode 는 native 만 지원
		if (this.constValue.tableLayout.table == value) {
			//자동변경이 일어난다는것을 인지시켜주기 위해 사용 => 인지하면 alert 인데 바꿔서 사용하지 않을까?
			ns.util.notify("table layout 을 table 로 설정할 경우 control view mode 는 native 으로 자동 설정 됩니다.");
			this.setControlViewMode(this.constValue.controlViewMode.native);
		}

		this.__data.tableLayout = value;
		
		return this.self;
	};

	this.getTableLayout = function () {
		return this.__data.tableLayout;
	};
	
	this.setTableRenderingDirection = function (value) {
		if (![this.constValue.tableRenderingDirection.horizontal, this.constValue.tableRenderingDirection.vertical].includes(value)) {
			ns.util.notify("table rendering direction 으로 설정할 수 있는 값은 this.constValue.tableRenderingDirection.horizontal | this.constValue.tableRenderingDirection.vertical 입니다.");
			return;
		}

		this.__data.tableRenderingDirection = value;

		return this.self;
	};

	this.getTableRenderingDirection = function () {
		return this.__data.tableRenderingDirection;
	};

	this.setColumnType = function (columnType) {
		if (![this.constValue.columnType.single, this.constValue.columnType.multi, this.constValue.columnType.each].includes(columnType)) {
			ns.util.notify("column type 으로 사용할 수 있는 값은 this.constValue.columnType.single | this.constValue.columnType.multi | this.constValue.columnType.each 입니다.");
			return;
		}

		this.__data.columnType = columnType;
	};

	this.getColumnType = function () {
		return this.__data.columnType;
	};
	
	this.setControlViewMode = function (value) {	
		if ([this.constValue.controlViewMode.native, this.constValue.controlViewMode.view, this.constValue.controlViewMode.direct].includes(value)) {
			ns.util.notify("control view mode 로 사용할 수 있는 값은 this.constValue.controlViewMode.native | this.constValue.controlViewMode.view | this.constValue.controlViewMode.direct 입니다.");
			return;
		}
		
		if (this.__data.tableLayout == this.constValue.tableLayout.table && ![this.constValue.controlViewMode.view, this.constValue.controlViewMode.direct].includes(value)) {
				throw "table layout 을 table 로 설정 후 control view mode 는 input 만 사용 가능합니다.";
		}
		this.__data.controlViewMode = value;
	};

	this.getControlViewMode = function () {
		return this.__data.controlViewMode;
	};

	this.setTemplateType = function (templateType) {
		switch (templateType) {
			case "":
				this.__data.defaultTableClass = "";
				break;
			case "":
				this.__data.defaultTableClass = "";
				break;
			case "":
				this.__data.defaultTableClass = "";
				break;
			case "":
				this.__data.defaultTableClass = "";
				break;
			default:
				this.__data.defaultTableClass = "";
				break;
		}
		this.__data.templateType = templateType;
	};

	this.getTemplateType = function () {
		return this.__data.templateType;
	};
};