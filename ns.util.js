

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
    }
};