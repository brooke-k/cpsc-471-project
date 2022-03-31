import React from "react";

const AlertRow = (props) => {
  return (
    <>
      <td>{props.name}</td>
      <td>{props.prodID}</td>
      <td>{props.status}</td>
      <td>{props.dateIssued}</td>
    </>
  );
};

export default AlertRow;
