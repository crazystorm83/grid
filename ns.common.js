

ns.common = {
    operateMode: "development",
    thousand: function () {
        return ",";
    },
    point: function () {
        return ".";
    },
    isTrue: function (value) {
        if (value == undefined || value == null)
            return false;
        return value.isTrue();
    },
    isFalse: function (value) {
        if (value == undefined || value == null)
            return true;
        return value.isFalse();
    },
    isBoolean: function (value) {
        if (value == undefined || value == null)
            return false;
        return value.isBoolean();
    }
};