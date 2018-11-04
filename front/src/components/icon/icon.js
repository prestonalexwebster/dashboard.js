import IconArrowRight from './icon-types/icon-arrow-right';
import IconArrowLeft from './icon-types/icon-arrow-left';
import React from 'react';

const arrowRight = 'arrow-right';
const arrowLeft = 'arrow-left';


export default ({type, ...props}) => {
    switch (type) {
        case arrowRight:
            return <IconArrowRight {...props}/>;
        case arrowLeft:
            return <IconArrowLeft {...props}/>;
        default:
            return null;
    }
};