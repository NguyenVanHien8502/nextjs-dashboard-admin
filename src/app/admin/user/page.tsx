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
import { useDispatch } from "react-redux";

export default function User() {
  let token: string | null = null;
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const dispatch = useDispatch();

  const sortsRedux: {} | any = useAppSelector(
    (state: RootState) => state.userReducer?.getAllUsers?.sorts
  );
  const currentPageRedux: number | any = useAppSelector(
    (state: RootState) => state.userReducer?.getAllUsers?.currentPage
  );
  const itemsPerPageRedux: number | any = useAppSelector(
    (state: RootState) => state.userReducer?.getAllUsers?.itemsPerPage
  );

  const [currentPage, setCurrentPage] = useState<number>(
    currentPageRedux ? currentPageRedux : 1
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    itemsPerPageRedux ? itemsPerPageRedux : 10
  );
  const [sorts, setSorts] = useState<{}>(sortsRedux ? sortsRedux : {});
  const [loading, setLoading] = useState<boolean>(false);

  const users: IUser[] | any = useAppSelector(
    (state: RootState) => state.userReducer?.getAllUsers?.allUsers
  );

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
        />
      </Box>
    </>
  );
}
