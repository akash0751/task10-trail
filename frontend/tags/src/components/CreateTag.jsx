import { useState } from "react";
import API from "../api";

function CreateTag() {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const createTag = async () => {
    try {
      const res = await API.post("/tag", { name });
      setMessage("Tag Created");
      setName("");
    } catch (err) {
      setMessage("Tag already exists");
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

      <p className="mt-2 text-success">{message}</p>
    </div>
  );
}

export default CreateTag;