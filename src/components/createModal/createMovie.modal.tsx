"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getStogare } from "@/app/helper/stogare";
import slugify from "slugify";

interface Iprops {
  showModalCreateMovie: boolean;
  setShowModalCreateMovie: (value: boolean) => void;
  setRecords: (value: IMovie[]) => void;
  currentPage: number;
  itemsPerPage: number;
  setAllRows: (value: number | any) => void;
}

function CreateModalMovie(props: Iprops) {
  let token: string | null = null;
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const {
    showModalCreateMovie,
    setShowModalCreateMovie,
    setRecords,
    currentPage,
    itemsPerPage,
    setAllRows,
  } = props;

  const [dataMovie, setDataMovie] = useState<IMovie | any>({
    name: "",
    slug: "",
    categories: [],
    link: "",
    status: "pending",
    desc: "",
  });

  const [isChangedInputSlug, setIsChangedInputSlug] = useState(false);
  const [categories, setCategories] = useState<ICategory | any>([]);

  //fetch all Category
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

  const handleSubmitForm = async () => {
    try {
      const { name, slug, categories, link, status, desc } = dataMovie;

      const { data } = await axios.post(
        `${process.env.BASE_URL}/movie/create-movie`,
        {
          name: name,
          slug: slug,
          categories: categories,
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
        toast.warning(data?.msg);
        return;
      }

      if (data?.status === true) {
        toast.success(data?.msg);
        handleCloseModalMovie();
        const res = await axios.get(
          `${process.env.BASE_URL}/movie?page=${currentPage}&limit=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecords(res.data?.data);
        const allRows = res?.data?.totalMovies;
        setAllRows(allRows);
      }
    } catch (error: any) {
      error?.response?.data?.message.map((msg: string) => {
        toast.error(msg);
      });
      return;
    }
  };

  const handleCloseModalMovie = () => {
    setDataMovie({
      name: "",
      slug: "",
      categories: [],
      link: "",
      status: "",
      desc: "",
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
              <Form.Label>Name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên movie"
                value={dataMovie.name}
                onChange={(e) =>
                  setDataMovie((prevData: IMovie) => ({
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
                value={
                  isChangedInputSlug ? dataMovie.slug : slugify(dataMovie.name)
                }
                onChange={(e) => {
                  setIsChangedInputSlug(true);
                  setDataMovie((prevData: IMovie) => ({
                    ...prevData,
                    slug: e.target.value,
                  }));
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category*</Form.Label>
              <Form.Select
                id="categories"
                multiple
                value={dataMovie.categories}
                onChange={(e) =>
                  setDataMovie((prev: any) => ({
                    ...prev,
                    categories: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  }))
                }
              >
                <option value="">Select Category</option>
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
                  setDataMovie((prevData: IMovie) => ({
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
                  setDataMovie((prevData: IMovie) => ({
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
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModalMovie;
