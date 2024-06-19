import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import "./App.css";

const manage = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .required("Firstname is required"),
  username: Yup.string().min(2, "Too Short!").required("Lastname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  website: Yup.string().url().required("Website is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Must be exactly 10 digits.")
    .required("contact no is required"),
});

function App() {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>response.json().then(dt=>setData(dt)))
    
    .catch(err=>console.error(err));
  },[]);


  const handleSubmit = (values, { resetForm }) => {
      if(isEditing!==null){
        setData((prevData)=>prevData.map((input,id)=>
          (id===isEditing?values:input)
        ));
        setIsEditing(null);
      }
      else{
        setData((prevData)=>[...prevData,values]);
      }
      resetForm();
  };

  const handleEdit = (id) => {
    console.log(id);
    setIsEditing(id);
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((_, i) => i !== id));
  };

  const headers = [
    "Sr.no.",
    "Name",
    "Username",
    "Email",
    "Website",
    "Phone No",
    "Actions",
  ];

  return (
    <div className="main-div">
      <h1 className="p-4 m-8 text-center text-pretty text-black font-bold text-4xl ">
        STUDENT MANAGEMENT
      </h1>
      <div className="sub">
        <div className="max-w-96 mx-auto mt-10 bg-white p-8 rounded shadow-md">
          <Formik
            initialValues={
              isEditing !== null
                ? data[isEditing]
                : {
                    name: "",
                    username: "",
                    email: "",
                    website: "",
                    phone: "",
                  }
            }
            enableReinitialize
            validationSchema={
              manage
            }
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex-col space-y-4">
                <div>
                  <div className="w-24 inline-block">
                    <label className="mr-4 w-8">Name</label>
                  </div>
                  <Field
                    className={classNames(
                      "border rounded-lg p-2 focus:outline-none focus:ring-2",
                      {
                        "border-red-500": errors.name && touched.name,
                        "focus:ring-blue-500":
                          !errors.name && !touched.name,
                      }
                    )}
                    placeholder="Enter Name"
                    type="name"
                    name="name"
                  />
                  {touched.name && errors.name && (
                    <div className="text-red-500 text-xs ">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div>
                  <div className="w-24 inline-block">
                    <label className="mr-4 w-8">Username</label>
                  </div>
                  <Field
                    className={`border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      touched.username && errors.username
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Enter Username"
                    type="username"
                    name="username"
                  />
                  {touched.username && errors.username && (
                    <div className="text-red-500 text-xs">
                      {errors.username}
                    </div>
                  )}
                </div>
                <div>
                  <div className="w-24 inline-block">
                    <label className="mr-4">Email</label>
                  </div>
                  <Field
                    className={classNames(
                      "border rounded-lg p-2 focus:outline-none focus:ring-2",
                      {
                        "border-red-500": errors.email && touched.email,
                        "focus:ring-blue-500": !errors.email && !touched.email,
                      }
                    )}
                    placeholder="Enter Email"
                    type="email"
                    name="email"
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-xs">{errors.email}</div>
                  )}
                </div>
                <div>
                  <div className="w-24 inline-block">
                    <label className="mr-4">Website</label>
                  </div>
                  <Field
                    className={classNames(
                      "border rounded-lg p-2 focus:outline-none focus:ring-2",
                      {
                        "border-red-500": errors.website && touched.website,
                        "focus:ring-blue-500":
                          !errors.website && !touched.website,
                      }
                    )}
                    placeholder="Enter Website"
                    type="website"
                    name="website"
                  />
                  {touched.website && errors.website && (
                    <div className="text-red-500 text-xs">{errors.website}</div>
                  )}
                </div>
                <div>
                  <div className="w-24 inline-block">
                    <label className="mr-4">Contact no</label>
                  </div>
                  <Field
                    className={classNames(
                      "border rounded-lg p-2 focus:outline-none focus:ring-2",
                      {
                        "border-red-500": errors.phone && touched.phone,
                        "focus:ring-blue-500":
                          !errors.phone && !touched.phone,
                      }
                    )}
                    placeholder="Enter Contactno"
                    type="phone"
                    name="phone"
                  />
                  {touched.phone && errors.phone && (
                    <div className="text-red-500 text-xs">{errors.phone}</div>
                  )}
                  {/* <ErrorMessage className="text-red-500" name="phone" component="div" /> */}
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  type="submit"
                >
                  {isEditing!==null ? "Update" : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        {data.length > 0 && (
          <div>
            <table className="my-10 bg-white border border-gray-200 mx-auto border-collapse">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <td
                      key={index}
                      className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 font-semibold uppercase tracking-wider"
                    >
                      {header}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((input, id) => (
                  <tr className="hover:bg-gray-100" key={id}>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {id + 1}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {input.name}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {input.username}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {input.email}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {input.website}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {input.phone}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 "
                        onClick={() => handleEdit(id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded mr-2 mt-2"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
