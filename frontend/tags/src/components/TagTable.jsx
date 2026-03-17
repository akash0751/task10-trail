import { useEffect, useState } from "react";
import API from "../api";

function TagTable(){

const [items,setItems] = useState([]);
const [allItems,setAllItems] = useState([]);
const [tags,setTags] = useState([]);

const [tagInputs,setTagInputs] = useState({});
const [selectedTags,setSelectedTags] = useState({});

const [search,setSearch] = useState("");




const fetchTags = async()=>{

try{
const res = await API.get("/tag");
setTags(res.data);
}catch(err){
console.log(err);
}

};




const fetchItems = async()=>{

try{
const res = await API.get("/items-with-tags");

setItems(res.data);
setAllItems(res.data);

}catch(err){
console.log(err);
}

};


useEffect(()=>{
fetchTags();
fetchItems();
},[]);



useEffect(()=>{

if(!search){
setItems(allItems);
return;
}

const filtered = allItems.filter(item =>

item.title.toLowerCase().includes(search.toLowerCase()) ||

(item.tags && item.tags.toLowerCase().includes(search.toLowerCase()))

);

setItems(filtered);

},[search,allItems]);




const handleTagInput = (itemId,value)=>{

setTagInputs({
...tagInputs,
[itemId]:value
});

};




const handleSelectTag = (itemId,value)=>{

setSelectedTags({
...selectedTags,
[itemId]:value
});

};




const createAndAssignTag = async(itemId)=>{

const tagName = tagInputs[itemId];

if(!tagName){
alert("Enter tag name");
return;
}

const item = items.find(i => i.id === itemId);

if(item.tags && item.tags.split(",").includes(tagName)){
alert("Tag already exists for this item");
return;
}

try{

const res = await API.post("/tag",{name:tagName});
const tagId = res.data.tagId;

await API.post("/tag/assign",{
itemId:itemId,
tagId:tagId
});

fetchTags();
fetchItems();

setTagInputs({
...tagInputs,
[itemId]:""
});

}catch(err){
console.log(err);
}

};




const assignExistingTag = async(itemId)=>{

const tagId = selectedTags[itemId];

if(!tagId){
alert("Select a tag");
return;
}

const item = items.find(i => i.id === itemId);
const tag = tags.find(t => t.id == tagId);

if(item.tags && item.tags.split(",").includes(tag.name)){
alert("Tag already exists for this item");
return;
}

try{

await API.post("/tag/assign",{
itemId:itemId,
tagId:tagId
});

fetchItems();

}catch(err){
console.log(err);
}

};




const removeTag = async(itemId,tagName)=>{

const tag = tags.find(t=>t.name === tagName);

if(!tag) return;

try{

await API.delete("/tag/remove",{
data:{
itemId:itemId,
tagId:tag.id
}
});

fetchItems();

}catch(err){
console.log(err);
}

};


return(

<div className="container mt-5">

<h3 className="text-center mb-4">
Item Tag Management
</h3>




<div className="card mb-4 shadow-sm">

<div className="card-body">

<input
className="form-control"
placeholder="Search items by title or tag..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

</div>




<div className="card shadow-sm">

<div className="card-header bg-white">
<h5 className="mb-0">Items List</h5>
</div>

<div className="card-body">

<table className="table table-hover align-middle">

<thead>
<tr>
<th>ID</th>
<th>Title</th>
<th>Tags</th>
<th>Create Tag</th>
<th>Assign Existing</th>
</tr>
</thead>

<tbody>

{items.map(item=>(

<tr key={item.id}>

<td>{item.id}</td>

<td>{item.title}</td>




<td>

{item.tags ?

item.tags.split(",").map(tag=>(

<span
key={tag}
className="badge bg-dark me-2"
style={{cursor:"pointer"}}
onClick={()=>removeTag(item.id,tag)}
>
{tag} ✕
</span>

))

:

<span className="text-muted">
No Tags
</span>

}

</td>




<td>

<div className="d-flex">

<input
className="form-control me-2"
placeholder="New tag"
value={tagInputs[item.id] || ""}
onChange={(e)=>handleTagInput(item.id,e.target.value)}
/>

<button
className="btn btn-primary"
onClick={()=>createAndAssignTag(item.id)}
>
Create
</button>

</div>

</td>




<td>

<div className="d-flex">

<select
className="form-select me-2"
onChange={(e)=>handleSelectTag(item.id,e.target.value)}
>

<option value="">Select Tag</option>

{tags.map(tag=>(

<option key={tag.id} value={tag.id}>
{tag.name}
</option>

))}

</select>

<button
className="btn btn-success"
onClick={()=>assignExistingTag(item.id)}
>
Assign
</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

);

}

export default TagTable;