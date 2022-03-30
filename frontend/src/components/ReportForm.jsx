import React from "react";

const ReportForm = () => {
  return (
    <>
      <h1>Product Report Form</h1>
      <input type="text" name="subject"></input>
      <label for="subject">Report Subject</label>
      <input type="text" name="reportContent"></input>
      <label for="reportContent">Report details</label>
      <button>Submit Report</button>
    </>
  );
};

export default ReportForm;
