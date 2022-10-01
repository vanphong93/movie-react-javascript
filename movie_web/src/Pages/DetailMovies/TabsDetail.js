import { Popover, Tabs } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const TabsDetail = ({ data }) => {
  let { heThongRapChieu } = data;
  console.log("heThongRapChieu: ", heThongRapChieu);
  let handleTicket = (data) => {
    // naviga("/login")
    console.log(data);
    // alert(234)
  };
  const renderTimeMovie = (data) => (
    <div className="grid grid-cols-3 gap-5">
      {data.lichChieuPhim.slice(0,9).map((item, i) => {
        return (
          <NavLink to={`/book/${item.maLichChieu}`} key={i}>
            <button
              onClick={() => {
                handleTicket(item);
              }}
              className="ml-3 p-3 rounded bg-red-500 text-white"
            >
              {moment(item.ngayChieuGioChieu).format("DD-MM-YY h:mm:ss a")}
            </button>
          </NavLink>
        );
      })}
    </div>
  );

  const renderTabChildern = (data) => {
    return (
      <div>
        <Tabs
          defaultActiveKey="1"
          tabPosition={"left"}
          style={{
            height: 420,
          }}
          items={data.map((item, i) => {
            const content = <p>{item.diaChi}</p>;
            return {
              label: (
                <>
                  <div className="w-48 text-left">
                    <Popover placement="rightTop" content={content}>
                      <p className=" truncate">{item.tenCumRap}</p>
                    </Popover>
                    <hr />
                  </div>
                </>
              ),
              key: i,
              children: renderTimeMovie(item),
            };
          })}
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto p-10">
      <div
        className="mx-auto mt-10 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100
 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
 "
      >
        <img
          className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={data.hinhAnh}
          alt="image"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.tenPhim}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data.moTa}
          </p>
        </div>
      </div>

      <div className="p-10 text-blue-700 ">
       {heThongRapChieu? <Tabs
          className="shadow-xl"
          defaultActiveKey="1"
          tabPosition={"left"}
          style={{
            height:"auto",
          }}
          items={
            heThongRapChieu.map((item, i) => {
                  return {
                    label: (
                      <img
                        className="w-16 h-16"
                        // style={{ height: "50px" }}
                        src={item.logo}
                        alt="image"
                      />
                    ),
                    key: i,
                    children: <>{renderTabChildern(item.cumRapChieu)}</>,
                  };
                })
              
          }
        />:""}
      </div>
    </div>
  );
};