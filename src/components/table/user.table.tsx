"use client";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
import UpdateModalUser from "../updateModal/updateUser.modal";
import { useState } from "react";

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

  const [showModalUpdateUser, setShowModalUpdateUser] =
    useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure want to delete this user? ")) {
      const { data } = await axios.delete(
        `${process.env.BASE_URL}/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.status === false) {
        toast.warning(data?.msg);
        return;
      }
      if (data?.status === true) {
        toast.success(data?.msg);
        mutate(`${process.env.BASE_URL}/user`);
      }
    }
  };

  return (
    <>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2>User Table</h2>
      </div>
      <div
        className="container"
        style={{ maxHeight: "520px", maxWidth: "1000px", overflow: "auto" }}
      >
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
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
                  <td style={{ display: "flex" }}>
                    <Link
                      href={`/admin/user/${user._id}`}
                      className="btn btn-primary"
                    >
                      View
                    </Link>
                    <Button
                      variant="warning"
                      className="mx-3"
                      onClick={() => {
                        setUser(user);
                        setShowModalUpdateUser(true);
                      }}
                    >
                      Edit
                    </Button>
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
          </table>
        </div>
      </div>
      <UpdateModalUser
        showModalUpdateUser={showModalUpdateUser}
        setShowModalUpdateUser={setShowModalUpdateUser}
        user={user}
        setUser={setUser}
      />
    </>
  );
};

export default UserTable;
