if (!String.format) {
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined'
            ? args[number] 
            : match
            ;
        });
    };
}

if (!String.prototype.rightPad) {
    String.prototype.rightPad = function (length, pad) {
        var v = this, len = v.length;
        if (this.length >= length) return v;
        if (pad == null || pad == undefined) return v;

        while (len < length) {
            v += pad;
            len = v.length;
        }
        return v;
    }
}

if (!String.prototype.leftPad) {
    String.prototype.leftPad = function (length, pad) {
        var v = this + "", len = v.length;
        if (this.length >= length) return v;
        if (pad == null || pad == undefined) return v;

        while (len < length) {
            v = pad + v;
            len = v.length;
        }
        return v;
    }
}



if (!String.prototype.isTrue) {
    String.prototype.isTrue = function () {
        var v = this.toLowerCase();
        return v == "1" || v == "y" || v == "true";
    }
}

if (!String.prototype.isFalse) {
    String.prototype.isFalse = function () {
        var v = this.toLowerCase();
        return v == "0" || v == "n" || v == "false";
    }
}

if (!String.prototype.isBoolean) {
    String.prototype.isBoolean = function () {
        return false;
    }
}
