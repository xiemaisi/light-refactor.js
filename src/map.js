// Map Datatype
// ------------
// We need a simple way to represent maps with string keys.
function Map() {
}
Map.prototype.put = function(key, val) {
    this['$' + key] = val;
};
Map.prototype.get = function(key) {
    return this['$' + key];
};
Map.prototype.has = function(key) {
    return this.hasOwnProperty('$' + key);
};
Map.prototype.remove = function(key) {
    delete this['$' + key];
};
Map.prototype.forEach = function(callback) {
    for (var k in this) {
        if (!this.hasOwnProperty(k)) {
            continue;
        }
        callback(k.substring(1), this[k]);
    }
};
exports.Map = Map;

// Specialized methods
Map.prototype.push = function(key, val) {
    key = '$' + key
    if (!this[key]) {
        this[key] = [];
    }
    this[key].push(val);
};
Map.groupBy = function(list, item2key) {
    if (typeof item2key === 'string') {
        var prty = item2key;
        item2key = function(item) {
             return item[prty];
        };
    }
    var map = new Map;
    for (var i=0; i<list.length; i++) {
        map.push(item2key(list[i]), list[i]);
    }
    return map;
};
