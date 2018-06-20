

ns.common = {
    operateMode: "development",
    separate: "$",
    thousand: function () {
        return ",";
    },
    point: function () {
        return ".";
    },
    isTrue: function (v) {
        if (v == undefined || v == null)
            return false;
            
        switch (typeof v) {
            case "string":
                v = v.toLowerCase();
                return v == "1" || v == "y" || v == "true";
            case "number":
                return v > 0;
            case "boolean":
                return v == true;
            case "object":
                return false;

        }
    },
    isFalse: function (v) {
        if (v == undefined || v == null)
            return true;
            
        switch (typeof v) {
            case "string":
                v = v.toLowerCase();
                return v == "0" || v == "n" || v == "false";
            case "number":
                return v < 1;
            case "boolean":
                return v == false;
            case "object":
                return false;

        }
    },
    isBoolean: function (v) {
        if (v == undefined || v == null)
            return false;
            
        if (typeof v == "boolean")
            return true;
        return false;
    }
};