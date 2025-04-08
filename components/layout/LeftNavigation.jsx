// noinspection JSCheckFunctionSignatures

"use client";
import React, { useEffect, useState } from "react";
import { useFepsLeft } from "../../contexts/FepsLeftContext";
import { useEditing } from "../../contexts/EditingContext";

export default function LeftNavigation() {
  const { selectedFepLeft, setSelectedFepLeft } = useFepsLeft();
  const { setEditing } = useEditing();
  const [, setMenuData] = useState([]);

  const getGroupedClients = async () => {
    const clients = await fetch(
      `/api/clients?grouped=true&navigator=Andrew%20McCauley`,
    );
    const data = await clients.json();
    await setMenuData(data);
  };

  useEffect(() => {
    getGroupedClients().then();
  }, []);

  const navStatus = [
    ["All", "all", "bg-base-300 shadow-lg", "hover:bg-base-200"],
    ["Active", "active", "bg-success shadow-lg", "hover:bg-success"],
    ["Inactive", "inactive", "bg-error shadow-lg", "hover:bg-error"],
    ["In Progress", "in-progress", "bg-warning shadow-lg", "hover:bg-warning"],
    ["Graduated", "graduated", "bg-info shadow-lg", "hover:bg-info"],
  ];
  const navAgeGroup = ["All", "Adult", "Youth"];

  return (
    <div>
      <ul className="menu menu-vertical bg-base-100 mb-4 w-full rounded">
        {navStatus.map((item, i) => (
          <li className={`mb-1`} key={i}>
            <a
              onClick={() =>
                setSelectedFepLeft((prevState) => {
                  return {
                    ...prevState,
                    status: item[0],
                  };
                })
              }
              className={`${item[3]} capitalize ${selectedFepLeft.status === item[0] || selectedFepLeft.status === "" ? item[2] : ""}`}
            >
              {item[0]}
            </a>
          </li>
        ))}
      </ul>
      <ul className="menu menu-vertical bg-base-100 mb-4 w-full rounded">
        {navAgeGroup.map((item, i) => (
          <li className={`mb-1`} key={i}>
            <a
              onClick={() =>
                setSelectedFepLeft((prevState) => {
                  return {
                    ...prevState,
                    age: item,
                  };
                })
              }
              className={`hover:bg-base-200 ${selectedFepLeft.age === item ? "bg-base-300 text-base-content shadow-lg" : ""}`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <ul className="menu menu-vertical bg-base-100 mb-4 w-full rounded">
        <li>
          <a
            onClick={() => {
              setEditing("add-client");
            }}
            className={`hover:bg-base-200`}
          >
            Add New Client +
          </a>
        </li>
      </ul>
    </div>
  );
}
