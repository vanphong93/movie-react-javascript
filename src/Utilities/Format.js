import React, { useState } from "react";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";
export default function TextSplice({ data }) {
  const [lorem, setLorem] = useState(250);
  const addRemoveLorem = (action) => {
    action == "add" ? setLorem(data.split("").length) : setLorem(250);
  };
  let arrayData = data.split("");
  return (
    <span>
      {arrayData.splice(0, lorem)}
      {lorem < data.split("").length ? (
        <span
          className="hover:text-purple-700 duration-100 hover:cursor-pointer"
          onClick={() => {
            addRemoveLorem("add");
          }}
        >
          ...
          <DoubleRightOutlined />
        </span>
      ) : data.split("").length > 250 ? (
        <span
          className="hover:text-purple-700 duration-100 hover:cursor-pointer"
          onClick={() => {
            addRemoveLorem("remove");
          }}
        >
          <br />
          <DoubleLeftOutlined />
        </span>
      ) : (
        ""
      )}
    </span>
  );
}
export const moneyFormat = (data) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "vnd",
  }).format(data);
