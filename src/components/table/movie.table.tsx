"use client";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import CreateModalMovie from "../createModal/createMovie.modal";
import UpdateModalMovie from "../updateModal/updateMovie.modal";
import DataTable, { TableColumn } from "react-data-table-component";
import styles from "../../app/admin/movie/movie.module.css";

interface Iprops {
  loading: boolean;
  setLoading: (value: boolean | any) => void;
  movies: IMovie[];
  currentPage: number;
  setCurrentPage: (value: number | any) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number | any) => void;
  setSorts: (value: {} | any) => void;
}

const MovieTable = (props: Iprops) => {
  const {
    loading,
    setLoading,
    movies,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    setSorts,
  } = props;
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const handleDeleteMovie = async (id: string) => {
    if (window.confirm("Are you sure want to delete this movie? ")) {
      const { data } = await axios.delete(
        `${process.env.BASE_URL}/movie/${id}`,
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
        const res = await axios.get(
          `${process.env.BASE_URL}/movie?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`
        );
        setRecords(res?.data?.data);
        setAllRows(res.data?.totalCategories);
      }
    }
  };

  const [allRows, setAllRows] = useState(0);
  useEffect(() => {
    const fetchTotalRows = async () => {
      const { data } = await axios.get(`${process.env.BASE_URL}/movie`);
      const allRows = data?.data.length;
      setAllRows(allRows);
    };
    fetchTotalRows();
  }, []);

  const startIndex: number = (currentPage - 1) * itemsPerPage + 1;

  const columns: TableColumn<IMovie>[] = [
    {
      name: "No.",
      cell: (row: IMovie, rowIndex: number): JSX.Element => (
        <div className={styles.custom}>{startIndex + rowIndex}</div>
      ),
      sortable: true,
      maxWidth: "20px",
    },
    {
      name: "name",
      sortable: true,
      cell: (row: IMovie) => <div className={styles.custom}>{row.name}</div>,
    },
    {
      name: "slug",
      sortable: true,
      cell: (row: IMovie) => <div className={styles.custom}>{row.slug}</div>,
    },
    {
      name: "category",
      sortable: true,
      cell: (row: IMovie) => (
        <div className={styles.custom}>{row.category}</div>
      ),
    },
    {
      name: "link",
      sortable: true,
      cell: (row: IMovie) => (
        <div className={styles.custom_link}>{row.link}</div>
      ),
    },
    {
      name: "status",
      sortable: true,
      cell: (row: IMovie) => <div className={styles.custom}>{row.status}</div>,
    },
    {
      name: "desc",
      sortable: true,
      cell: (row: IMovie) => <div className={styles.custom}>{row.desc}</div>,
    },
    {
      name: "author",
      sortable: true,
      cell: (row: IMovie) => (
        <div className={styles.custom}>{author[row.author]}</div>
      ),
    },
    {
      name: "createdAt",
      sortable: true,
      cell: (row: IMovie) => (
        <div className={styles.custom}>{row.createdAt}</div>
      ),
    },
    {
      name: "updatedAt",
      sortable: true,
      cell: (row: IMovie) => (
        <div className={styles.custom}>{row.updatedAt}</div>
      ),
    },
    {
      name: "Actions",
      minWidth: "250px",
      cell: (row: IMovie): JSX.Element => (
        <div className="d-flex">
          <Link href={`movie/${row._id}`}>
            <Button variant="primary" className="mx-1">
              View
            </Button>
          </Link>
          <Button
            variant="warning"
            className="mx-1"
            onClick={() => {
              setMovie(row);
              setShowModalUpdateMovie(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="mx-1"
            onClick={() => handleDeleteMovie(row._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handlePerRowsChange = async (perPage: number, page: number) => {
    setLoading(true);
    setItemsPerPage(perPage);
    setLoading(false);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const [records, setRecords] = useState<IMovie[]>(movies);
  useEffect(() => {
    if (movies.length) setRecords(movies);
  }, [movies]);
  const [keyWordSearch, setKeyWordSearch] = useState("");
  const handleSearch = async () => {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/movie?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`
    );
    setRecords(data?.data);
  };

  const handleSort = async (column: TableColumn<IMovie>, sortOrder: string) => {
    console.log(column.name, sortOrder);

    setSorts(`sort[${column.name}]=${sortOrder}`);
  };

  const [movie, setMovie] = useState<IMovie | null>(null);
  const [showModalCreateMovie, setShowModalCreateMovie] =
    useState<boolean>(false);
  const [showModalUpdateMovie, setShowModalUpdateMovie] =
    useState<boolean>(false);

  //fetchAuthor for each authorId
  const [author, setAuthor] = useState<IUser | any>({});
  useEffect(() => {
    const fetchAuthor = async (authorId: string) => {
      try {
        const { data } = await axios.get(
          `${process.env.BASE_URL}/user/${authorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const authorName = data.username;
        setAuthor((prev: any) => ({
          ...prev,
          [authorId]: authorName,
        }));
      } catch {
        throw new Error("Not found this author");
      }
    };
    movies.forEach((movie: IMovie) => {
      const authorId: string = movie.author;
      fetchAuthor(authorId);
    });
  }, [movies, token]);

  return (
    <>
      <div
        className="mb-3"
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
      <div className={styles.search_container}>
        <input
          className={styles.search_input}
          placeholder="Search here..."
          type="text"
          value={keyWordSearch}
          onChange={(e) => {
            setKeyWordSearch(e.target.value);
            handleSearch();
          }}
        />
      </div>
      <div className={`container ${styles.container_table}`}>
        <div className="table-responsive">
          <DataTable
            columns={columns}
            data={records}
            progressPending={loading}
            selectableRows
            fixedHeader
            fixedHeaderScrollHeight="450px"
            pagination
            paginationPerPage={itemsPerPage}
            onChangeRowsPerPage={handlePerRowsChange}
            paginationTotalRows={allRows}
            paginationServer={true}
            onChangePage={handlePageChange}
            onSort={(column, sortOrder) => {
              handleSort(column, sortOrder);
            }}
          />
        </div>
      </div>
      <CreateModalMovie
        showModalCreateMovie={showModalCreateMovie}
        setShowModalCreateMovie={setShowModalCreateMovie}
        setRecords={setRecords}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setAllRows={setAllRows}
      />
      <UpdateModalMovie
        showModalUpdateMovie={showModalUpdateMovie}
        setShowModalUpdateMovie={setShowModalUpdateMovie}
        movie={movie}
        setMovie={setMovie}
        setRecords={setRecords}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setAllRows={setAllRows}
      />
    </>
  );
};

export default MovieTable;
