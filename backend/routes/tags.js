const express = require("express");
const router = express.Router();

const {createTag, assignTag, removeTag, getItemsByTag} = require("../controller/tags");

router.post("/tag", createTag);

router.post("/tag/assign", assignTag);

router.delete("/tag/remove", removeTag);

router.get("/tag/items/:tag", getItemsByTag);

module.exports = router;