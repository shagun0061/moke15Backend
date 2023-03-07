const express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserRegisterModal } = require("../model/RegisterModal");

const user_Rigester_Routes = express.Router();

user_Rigester_Routes.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let newSignin = await UserRegisterModal.find({ email: email });
    console.log(newSignin);
    if (newSignin.length > 0) {
      bcrypt.compare(password, newSignin[0].password, function (err, result) {
        if (result) {
          var token = jwt.sign({ userID: newSignin[0]._id }, "masai");
          res.send({
            status: "login sucessfully",
            Token: token,
            userEmail: email,
            id: newSignin[0]._id,
            admin: newSignin[0].admin,
          });
        } else {
          res.send("Wrong Password ");
        }
      });
    } else if (newSignin.length === 0) {
      res.send("Signin first");
    }
  } catch (error) {
    res.send(error);
  }
});

user_Rigester_Routes.post("/signup", (req, res) => {
  let { email, password, name, admin } = req.body;

  if (email === "@masaischool.com") {
    admin = true;
  } else {
    admin = false;
  }
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        res.send(err);
      } else {
        let newSignin = new UserRegisterModal({
          email,
          password: hash,
          admin,
          name,
        });
        await newSignin.save();
        res.send("Signin sucessfully");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = user_Rigester_Routes;
