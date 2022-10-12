import { https } from "./configURL";
import { localServ } from "./localService";

export const phimServ = {
  getListPhim: () => {
    let uri = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${
      localServ.user.get().maNhom
    }`;
    return https.get(uri);
  },
  themPhim: (formdata) => {
    let uri = "/api/QuanLyPhim/ThemPhimUploadHinh";
    return https.post(uri, formdata);
  },
  laythongtinPhim: (maPhim) => {
    let uri = `/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`;
    return https.get(uri);
  },
  capnhatPhim: (formdata) => {
    let uri = "/api/QuanLyPhim/CapNhatPhimUpload";
    return https.post(uri, formdata);
  },
  xoaPhim: (maPhim) => {
    let uri = `/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
    return https.delete(uri);
  },
};
