

ns.convertor = {
    '1': function (value, format) {
        var pattern = /(\d{4})([\/-])(\d{2})([\/-])(\d{2})/g;
        var result = pattern.exec(value);
        if (result) {
            result.shift();
            switch (format) {
                case "0": 
                case "1": 
                    return result.join("");
                case "2":
                    result[0] = result[0].substring(2);
                    return result.join("");
                    break;
            }
        }
        return value;
    },
    '2': function (value, format) {
        var pattern = /(\d{4})([\/-])(\d{2})([\/-])(\d{2})(-)(\d+)/g;
        var result = pattern.exec(value);
        if (result) {
            result.shift();
            switch (format) {
                case "0": 
                case "1": 
                    return result.join("");
                case "2":
                    result[0] = result[0].substring(2);
                    return result.join("");
                    break;
            }
        }
        return value;
    },
    '8': function (value, format) {
        var pattern = /(^[-]?)(\d+)(?:[.](\d+))?$/g;
        var result = pattern.exec(value);
        if (result) {
            result.shift();
            var v, point;
            point = (result[2] || "").rightPad(format, "0");

            if (point == "")
                v = result[0] + result[1];
            else
                v = result[0] + result[1] + "." + point;

            if (parseFloat(v) == 0) v = "";

            return v;
        }
        return value;
    },
    '9': function (value, format) {
        var pattern = /(^[-]?)(\d+)(?:[.](\d+))?$/g;
        var result = pattern.exec(value);
        if (result) {
            result.shift();
            var v, point;
            point = (result[2] || "").rightPad(format, "0");

            if (point == "")
                v = result[0] + result[1];
            else
                v = result[0] + result[1] + "." + point;
                
            return v;
        }
        return value;
    },
    '0': function (value) {
        return value;
    }
}