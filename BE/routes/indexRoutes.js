const express = require("express");
const router = express.Router();
const io = require("../socket");

router.get("/", () => {
  console.log("get method called");
  return { msg: "get method called" };
});

router.post("/", (req, res, next) => {
  console.log("post method called");
  console.log("message: ", req.body.message);
  io.getIO().emit("chat", { action: "chatting", message: req.body.message });
  return { msg: "post method called" };
});

module.exports = router;
