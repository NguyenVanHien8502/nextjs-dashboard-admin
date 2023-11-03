"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getStogare } from "@/app/helper/stogare";

interface Iprops {
  showModalUpdateMovie: boolean;
  setShowModalUpdateMovie: (value: boolean) => void;
  movie: IMovie | null;
  setMovie: (value: IMovie | null) => void;
  setRecords: (value: IMovie[]) => void;
  currentPage: number;
  itemsPerPage: number;
  setAllRows: (value: number | any) => void;
}

function UpdateModalMovie(props: Iprops) {
  let token: string | null = null;
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const {
    showModalUpdateMovie,
    setShowModalUpdateMovie,
    movie,
    setMovie,
    setRecords,
    currentPage,
    itemsPerPage,
    setAllRows,
  } = props;

  //fetch all category
  const [categories, setCategories] = useState<ICategory | any>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${process.env.BASE_URL}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(data?.data);
      } catch (error) {
        throw new Error("error");
      }
    };
    fetchCategories();
  }, [token]);

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
    try {
      const { name, slug, category, link, status, desc } = dataMovie;
      const { data } = await axios.put(
        `${process.env.BASE_URL}/movie/${dataMovie.id}`,
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

      if (data?.status === false) {
        toast.error(data?.msg);
        return;
      }

      if (data?.status === true) {
        toast.success(data?.msg);
        handleCloseModalMovie();
        const response = await axios.get(
          `${process.env.BASE_URL}/movie?page=${currentPage}&limit=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecords(response.data?.data);
        const allRows = response.data?.totalMovies;
        setAllRows(allRows);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      return;
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
              <Form.Label>Name*</Form.Label>
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
              <Form.Label>Category*</Form.Label>
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
                {categories.length > 0 ? (
                  categories?.map((category: ICategory) => (
                    <option key={category._id}>{category.name}</option>
                  ))
                ) : (
                  <option value="">No category is here</option>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Link*</Form.Label>
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
              <Form.Label>Status*</Form.Label>
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
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="active">Active</option>
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
