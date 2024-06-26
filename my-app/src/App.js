// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from './app/usersSlice';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users.data);
  console.log("🚀 ~ App ~ data:", data)
  const [isEditing, setIsEditing] = React.useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = (values, { resetForm }) => {
    if (isEditing !== null) {
      dispatch(updateUser({ id: data[isEditing]._id, user: values }));
      setIsEditing(null);
    } else {
      dispatch(createUser(values));
    }
    resetForm();
  };

  const handleEdit = (id) => {
    setIsEditing(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
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
