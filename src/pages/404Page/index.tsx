import React from 'react';
import { Result, Button } from 'antd';

function NotFoundPage() {
    return (
        <Result
            status="404"
            title="404 Not Found"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button type="primary" href="/">
                    Go Back Home
                </Button>
            }
        />
    )
}

export default NotFoundPage
