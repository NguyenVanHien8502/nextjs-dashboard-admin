"use client";
import { getStogare } from "@/app/helper/stogare";
import UserTable from "@/components/table/user.table";
import { getAllUsers } from "@/redux/features/user/userService";
import {
  getAllUsersError,
  getAllUsersStart,
  getAllUsersSuccess,
} from "@/redux/features/user/userSlice";
import { RootState, useAppSelector } from "@/redux/store";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";

interface IProps {
  sorts: {} | null;
  itemsPerPage: number;
  currentPage: number;
  allUsers: IUser[] | null;
}
function User(props: IProps) {
  let token: string | null = null;
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const dispatch = useDispatch();

  const sortsRedux: {} | any = props?.sorts;
  const currentPageRedux: number = props?.currentPage;
  const itemsPerPageRedux: number = props?.itemsPerPage;
  const users: IUser[] | null = props?.allUsers;

  const [currentPage, setCurrentPage] = useState<number>(
    currentPageRedux ? currentPageRedux : 1
  );

  const [itemsPerPage, setItemsPerPage] = useState<number>(
    itemsPerPageRedux ? itemsPerPageRedux : 10
  );

  // console.log(sortsRedux);

  const [sorts, setSorts] = useState<{}>(sortsRedux ? sortsRedux : {});
  // console.log(sorts);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    dispatch(getAllUsersStart());
    try {
      const response = await getAllUsers(
        token,
        sorts,
        currentPage,
        itemsPerPage
      );

      if (response?.status === true) {
        dispatch(getAllUsersSuccess(response));
      }
    } catch (error) {
      dispatch(getAllUsersError());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    console.log(sortsRedux);
    console.log(sorts);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorts, currentPage, itemsPerPage]);

  return (
    <>
      <Box height={100} width={1000}>
        <UserTable
          loading={loading}
          setLoading={setLoading}
          users={users ?? []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setSorts={setSorts}
        />
      </Box>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    sorts: state?.userReducer?.getAllUsers?.sorts,
    itemsPerPage: state?.userReducer?.getAllUsers?.itemsPerPage,
    currentPage: state?.userReducer?.getAllUsers?.currentPage,
    allUsers: state?.userReducer?.getAllUsers?.allUsers,
  };
};

export default connect(mapStateToProps)(User);
