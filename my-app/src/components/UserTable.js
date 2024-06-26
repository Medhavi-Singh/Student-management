// src/UserTable.js
import React from 'react';
import UserTableRow from './UserTableRow';

function UserTable({ data, onEdit, onDelete }) {
  console.log("🚀 ~ UserTable ~ data:", data)
  const headers = ["Sr.no.", "Name", "Username", "Email", "Website", "Phone No", "Actions"];
   
  return (
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
            <UserTableRow key={id} id={id} input={input} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
