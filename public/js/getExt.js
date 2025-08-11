module.exports = function(name) {
    const arr = name.split(".") ;

    return arr[arr.length -1];
}