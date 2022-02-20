const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const app = express()
const mongoose = require("mongoose")
const config = require("config")
const router = require("./router")

// db connection
mongoose.connect(config.DBHost, { useNewUrlParser: true }, () => {
	console.log("connected to MongoDB...")
})

let db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))

//don't show the log when it is test
if (config.util.getEnv("NODE_ENV") !== "test") {
	//use morgan to log at command line
	app.use(morgan("combined")) //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: "application/json" }))
app.use(router)

// server setup
const port = process.env.PORT || 8000
const server = http.createServer(app)
server.listen(() => {
	console.log("server running on port", port)
})
