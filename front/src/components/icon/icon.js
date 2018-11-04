import IconArrowRight from './icon-types/icon-arrow-right';
import IconArrowLeft from './icon-types/icon-arrow-left';
import React from 'react';

const arrowRight = 'arrow-right';
const arrowLeft = 'arrow-left';

/**
 * Icon is wrapper component for standard icons. Type prop is responsible for component type.
 * The other props are deligated to concrete icon instance.
 */
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