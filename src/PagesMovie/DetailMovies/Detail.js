import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieSer } from "../../Services/movieService";
import styled from "./Detail.module.css";
import { TabsDetail } from "./TabsDetail";
import { useDispatch } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../Redux/actions/actionsSpiner";
import { message } from "antd";
export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    dispatch(setLoadingOn());
    movieSer
      .getInfoMovieTheater(id)
      .then((res) => {
        setDetail(res.data.content);
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch(setLoadingOff());
        message.error("Lỗi kết nối, xin bạn quay lại sau");
      });
  }, [id]);

  return (
    detail && (
      <div
        className={styled.main}
        style={{
          backgroundImage: `url(${detail.hinhAnh})`,
          backgroundSize: "cover",
        }}
      >
        <TabsDetail data={detail} />
      </div>
    )
  );
}
