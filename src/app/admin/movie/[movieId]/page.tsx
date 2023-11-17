"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { getStogare } from "@/app/helper/stogare";

const ViewMovieDetail = ({ params }: { params: { movieId: string } }) => {
  let token: string | null = null;
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const [movie, setMovie] = useState<IMovie | null>(null);
  const [author, setAuthor] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(
        `${process.env.BASE_URL}/movie/${params.movieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovie(data);
    };
    fetchMovie();
  }, [params.movieId, token]);

  useEffect(() => {
    const fetchAuthor = async () => {
      const { data } = await axios.get(
        `${process.env.BASE_URL}/user/${movie?.author}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAuthor(data);
    };
    if (movie?.author) fetchAuthor();
  }, [movie?.author, token]);

  return (
    <>
      <div className="my-3">
        <Link href={"/admin/movie"}>Go back</Link>
      </div>

      <br />
      <br />
      <Card className="text-center">
        <Card.Header>
          <h2>Thông tin chi tiết movie</h2>
        </Card.Header>
        <Card.Body>
          <Card.Text>Name: {movie?.name}</Card.Text>
          <Card.Text>Slug: {movie?.slug}</Card.Text>
          <Card.Text>Category: {movie?.category}</Card.Text>
          <Card.Text>Link: {movie?.link}</Card.Text>
          <Card.Text>Status: {movie?.status}</Card.Text>
          <Card.Text>Description: {movie?.desc}</Card.Text>
          <Card.Text>Author: {author?.username}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Card.Text>CreatedAt: {movie?.createdAt}</Card.Text>
          <Card.Text>UpdatedAt: {movie?.updatedAt}</Card.Text>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ViewMovieDetail;
