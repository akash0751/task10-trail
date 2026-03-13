import { useState } from "react";
import API from "../api";

function ListItemsByTag(){

const [tag,setTag] = useState("")
const [items,setItems] = useState([])

const search = async () => {

const res = await API.get(`/tag/items/${tag}`)

setItems(res.data)

}

return(

<div className="card p-3 shadow-sm">

<h5>Search Items by Tag</h5>

<input
className="form-control mb-2"
placeholder="Tag name"
value={tag}
onChange={(e)=>setTag(e.target.value)}
/>

<button
className="btn btn-dark"
onClick={search}
>
Search
</button>

<ul className="list-group mt-3">

{items.map(item=>(
<li key={item.id} className="list-group-item">
{item.title}
</li>
))}

</ul>

</div>

)

}

export default ListItemsByTag