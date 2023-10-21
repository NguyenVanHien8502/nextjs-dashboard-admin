"use client";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
import CreateModalMovie from "../createModal/createMovie.modal";
import UpdateModalMovie from "../updateModal/updateMovie.modal";

interface Iprops {
  movies: IMovie[];
}

const MovieTable = (props: Iprops) => {
  const { movies } = props;
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const [movie, setMovie] = useState<IMovie | null>(null);
  const [showModalCreateMovie, setShowModalCreateMovie] =
    useState<boolean>(false);
  const [showModalUpdateMovie, setShowModalUpdateMovie] =
    useState<boolean>(false);

  const handleDeleteMovie = async (id: string) => {
    if (window.confirm("Are you sure want to delete this movie? ")) {
      await axios.delete(`http://localhost:5000/api/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Deleted movie succeed !...");
      mutate("http://localhost:5000/api/movie");
    }
  };

  return (
    <>
      <div
        className="mb-3 mt-5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2>Movie Table</h2>
        <Button
          variant="secondary"
          onClick={() => setShowModalCreateMovie(true)}
        >
          Create movie
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Category</th>
            <th>Link</th>
            <th>Status</th>
            <th>Description</th>
            <th>Author</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies?.map((movie, index) => (
            <tr key={movie._id}>
              <td>{index + 1}</td>
              <td>{movie.name}</td>
              <td>{movie.slug}</td>
              <td>{movie.category}</td>
              <td>{movie.link}</td>
              <td>{movie.status}</td>
              <td>{movie.desc}</td>
              <td>{movie.author}</td>
              <td>{movie.createdAt}</td>
              <td>{movie.updatedAt}</td>
              <td style={{ display: "flex", gap: "5px" }}>
                <Link href={`movie/${movie._id}`} className="btn btn-primary">
                  View
                </Link>
                <Button
                  variant="warning"
                  className="mx-3"
                  onClick={() => {
                    setMovie(movie);
                    setShowModalUpdateMovie(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteMovie(movie._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateModalMovie
        showModalCreateMovie={showModalCreateMovie}
        setShowModalCreateMovie={setShowModalCreateMovie}
      />
      <UpdateModalMovie
        showModalUpdateMovie={showModalUpdateMovie}
        setShowModalUpdateMovie={setShowModalUpdateMovie}
        movie={movie}
        setMovie={setMovie}
      />
    </>
  );
};

export default MovieTable;