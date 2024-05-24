import React from 'react';
import {Helmet} from 'react-helmet-async';
const Title = ({title='Chating',description='here you can chat with us'}) => {

    return (
        <Helmet>
            <title>
                {title}
            </title>
            <meta  name='description' content={description} />
        </Helmet>
    );
}

export default Title;
