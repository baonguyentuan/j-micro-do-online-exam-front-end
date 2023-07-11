import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


function Breadcrumb({ items }: any) {
  return (
    <NavBreadcrumb className="text-black mt-4 mb-10" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex flex-wrap font-semibold">
        {items.map((item: any, index: number) => (
          <div key={index} className="mr-1 flex flex-wrap items-center">
            {item.link ? (
              <Link to={item.link}>{item.name}</Link>
            ) : (
              <span className="text-gray-500">{item.name}</span>
            )}
            {index !== items.length - 1 && <span> &gt; </span>}
          </div>
        ))}
      </ol>
    </NavBreadcrumb>
  );
}

const NavBreadcrumb = styled.nav`
  a {
    color: #0E2954;
    font-size: 18px;
    transition: .3s all ease;

    &:hover {
      color: #007791;
    }
  }

`;

export default Breadcrumb;