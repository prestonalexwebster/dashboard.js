import SyntaxHighlighter from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/styles/hljs/tomorrow-night-eighties';
import PropTypes from 'prop-types';
import React from 'react';

/**
 *
 * CodeBlock is component highlighting it's static code content.
 * It's react-syntax-highligher wrapper.
 * Default language - javascript
 * Default style - hljs/tomorrow-night-eighties
 * Shows line numbers by default.
 */
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