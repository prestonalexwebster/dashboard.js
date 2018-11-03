import SyntaxHighlighter from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/styles/hljs/tomorrow-night-eighties';
import PropTypes from 'prop-types';
import React from 'react';

const CodeBlock = ({code, ...rest}) => {
    return (
        <SyntaxHighlighter language='javascript' style={style} showLineNumbers  {...rest}>
            {code}
        </SyntaxHighlighter>
    );
};

CodeBlock.propTypes = {
    code: PropTypes.string
};

export default CodeBlock;