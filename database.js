// TODO: Remove .verbose()
var sqlite3 = require("sqlite3").verbose()

const DBSOURCE = "assets/losungen.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log("successfully connected to the database")
    }
})

module.exports = db