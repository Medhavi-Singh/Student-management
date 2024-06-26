// src/UserForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const manage = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Name is required"),
  username: Yup.string().min(2, "Too Short!").required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  website: Yup.string().url().required("Website is required"),
  phone: Yup.string().matches(/^\d{10}$/, "Must be exactly 10 digits.").required("Contact no is required"),
});

function UserForm({ onSubmit, isEditing }) {
  const data = useSelector((state) => state.users.data);

  return (
    <div className="max-w-96 mx-auto mt-10 bg-white p-8 rounded shadow-md">
      <Formik
        initialValues={
          isEditing !== null
            ? data[isEditing]
            : { name: "", username: "", email: "", website: "", phone: "" }
        }
        enableReinitialize
        validationSchema={manage}
        onSubmit={onSubmit}
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
                    "focus:ring-blue-500": !errors.name && !touched.name,
                  }
                )}
                placeholder="Enter Name"
                type="name"
                name="name"
              />
              {touched.name && errors.name && (
                <div className="text-red-500 text-xs">{errors.name}</div>
              )}
            </div>
            <div>
              <div className="w-24 inline-block">
                <label className="mr-4 w-8">Username</label>
              </div>
              <Field
                className={classNames(
                  "border rounded-lg p-2 focus:outline-none focus:ring-2",
                  {
                    "border-red-500": errors.username && touched.username,
                    "focus:ring-blue-500": !errors.username && !touched.username,
                  }
                )}
                placeholder="Enter Username"
                type="username"
                name="username"
              />
              {touched.username && errors.username && (
                <div className="text-red-500 text-xs">{errors.username}</div>
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
                    "focus:ring-blue-500": !errors.website && !touched.website,
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
                    "focus:ring-blue-500": !errors.phone && !touched.phone,
                  }
                )}
                placeholder="Enter Contact no"
                type="phone"
                name="phone"
              />
              {touched.phone && errors.phone && (
                <div className="text-red-500 text-xs">{errors.phone}</div>
              )}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              type="submit"
            >
              {isEditing !== null ? "Update" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserForm;
