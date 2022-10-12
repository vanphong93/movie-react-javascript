import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import { localServ } from "../../Services/localService";
import { phimServ } from "../../Services/phimService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setThongTinFilmEdit } from "../../Redux/actions/actionFilm";

export default function EditFilm() {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setimgSrc] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dayFormat = "DD/MM/YYYY";
  let { id } = useParams();

  let ThongTinFiml = useSelector((state) => {
    return state.filmReducer.TTFimlEdit;
  });

  useEffect(() => {
    phimServ
      .laythongtinPhim(id)
      .then((res) => {
        var dataEdit = res.data.content;
        console.log("thông tin phim eidt lấy từ id", dataEdit);
        dispatch(setThongTinFilmEdit(dataEdit));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  console.log("ThongTinFiml redux: ", ThongTinFiml);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenPhim: ThongTinFiml?.tenPhim,
      trailer: ThongTinFiml?.trailer,
      moTa: ThongTinFiml.moTa,
      ngayKhoiChieu: ThongTinFiml.ngayKhoiChieu,
      dangChieu: ThongTinFiml.dangChieu,
      sapChieu: ThongTinFiml.sapChieu,
      hot: ThongTinFiml.hot,
      danhGia: ThongTinFiml.danhGia,
      hinhAnh: null,
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string()
        .min(5, "tên không được ít hơn 5 kí tự")
        .max(50, "Tên không được dài hơn 50 kí tự")
        .required("không được để trống tên Phim"),
      trailer: Yup.string().required("không được để trống trailer phim"),
      moTa: Yup.string().required("Không được để trống Mô tả phim"),
      ngayKhoiChieu: Yup.string()
        .required("Không được để trống Ngày Khởi Chiếu")
        .matches(
          /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
          "Ngày không hợp lệ!!!"
        ),
      danhGia: Yup.string().required("Không được để trống đánh giá"),
    }),
    onSubmit: (values) => {
      console.log("values: ", values);
      // Tạo đối tượng formData
      //   values.maNhom = localServ.user.get().maNhom;
      //   let formData = new FormData();
      //   for (let key in values) {
      //     if (key !== "hinhAnh") {
      //       formData.append(key, values[key]);
      //     } else {
      //       formData.append("File", values.hinhAnh, values.hinhAnh.name);
      //     }
      //   }
      //   console.log("FormData", formData.get("maNhom"));
      //   phimServ
      //     .themPhim(formData)
      //     .then((res) => {
      //       console.log("Chờ xử lý", res.data.message);
      //       alert("Thêm phim thành công!!!");
      //       navigate("/admin/FilmsManage");
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    },
  });

  const handleChangeDataPicker = (values) => {
    let ngayKhoiChieu = moment(values).format("DD/MM/YYYY");

    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    let fileimg = e.target.files[0];
    if (
      fileimg.type === "image/png" ||
      fileimg.type === "image/jpeg" ||
      fileimg.type === "image/jpg" ||
      fileimg.type === "image/gif"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(fileimg);
      reader.onload = (e) => {
        setimgSrc(e.target.result);
      };
      formik.setFieldValue("hinhAnh", fileimg);
    } else {
      alert("Dữ liệu không phù hợp");
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
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
      <h3 className="text-xl mb-5">Sửa Thông Tin Fimls</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Tên phim"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
        />
        {formik.errors.tenPhim && (
          <p className="text-red-500">{formik.errors.tenPhim}</p>
        )}
      </Form.Item>

      <Form.Item label="Trailer phim">
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
        {formik.errors.trailer && (
          <p className="text-red-500">{formik.errors.trailer}</p>
        )}
      </Form.Item>

      <Form.Item label="Mô tả phim">
        <Input
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
        {formik.errors.moTa && (
          <p className="text-red-500">{formik.errors.moTa}</p>
        )}
      </Form.Item>

      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          defaultValue={moment(formik.values.ngayKhoiChieu)}
          onChange={handleChangeDataPicker}
          format={dayFormat}
        />
        {formik.errors.ngayKhoiChieu && (
          <p className="text-red-500">{formik.errors.ngayKhoiChieu}</p>
        )}
      </Form.Item>

      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch
          onChange={handleChangeSwitch("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>

      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch
          onChange={handleChangeSwitch("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>

      <Form.Item label="Hot" valuePropName="checked">
        <Switch
          onChange={handleChangeSwitch("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>

      <Form.Item label="Đánh giá sao">
        <InputNumber
          onChange={handleChangeInputNumber("danhGia")}
          min={0}
          max={10}
          value={formik.values.danhGia}
        />
        {formik.errors.danhGia && (
          <p className="text-red-500">{formik.errors.danhGia}</p>
        )}
      </Form.Item>

      <Form.Item label="Hình ảnh">
        <input
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg, image/gif"
        />
        <br />
        <img
          style={{ width: 200, height: 200 }}
          src={imgSrc === "" ? ThongTinFiml.hinhAnh : imgSrc}
          alt="..."
        />
      </Form.Item>

      <Form.Item label="Tác vụ">
        <Button type="primary" htmlType="submit">
          Cập Nhật
        </Button>
      </Form.Item>
    </Form>
  );
}
