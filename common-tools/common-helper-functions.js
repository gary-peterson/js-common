
function stringSafely(anObject) {
    //Convenience
    if (anObject === undefined) return 'undefined';
    if (anObject === null) return 'null';
    return anObject.toString();
}

function prn(anObject) {
    //Convenience
    console.log(stringSafely(anObject));
}

//--------------------------------
// Exporting

exports.prn = prn;