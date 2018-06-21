

ns.events = function () {
    "use strict";
    
    this.events = [];
    
    this.on = function (type, callback) {
        this.events.push({ type: type, callback, callback });
    };
    this.off = function (type) {
        this.events.remove(function (v, i, a) {
            return v.type == type;
        });
    };
    this.find = function (type, predicate) {
        var returnValue = { items: [] };
        if (typeof predicate != "function") {
            predicate = function (v, i, a) {
                if (v.type == type)
                    this.items.push(v);
            };
        }
        this.events.find(predicate, returnValue);
        return returnValue.items;
    };
    this.exist = function (type) {
        return this.find(type).length > 0;
    };
    /**
     * 등록된 이벤트 실행
     * @param {String} type 
     * @param {Object} args
     * @example
     * 예제1) 같은 이름으로 복수 이벤트 등록 후 중간에 멈추는 기능
            events.on("eventKey", function (data) {
                return { cancel: true }; //이후 등록된 이벤트는 실행되지 않는다.
            });
            //위에서 { cancel: true } 로 이 이벤트 실행되지 않는다.
            events.on("eventKey", function (data) {
                return { value: 2 };
            });
            var a = events.emit("eventKey", { value: "value" });
            console.log(a); // undefined

     * 예제2) 같은 이름으로 복수 이벤트 등록 후 중간에 멈추면서 반환값 받는 기능
            events.on("eventKey", function (data) {
                return 1;
                //return "";
                //return [];
                //return {};
            });
            //위에서 return 값이 존재해서 이 이벤트 실행되지 않는다.
            events.on("eventKey", function (data) {
                return { value: 2 };
            });
            var a = events.emit("eventKey", { value: "value" });
            console.log(a); // 1
     */
    this.emit = function (type, args) {
        var result, resultType;
        var v = this.find(type);
        for (var i = 0, len = v.length; i < len; i++) {
            result = v[i].callback && v[i].callback(args);
            resultType = typeof result;
            if (resultType != "undefined" && result != null) {
                if (resultType == "object") {
                    if (result.constructor == Array)
                        return result;
                    if (typeof result.cancel == "boolean" && result.cancel == true)
                        break;
                }
                return result;
            }
        }
    };
};