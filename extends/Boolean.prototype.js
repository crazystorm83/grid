if (!Boolean.prototype.isTrue) {
    Boolean.prototype.isTrue = function () {
        return this;
    };
}

if (!Boolean.prototype.isFalse) {
    Boolean.prototype.isFalse = function () {
        return this;
    };
}

if (!Boolean.prototype.isBoolean) {
    Boolean.prototype.isBoolean = function () {
        return true;
    };
}