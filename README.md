# immortalkombat


## Background and Overview

ImmortalKombat is a web-based, real-time fighting game that applies newer, more readily available software and hardware to the old style fighter games that we all know and love. After playing these older games on deprecated consoles, our group thought we could make a desktop version that utilized our cellphones as the input devices and a desktop to display the game rendering itself. 

ImmortalKombat will utilize the MERN stack: MongoDB, expressJS, reactJS, and nodeJS. 

### PROJECT FLOW (TOP TO BOTTOM):

### create.immortalkombat.com

`/` - Welcome page with hello and button to generate a room.

`/room` - Code generated and presented on screen. Directions on how to go to your phone and enter in code (just like Kahoot).

### immortalkombat.com

`/signin` or `/signup` - Prompt to sign in our sign out.

`/join` - box to enter in the code that was presented in room/:roomId

`/joystick` - joystick for the player inputs to the game (jump, punch, duck, etc. for each player)

### create.immortalkombat.com

`/game` - actual game canvas with player 1 and player 2 loaded and ready to play

## Functionality & MVP

   - [ ] User authorization: sign up and log in
   - [ ] Saving of game data to database (number of punches, high score, time, etc.)
   - [ ] Two players able to play against each other at the same time.
   - [ ] Render game sprites to the canvas that change with the game's logic.
   - [ ] Rendering events in real time between both players to see changes in real time. 
   - [ ] Production README
   - [ ] Deployment to Heroku

#### Bonus Features
   - [ ] Real time communication between desktop browser and mobile browser.
   - [ ] Connect to the game via QR code that serves the game ID
   - [ ] Display game status on mobile
   - [ ] Player select screen and 1 player vs computer version

## Group Members & Work Breakdown

Project Timeline: November 18 - 25

**Griffin Sharp**,
**Chanakya Valluri**,
**Bob Andre**,
**Ricardo**

### Day 1 (November 18) 
  - Setup basic architecture for the project - **All**
  - Create MongoDB database and build out schema with test routes - **All**
  - Basic React landing page, start building out frontend components - **Bob**
  - Setup canvas with sprites - **Ricardo and Griffin**
  - Websocket setup and research - **Chanakya**

### Day 2 (November 19) 
  - Start on game logic and functionality - **Ricardo and Griffin**
  - Continue websocket setup and research - **Chanakya**
  - Connect React frontend to our database - **Bob**

### Day 3 (November 20) 
  - User authentication - **Chanakya**
  - Testing of game logic and display of sprites - **Ricardo and Griffin**
  - Building out backend Express routes - **Bob and Chanakya** 

### Day 4 (November 21) 
  - Connect the server side to the client side - **All**
  - Run tests of basic desktop only game - **Griffin and Ricardo**
  - Front end components to be displayed on mobile side - **Bob**

### Day 5 (November 22) 
  - Connection to the mobile side of the app - **All**
  - Seed data for tests/demo users - **Chanakya**
  - Leaderboard functionality and persistence to the back end - **Griffin, Bob, and Ricardo**

### Day 6 (November 23) 
  - Polish up design aspects, such as CSS and HTML - **All**
  - Push to Heroku - **All**

### Day 7 (November 24) 
  - Complete Production README.md - **Griffin and Chanakya**
  - Keep testing and debugging each part of the project  - **All**

## Technologies and Technical Challenges

###  Backend: nodeJS, expressJS, MongoDB

Node simply gives our project the speed of the Chrome's V8 engine, able to develop our app in Javascript in a scalable manner. It's lightweight, efficient, and perfect for getting a web-app off the ground and running quickly. 

Express will be the backend framework since its an extremely lightweight, minimal web-server that runs well with Node.js. The middleware and HTTP methods supplied by express makes setting up and adding extra API endpoints as we build out our app quite simple, manageable, and flexible.

MongoDB was our groups first introduction to a non-SQL relational database. MongoDB excels in low-latency real time communication, is highly accessible in terms of data transfer, with a very quick setup time. It's preferred for apps that need seamless, real time communication and consist of simple relationships. 

### Frontend: React and Redux
On the frontend of our app, we decided to utilize React with Redux to manage and persist state. The visual component of our game renders within an HTML canvas, however most other front-end facing portion are coded via React to give the feel the smooth navigation feeling of a single page web application. Redux helps our app keep track and manage the various states of our app and let it know what's available for each React component to render on the current page. 

### Realtime Communication
We will be incorporating websockets that will allow players to communicate with the game in real time.
The game will create new rooms for each game through websockets and two players can connect to a single room and upon the established connection players can send game inputs in real time.
We will be displaying the real time changes by processing the game inputs of the players and show it in the game window.

### Wireframe
