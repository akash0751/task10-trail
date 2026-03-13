import { useState } from "react";
import API from "../api";

function AssignTag(){

  const [itemId,setItemId] = useState("");
  const [tagId,setTagId] = useState("");
  const [msg,setMsg] = useState("");

  const assign = async () => {

    try{

      await API.post("/tag/assign",{itemId,tagId});

      setMsg("Tag Assigned");

    }catch{

      setMsg("Tag already assigned");

    }

  }

  return(

    <div className="card p-3 shadow-sm">

      <h5>Assign Tag</h5>

      <input
      className="form-control mb-2"
      placeholder="Item ID (use 1,2 for testing)"
      value={itemId}
      onChange={(e)=>setItemId(e.target.value)}
      />

      <input
      className="form-control mb-2"
      placeholder="Tag ID (use 3 if you created a tag for testing)"
      value={tagId}
      onChange={(e)=>setTagId(e.target.value)}
      />

      <button
      className="btn btn-success"
      onClick={assign}
      >
      Assign Tag
      </button>

      <p className="mt-2">{msg}</p>

    </div>

  )

}

export default AssignTag