const prettyJson = (obj) => {
    // Prevent recursion
    const seen = new Set()
    let jsonString = JSON.stringify(obj, (k, v) => {
        if ( seen.has(v) ) { return } // returning undefined will skip
        if (typeof v === 'object') { seen.add(v) }
        return v
    })

    // Remove leading "_" from variable name
    return jsonString.replace(/\"_/g, "\"")
}

module.exports = {
    prettyJson
}