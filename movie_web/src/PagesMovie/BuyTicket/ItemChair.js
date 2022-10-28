import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addOrRemoveChair } from "../../Redux/actions/actionBookTicket";
export default function ItemChair({ data }) {
  let dispatch = useDispatch();
  const [selectChair, setSelectChair] = useState([]);
  useEffect(() => {
    setSelectChair(data);
  }, []);
  let renderContent = () => {
    return (
      <>
        {selectChair?.map((item, i) => {
          let handleSelect = (props, i) => {
            dispatch(addOrRemoveChair(props, i, selectChair, setSelectChair));
          };
          return (
            <td key={i}>
              {item.daDat ? (
                <button className="bg-red-700 p-2 sm:p-3  text-white md:m-1 md:p-4 rounded opacity-50 cursor-not-allowed"></button>
              ) : item.isSelect ? (
                <button
                  onClick={() => {
                    handleSelect(item, i);
                  }}
                  className="bg-green-500 text-white   sm:p-1 md:p-2 rounded opacity-50"
                >
                  {item.tenGhe}
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleSelect(item, i);
                  }}
                  className={
                    item.loaiGhe == "Vip"
                      ? " hover:bg-yellow-500 bg-yellow-300 sm:m-0.5 text-gray-700 hover:text-white sm:p-1 md:p-2  sm:border-yellow-500 hover:border-transparent rounded"
                      : " hover:bg-blue-500 bg-blue-300 sm:m-0.5 text-gray-700  hover:text-white sm:p-1 md:p-2  sm:border-blue-500 hover:border-transparent rounded"
                  }
                >
                  {item.tenGhe}
                </button>
              )}
            </td>
          );
        })}
      </>
    );
  };
  return <>{renderContent()}</>;
}
