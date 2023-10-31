"use client";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import axios from "axios";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

export default function Admin() {
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const [totalUser, setTotalUser] = useState(0);
  const [totalMovie, setTotalMovie] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);
  useEffect(() => {
    const fetchAllUser = async () => {
      const { data } = await axios.get(`${process.env.BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const totalUser = data?.data.length;
      setTotalUser(totalUser);
    };
    fetchAllUser();

    const fetchAllMovie = async () => {
      const { data } = await axios.get(`${process.env.BASE_URL}/movie`);
      const totalMovie = data?.data.length;
      setTotalMovie(totalMovie);
    };
    fetchAllMovie();

    const fetchAllCategory = async () => {
      const { data } = await axios.get(`${process.env.BASE_URL}/category`);
      const totalCategory = data?.data.length;
      setTotalCategory(totalCategory);
    };
    fetchAllCategory();
  }, [token]);
  return (
    <>
      <title>Home Admin Page</title>
      <h1>Dashboard Admin</h1>
      <div className="d-flex justify-content-between align-items-center gap-3 mt-5">
        <div className="d-flex flex-grow-1 bg-custom-light p-3 roudned-3 gap-3 shadow">
          <div>
            <PeopleAltIcon className="fs-1 mb-3" />
          </div>
          <div>
            <p className="desc">Total Users</p>
            <h4 className="mb-0 sub-title">{totalUser}</h4>
          </div>
        </div>
        <div className="d-flex flex-grow-1 bg-custom-light p-3 roudned-3 gap-3 shadow">
          <div>
            <LiveTvIcon className="fs-1 mb-3" />
          </div>
          <div>
            <p className="desc">Total Movies</p>
            <h4 className="mb-0 sub-title">{totalMovie}</h4>
          </div>
        </div>
        <div className="d-flex flex-grow-1 bg-custom-light p-3 roudned-3 gap-3 shadow">
          <div>
            <CategoryIcon className="fs-1 mb-3" />
          </div>
          <div>
            <p className="desc">Total Categories</p>
            <h4 className="mb-0 sub-title">{totalCategory}</h4>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h3>Data Chart</h3>
        <LineChart
          width={1000}
          height={400}
          series={[
            { data: pData, label: "pv", yAxisKey: "leftAxisId" },
            { data: uData, label: "uv", yAxisKey: "rightAxisId" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
          rightAxis="rightAxisId"
        />
      </div>
    </>
  );
}
