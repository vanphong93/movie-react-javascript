import React, { useEffect, useState } from "react";
import Movie from "./Carousel/CardMovie";
import { Modal, Rate } from "antd";
import TabsMovies from "./TabsMovie/TabsMovies";
import { useDispatch, useSelector } from "react-redux";
import { AllMovie } from "./Carousel/AllMovie";
import CarouselMovies from "./Carousel/CarouselMovies";
import { NavLink } from "react-router-dom";
import Baner from "./Baner/Baner";
import "./HomePage.css";
import {
  getBaner,
  getMovie,
  getMovieTheater,
} from "../../Redux/actions/actionGetMovie";
import moment from "moment";
import TextSplice from "../../Utilities/Format";
import News from "./News/News";
import { devideNumber } from "../../Utilities/randomNumber";
export default function HomePage() {
  const { dataMovie, dataBaner, dataTheater } = useSelector(
    (state) => state.movieReducer
  );
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dataMovie ? setMovies(dataMovie) : dispatch(getMovie(setMovies, dispatch));
  }, []);
  const [banerMovie, setBanerMovie] = useState([]);
  useEffect(() => {
    dataBaner ? setBanerMovie(dataBaner) : dispatch(getBaner(setBanerMovie));
  }, []);
  const [movieTheater, setMovieTheater] = useState([]);
  useEffect(() => {
    dataTheater
      ? setMovieTheater(dataTheater)
      : dispatch(getMovieTheater(setMovieTheater));
  }, []);
  const { data } = useSelector((state) => state.modalReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const renderModal = () => (
    <Modal
      transitionName=""
      destroyOnClose={true}
      style={{ top: 20 }}
      width={1000}
      footer={null}
      title="Trailer"
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
    >
      {data.baner ? (
        <iframe
          allowFullScreen={true}
          title="myFrame"
          className="w-full"
          height={450}
          src={data.trailer}
        ></iframe>
      ) : (
        <div className="container  md:flex">
          <iframe
            allowFullScreen={true}
            title="myFrame"
            className="w-full md:w-1/2"
            height={450}
            frameBorder={0}
            src={data.trailer}
          ></iframe>
          <div className="w-full md:w-1/2 p-3">
            <h1
              style={{ fontSize: "30px" }}
              className="text-center text-indigo-500"
            >
              {data.tenPhim}
            </h1>
            <TextSplice data={data.moTa} />

            <p className="font-semibold">
              Ngày chiếu {moment(data.ngayChieuGioChieu).format("DD-MM-YYYY")}
              <br />
              Time: {devideNumber(data.maPhim)} phút
            </p>
            <Rate disabled allowHalf defaultValue={data.danhGia / 2} />
            <NavLink to={`/detail/${data.maPhim}`}>
              {" "}
              <button className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
                Mua vé
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </Modal>
  );

  const renderMovieCurrent = () => {
    let newData = movies.filter((item) => item.dangChieu);
    return newData.map((data, index) => (
      <div key={index} className="p-3 xl:p-5">
        <Movie showModal={showModal} data={data} />
      </div>
    ));
  };
  const renderMovieNext = () => {
    let newData = movies.filter((item) => !item.dangChieu);
    return newData.map((data, index) => (
      <div key={index} className="p-2 lg:p-3 xl:p-5">
        <Movie showModal={showModal} data={data} />
      </div>
    ));
  };
  return (
    <div className="space-y-10 ">
      <section className="mb-15">
        <Baner showModal={showModal} banerMovie={banerMovie} />
      </section>
      <div className="container mx-auto" id="filmHot">
        {renderModal()}
        <section className="mb-14">
          <AllMovie
            dataMovieNext={<CarouselMovies data={renderMovieNext} />}
            dataMovieCurrent={<CarouselMovies data={renderMovieCurrent} />}
          />
        </section>{" "}
        <section id="cinemax" className="">
          <h1 className="text-center text-purple-500 text-6xl mb-12 hover:animate-pulse ">
            Rạp Cinema
          </h1>
          <TabsMovies showModal={showModal} dataMovie={movieTheater} />
        </section>
        <section id="news">
          <News />
        </section>
      </div>
    </div>
  );
}
