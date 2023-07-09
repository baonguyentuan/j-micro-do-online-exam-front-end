import React from 'react';
import {Link} from "react-router-dom";
import {Typography} from "antd";
import styled from "styled-components";

const {Title} = Typography;

function Breadcrumb({items}: any) {
    return (
        <NavBreadcrumb className="text-black mt-4 mb-10" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex font-bold">
                {items.map((item: any, index: number) => (
                    <Title level={4} key={index} className="mr-1">
                        {item.link ? (
                            <Link to={item.link}>{item.name}</Link>
                        ) : (
                            <span className='text-gray-500'>{item.name}</span>
                        )}
                        {index !== items.length - 1 && <span> &gt; </span>}
                    </Title>
                ))}
            </ol>
        </NavBreadcrumb>
    )
}

const NavBreadcrumb = styled.nav`
  h4.ant-typography {
    margin-top: 0;
  !important;
  }

  a {
    color: #0E2954;
    transition: .3s all ease;
    font-size: 18px;
  }

`

export default Breadcrumb