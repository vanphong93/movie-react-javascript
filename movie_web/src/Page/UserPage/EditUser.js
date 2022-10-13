import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setThongTinListUserEdit } from "../../Redux/actions/actionUser";
import { userServ } from "../../Services/userService";
import { Button, Form, Input, Radio, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { localServ } from "../../Services/localService";

export default function EditUser() {
  const [componentSize, setComponentSize] = useState("default");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { ten } = useParams();

  let ThongTinEditUser = useSelector((state) => {
    return state.userReducer.ThongTinEditUser;
  });

  useEffect(() => {
    userServ
      .layThongTinNguoiDungEdit(ten)
      .then((res) => {
        let dataEditUser = res.data.content;
        console.log("dataEditUser: ", dataEditUser);
        dispatch(setThongTinListUserEdit(dataEditUser));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maNhom: localServ.user.get()?.maNhom,
      taiKhoan: ThongTinEditUser.taiKhoan,
      matKhau: ThongTinEditUser?.matKhau,
      hoTen: ThongTinEditUser?.hoTen,
      email: ThongTinEditUser?.email,
      soDT: ThongTinEditUser?.soDT,
      maLoaiNguoiDung: ThongTinEditUser?.maLoaiNguoiDung,
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("không được để trống Tài Khoản"),
      matKhau: Yup.string().required("không được để trống Mật Khẩu"),
      hoTen: Yup.string().required("Không được để trống Họ tên"),
      email: Yup.string().required("Không được để trống Email"),
      soDT: Yup.string()
        .required("Không được để trống số điện thoại")
        .min(10, "Số điện thoại không được ít hơn 10 số")
        .max(11, "Số điện thoại không được nhiều hơn 11 số")
        .matches(/^[0-9]+$/, "Số điện thoại không được nhập chữ, hay ký tự "),
      maLoaiNguoiDung: Yup.string().required(
        "Không được để trống loại người dùng"
      ),
    }),
    onSubmit: (values) => {
      console.log("values: ", values);
      userServ
        .CapNhatUser(values)
        .then((res) => {
          console.log("res", res);
          alert("Cập nhật thành công");
          navigate("/admin/UserManage");
        })
        .catch((err) => {
          console.log("err", err);
          alert(err.response.data.content);
        });
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeLoaiNguoiDung = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3 className="text-xl mb-5">Sửa Thông Tin user</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Tài Khoản">
        <Input
          name="taiKhoan"
          onChange={formik.handleChange}
          value={formik.values.taiKhoan}
          disabled
        />
        {formik.errors.taiKhoan && (
          <p className="text-red-500">{formik.errors.taiKhoan}</p>
        )}
      </Form.Item>

      <Form.Item label="Mật Khẩu">
        <Input
          name="matKhau"
          onChange={formik.handleChange}
          value={formik.values.matKhau}
        />
        {formik.errors.matKhau && (
          <p className="text-red-500">{formik.errors.matKhau}</p>
        )}
      </Form.Item>

      <Form.Item label="Họ và Tên">
        <Input
          name="hoTen"
          onChange={formik.handleChange}
          value={formik.values.hoTen}
        />
        {formik.errors.hoTen && (
          <p className="text-red-500">{formik.errors.hoTen}</p>
        )}
      </Form.Item>

      <Form.Item label="Email">
        <Input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && (
          <p className="text-red-500">{formik.errors.email}</p>
        )}
      </Form.Item>

      <Form.Item label="Số điện thoại">
        <Input
          name="soDT"
          onChange={formik.handleChange}
          value={formik.values.soDT}
        />
        {formik.errors.soDT && (
          <p className="text-red-500">{formik.errors.soDT}</p>
        )}
      </Form.Item>

      <Form.Item label="Loại người dùng">
        <Select
          options={[
            { label: "Khách hàng", value: "KhachHang" },
            { label: "Quản trị", value: "QuanTri" },
          ]}
          onChange={handleChangeLoaiNguoiDung}
          placeholder="Xin vui lòng chọn Loại người dùng"
          value={formik.values.maLoaiNguoiDung}
        />
        {formik.errors.maLoaiNguoiDung && (
          <p className="text-red-500">{formik.errors.maLoaiNguoiDung}</p>
        )}
      </Form.Item>

      <Form.Item label="Chức năng">
        <Button type="primary" htmlType="submit">
          Cập Nhật
        </Button>
      </Form.Item>
    </Form>
  );
}
