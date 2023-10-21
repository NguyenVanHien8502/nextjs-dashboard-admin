"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { mutate } from "swr";

interface Iprops {
  showModalCreateCategory: boolean;
  setShowModalCreateCategory: (value: boolean) => void;
}

function CreateModalCategory(props: Iprops) {
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const { showModalCreateCategory, setShowModalCreateCategory } = props;

  const [dataCategory, setDataCategory] = useState({
    name: "",
    slug: "",
    status: "",
    desc: "",
  });

  const handleSubmitForm = async () => {
    const { name, slug, status, desc } = dataCategory;
    if (!name || !slug || !status || !desc) {
      toast.error("Please complete all information");
      return;
    }

    const { data } = await axios.post(
      "http://localhost:5000/api/category/create-category",
      {
        name: name,
        slug: slug,
        status: status,
        desc: desc,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.status === true) {
      toast.success("Created category succeed!...");
      handleCloseModalCategory();
      mutate("http://localhost:5000/api/category");
    }
  };

  const handleCloseModalCategory = () => {
    setDataCategory({
      name: "",
      slug: "",
      status: "",
      desc: "",
    });
    setShowModalCreateCategory(false);
  };

  return (
    <>
      <Modal
        show={showModalCreateCategory}
        onHide={handleCloseModalCategory}
        backdrop="static"
        keyboard={false}
        size="lg"
        style={{ marginTop: "35px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên category"
                value={dataCategory.name}
                onChange={(e) =>
                  setDataCategory((prevData) => ({
                    ...prevData,
                    name: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập slug"
                value={dataCategory.slug}
                onChange={(e) =>
                  setDataCategory((prevData) => ({
                    ...prevData,
                    slug: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập status"
                value={dataCategory.status}
                onChange={(e) =>
                  setDataCategory((prevData) => ({
                    ...prevData,
                    status: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mô tả"
                value={dataCategory.desc}
                onChange={(e) =>
                  setDataCategory((prevData) => ({
                    ...prevData,
                    desc: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalCategory}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitForm()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModalCategory;