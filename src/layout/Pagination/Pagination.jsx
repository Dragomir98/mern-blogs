import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Pagination({
  data,
  RenderComponent,
  pageLimit,
  dataLimit,
}) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const prevPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (e) => {
    const pageNumber = Number(e.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);

  return (
    <>
      <Box component={Container} maxWidth="md">
        <Box component={Grid} container spacing={3} justifyContent="center">
          {getPaginatedData().map((d, idx) => (
            <RenderComponent key={idx} data={d} />
          ))}
        </Box>
      </Box>

      <div className={`pagination ${data.length <= 7 && "hidden"}`}>
        <button
          onClick={prevPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : "inactive"
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={nextPage}
          className={`next ${currentPage === pages && "disabled"}`}
        >
          next
        </button>
      </div>
    </>
  );
}
