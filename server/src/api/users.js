const express = require("express");
const router = express.Router();
const { getAllUsers, createUser, getUserByUsername } = require("./db/user");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
  } catch (error) {
    next(error);
  }
});
