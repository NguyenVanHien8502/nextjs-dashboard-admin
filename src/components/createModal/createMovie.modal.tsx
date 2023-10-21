"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { mutate } from "swr";

interface Iprops {
  showModalCreateMovie: boolean;
  setShowModalCreateMovie: (value: boolean) => void;
}

function CreateModalMovie(props: Iprops) {
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const { showModalCreateMovie, setShowModalCreateMovie } = props;

  const [dataMovie, setDataMovie] = useState({
    name: "",
    slug: "",
    category: "",
    link: "",
    status: "",
    desc: "",
    author: "",
  });

  const handleSubmitForm = async () => {
    const { name, slug, category, link, status, desc, author } = dataMovie;
    if (!name || !slug || !category || !link || !status || !desc || !author) {
      toast.error("Please complete all information");
      return;
    }

    const { data } = await axios.post(
      "http://localhost:5000/api/movie/create-movie",
      {
        name: name,
        slug: slug,
        category: category,
        link: link,
        status: status,
        desc: desc,
        author: author,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.status === true) {
      toast.success("Created movie succeed!...");
      handleCloseModalMovie();
      mutate("http://localhost:5000/api/movie");
    }
  };

  const handleCloseModalMovie = () => {
    setDataMovie({
      name: "",
      slug: "",
      category: "",
      link: "",
      status: "",
      desc: "",
      author: "",
    });
    setShowModalCreateMovie(false);
  };

  return (
    <>
      <Modal
        show={showModalCreateMovie}
        onHide={handleCloseModalMovie}
        backdrop="static"
        keyboard={false}
        size="lg"
        style={{ marginTop: "35px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên movie"
                value={dataMovie.name}
                onChange={(e) =>
                  setDataMovie((prevData) => ({
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
                value={dataMovie.slug}
                onChange={(e) =>
                  setDataMovie((prevData) => ({
                    ...prevData,
                    slug: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Chọn category"
                value={dataMovie.category}
                onChange={(e) =>
                  setDataMovie((prevData) => ({
                    ...prevData,
                    category: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập link"
                value={dataMovie.link}
                onChange={(e) =>
                  setDataMovie((prevData) => ({
                    ...prevData,
                    link: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập status"
                value={dataMovie.status}
                onChange={(e) =>
                  setDataMovie((prevData) => ({
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
                value={dataMovie.desc}
                onChange={(e) =>
                  setDataMovie((prevData) => ({
                    ...prevData,
                    desc: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Chọn Author"
                value={dataMovie.author}
                onChange={(e) =>
                  setDataMovie((prevData) => ({
                    ...prevData,
                    author: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalMovie}>
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

export default CreateModalMovie;