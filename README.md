# immariokombat


## Background and Overview

[ImmarioKombat](https://immariokombat.herokuapp.com/#/) is a web-based, real-time fighting game that applies newer, more readily available software and hardware to the old style fighter games that we all know and love. After playing these older games on deprecated consoles, our group thought we could make a desktop version that utilized our cellphones as the input devices and a desktop to display the game rendering itself. 

ImmarioKombat will utilize the MERN stack: MongoDB, expressJS, reactJS, and nodeJS. 

### PROJECT FLOW (TOP TO BOTTOM):

### create.immariokombat.com

`/` - Welcome page with hello and button to generate a room.

`/room` - Code generated and presented on screen. Directions on how to go to your phone and enter in code (just like Kahoot).

### immariokombat.com

`/signin` or `/signup` - Prompt to sign in our sign out.

`/join` - box to enter in the code that was presented in room/:roomId

`/joystick` - joystick for the player inputs to the game (jump, punch, duck, etc. for each player)

### create.immariokombat.com

`/game` - actual game canvas with player 1 and player 2 loaded and ready to play

## Functionality & MVP

   - [x] User authorization: sign up and log in
   - [x] Saving of game data to database (number of punches, high score, time, etc.)
   - [x] Two players able to play against each other at the same time.
   - [x] Render game sprites to the canvas that change with the game's logic.
   - [x] Rendering events in real time between both players to see changes in real time. 
   - [x] Production README
   - [x] Deployment to Heroku

#### Bonus Features
   - [x] Real time communication between desktop browser and mobile browser.
   - [x] Connect to the game via QR code that serves the game ID
   - [x] Display game status on mobile
   - [ ] Player select screen and 1 player vs computer version

## Group Members & Work Breakdown

Project Timeline: November 18 - 25

**Griffin Sharp**,
**Chanakya Valluri**,
**Bob Andre**,
**Ricardo**

## Technologies and Technical Challenges

###  Backend: nodeJS, expressJS, MongoDB

Node simply gives our project the speed of the Chrome's V8 engine, able to develop our app in Javascript in a scalable manner. It's efficient and perfect for getting a web-app off the ground and running quickly. 

Express will be the backend framework since its an extremely lightweight, minimal web-server that runs well with Node.js. The middleware and HTTP methods supplied by express makes setting up and adding extra API endpoints as we build out our app quite simple, manageable, and flexible.

MongoDB was our groups first introduction to a non-SQL relational database. MongoDB excels in low-latency real time communication, is highly accessible in terms of data transfer, with a very quick setup time. It's preferred for apps that need seamless, real time communication and consist of simple relationships. 

### Frontend: React and Redux
On the frontend of our app, we decided to utilize React with Redux to manage and persist state. The visual component of our game renders within an HTML canvas, however most other front-end facing portion are coded via React to give the feel the smooth navigation feeling of a single page web application. Redux helps our app keep track and manage the various states of our app and let it know what's available for each React component to render on the current page. 

React's active developer community provided many npm packages to further supplement the library itself. `react-repeatable` is one such package, which helped tackle one of our many problems with making a reponsive controller within a mobile browser, allowing a user to simply hold down an action, such as move-left or move-right, without having to repeatedly tap the button on the controller. Throughout the development process, we realized using both a phone and a computer can be a hindrance to just getting a game session up and running. To further cut down on this time and get users right into the action, `qrcode.react` allowed for the generation of unique QR codes to handle entry of the game lobby code. Not exactly game changing, but another fun feature and excuse to explore something potentially crucial for a project later down the line. Making our app responsive to handle both mobile and desktop browsers was make-or-break in relation to the overall experience. `react-device-detect` allowed our team to steer users in the right direction based on which device they are using to access the page. Our `/howto` serves to clear up how to play the game, but this package is another added measure to prevent users accidently trying to play with a controller designed for mobile touch screens from a desktop browser. 

### Realtime Communication
We will be incorporating websockets that will allow players to communicate with the game in real time.
The game will create new rooms for each game through websockets and two players can connect to a single room, and upon the established connection, players can send game inputs in real time. These inputs are sent via the mobile phone controller of each player to the game client. In simple terms, think of it like a groupchat between player 1, player 2, and the game client. A player presses the button to jump, which the client receives, and subsequently delivers the appropriate action by displaying it in the game window. 

