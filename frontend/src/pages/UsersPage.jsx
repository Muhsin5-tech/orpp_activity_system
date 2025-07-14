import { useState, useEffect } from "react";
import { getAllUsers, deleteUserById, updateUserById } from "../userApi";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({});
  const [userToDelete, setUserToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers(token);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowConfirm(true);
  };

  const handleConfirmedDelete = async () => {
    try {
      await deleteUserById(userToDelete.id, token);
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      setShowConfirm(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditData({
      full_name: user.full_name,
      role: user.role,
      department: user.department,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      await updateUserById(id, editData, token);
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="p-8 bg-[#f4f9ff] min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Manage Users</h1>
      <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#abc9e8] text-[#002147]">
              <th className="py-3 px-4 border">#</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Role</th>
              <th className="py-3 px-4 border">Department</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-blue-50">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      name="full_name"
                      value={editData.full_name}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    user.full_name
                  )}
                </td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      name="role"
                      value={editData.role}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      name="department"
                      value={editData.department}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    user.department
                  )}
                </td>
                <td className="py-2 px-4 border space-x-2">
                  {editingUserId === user.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(user.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUserId(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-[#002147] text-white px-3 py-1 rounded text-sm hover:bg-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(user)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirm && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4 text-red-700">
              Are you sure you want to delete{" "}
              <span className="font-bold">{userToDelete.full_name}</span>?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmedDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
