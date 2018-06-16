

ns.util = {
    log: function (log) {
        if (ns.common.operateMode == "development") {
            log = log || { message: "" };
            console.log(log.message);
        }
    },
    notify: function (message) {
        if (ns.common.operateMode == "development") {
            window.alert(message);
        }
    },
    convertToStyle: function (v) {
        if (!$.isPlainObject(v))
            return "";

        var result = "";

        for (var p in v) {
            if (v.hasOwnProperty(p)) {
                if (result != "")
                    result += " ";
                result += p + ":" + v[p] + ";";
            }
        }

        if (result != "")
            result = "style='" + result + "'";

        return result;
    },
    convertToClassName: function (v) {
        if (!$.isArray(v))
            return "";

        if (v.length == 0)
            return "";

        return "class='" + v.join(" ") + "'";
    },
    convertToAttribute: function (v) {
        if (!$.isPlainObject(v))
            return "";

        var result = "", lastString;
        
        for (var p in v) {
            if (v.hasOwnProperty(p)) {
                lastString = "";
                if (result != "")
                    result += " ";
                if (/(width)/g.test(p)) 
                    lastString = "px";

                result += p + "=" + v[p] + lastString;
            }
        }

        return result;
    }
};