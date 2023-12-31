"use client";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CreateModalCategory from "../createModal/createCategory.modal";
import UpdateModalCategory from "../updateModal/updateCategory.modal";
import DataTable, {
  TableColumn,
  TableStyles,
} from "react-data-table-component";
import styles from "../../app/admin/category/category.module.css";
import { getStogare } from "@/app/helper/stogare";
import { getSortsCategory } from "@/redux/features/category/categorySlice";
import { useAppDispatch } from "@/redux/store";

interface Iprops {
  loading: boolean;
  setLoading: (value: boolean | any) => void;
  categories: ICategory[];
  currentPage: number;
  setCurrentPage: (value: number | any) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number | any) => void;
  sortsRedux: Object;
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
    sortsRedux,
  } = props;

  let token: string | null = null;
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const dispatch = useAppDispatch();

  const [allRows, setAllRows] = useState(0);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [records, setRecords] = useState<ICategory[]>(categories);
  const [keyWordSearch, setKeyWordSearch] = useState("");
  const [category, setCategory] = useState<ICategory | null>(null);
  const [showModalCreateCategory, setShowModalCreateCategory] =
    useState<boolean>(false);
  const [showModalUpdateCategory, setShowModalUpdateCategory] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchTotalRows = async () => {
      const { data } = await axios.get(`${process.env.BASE_URL}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allRows = data?.data.length;
      setAllRows(allRows);
    };
    fetchTotalRows();
  }, [token]);

  useEffect(() => {
    if (categories.length) setRecords(categories);
  }, [categories]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWordSearch]);

  const columns: TableColumn<ICategory>[] | undefined = [
    {
      name: "name",
      sortable: true,
      cell: (row: ICategory) => <div className={styles.custom}>{row.name}</div>,
      selector: (row: ICategory) => row.name,
    },
    {
      name: "status",
      sortable: true,
      cell: (row: ICategory) => (
        <div className={styles.custom}>{row.status}</div>
      ),
      selector: (row: ICategory) => row.status,
    },
    {
      name: "createdAt",
      sortable: true,
      cell: (row: ICategory) => (
        <div className={styles.custom}>{row.createdAt}</div>
      ),
      selector: (row: ICategory) => row.createdAt,
    },
    {
      name: "updatedAt",
      sortable: true,
      cell: (row: ICategory) => (
        <div className={styles.custom}>{row.updatedAt}</div>
      ),
      selector: (row: ICategory) => row.updatedAt,
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

  //handle delete category
  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Are you sure want to delete this category? ")) {
      try {
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
            `${process.env.BASE_URL}/category?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRecords(res?.data?.data);
          setAllRows(res.data?.totalCategories);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
        return;
      }
    }
  };

  //handle delete many category
  const handleDeleteManyCategory = async () => {
    if (selectedRows.length > 0) {
      if (
        window.confirm(
          `Are you sure want to delete ${selectedRows.length} categories below? `
        )
      ) {
        try {
          const { data } = await axios.delete(
            `${process.env.BASE_URL}/category`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                categoryIds: selectedRows,
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
              `${process.env.BASE_URL}/category?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setRecords(res?.data?.data);
            setAllRows(res.data?.totalCategories);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
          return;
        }
      }
    } else {
      toast.warning("Please pick categories to delete them");
      return;
    }
  };

  //handle limit items per page
  const handleChangeRowsPerPage = async (perPage: number, page: number) => {
    setLoading(true);
    setItemsPerPage(perPage);
    setLoading(false);
  };

  //handle change page
  const handleChangePage = (page: number, totalRows: number): void => {
    setCurrentPage(page);
  };

  //handle search
  const handleSearch = async () => {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/category?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRecords(data?.data);
  };

  //handle sort
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
      <div className="mb-3 d-flex justify-content-between">
        <h2>Category Table</h2>
        <Button
          variant="secondary"
          onClick={() => setShowModalCreateCategory(true)}
        >
          Create category
        </Button>
      </div>
      <div className={styles.options_container}>
        <Button variant="danger" onClick={() => handleDeleteManyCategory()}>
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
            paginationServer={true}
            paginationTotalRows={allRows}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangePage={handleChangePage}
            paginationDefaultPage={currentPage}
            defaultSortAsc={getDefaultSortAsc()}
            defaultSortFieldId={getDefaultSortField()}
            onSort={(column, direction) => {
              dispatch(
                getSortsCategory({
                  fieldName: column.name,
                  direction: direction,
                })
              );
            }}
            onRowClicked={(row, e) => {
              setCategory(row);
              setShowModalUpdateCategory(true);
            }}
            selectableRows
            selectableRowSelected={useCallback((row: ICategory) => {
              return selectedRows.includes(row._id);
              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [])}
            onSelectedRowsChange={({ selectedRows }) => {
              setSelectedRows(selectedRows.map((row: ICategory) => row._id));
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
