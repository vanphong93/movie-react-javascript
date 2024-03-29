import { Popover, Rate, Tabs } from "antd";
import moment from "moment";
import React,{useEffect,useState} from "react";
import { Link, NavLink } from "react-router-dom";
import TextSplice, { moneyFormat } from "../../Utilities/Format";
import { devideNumber } from "../../Utilities/randomNumber";
import "./TabsDetail.css";
export const TabsDetail = ({ data }) => {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 640px)").matches
  );
  useEffect(() => {
    window
      .matchMedia("(min-width: 640px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  const { heThongRapChieu } = data;
  const renderTimeMovie = (time) => {
    let content = <span>{moneyFormat(time.lichChieuPhim[0].giaVe)}</span>;
    return (
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:gap-3">
        {time.lichChieuPhim.slice(0, 9).map((item, i) => {
          return (
            <NavLink to={`/book/${item.maLichChieu}`} key={i}>
              <Popover placement="rightTop" content={content}>
                <button className="ml-3 p-1 md:p-3 rounded bg-red-500 duration-300 hover:bg-red-700 text-white">
                  {moment(item.ngayChieuGioChieu).format("DD-MM-YY h:mm:ss a")}
                </button>
              </Popover>
            </NavLink>
          );
        })}
      </div>
    );
  };
  const renderTabChildren = (cumRapChieu) => (
    <div>
      <Tabs
        defaultActiveKey="1"
       tabPosition="left"
        style={{
          height: 420,
        }}
        items={cumRapChieu.map((item, i) => {
          const content = <span>{item.diaChi}</span>;
          return {
            label: (
              <>
                <div className="w-36 md:w-48 text-left">
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
  const renderCardDetail = () => (
    <div
      className="datailCard mx-auto mt-10 flex rounded-lg bg-gray-50 dark:bg-gray-900  shadow-md md:flex-row md:max-w-xl
"
    >
      <img
        className="w-1/3 h-min md:rounded-l-lg"
        src={data.hinhAnh}
        alt={`image_${data.tenPhim}`}
      />

      <div className="flex flex-col  p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-gray-300  text-black">
          {data.tenPhim}
        </h5>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: <span className="font-semibold">Nội dung</span>,
              key: "1",
              children: (
                <p className="mb-3 font-normal dark:text-gray-300 text-black ">
                  <TextSplice data={data.moTa ? data.moTa : "Đang cập nhật"} />
                </p>
              ),
            },
            {
              label: <span className="font-semibold">Thông tin</span>,
              key: "2",
              children: (
                <>
                  {" "}
                  {data.danhGia && (
                    <Rate disabled allowHalf defaultValue={data.danhGia / 2} />
                  )}
                  <br />
                  <span className="text-black dark:text-gray-300 ">
                    {" "}
                    Thời gian: {devideNumber(data.maPhim)} phút
                  </span>
                  <br />
                  <span className="text-black dark:text-gray-300 ">
                    Ngày khởi chiếu:{" "}
                    {moment(data.ngayKhoiChieu).format("DD-MM-YY h:mm:ss a")}
                  </span>
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
  return (
    <div className="container mx-auto py-10">
      {renderCardDetail()}
      <div className="p-2 md:p-10 ">
        {heThongRapChieu.length ? (
          <Tabs
            className="shadow-xl font-semibold"
            defaultActiveKey="1"
            tabPosition={matches ? "left" : "top"}
            style={{
              height: "auto",
            }}
            items={heThongRapChieu.map((item, i) => {
              return {
                label: (
                  <img
                    className="w-10 h-10 md:w-16 md:h-16"
                    src={item.logo}
                    alt="logoTheater"
                  />
                ),
                key: i,
                children: <>{renderTabChildren(item.cumRapChieu)}</>,
              };
            })}
          />
        ) : (
          <div className="h-72 text-center">
            <Link to={"/"}>
              <span className="hover:cursor-pointer duration-300 hover:text-purple-500 text-purple-300 text-3xl ">
                Hệ thống đang cập nhật
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
