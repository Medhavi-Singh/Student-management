import React from "react";


function UserTableRow({ id, input, onEdit, onDelete }) {

  return (
    <tr className="hover:bg-gray-100">
      <td className="px-6 py-4 border-b border-gray-200">{id + 1}</td>
      <td className="px-6 py-4 border-b border-gray-200">{input.name}</td>
      <td className="px-6 py-4 border-b border-gray-200">{input.username}</td>
      <td className="px-6 py-4 border-b border-gray-200">{input.email}</td>
      <td className="px-6 py-4 border-b border-gray-200">{input.website}</td>
      <td className="px-6 py-4 border-b border-gray-200">{input.phone}</td>
      <td className="border px-4 py-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded mr-2 mt-2"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserTableRow;
