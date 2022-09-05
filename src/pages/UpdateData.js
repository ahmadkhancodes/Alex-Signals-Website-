import React from "react";
import UpdateInputForm from "../componenets/UpdateInputForm";
import DashboardComponent from "../componenets/DashboardComponent";
import { useLocation } from "react-router-dom";

function UpdateData() {
  const { state } = useLocation();

  return (
    <>
      <DashboardComponent Component={UpdateInputForm} data={state} />
    </>
  );
}

export default UpdateData;
