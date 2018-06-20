function klass(o, i) {
    if (typeof o != "function")
        return o;
    
    if (typeof o == "object" && o.constructor != Object)
        return o;
        
    o.prototype = i;
}