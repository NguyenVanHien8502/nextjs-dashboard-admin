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

  //fetch all category
  const [categories, setCategories] = useState<ICategory | any>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${process.env.BASE_URL}/category`);
        setCategories(data);
      } catch (error) {
        throw new Error("error");
      }
    };
    fetchCategories();
  }, []);

  const [dataMovie, setDataMovie] = useState({
    id: "",
    name: "",
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
        category: movie.category,
        link: movie.link,
        status: movie.status,
        desc: movie.desc,
      });
    }
  }, [movie]);

  //check validate link url
  const isValidUrl = (urlString: string) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  const handleSubmitForm = async () => {
    const { name, category, link, status, desc } = dataMovie;
    if (!name || !category || !link || !status || !desc) {
      toast.error("Please complete all information");
      return;
    }

    if (!isValidUrl(link)) {
      toast.error("Please fill in the correct url link format");
      return;
    }

    const { data } = await axios.put(
      `${process.env.BASE_URL}/movie/${dataMovie.id}`,
      {
        name: name,
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
      mutate(`${process.env.BASE_URL}/movie`);
    }
  };

  const handleCloseModalMovie = () => {
    setDataMovie({
      id: "",
      name: "",
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
              <Form.Label>Category</Form.Label>
              <Form.Select
                id="category"
                placeholder="Chọn category"
                value={dataMovie.category}
                onChange={(e) =>
                  setDataMovie((prevData) => ({
                    ...prevData,
                    category: e.target.value,
                  }))
                }
              >
                <option value="">Select Blog Category</option>
                {categories.map((category: ICategory) => (
                  <option key={category._id}>{category.name}</option>
                ))}
              </Form.Select>
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
              <Form.Select
                id="movie"
                placeholder="Chọn status"
                value={dataMovie.status}
                onChange={(e) =>
                  setDataMovie((prev: any) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="done">Done</option>
              </Form.Select>
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
