import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { CadBlog } from '../../_core/Blog';

const CardBlog = ({blog}: CadBlog) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        //Link to page detail
    };

    const { title, description, createdAt } = blog;

    return (
        <div className="border border-gray-300 bg-blue-50 rounded sm:rounded-lg p-4 mb-4 mx-4 cursor-pointer" onClick={handleClick}>
            <h2 className="text-lg font-bold text-blue-600 hover:text-blue-800">{title}</h2>
            <div className="flex items-center mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.666A6.667 6.667 0 1110 3.334 6.667 6.667 0 0110 16.666z" />
                    <path
                        d="M10 6c.368 0 .667.299.667.667v3.666l2.33 1.4a.662.662 0 01.223.927.673.673 0 01-.95.224l-2.603-1.56V6.667c0-.368.299-.667.666-.667z" />
                </svg>
                <span className="text-gray-500 text-sm">{moment(createdAt).format('MMM D, YYYY')}</span>
            </div>
            <p className="mt-2 text-gray-600">{`${description.substring(0, 300)}${description.length > 300 ? '...' : ''}`}</p>
        </div>
    );
};

export default CardBlog;
