export var changeName = function(obj, newName) {
    obj.properties[0].id = newName;
    return obj;
 }