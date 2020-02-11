const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const User = require("../../models/User");
const Game = require("../../models/Game");
const validateRegisterInput = require("../../validation/registration");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => {
  res.json({ msg: "This is the users route" });
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        stats: req.body.stats,
        highscore: req.body.highscore
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
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
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

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

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

// get for highscore
// all the users highscores, sorted from greatest to least greatest
router.get("/highscore", (req, res) => {
  User.find()
    .sort({ highscore: -1 })
    .then(users => res.json(users))
    .catch(err => res.status.json(err));
});

router.post("/stats/:username", (req, res) => {
  const currentUser = User.find({ username: req.params.username });
  currentUser.stats.push(req);
});

router.get("/stats/:user_id", (req, res) => {
  User.find({ _id: req.params.user_id }).then(user => res.json(user));
});

router.patch("/:user_id", (req, res) => {
  const newGame = new Game({
    winner: req.body.winner,
    loser: req.body.loser,
    time: req.body.time,
    winnerHitPercentage: req.body.winnerHitPercentage,
    loserHitPercentage: req.body.loserHitPercentage
  });

  newGame.save();

  User.findOne({ _id: req.params.user_id }, (err, doc) => {
    doc.stats.push(newGame);
    doc.save();
  });

  res.json("done");
});

module.exports = router;
