"use client";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CreateModalCategory from "../createModal/createCategory.modal";
import UpdateModalCategory from "../updateModal/updateCategory.modal";
import DataTable, { TableColumn } from "react-data-table-component";
import styles from "../../app/admin/category/category.module.css";

interface Iprops {
  loading: boolean;
  setLoading: (value: boolean | any) => void;
  categories: ICategory[];
  currentPage: number;
  setCurrentPage: (value: number | any) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number | any) => void;
  setSorts: (value: {} | any) => void;
}

const CategoryTable = (props: Iprops) => {
  const {
    loading,
    setLoading,
    categories,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    setSorts,
  } = props;
  let token: string | null = null;
  if (typeof localStorage !== undefined) {
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString !== null) {
      const currentUser = JSON.parse(currentUserString);
      token = currentUser?.token;
    }
  } else {
    console.error("error: localStorage is undefined");
  }

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Are you sure want to delete this category? ")) {
      const { data } = await axios.delete(
        `${process.env.BASE_URL}/category/${id}`,
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
          `${process.env.BASE_URL}/category?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`
        );
        setRecords(res?.data?.data);
        setAllRows(res.data?.totalCategories);
      }
    }
  };

  const [allRows, setAllRows] = useState(0);
  useEffect(() => {
    const fetchTotalRows = async () => {
      const { data } = await axios.get(`${process.env.BASE_URL}/category`);
      const allRows = data?.data.length;
      setAllRows(allRows);
    };
    fetchTotalRows();
  }, []);

  const startIndex: number = (currentPage - 1) * itemsPerPage + 1;

  const columns: TableColumn<ICategory>[] = [
    {
      name: "No.",
      cell: (row: ICategory, rowIndex: number): JSX.Element => (
        <div className={styles.custom}>{startIndex + rowIndex}</div>
      ),
      sortable: true,
    },
    {
      name: "name",
      sortable: true,
      cell: (row: ICategory) => <div className={styles.custom}>{row.name}</div>,
    },
    {
      name: "slug",
      sortable: true,
      cell: (row: ICategory) => <div className={styles.custom}>{row.slug}</div>,
    },
    {
      name: "status",
      sortable: true,
      cell: (row: ICategory) => (
        <div className={styles.custom}>{row.status}</div>
      ),
    },
    {
      name: "desc",
      sortable: true,
      cell: (row: ICategory) => <div className={styles.custom}>{row.desc}</div>,
    },
    {
      name: "createdAt",
      sortable: true,
      cell: (row: ICategory) => (
        <div className={styles.custom}>{row.createdAt}</div>
      ),
    },
    {
      name: "updatedAt",
      sortable: true,
      cell: (row: ICategory) => (
        <div className={styles.custom}>{row.updatedAt}</div>
      ),
    },
    {
      name: "Actions",
      width: "250px",
      cell: (row: ICategory): JSX.Element => (
        <div className="d-flex">
          <Link href={`category/${row._id}`}>
            <Button variant="primary" className="mx-1">
              View
            </Button>
          </Link>
          <Button
            variant="warning"
            className="mx-1"
            onClick={() => {
              setCategory(row);
              setShowModalUpdateCategory(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="mx-1"
            onClick={() => handleDeleteCategory(row._id)}
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

  const [records, setRecords] = useState<ICategory[]>(categories);
  useEffect(() => {
    if (categories.length) setRecords(categories);
  }, [categories]);
  const [keyWordSearch, setKeyWordSearch] = useState("");
  const handleSearch = async () => {
    // const newData: ICategory[] = categories.filter((row) => {
    //   return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    // });
    const { data } = await axios.get(
      `${process.env.BASE_URL}/category?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`
    );
    setRecords(data?.data);
  };

  const handleSort = async (
    column: TableColumn<ICategory>,
    sortOrder: string
  ) => {
    setSorts(`sort[${column.name}]=${sortOrder}`);
  };

  const [category, setCategory] = useState<ICategory | null>(null);
  const [showModalCreateCategory, setShowModalCreateCategory] =
    useState<boolean>(false);
  const [showModalUpdateCategory, setShowModalUpdateCategory] =
    useState<boolean>(false);

  return (
    <>
      <div className="mb-3 d-flex justify-content-between">
        <h2>Category Table</h2>
        <Button
          variant="secondary"
          onClick={() => setShowModalCreateCategory(true)}
        >
          Create category
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
      <CreateModalCategory
        showModalCreateCategory={showModalCreateCategory}
        setShowModalCreateCategory={setShowModalCreateCategory}
        setRecords={setRecords}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setAllRows={setAllRows}
      />
      <UpdateModalCategory
        showModalUpdateCategory={showModalUpdateCategory}
        setShowModalUpdateCategory={setShowModalUpdateCategory}
        category={category}
        setCategory={setCategory}
        setRecords={setRecords}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setAllRows={setAllRows}
      />
    </>
  );
};

export default CategoryTable;
