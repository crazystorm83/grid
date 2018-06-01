if (!Number.prototype.isTrue) {
    Number.prototype.isTrue = function () {
        var v = this;
        return v != 0;
    };
}

if (!Number.prototype.isFalse) {
    Number.prototype.isFalse = function () {
        var v = this;
        return v == 0; 
    };
}

if (!Number.prototype.isBoolean) {
    Number.prototype.isBoolean = function () {
        return false;
    };
}
