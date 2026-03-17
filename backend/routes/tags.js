const express = require("express");
const router = express.Router();

const {createTag, assignTag, removeTag, getItemsByTag, getItems, getItemsWithTags, getTags} = require("../controller/tags");

router.post("/tag", createTag);

router.get("/tag",getTags);

router.post("/tag/assign", assignTag);

router.delete("/tag/remove", removeTag);

router.get("/tag/items/:tag", getItemsByTag);

router.get("/items", getItems);

router.get("/items-with-tags",getItemsWithTags);
module.exports = router;