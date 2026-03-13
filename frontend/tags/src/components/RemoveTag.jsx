import { useState } from "react";
import API from "../api";

function RemoveTag(){

const [itemId,setItemId] = useState("")
const [tagId,setTagId] = useState("")
const [msg,setMsg] = useState("")

const removeTag = async () => {

await API.delete("/tag/remove",{
data:{itemId,tagId}
})

setMsg("Tag Removed")

}

return(

<div className="card p-3 shadow-sm">

<h5>Remove Tag</h5>

<input
className="form-control mb-2"
placeholder="Item ID"
value={itemId}
onChange={(e)=>setItemId(e.target.value)}
/>

<input
className="form-control mb-2"
placeholder="Tag ID"
value={tagId}
onChange={(e)=>setTagId(e.target.value)}
/>

<button
className="btn btn-danger"
onClick={removeTag}
>
Remove Tag
</button>

<p className="mt-2">{msg}</p>

</div>

)

}

export default RemoveTag