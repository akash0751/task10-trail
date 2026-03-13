import CreateTag from "./components/CreateTag";
import AssignTag from "./components/AssignTag";
import RemoveTag from "./components/RemoveTag";
import ListItemsByTag from "./components/ListItemsByTag";

function App(){

return(

<div className="container mt-4">

<h2 className="text-center mb-4">
Tag Management System
</h2>

<div className="row g-3">

<div className="col-md-6">
<CreateTag/>
</div>

<div className="col-md-6">
<AssignTag/>
</div>

<div className="col-md-6">
<RemoveTag/>
</div>

<div className="col-md-6">
<ListItemsByTag/>
</div>

</div>

</div>

)

}

export default App