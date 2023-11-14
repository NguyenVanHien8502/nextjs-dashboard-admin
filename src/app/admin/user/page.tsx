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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

interface IProps {
  sortsSelector: string;
  sortsDirection: string;
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

  const router = useRouter();
  const dispatch = useAppDispatch();

  const sortsSelectorRedux: string = props?.sortsSelector;
  const sortsDirectionRedux: string = props?.sortsDirection;
  const currentPageRedux: number = props?.currentPage;
  const itemsPerPageRedux: number = props?.itemsPerPage;
  const users: IUser[] | null = props?.allUsers;

  const [currentPage, setCurrentPage] = useState<number>(currentPageRedux);
  const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPageRedux);
  const sortsRedux: Object = { sortsSelectorRedux, sortsDirectionRedux };

  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    dispatch(getAllUsersStart());
    try {
      const response = await getAllUsers(token, currentPage, itemsPerPage);

      if (response?.status === true) {
        dispatch(getAllUsersSuccess(response));
      }
    } catch (error: any) {
      dispatch(getAllUsersError());
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!token) {
      router.replace("/");
      toast.warning("JWT has expired. Please log in again.");
      return;
    }
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, token, router]);

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
          sortsRedux={sortsRedux}
        />
      </Box>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    sortsSelector: state?.userReducer?.getSortsUser?.selector,
    sortsDirection: state?.userReducer?.getSortsUser?.direction,
    itemsPerPage: state?.userReducer?.getAllUsers?.itemsPerPage,
    currentPage: state?.userReducer?.getAllUsers?.currentPage,
    allUsers: state?.userReducer?.getAllUsers?.allUsers,
  };
};

export default connect(mapStateToProps)(User);
