import { CircularProgress } from "@mui/material";
import React from "react";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <section className="loading-spinner">
      <CircularProgress size={100} />
    </section>
  );
};

export default Spinner;
