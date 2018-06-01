(function ($) {
    /**
    * Static utility function for jQuery
    */
    $.extend(jQuery, {
        isNull: function (obj) {
            ///<summary>Determines whether this object is null or undefined</summary>
            return (obj == null || typeof obj == 'undefined');
        },
        isString: function (obj) {
            ///<summary>Determines whether this object is type of string</summary>
            return (typeof obj == "string");
        },
        isDate: function (obj) {
            ///<summary>Determines whether this object is type of date</summary>
            if ($.type(obj) == "date") return true;
            if ($.type(obj) == "string") obj = obj.replaceAll('-', '/');
            var dt = new Date(obj);
            return (!/Invalid|NaN/.test(dt) && dt.getTime() > 0);
        },
        isBoolean: function (obj) {
            ///<summary>Determines whether this object is type of boolean</summary>
            return ($.type(obj) == "boolean");
        },
        isRegExp: function (obj) {
            ///<summary>Determines whether this object is type of regexp</summary>
            return ($.type(obj) == "regexp");
        },
        isAlpha: function (obj) {
            ///<summary>Determines whether this object contains only alphabetic char</summary>
            return /^[a-z]+$/i.test(obj);
        },
        isNumber: function (obj) {
            ///<summary>Determines whether this object contains only number</summary>
            return /^-?\d+(\.\d+)?$/.test(obj);
        },
        isEmpty: function (obj) {
            ///<summary>Determines whether this object is null or empty</summary>
            if ($.isNull(obj)) {
                return true;
            }

            if (typeof obj == "string" && $.trim(obj).length <= 0) {
                return true;
            }
            //obj.count 조건 추가  dknam 2015.04.28
            if (obj.count && $.isFunction(obj.count) && obj.count() <= 0) {
                return true;
            }
            return false;
        }
    });
})(jQuery);