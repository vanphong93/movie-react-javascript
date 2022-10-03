import { Tabs, Button, Popover } from "antd";
import { movieSer } from "../../../Services/movieService";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ItemTabMovie from "./ItemTabMovie";
export default function ({ showModal, dataMovie }) {

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    window
      .matchMedia("(min-width: 640px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  let renderContent = () => {
    // console.log('render tab movie');
    return dataMovie.map((item, index) => {
      return (
        <Tabs.TabPane
          tab={<img className="w-10 h-10 md:w-16 md:h-16" src={item.logo} />}
          key={index}
        >
          {" "}
          <Tabs defaultActiveKey="1" style={{ height: 500 }} tabPosition="left">
            {item.lstCumRap.map((cumRap, index) => {
              const content = <p>{cumRap.diaChi}</p>;
              return (
                <Tabs.TabPane
                  tab={
                    <div className="w-24 md:w-48 text-left">
                      <Popover placement="rightTop" content={content}>
                        {" "}
                        <p className="truncate">{cumRap.tenCumRap}</p>
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


        <Tabs
        className="shadow-xl"
        tabPosition={matches ? "left" : "top"}
        defaultActiveKey="1"
      >
        {renderContent()}
      </Tabs>


  );
}
