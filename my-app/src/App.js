import React, {useState} from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser,deleteUser,updateUser } from "./app/usersSlice";

function App() {
  
  const data = useSelector((state)=> state.users.data);
  const dispatch = useDispatch();
  // const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json().then((dt) => setData(dt)))
  //     .catch((err) => console.error(err));
  // }, []);

  const handleSubmit = (values, { resetForm }) => {
    if (isEditing !== null) {
      dispatch(updateUser({index:isEditing, user:values}));
      // console.log("handlesubmit->if condition");
      // setData((prevData) =>
      //   prevData.map((input, id) => (id === isEditing ? values : input))
      // );
      setIsEditing(null);
    } else {
      dispatch(addUser(values));
    }
    resetForm();
  };

  const handleEdit = (id) => {
    setIsEditing(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    // console.log("handledelete");
    // setData((prevData) => prevData.filter((_, i) => i !== id));
  };

  return (
    <div className="main-div">
      <h1 className="p-4 m-8 text-center text-pretty text-black font-bold text-4xl">
        STUDENT MANAGEMENT
      </h1>
      <div className="sub">
        <UserForm onSubmit={handleSubmit} isEditing={isEditing} data={data} />
        {data.length > 0 && (
          <UserTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default App;
