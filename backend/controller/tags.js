const db = require("../db");

const createTag = (req, res) => {

  const { name } = req.body;

  const query = "INSERT INTO tags(name) VALUES(?)";

  db.query(query, [name], (err) => {
    if (err) {
      return res.status(400).json({ message: "Tag already exists" });
    }
    res.json({
      message: "Tag created"
    });
  });
};

const assignTag = (req, res) => {

  const { itemId, tagId } = req.body;

  const query = "INSERT INTO item_tags(item_id, tag_id) VALUES(?,?)";

  db.query(query, [itemId, tagId], (err) => {

    if (err) {
      return res.status(400).json({ message: "Tag already assigned" });
    }
    res.json({ message: "Tag assigned to item" });
  });

};

const removeTag = (req, res) => {

  const { itemId, tagId } = req.body;

  const query = "DELETE FROM item_tags WHERE item_id=? AND tag_id=?";

  db.query(query, [itemId, tagId], (err) => {

    if (err) {
      return res.status(500).json(err);
    }
    res.json({ message: "Tag removed" });
  });

};

const getItemsByTag = (req, res) => {

  const { tag } = req.params;

  const query = `
    SELECT items.id, items.title
    FROM items
    JOIN item_tags ON items.id = item_tags.item_id
    JOIN tags ON tags.id = item_tags.tag_id
    WHERE tags.name = ?
  `;

  db.query(query, [tag], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};


module.exports = {createTag, assignTag, removeTag, getItemsByTag};