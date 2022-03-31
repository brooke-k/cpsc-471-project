import React from "react";

const ReportRow = (props) => {
  return (
    <>
      <td>{props.reportNo}</td>
      <td>{props.subject}</td>
      <td>{props.status}</td>
      <button>Resolve Now</button>
    </>
  );
};

export default ReportRow;
