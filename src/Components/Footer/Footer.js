import React from "react";
import { Link } from "react-router-dom";
import movieLogo from "../../assets/movieLogo.png";
import {
  AppleIcon,
  FacebookIcon,
  GooglePlayIcon,
  InstagramIcon,
  TwitterIcon,
} from "../../Utilities/Icon";
const Footer = () => (
  <footer className="px-4 divide-y bg-white  text-gray-800 dark:bg-neutral-900  ">
    <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
      <div className="lg:w-1/3">
        <img
          width={180}
          src={movieLogo}
          alt="movieLogo"
        />
      </div>
      <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
        <div className="space-y-3">
          <h3 className="tracking-wide dark:text-gray-300 uppercase text-gray-900">
            Liên hệ
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                className="hover:text-purple-500 duration-300"
                rel="noopener noreferrer"
                href="#"
              >
                Phone 0961051014
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                className="hover:text-purple-500 duration-300"
                href="#"
              >
                Địa chỉ 112 Cao Thắng,quận 3 tp.Hồ Chí Minh
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                className="hover:text-purple-500 duration-300"
                href="#"
              >
                Gmail movieSevirce@gmail.com
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="tracking-wide dark:text-gray-300 uppercase text-gray-900">
            Dịch vụ
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                rel="noopener noreferrer"
                className="hover:text-purple-500 duration-300"
                href="#"
              >
                Khách hàng
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                className="hover:text-purple-500 duration-300"
                href="#"
              >
                Doanh nghiệp
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="uppercase dark:text-gray-300 text-gray-900">
            Ứng dụng
          </h3>
          <div className="flex space-x-3 ">
            <Link rel="noopener noreferrer" href="#">
              <GooglePlayIcon />
            </Link>
            <Link rel="noopener noreferrer" href="#">
              <AppleIcon />
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <div className="uppercase dark:text-gray-300 text-gray-900 font-semibold">
            Social media
          </div>
          <div className="flex justify-start space-x-3">
            <Link
              rel="noopener noreferrer"
              href="#"
              title="Facebook"
              className="flex items-center p-1 hover:text-purple-500 duration-300"
            >
              <FacebookIcon />
            </Link>
            <Link
              rel="noopener noreferrer"
              href="#"
              title="Twitter"
              className="flex items-center p-1 hover:text-purple-500 duration-300"
            >
              <TwitterIcon />
            </Link>
            <Link
              rel="noopener noreferrer"
              href="#"
              title="Instagram"
              className="flex items-center p-1 hover:text-purple-500 duration-300"
            >
              <InstagramIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="py-6 text-sm text-center dark:text-gray-400 text-gray-600">
      © 2022 Company Co. All rights reserved.
    </div>
  </footer>
);
export default Footer;
