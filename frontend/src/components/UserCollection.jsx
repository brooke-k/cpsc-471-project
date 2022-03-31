import React from "react";
import ProductTable from "./ProductTable";
const UserCollection = () => {
  const collectionName = "Favourite Desserts";
  return (
    <>
      <h1>User Collection</h1>
      <h2>{collectionName}</h2>
      <ProductTable />
      <button>Share This Collection</button>
    </>
  );
};

export default UserCollection;
