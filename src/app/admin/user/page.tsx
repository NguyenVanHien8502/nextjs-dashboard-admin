"use client";
import { getStogare } from "@/app/helper/stogare";
import UserTable from "@/components/table/user.table";
import { getAllUsers } from "@/redux/features/user/userService";
import {
  getAllUsersError,
  getAllUsersStart,
  getAllUsersSuccess,
} from "@/redux/features/user/userSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

interface IProps {
  sorts: {};
  itemsPerPage: number;
  currentPage: number;
  allUsers: IUser[] | null;
}
function User(props: IProps) {
  let token: string = "";
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const dispatch = useAppDispatch();

  const sortsRedux: {}  = props?.sorts;
  const currentPageRedux: number = props?.currentPage;
  const itemsPerPageRedux: number = props?.itemsPerPage;
  const users: IUser[] | null = props?.allUsers;

  const [currentPage, setCurrentPage] = useState<number>(currentPageRedux);
  const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPageRedux);
  const [sorts, setSorts] = useState<{}>(sortsRedux);

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
          sortsRedux={sortsRedux}
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
