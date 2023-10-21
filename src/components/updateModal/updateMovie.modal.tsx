"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { mutate } from "swr";

interface Iprops {
  showModalUpdateMovie: boolean;
  setShowModalUpdateMovie: (value: boolean) => void;
  movie: IMovie | null;
  setMovie: (value: IMovie | null) => void;
}

function UpdateModalMovie(props: Iprops) {
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }
  const { showModalUpdateMovie, setShowModalUpdateMovie, movie, setMovie } =
    props;

  const [dataMovie, setDataMovie] = useState({
    id: "",
    name: "",
    slug: "",
    category: "",
    link: "",
    status: "",
    desc: "",
  });

  useEffect(() => {
    if (movie && movie._id) {
      setDataMovie({
        id: movie._id,
        name: movie.name,
        slug: movie.slug,
        category: movie.category,
        link: movie.link,
        status: movie.status,
        desc: movie.desc,
      });
    }
  }, [movie]);

  const handleSubmitForm = async () => {
    const { name, slug, category, link, status, desc } = dataMovie;
    if (!name || !slug || !category || !link || !status || !desc) {
      toast.error("Please complete all information");
      return;
    }
    const { data } = await axios.put(
      `http://localhost:5000/api/movie/${dataMovie.id}`,
      {
        name: name,
        slug: slug,
        category: category,
        link: link,
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
        toast.success("Updated movie succeed !...");
        handleCloseModalMovie();
        mutate("http://localhost:5000/api/movie");
    }
  };

  const handleCloseModalMovie = () => {
    setDataMovie({
      id: "",
      name: "",
      slug: "",
      category: "",
      link: "",
      status: "",
      desc: "",
    });
    setMovie(null);
    setShowModalUpdateMovie(false);
  };

  return (
    <>
      <Modal
        show={showModalUpdateMovie}
        onHide={handleCloseModalMovie}
        backdrop="static"
        keyboard={false}
        size="lg"
        style={{ marginTop: "35px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a movie</Modal.Title>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalMovie}>
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

export default UpdateModalMovie;