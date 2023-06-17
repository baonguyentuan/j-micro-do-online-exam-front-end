import React from 'react';
import { Link } from "react-router-dom";

function Breadcrumb({ items }: any) {
    return (
        <nav className="text-black my-8 mx-4" style={{ color: '#2b8aeb', fontSize: '16px' }} aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
                {items.map((item: any, index: number) => (
                    <li key={index} className="mr-1">
                        {item.link ? (
                            <Link to={item.link}>{item.name}</Link>
                        ) : (
                            <span>{item.name}</span>
                        )}
                        {index !== items.length - 1 && <span> &gt; </span>}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Breadcrumb