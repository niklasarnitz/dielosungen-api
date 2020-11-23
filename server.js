// Create the express app
var express = require("express")
var app = express()

// Import the database object
var db = require("./database")

// Set the Server Port
var HTTP_PORT = 8080

// Start the express server
app.listen(HTTP_PORT, () => {
    console.log("Server successfully running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// /api/v1/losungen/today -> returns the losung of today
app.get('/api/v1/losungen/today', (req, res, next) => {
    var sql = "select * from losungen" + String(new Date().getFullYear()) + " WHERE id='" + String(getDayOfTheYear()) + "';";
    var params = []

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
        }
        res.status(200).json(row)
    })
})

function getDayOfTheYear() {
    var now = new Date()
    var start = new Date(now.getFullYear(), 0, 0)
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000)
    var oneDay = 1000 * 60 * 60 * 24
    return (Math.floor(diff / oneDay) - 1)
}