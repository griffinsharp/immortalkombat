const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.log(err));

io.on("connection", (socket) => {
    socket.emit("welcome", "You are connected.");
});

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
// app.listen(port, () => console.log(`Server is running on port ${port}`));