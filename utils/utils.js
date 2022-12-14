const prettyJson = (obj) => {
    // Prevent recursion
    const seen = new Set()
    let jsonString = JSON.stringify(obj, (k, v) => {
        if ( seen.has(v) ) { return } // returning undefined will skip
        if ( v === obj._parent ) { return } // parent object should not be included
        if ( k === "_parentType" ) { return } // parent type should not be included
        if ( k === "_parentId" && v === "") { return } // skip parentId if non-existent
        if (typeof v === "object") { seen.add(v) }
        return v
    })

    // Remove leading "_" from variable name
    return JSON.parse(jsonString.replace(/\"_/g, "\""))
}

module.exports = {
    prettyJson
}