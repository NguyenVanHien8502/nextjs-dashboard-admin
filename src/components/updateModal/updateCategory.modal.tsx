"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { mutate } from "swr";

interface Iprops {
  showModalUpdateCategory: boolean;
  setShowModalUpdateCategory: (value: boolean) => void;
  category: ICategory | null;
  setCategory: (value: ICategory | null) => void;
}

function UpdateModalCategory(props: Iprops) {
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }
  const {
    showModalUpdateCategory,
    setShowModalUpdateCategory,
    category,
    setCategory,
  } = props;

  const [dataCategory, setDataCategory] = useState({
    id: "",
    name: "",
    slug: "",
    status: "",
    desc: "",
  });

  useEffect(() => {
    if (category && category._id) {
      setDataCategory({
        id: category._id,
        name: category.name,
        slug: category.slug,
        status: category.status,
        desc: category.desc,
      });
    }
  }, [category]);

  const handleSubmitForm = async () => {
    const { name, slug, status, desc } = dataCategory;
    if (!name || !slug || !status || !desc) {
      toast.error("Please complete all information");
      return;
    }
    const { data } = await axios.put(
      `${process.env.BASE_URL}/category/${dataCategory.id}`,
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
      toast.success("Updated category succeed !...");
      handleCloseModalCategory();
      mutate(`${process.env.BASE_URL}/category`);
    }
  };

  const handleCloseModalCategory = () => {
    setDataCategory({
      id: "",
      name: "",
      slug: "",
      status: "",
      desc: "",
    });
    setCategory(null);
    setShowModalUpdateCategory(false);
  };

  return (
    <>
      <Modal
        show={showModalUpdateCategory}
        onHide={handleCloseModalCategory}
        backdrop="static"
        keyboard={false}
        size="lg"
        style={{ marginTop: "35px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên movie"
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
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModalCategory;
