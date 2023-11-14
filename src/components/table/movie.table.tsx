"use client";
import { Button } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import CreateModalMovie from "../createModal/createMovie.modal";
import UpdateModalMovie from "../updateModal/updateMovie.modal";
import DataTable, {
  Selector,
  TableColumn,
  TableStyles,
} from "react-data-table-component";
import styles from "../../app/admin/movie/movie.module.css";
import { getStogare } from "@/app/helper/stogare";
import { useAppDispatch } from "@/redux/store";
import { getSortsMovie } from "@/redux/features/movie/movieSlice";

interface Iprops {
  loading: boolean;
  setLoading: (value: boolean | any) => void;
  movies: IMovie[];
  currentPage: number;
  setCurrentPage: (value: number | any) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number | any) => void;
  sortsRedux: Object;
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
    sortsRedux,
  } = props;

  let token: string | null = null;
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const dispatch = useAppDispatch();

  const handleDeleteMovie = async (id: string) => {
    if (window.confirm("Are you sure want to delete this movie? ")) {
      try {
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
            `${process.env.BASE_URL}/movie?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRecords(res?.data?.data);
          setAllRows(res.data?.totalMovies);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
        return;
      }
    }
  };

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const handleDeleteManyMovie = async () => {
    if (selectedRows.length > 0) {
      if (
        window.confirm(
          `Are you sure want to delete ${selectedRows.length} movies below? `
        )
      ) {
        try {
          const { data } = await axios.delete(`${process.env.BASE_URL}/movie`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              movieIds: selectedRows,
            },
          });
          if (data?.status === false) {
            toast.warning(data?.msg);
            return;
          }
          if (data?.status === true) {
            toast.success(data?.msg);
            const res = await axios.get(
              `${process.env.BASE_URL}/movie?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setRecords(res?.data?.data);
            setAllRows(res.data?.totalMovies);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
          return;
        }
      }
    } else {
      toast.warning("Please pick movies to delete them");
      return;
    }
  };

  const [allRows, setAllRows] = useState(0);
  useEffect(() => {
    const fetchTotalRows = async () => {
      const { data } = await axios.get(`${process.env.BASE_URL}/movie`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allRows = data?.data.length;
      setAllRows(allRows);
    };
    fetchTotalRows();
  }, [token]);

  const columns: TableColumn<IMovie>[] = [
    {
      name: "name",
      sortable: true,
      cell: (row: IMovie) => <div className={styles.custom}>{row.name}</div>,
      selector: (row: IMovie) => row.name,
    },
    {
      name: "category",
      sortable: true,
      cell: (row: IMovie) => (
        <div className={styles.custom}>{row.category}</div>
      ),
      selector: (row: IMovie) => row.category,
    },
    {
      name: "status",
      sortable: true,
      cell: (row: IMovie) => <div className={styles.custom}>{row.status}</div>,
      selector: (row: IMovie) => row.status,
    },

    {
      name: "author",
      sortable: true,
      cell: (row: IMovie) => (
        <div className={styles.custom}>{author[row?.author]}</div>
      ),
      selector: (row: IMovie) => row.author,
    },
    {
      name: "createdAt",
      sortable: true,
      cell: (row: IMovie) => (
        <div className={styles.custom}>{row.createdAt}</div>
      ),
      selector: (row: IMovie) => row.createdAt,
    },
    {
      name: "updatedAt",
      sortable: true,
      cell: (row: IMovie) => (
        <div className={styles.custom}>{row.updatedAt}</div>
      ),
      selector: (row: IMovie) => row.updatedAt,
    },
    {
      name: "Actions",
      width: "250px",
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

  const tableCustomStyles: TableStyles | undefined = {
    headCells: {
      style: {
        fontSize: "16px",
        textTransform: "capitalize",
        fontWeight: "bold",
        justifyContent: "center",
        backgroundColor: "pink",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#EAEEFF",
        },
      },
    },
  };

  const handlePerRowsChange = async (perPage: number, page: number) => {
    setLoading(true);
    setItemsPerPage(perPage);
    setLoading(false);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  //handle search
  const [records, setRecords] = useState<IMovie[]>(movies);
  useEffect(() => {
    if (movies.length) setRecords(movies);
  }, [movies]);
  const [keyWordSearch, setKeyWordSearch] = useState("");
  const handleSearch = async () => {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/movie?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRecords(data?.data);
  };
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWordSearch]);

  const [movie, setMovie] = useState<IMovie | null>(null);
  const [showModalCreateMovie, setShowModalCreateMovie] =
    useState<boolean>(false);
  const [showModalUpdateMovie, setShowModalUpdateMovie] =
    useState<boolean>(false);

  //fetchAuthor for each authorId
  const [author, setAuthor] = useState<any>({});
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
        const authorName = data?.username;
        setAuthor((prev: any) => ({
          ...prev,
          [authorId]: authorName,
        }));
      } catch {
        throw new Error("Not found this author");
      }
    };
    movies.forEach((movie: IMovie) => {
      const authorId: string = movie?.author;
      fetchAuthor(authorId);
    });
  }, [movies, token]);

  //handle sort
  const customSort = (
    rows: IMovie[],
    selector: Selector<IMovie>,
    direction: string
  ) => {
    // Chuyển đổi hàm selector thành chuỗi
    const selectorString = selector.toString();

    // Sử dụng biểu thức chính quy để trích xuất tên trường (username)
    const match = selectorString.match(/\(\w+\)\s*=>\s*row\.(\w+)/);

    if (match) {
      // match[1] chứa tên trường (ở đây là "name")
      const fieldName = match[1];
      dispatch(getSortsMovie({ fieldName, direction }));

      return rows?.sort((rowA: IMovie, rowB: IMovie) => {
        // use the selector function to resolve your field names by passing the sort comparitors
        const aField = selector(rowA);
        const bField = selector(rowB);

        let comparison = 0;

        if (aField > bField) {
          comparison = 1;
        } else if (aField < bField) {
          comparison = -1;
        }

        return direction === "desc" ? comparison * -1 : comparison;
      });
    } else {
      // Xử lý trường hợp không thể trích xuất thông tin
      console.error(
        "Unable to extract field name from selector:",
        selectorString
      );
      return rows;
    }
  };

  const getDefaultSortField = () => {
    if (!sortsRedux || Object.keys(sortsRedux).length === 0) {
      return 1;
    }
    const column = Object.keys(sortsRedux)[0];
    const fieldName = sortsRedux[column as keyof Object];
    if (!fieldName) return 1;
    return (columns.findIndex((v) => v.name === fieldName.toString()) || 0) + 1;
  };

  const getDefaultSortAsc = () => {
    if (!sortsRedux || Object.keys(sortsRedux).length === 0) {
      return true;
    }
    const column = Object.keys(sortsRedux)[1];
    const orderSort = sortsRedux[column as keyof Object];
    return orderSort?.toString() === "asc" ? true : false;
  };

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
      <div className={styles.options_container}>
        <Button variant="danger" onClick={() => handleDeleteManyMovie()}>
          Delete Selected
        </Button>
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
            customStyles={tableCustomStyles}
            progressPending={loading}
            fixedHeader
            fixedHeaderScrollHeight="450px"
            pagination
            paginationPerPage={itemsPerPage}
            onChangeRowsPerPage={handlePerRowsChange}
            paginationTotalRows={allRows}
            paginationServer={true}
            onChangePage={handlePageChange}
            defaultSortFieldId={getDefaultSortField()}
            defaultSortAsc={getDefaultSortAsc()}
            sortFunction={customSort}
            onRowClicked={(row, e) => {
              setMovie(row);
              setShowModalUpdateMovie(true);
            }}
            selectableRows
            selectableRowSelected={useCallback((row: IMovie) => {
              return selectedRows.includes(row._id);
              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [])}
            onSelectedRowsChange={({ selectedRows }) => {
              setSelectedRows(selectedRows.map((row: IMovie) => row._id));
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
