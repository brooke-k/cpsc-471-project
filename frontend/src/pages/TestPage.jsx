import React from "react";
import AlertRow from "../components/AlertRow";
import AlertTable from "../components/AlertTable";
import ReportForm from "../components/ReportForm";
import UserCollection from "../components/UserCollection";
import AdminHome from "./AdminHome";
import ManufactHome from "./ManufactHome";
import ProductSearch from "./ProductSearch";
import UserProfile from "./UserProfile";
import RetailerInfo from "../components/RetailerInfo";
import UserTest from "../test_connections/UserTest";

const TestPage = () => {
  return (
    <>
      <h1>
        <UserTest />
      </h1>
    </>
  );
};

export default TestPage;
