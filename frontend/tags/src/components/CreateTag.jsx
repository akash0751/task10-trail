import { useState } from "react";
import API from "../api";

function CreateTag() {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [tagId, setTagId] = useState(null);

  const createTag = async () => {
    try {

      const res = await API.post("/tag", { name });

      setMessage("Tag Created Successfully");
      setTagId(res.data.tagId);   // get tagId from response
      setName("");

    } catch (err) {

      setMessage("Tag already exists");
      setTagId(null);

    }
  };

  return (
    <div className="card p-3 shadow-sm">

      <h5>Create Tag</h5>

      <input
        className="form-control mb-2"
        placeholder="Tag name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <button className="btn btn-primary" onClick={createTag}>
        Create Tag
      </button>

      {message && (
        <p className="mt-2 text-success">{message}</p>
      )}

      {tagId && (
        <p className="text-primary">
          Generated Tag ID: <strong>{tagId}</strong>
        </p>
      )}

    </div>
  );
}

export default CreateTag;