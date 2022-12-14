import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { HashLink } from "react-router-hash-link";
import { Modal, message, Dropdown, Menu, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../Redux/actions/actionUser";
import LoginPage from "./Login";
import Register from "./Register";
import { localServ } from "../../Services/localService";
import SearchMovies from "./Search";
import { useLocation } from "react-router-dom";
import {
  HomeIcon,
  LampIcon,
  LoginIcon,
  LogOutIcon,
  MenuHidden,
  MoonIcon,
  RegisterIcon,
} from "../../Utilities/Icon";
export default function Header({ changeTheme }) {
  const location = useLocation();
  const isHomePage = location.pathname;
  const newUser = useSelector((state) => state.userReducer.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromLogin, setFromLogin] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [visible, setVisible] = useState(true);
  let prevScrollpos = window.pageYOffset;
  const toggleVisible = () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    prevScrollpos = currentScrollPos;
  };
  window.addEventListener("scroll", toggleVisible);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    let onSuccess = () => {
      message.success("Đăng nhập thành công");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    };
    let onFailed = () => {
      message.error("Đăng nhập thất bại");
    };

    dispatch(setLogin(values, onSuccess, onFailed));
  };
  const handleLogin = () => {
    setFromLogin(true);
    showModal();
  };
  const handleRegister = () => {
    setFromLogin(false);
    showModal();
  };
  const handleLogout = () => {
    localServ.user.remove();
    window.location.href = "/";
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to={"/"}>
              <span className="font-semibold text-emerald-500">
                Xin chào {newUser?.hoTen}
              </span>
            </Link>
          ),
          key: "0",
        },
        newUser?.maLoaiNguoiDung == "QuanTri" && {
          label: (
            <Link to={"/admin"}>
              <span className="text-red-700 font-medium"> Admin Page</span>
            </Link>
          ),
          key: "2",
        },
        {
          label: (
            <Link  to={"/user#info"}>
              Thông tin
            </Link>
          ),
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: (
            <a className="font-semibold" onClick={handleLogout}>
              <LogOutIcon />
            </a>
          ),
          key: "3",
        },
      ]}
    />
  );
  const menuHidden = (
    <Menu
      items={[
        {
          label: (
            <span
              onClick={handleRegister}
              className=" font-medium hover:text-blue-500 duration-300 "
            >
              Đăng kí
            </span>
          ),
          key: "1",
        },
        {
          label: (
            <span
              onClick={handleLogin}
              className="font-medium hover:text-green-500 duration-300 "
            >
              {" "}
              Đăng nhập
            </span>
          ),
          key: "2",
        },
      ]}
    />
  );
  return (
    <header
      style={{ display: visible ? "inline" : "none" }}
      className="px-4 scroll-m-32 scr bg-opacity-5 fixed z-20 w-full bg-slate-50  shadow"
    >
      <div className="container duration-300 hover:opacity-100 flex justify-between h-12 mx-auto">
        <div className="flex">
          {isHomePage == "/" ? (
            <>
              <button
                onClick={() => {
                  changeTheme();
                }}
                className="p-2 hidden dark:block  text-white "
              >
                <LampIcon />
              </button>
              <button
                onClick={() => {
                  changeTheme();
                }}
                className="p-2 text-blue-500 dark:hidden"
              >
                <MoonIcon />
              </button>
              <HashLink
                rel="noopener noreferrer"
                smooth
                to={"#filmHot"}
                className="flex items-center p-2 text-red-300 dark:hover:text-red-500 dark:text-white text-xs md:text-lg font-semibold hover:text-red-500  duration-300 "
              >
                Phim hot
              </HashLink>
              <HashLink
                smooth
                to={"#cinemax"}
                rel="noopener noreferrer"
                className="flex items-center p-2 text-red-300 dark:hover:text-red-500 dark:text-white text-xs md:text-lg font-semibold hover:text-red-500  duration-300 "
              >
                Lịch chiếu
              </HashLink>
              <HashLink
                rel="noopener noreferrer"
                smooth
                to={"#news"}
                className="flex items-center p-2 text-red-300 dark:hover:text-red-500 dark:text-white text-xs md:text-lg font-semibold hover:text-red-500  duration-300 "
              >
                Tin tức
              </HashLink>
            </>
          ) : (
            <>
              {" "}
              <button
                onClick={() => {
                  changeTheme();
                }}
                className="p-2  hidden dark:block  text-white"
              >
                <LampIcon />
              </button>
              <button
                onClick={() => {
                  changeTheme();
                }}
                className="p-2 text-blue-500 dark:hidden"
              >
                <MoonIcon />
              </button>
              <Link
                rel="noopener noreferrer"
                to={"/"}
                className="flex items-center p-2   text-white hover:text-red-500 duration-300 "
              >
                <HomeIcon/>
              </Link>
            </>
          )}
        </div>
        <div className="items-center flex-shrink-0 flex">
          <SearchMovies />
          {newUser ? (
            <>
              <Dropdown trigger={["hover"]} overlay={menu}>
                <Space>
                  <img
                    className="w-10 h-12 rounded-full"
                    src="https://i.pravatar.cc/100"
                    alt="avatar"
                  />
                  <DownOutlined />
                </Space>
              </Dropdown>
            </>
          ) : (
            <>
              {" "}
              <button
                onClick={handleRegister}
                className="self-center hidden md:block ml-1 bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded duration-300"
              >
                <RegisterIcon />
              </button>
              <button
                onClick={handleLogin}
                className="self-center hidden md:block duration-300 mx-1  bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                <LoginIcon />
              </button>
              <div className="md:hidden">
                {" "}
                <Dropdown trigger={["hover"]} overlay={menuHidden}>
                  <Space>
                    <MenuHidden />
                  </Space>
                </Dropdown>
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        destroyOnClose={true}
        title={fromLogin?"Đăng nhập":"Đăng kí"}
        style={{ top: 20 }}
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        {fromLogin ? (
          <LoginPage modal={setIsModalOpen} />
        ) : (
          <Register modal={setIsModalOpen} />
        )}
      </Modal>
    </header>
  );
}
