import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json().then((dt) => setData(dt)))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    if (isEditing !== null) {
      setData((prevData) =>
        prevData.map((input, id) => (id === isEditing ? values : input))
      );
      setIsEditing(null);
    } else {
      setData((prevData) => [...prevData, values]);
    }
    resetForm();
  };

  const handleEdit = (id) => {
    setIsEditing(id);
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((_, i) => i !== id));
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
