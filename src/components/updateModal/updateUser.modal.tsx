"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getStogare } from "@/app/helper/stogare";

interface Iprops {
  showModalUpdateUser: boolean;
  setShowModalUpdateUser: (value: boolean) => void;
  user: IUser | null;
  setUser: (value: IUser | null) => void;
  setRecords: (value: IUser[]) => void;
  currentPage: number;
  itemsPerPage: number;
  setAllRows: (value: number | any) => void;
}

function UpdateModalUser(props: Iprops) {
  let token: string | null = null;
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const {
    showModalUpdateUser,
    setShowModalUpdateUser,
    user,
    setUser,
    setRecords,
    currentPage,
    itemsPerPage,
    setAllRows,
  } = props;
  const [dataUser, setDataUser] = useState({
    id: "",
    username: "",
    phone: "",
    role: "",
    status: "",
  });

  //set data user when modal update open
  useEffect(() => {
    if (user && user._id) {
      setDataUser({
        id: user._id,
        username: user.username,
        phone: user.phone,
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  const handleSubmitForm = async () => {
    try {
      const { username, phone, role, status } = dataUser;
      const { data } = await axios.put(
        `${process.env.BASE_URL}/user/${dataUser.id}`,
        {
          username: username,
          phone: phone,
          role: role,
          status: status,
        },
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
        handleCloseModalUser();
        const res = await axios.get(
          `${process.env.BASE_URL}/user?page=${currentPage}&limit=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecords(res.data?.data);
        const allRows = res.data?.totalUsers;
        setAllRows(allRows);
      }
    } catch (error: any) {
      error?.response?.data?.message.map((msg: string) => {
        toast.error(msg);
      });
      return;
    }
  };

  const handleCloseModalUser = () => {
    setDataUser({
      id: "",
      username: "",
      phone: "",
      role: "",
      status: "",
    });
    setUser(null);
    setShowModalUpdateUser(false);
  };

  return (
    <>
      <Modal
        show={showModalUpdateUser}
        onHide={handleCloseModalUser}
        backdrop="static"
        keyboard={false}
        size="lg"
        style={{ marginTop: "35px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập username"
                value={dataUser.username}
                onChange={(e) =>
                  setDataUser((prevData) => ({
                    ...prevData,
                    username: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập phone number"
                value={dataUser.phone}
                onChange={(e) =>
                  setDataUser((prevData) => ({
                    ...prevData,
                    phone: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role*</Form.Label>
              <Form.Select
                id="role"
                placeholder="Chọn role"
                value={dataUser.role}
                onChange={(e) =>
                  setDataUser((prevData) => ({
                    ...prevData,
                    role: e.target.value,
                  }))
                }
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                id="status"
                placeholder="Chọn status"
                value={dataUser.status}
                onChange={(e) =>
                  setDataUser((prevData) => ({
                    ...prevData,
                    status: e.target.value,
                  }))
                }
              >
                <option value="">Select Status</option>
                <option value="tretrow">Tre Trow</option>
                <option value="alone">Alone</option>
                <option value="married">Married</option>
                <option value="adult">Adult</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalUser}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitForm()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModalUser;
