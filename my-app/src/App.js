import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import "./App.css";

const manage = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .required("Firstname is required"),
  lastName: Yup.string().min(2, "Too Short!").required("Lastname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  rollNo: Yup.number()
    .typeError("Must be a number")
    .required("Roll no is required")
    .positive("Must be a positive number"),
  phoneNo: Yup.string()
    .matches(/^\d{10}$/, "Must be exactly 10 digits.")
    .required("contact no is required"),
});

function App() {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    rollNo: "",
    phoneNo: "",
  });
  const handleSubmit = (values, { resetForm }) => {
    if (isEditing) {
      const updated = [...data];
      updated[editIndex] = values;
      setData(updated);
      setIsEditing(false);
      setEditIndex(null);
      setInitialValues({
        firstName: "",
        lastName: "",
        email: "",
        rollNo: "",
        phoneNo: "",
      });
    } else {
      setData((prevData) => [...prevData, values]);
    }
    resetForm();
    //   if(isEditing!==null){
    //     setData((prevData)=>prevData.map((input,id)=>
    //       (id===isEditing?values:input)
    //     ));
    //     setIsEditing(null);
    //   }
    //   else{
    //     setData((prevData)=>[...prevData,values]);
    //   }
    //   resetForm();
  };
  const handleEdit = (id) => {
    console.log(id);
    setIsEditing(true);
    setEditIndex(id);
    setInitialValues(data[id]);
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((_, i) => i !== id));
  };

  const headers = [
    "Sr.no.",
    "Firstname",
    "Lastname",
    "Email",
    "Roll No",
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
              initialValues
              // isEditing !== null
              //   ? data[isEditing]
              //   : {
              //       firstName: "",
              //       lastName: "",
              //       email: "",
              //       rollNo: "",
              //       phoneNo: "",
              //     }
            }
            enableReinitialize
            validationSchema={
              manage
              // values=>{
              //   const errors ={};
              //   if(!values.firstName){
              //     errors.firstName='Required';
              //   }
              //   if(!values.lastName){
              //     errors.lastName='Required';
              //   }
              //   if(!values.email){
              //     errors.email='Required';
              //   } else if(
              //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              //   ){
              //     errors.email='Invalid email address';
              //   }
              //   if(!values.rollNo){
              //     errors.rollNo='Required';
              //   }
              //   if(!values.phoneNo){
              //     errors.phoneNo='Required';
              //   }
              //   return errors;
              // }
            }
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex-col space-y-4">
                <div>
                  <div className="w-24 inline-block">
                    <label className="mr-4 w-8">Firstname</label>
                  </div>
                  <Field
                    className={classNames(
                      "border rounded-lg p-2 focus:outline-none focus:ring-2",
                      {
                        "border-red-500": errors.firstName && touched.firstName,
                        "focus:ring-blue-500":
                          !errors.firstName && !touched.firstName,
                      }
                    )}
                    placeholder="Enter text"
                    type="firstName"
                    name="firstName"
                  />
                  {touched.firstName && errors.firstName && (
                    <div className="text-red-500 text-xs ">
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div>
                  <div className="w-24 inline-block">
                    <label className="mr-4 w-8">Lastname</label>
                  </div>
                  <Field
                    className={`border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      touched.lastName && errors.lastName
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Enter text"
                    type="lastName"
                    name="lastName"
                  />
                  {touched.lastName && errors.lastName && (
                    <div className="text-red-500 text-xs">
                      {errors.lastName}
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
                    placeholder="Enter text"
                    type="email"
                    name="email"
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-xs">{errors.email}</div>
                  )}
                </div>
                <div>
                  <div className="w-24 inline-block">
                    <label className="mr-4">Roll No</label>
                  </div>
                  <Field
                    className={classNames(
                      "border rounded-lg p-2 focus:outline-none focus:ring-2",
                      {
                        "border-red-500": errors.rollNo && touched.rollNo,
                        "focus:ring-blue-500":
                          !errors.rollNo && !touched.rollNo,
                      }
                    )}
                    placeholder="Enter text"
                    type="rollNo"
                    name="rollNo"
                  />
                  {touched.rollNo && errors.rollNo && (
                    <div className="text-red-500 text-xs">{errors.rollNo}</div>
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
                        "border-red-500": errors.phoneNo && touched.phoneNo,
                        "focus:ring-blue-500":
                          !errors.phoneNo && !touched.phoneNo,
                      }
                    )}
                    placeholder="Enter text"
                    type="phoneNo"
                    name="phoneNo"
                  />
                  {touched.phoneNo && errors.phoneNo && (
                    <div className="text-red-500 text-xs">{errors.phoneNo}</div>
                  )}
                  {/* <ErrorMessage className="text-red-500" name="phoneNo" component="div" /> */}
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  type="submit"
                >
                  {isEditing ? "Update" : "Submit"}
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
                      {input.firstName}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {input.lastName}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {input.email}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {input.rollNo}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {input.phoneNo}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleEdit(id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
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
