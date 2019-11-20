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

io
    .of("/games")
    .on("connection", (socket) => {
        console.log("New Client");
        socket.emit("welcome", "You are connected to games area.");
    socket.on("joinRoom", (data) => {
        let msg = JSON.parse(data);
        socket.join(msg.code);
        io.of("/games").in(msg.code)
            .emit("newUser", JSON.stringify({
                msg: `${msg.username} joined ${msg.code}`,
                username: msg.username
            }))
    });
    socket.on("message", (data) => {
        let msg = JSON.parse(data);
        io.of("games").in(msg.room).emit("message", msg)
    });
});

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));