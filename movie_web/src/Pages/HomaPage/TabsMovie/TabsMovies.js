import { Tabs, Button, Popover } from "antd";
import { movieSer } from "../../../Services/movieService";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ItemTabMovie from "./ItemTabMovie";
export default function ({ showModal,dataMovie }) {
//     let dispatch=useDispatch()
//   const [dataMovie, setDataMovie] = useState([]);
// //   let{data}=useSelector((state) => { return state.tabsMovieReducer })
//   useEffect(() => {
//     movieSer
//       .getMovieByTheater()
//       .then((res) => {
//         console.log("lich chieu theo he thong", res);
//         setDataMovie(res.data.content);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   }, []);

  let renderContent = () => {
    // console.log('render tab movie');
    return dataMovie.map((item, index) => {
      return (
        <Tabs.TabPane
          tab={<img className="w-16 h-16" src={item.logo} />}
          key={index}
        >
          {" "}
          <Tabs style={{ height: 500 }} tabPosition="left">
            {item.lstCumRap.map((cumRap, index) => {
              const content = <p>{cumRap.diaChi}</p>;
              return (
                <Tabs.TabPane
                  tab={
                    <div className="w-48 text-left">
                      <Popover placement="rightTop" content={content}>
                        {" "}
                        <p className=" truncate">{cumRap.tenCumRap}</p>
                        <hr />
                      </Popover>
                    </div>
                  }
                  key={index}
                >
                  <div style={{ height: 500, overflowY: "scroll" }}>
                    {cumRap.danhSachPhim.map((phim, index) => {
                      return (
                        <ItemTabMovie
                          showModal={showModal}
                          key={index}
                          data={phim}
                        />
                      );
                    })}
                  </div>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Tabs.TabPane>
      );
    });
  };
  return (
    <div className="p-10">
      {" "}
      <Tabs className="shadow-xl" tabPosition="left" defaultActiveKey="1">
        {renderContent()}
      </Tabs>
    </div>
  );
}