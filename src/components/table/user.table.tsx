"use client";
import { Button, Table } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable, {
  TableColumn,
  TableStyles,
} from "react-data-table-component";
import UpdateModalUser from "../updateModal/updateUser.modal";
import { useCallback, useEffect, useState } from "react";
import styles from "../../app/admin/user/user.module.css";
import { getStogare } from "@/app/helper/stogare";
import { useAppDispatch } from "@/redux/store";
import { getSortsUser } from "@/redux/features/user/userSlice";

interface Iprops {
  loading: boolean;
  setLoading: (value: boolean | any) => void;
  users: IUser[];
  currentPage: number;
  setCurrentPage: (value: number | any) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number | any) => void;
  sortsRedux: Object;
}

const UserTable = (props: Iprops) => {
  const {
    loading,
    setLoading,
    users,
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

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [allRows, setAllRows] = useState(0);
  const [records, setRecords] = useState<IUser[]>(users);
  const [keyWordSearch, setKeyWordSearch] = useState("");
  const [user, setUser] = useState<IUser | null>(null);
  const [showModalUpdateUser, setShowModalUpdateUser] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchTotalRows = async () => {
      const { data } = await axios.get(`${process.env.BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allRows = data?.data?.length;
      setAllRows(allRows);
    };
    fetchTotalRows();
  }, [token]);

  useEffect(() => {
    if (users.length) setRecords(users);
  }, [users]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWordSearch]);

  const columns: TableColumn<IUser>[] | undefined = [
    {
      name: "username",
      sortable: true,
      cell: (row: IUser) => <div className={styles.custom}>{row.username}</div>,
      selector: (row: IUser) => row.username,
    },
    {
      name: "email",
      sortable: true,
      cell: (row: IUser) => <div className={styles.custom}>{row.email}</div>,
      selector: (row: IUser) => row.email,
    },
    {
      name: "role",
      sortable: true,
      cell: (row: IUser) => <div className={styles.custom}>{row.role}</div>,
      selector: (row: IUser) => row.role,
    },
    {
      name: "status",
      sortable: true,
      cell: (row: IUser) => <div className={styles.custom}>{row.status}</div>,
      selector: (row: IUser) => row.status,
    },
    {
      name: "createdAt",
      sortable: true,
      cell: (row: IUser) => (
        <div className={styles.custom}>{row.createdAt}</div>
      ),
      selector: (row: IUser) => row.createdAt,
    },
    {
      name: "updatedAt",
      sortable: true,
      cell: (row: IUser) => (
        <div className={styles.custom}>{row.updatedAt}</div>
      ),
      selector: (row: IUser) => row.updatedAt,
    },
    {
      name: "Actions",
      width: "250px",
      cell: (row: IUser): JSX.Element => (
        <div className="d-flex">
          <Link href={`user/${row._id}`}>
            <Button variant="primary" className="mx-1">
              View
            </Button>
          </Link>
          <Button
            variant="warning"
            className="mx-1"
            onClick={() => {
              setUser(row);
              setShowModalUpdateUser(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="mx-1"
            onClick={() => handleDeleteUser(row._id)}
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

  //handle delete user
  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure want to delete this user? ")) {
      try {
        const { data } = await axios.delete(
          `${process.env.BASE_URL}/user/${id}`,
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
            `${process.env.BASE_URL}/user?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRecords(res?.data?.data);
          setAllRows(res.data?.totalUsers);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
        return;
      }
    }
  };

  //handle delete many user
  const handleDeleteManyUser = async () => {
    if (selectedRows.length > 0) {
      if (
        window.confirm(
          `Are you sure want to delete ${selectedRows.length} users below? `
        )
      ) {
        try {
          const { data } = await axios.delete(`${process.env.BASE_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              userIds: selectedRows,
            },
          });
          if (data?.status === false) {
            toast.warning(data?.msg);
            return;
          }
          if (data?.status === true) {
            toast.success(data?.msg);
            const res = await axios.get(
              `${process.env.BASE_URL}/user?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setRecords(res?.data?.data);
            setAllRows(res.data?.totalUsers);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
          return;
        }
      }
    } else {
      toast.warning("Please pick users to delete them");
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
      `${process.env.BASE_URL}/user?s=${keyWordSearch}&page=${currentPage}&limit=${itemsPerPage}`,
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
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2>User Table</h2>
      </div>
      <div className={styles.options_container}>
        <Button variant="danger" onClick={() => handleDeleteManyUser()}>
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
                getSortsUser({ fieldName: column.name, direction: direction })
              );
            }}
            onRowClicked={(row, e) => {
              setUser(row);
              setShowModalUpdateUser(true);
            }}
            selectableRows
            selectableRowSelected={useCallback((row: IUser) => {
              return selectedRows.includes(row._id);
              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [])}
            onSelectedRowsChange={({ selectedRows }) => {
              setSelectedRows(selectedRows.map((row: IUser) => row._id));
            }}
          />
        </div>
      </div>
      <UpdateModalUser
        showModalUpdateUser={showModalUpdateUser}
        setShowModalUpdateUser={setShowModalUpdateUser}
        user={user}
        setUser={setUser}
        setRecords={setRecords}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setAllRows={setAllRows}
      />
    </>
  );
};

export default UserTable;
