<p align="center"> 
<img src="https://github.com/griffinsharp/immortalkombat/blob/master/frontend/src/components/assets/Logo.png">
</p>

## Background and Overview

[ImmarioKombat](https://immariokombat.herokuapp.com/#/) is a web-based, real-time fighting game that applies newer, more readily available software and hardware to the old style fighter games that we all know and love. After playing these older games on deprecated consoles, our group thought we could make a desktop version that utilized our cellphones as the input devices and a desktop to display the game rendering itself. 

ImmarioKombat will utilize the `MERN` stack: `MongoDB`, `Express.js`, `React.js`, and `Node.js`. 

## Our App

Here are a few screenshots and gifs to give you an idea of what Immario Kombat is all about.

### Landing Page
<p align="center"> 
<img src="https://github.com/griffinsharp/immortalkombat/blob/master/frontend/src/components/assets/Landing%20Page.png">
</p>


### Loading Screen
<p align="center"> 
<img src="https://github.com/griffinsharp/immortalkombat/blob/master/frontend/src/components/assets/immarioload.gif">
</p>

### 2v2 Game Play
<p align="center" > 
<img src="https://github.com/griffinsharp/immortalkombat/blob/master/frontend/src/components/assets/immarioplay.gif">
</p>

### Game Stats
<p align="center" width="80%"> 
<img src="https://github.com/griffinsharp/immortalkombat/blob/master/frontend/src/components/assets/scoreboard.png">
</p>


## Our Team & Code Snippets

<p align="center"> 
<img src="https://github.com/griffinsharp/immortalkombat/blob/master/frontend/src/components/assets/immarioteampic.png">
</p>

Each developer on this team has a general, overarching focus, but every member was expected to be able to work on any one part as our needs changed. One of the perks of the MERN stack was its full JavaScript environment, which allowed each member to easily jump from creating a `React` component, altering the `Redux` state, changing a column in our `MongoDB`, or creating an `Express.js` route, whether or not that feature was their main focus. 

[Chanakya](https://github.com/chanakyav) handled websockets due to having prior experience working on a Whatsapp clone. He also deployed our app to production on Heroku and helped design the game lobby and mobile controller.

[Ricardo](https://github.com/arrudaricardo) was the main designer of the game and heavily utilized Phaser.js to setup movement/physics, calculate collisions and game conditions, render the correct sprite animations, and more.

[Griffin](https://github.com/griffinsharp) co-handled the game logic and design with Ricardo, but also styled and created the components/assets for the landing and how-to pages, handled the `Express.js` backend routing of game statistics to our `MongoDB` after the completion of each game, allowed for the ability to play as a demo user, and wrote out this comprehensive ReadMe (wink). 

[Bob](https://github.com/bppandre) setup the user authentication, designed the mobile controller, created many of our react components, and handled basic styling across our app. 

This being said, here are parts of our project's source code that we would like to additionally highlight:

**Axios Routing**

Example of a function that gathers the needed inputs to create a game object once our game logic determines that one of the players has reached 0% health. This fires an axios `PATCH` to create a new Game instance within our the database. This allows for a scoreboard, because now we can fetch some information on all user's past games.

```javascript
function sendStatData(gameStats) {
  gameState = JSON.parse(window.localStorage.getItem("gameRoom"));
  let id1 = gameState.playerIds[0];
  let id2 = gameState.playerIds[1];
  let patchStringOne = "api/users/" + id1;
  let patchStringTwo = "api/users/" + id2;
  axios.patch(patchStringOne, gameStats);
  axios.patch(patchStringTwo, gameStats);
}
```

**Web Socket**

`Socket.io` was utilized here to open seamless communication between the game client and the two players. Upon joining a game, each user is put into a "room" or waiting lobby until both users join up. When the game starts and a user clicks a button, a `json` message is sent in this room, which gets parsed and interpreted by the listening client to perform some game logic (such as a punch action which may lead to an animation event, a player collision, opponent health decrease, game over, etc.) A simple model of this relationship would be one of a group chat between player1 and player2, with the game client perfoming actions based on this overheard communication. More on this below.

```javascript
io
    .of("/games")
    .on("connection", (socket) => {
        socket.emit("welcome", "You are connected to games area.");
    socket.on("joinRoom", (data) => {
        let msg = JSON.parse(data);
        socket.join(msg.code);
        io.of("/games").in(msg.code)
            .emit("newUser", JSON.stringify({
                msg: `${msg.username} joined ${msg.code}`,
                username: msg.username,
                id: msg.id
            }));
    });
    socket.on("message", (data) => {
        let msg = JSON.parse(data);
        io.of("games").in(msg.room).emit("message", msg);
    });
});
```

**Sprite Animation and Hit Calculation**

Here is an example of how the game client interprets this `json` message sent in the `socket.io` above. Everytime a message gets sent, a `handleMessage` function is called. The character has already been determined to be player1/mario at this point in the code. If the `msg` has an `action` key with the value of `hammer,` then a variety of things need to happen, such as calling a swing function to handle the sprites of mario swinging a hammer, adding to the swing total for stats, and more.

```javascript
// --- game logic ---
if (msg.action === "hammer") {
      marioHammer(() => {
        swingHammer.apply(this, [mario]);
        marioSwingTotal = marioSwingTotal + 1;
        // check if right or left
        if (mario.data.values.facing === "right") {
          mario.play("m-hammer-right", 1).setCrop(0, 1, 43, 42);
        }
        if (mario.data.values.facing === "left") {
          mario.play("m-hammer-left", 1).setCrop(2, 2, 44, 42);
        }
      });
    }
// --- more game logic ---
```
**User Authentication**

We rolled our own user authentication for this project using JSON Web Tokens and bcrypt to salt and hash password data. This is the backend `Express.js` route that is fired when a user attempts to login. 

```javascript 
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then(user => {
    if (!user)
      return res.status(404).json({ username: "This user does not exist" });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});
```

**User Schema**

This is an example schema table from our MongoDB database. The models we utilized were `Game`, `Stat` and `User`.

```javascript
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  highscore: {
    type: Number,
    default: 0
  },
  stats: [Game.schema],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
```

## Technologies and Technical Challenges

###  Backend: Node, Express, MongoDB

`Node.js` simply gives our project the speed of the Chrome's V8 engine, able to develop our app in Javascript in a scalable manner. It's efficient and perfect for getting a web-app off the ground and running quickly. 

`Express.js` is utilized as our backend framework since its an extremely lightweight, minimal web-server that runs well with `Node.js`. The middleware and HTTP methods supplied by `Express.js` makes setting up and adding extra API endpoints as we build out our app quite simple, manageable, and flexible.

`MongoDB` was our groups first introduction to a non-SQL relational database. `MongoDB` excels in low-latency real time communication, is highly accessible in terms of data transfer, with a very quick setup time. It's preferred for apps that need seamless, real time communication and consist of simple relationships. 

`Phaser.js` is the game library we utilized to help with physics, collisions, and other game mechanics. Endless fun to tweak and experiment with, it really helped to add a classic arcade feel to the overall playstyle. 

### Frontend: React and Redux
On the frontend of our app, we decided to utilize `React` with `Redux` to manage and persist state. The visual component of our game renders within an HTML canvas, however most other front-end facing portion are coded via `React` to give the feel the smooth navigation feeling of a single page web application. `Redux` helps our app keep track and manage the various states of our app and let it know what's available for each `React` component to render on the current page. 

`React`'s active developer community provided many npm modules/packages to further supplement the library itself. `react-repeatable` is one such package, which helped tackle one of our many problems with making a reponsive controller within a mobile browser, allowing a user to simply hold down an action, such as move-left or move-right, without having to repeatedly tap the button on the controller.

Throughout the development process, we realized using both a phone and a computer can be a hindrance to just getting a game session up and running. To further cut down on this time and get users right into the action, `qrcode.react` allowed for the generation of unique QR codes to handle entry of the game lobby code. Not exactly game changing, but another fun feature and excuse to explore something potentially crucial for a project later down the line.

Making our app responsive to handle both mobile and desktop browsers was make-or-break in relation to the overall experience. `react-device-detect` allowed our team to steer users in the right direction and render different `React` components contintegent on what device is being used to access the page. Our `/howto` serves to clear up how to play the game, but this package is another added measure to prevent users accidently trying to play with a controller designed for mobile touch screens from a desktop browser. 

## Realtime Communication
We will be incorporating websockets that will allow players to communicate with the game in real time.

The game will create new rooms for each game through websocket (`socket.io`) and two players can connect to a single room, and upon the established connection, players can send game inputs in real time. These inputs are sent via the mobile phone controller of each player to the game client.

In simple terms, think of it like a groupchat between player 1, player 2, and the game client. A player presses the button to jump, which the client receives, and subsequently delivers the appropriate action by displaying it in the game window. 

## User Authentication 
A game isn't much without the ability to play with friends and brag about your accomplishments. This meant that having back and front end user authentication, complete with displaying error messages, was crucial to the overall user experience of our game. After creating an account, you gain access to all your previous match-ups: who you played against, who won, your hit percentage, and more!

Don't want to take the time to fully sign up? No problem. With the option to play as a Demo User, you can immediately start playing with friends. However, your game progress and stats will not be saved!

## Future of Our Project
In the future, we'd like to add the ability to play with 2+ people and choose from multiple maps and characters.
