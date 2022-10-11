import React from "react";
import styled from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumber = [];
  
  // Math.ceil: 올림
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Head>
      {pageNumber.map((pageNum) => (
        <Number
          key={pageNum}
          onClick={() => paginate(pageNum)}
        >
          {pageNum}
        </Number>
      ))}
    </Head>
  );
};

export default Pagination;

const Head = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  list-style: none;
  padding: 0;
`
const Number = styled.li`
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
`