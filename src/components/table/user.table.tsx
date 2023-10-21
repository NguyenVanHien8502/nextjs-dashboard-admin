"use client";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface Iprops {
  users: IUser[];
}

const UserTable = (props: Iprops) => {
  const { users } = props;
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure want to delete this user? ")) {
      await axios.delete(`http://localhost:5000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Deleted user succeed !...");
      mutate("http://localhost:5000/api/user");
    }
  };

  return (
    <>
      <div
        className="mb-3 mt-5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2>User Table</h2>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
              <td style={{ display: "flex", gap: "5px" }}>
                <Link
                  href={`/admin/user/${user._id}`}
                  className="btn btn-primary"
                >
                  View
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
