if (!Object.clone) {
    Object.clone = function (v, deep) {
        if (v == undefined || v == null || typeof v != 'object')
            return v;

        var result = {};
        if (v instanceof Array) {
            return v.clone();
        }

        for (var i in v) {
            if (v.hasOwnProperty(i)) {
                if (deep) {
                    if (typeof v[i] == "object") result[i] = Object.clone(v[i], deep);
                    else result[i] = v[i];
                }
                else result[i] = v[i];
            }
        }
        return result;
    };
}
