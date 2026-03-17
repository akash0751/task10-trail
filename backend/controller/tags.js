const db = require("../db");

const createTag = (req, res) => {

  const { name } = req.body;

  const query = "INSERT INTO tags(name) VALUES(?)";

  db.query(query, [name], (err,result) => {
    if (err) {
      return res.status(400).json({ message: "Tag already exists" });
    }
    res.json({
      message: "Tag created",
      tagId: result.insertId
    });
  });
};

const assignTag = (req, res) => {

const { itemId, tagId } = req.body;

const checkQuery =
"SELECT * FROM item_tags WHERE item_id=? AND tag_id=?";

db.query(checkQuery,[itemId,tagId],(err,result)=>{

if(result.length > 0){
return res.json({
message:"Tag already exists for this item"
});
}

const insertQuery =
"INSERT INTO item_tags(item_id,tag_id) VALUES(?,?)";

db.query(insertQuery,[itemId,tagId],(err)=>{

if(err){
return res.status(500).json(err);
}

res.json({
message:"Tag assigned successfully"
});

});

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

const getItems = (req, res) => {

  const query = "SELECT * FROM items";

  db.query(query, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

const getItemsWithTags = (req, res) => {

const query = `
SELECT 
items.id,
items.title,
GROUP_CONCAT(tags.name) AS tags
FROM items
LEFT JOIN item_tags ON items.id = item_tags.item_id
LEFT JOIN tags ON tags.id = item_tags.tag_id
GROUP BY items.id
`;

db.query(query,(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json(result);

});

};

const getTags = (req,res)=>{

const query = "SELECT * FROM tags";

db.query(query,(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json(result);

});

};

module.exports = {
  createTag,
  assignTag,
  removeTag,
  getItemsByTag,
  getItems,
  getItemsWithTags,
  getTags
};