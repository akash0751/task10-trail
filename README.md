**How the System Works**

1. A tag can be created using the API.

2. Items can then be associated with those tags.

3. The system stores the relationship between items and tags in the item_tags table.

4. Users can search for items using a specific tag.

This structure makes it possible for one item to have multiple tags and for one tag to belong to many items.


**API Endpoints**

Create a tag

POST
/api/tag

Example body

{
"name": "javascript"
}


Assign a tag to an item

POST
/api/tag/assign

{
"itemId": 1,
"tagId": 1
}

Remove a tag from an item

DELETE
/api/tag/remove

{
"itemId": 1,
"tagId": 1
}

Get items by tag

GET
/api/tag/items/:tag

Example

/api/tag/items/javascript
