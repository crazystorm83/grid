if (!String.format) {
    /**
     * 지정된 형식으로 문자열 만들기
     * @param {String} format 
     * @example
     * in:  String.format("{0} format test", "hello");
     * out: "hello format test"
     */
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined'
            ? args[number] 
            : match
            ;
        });
    };
};

if (String.prototype.format) {
    /**
     * 지정된 형식으로 문자열 만들기
     * @example
     * in:  "{0} format test".format("hello");
     * out: "hello format test"
     */
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
};

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
    };
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
    };
}
