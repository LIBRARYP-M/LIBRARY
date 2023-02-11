const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const { type } = require("os");

const SALT_ROUNDS = 10;
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "please enter your last name"],
    },
    username: {
      type: String,
      required: [true, "please enter a username"],
      unique: [true, "this username is already taken"],
    },
    email: {
      type: String,
      match: [EMAIL_PATTERN, "please enter a valid email"],
      required: [true, "please enter your email"],
      unique: [true, "this email is already taken"],
    },
    password: {
      type: String,
      required: [true, "please enter a password"],
      minLength: [8, "your password must have at least 8 characters"],
    },
    image: {
      type: String,
      default:
        "https://startupheretoronto.com/wp-content/uploads/2018/04/default-user-image-2.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const rawPassword = this.password;
  if (this.isModified("password")) {
    bcrypt
      .hash(rawPassword, SALT_ROUNDS)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) => next(err));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function(passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
