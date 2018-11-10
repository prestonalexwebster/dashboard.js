import CodeBlock from '../code-block/code-block';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

const CodeEditorWrapper = styled.div`
  width: 100%;
  display: block;
`;

const CodeEditorComponent = styled.div`
  position: relative;
`;

const CodeEditorTextArea = styled.textarea`
  font-size: 13px;
  position: absolute;
  background: rgba(0,0,0,0);
  top: 3px;
  bottom: 0px;
  color: rgba(0,0,0,0);
  border: none;
  resize: none;
  caret-color: #fff;
  min-height: 22px;
  
  ${props => css`
      left: ${props.offset+5}px;
      width: calc(100% - ${props.offset + 9}px);
  `};
`;



/**
 * CodeEditor is fully controlled component with dynamic code content. It's editable CodeBlock wrapper.
 */
class CodeEditor extends Component {


    static propTypes = {
        code: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        showLineNumbers: PropTypes.func.boolean
    };

    static defaultProps = {
        showLineNumbers: true
    };

    root = React.createRef();

    textArea = React.createRef();

    getOffset() {
        if (!this.root.current || !this.props.showLineNumbers) return 0;
        const lineNumberBlock = this.root.current.querySelectorAll('code')[0];
        if (!lineNumberBlock) return 0;
        return lineNumberBlock.getBoundingClientRect().width;
    }

    componentDidMount() {
        this.forceUpdate();//to set textarea correct offset
    }

    render() {
        const {code, onChange, ...rest} = this.props;
        return (
            <CodeEditorWrapper>{/*todo: sync height with code-editor-text-area*/}
                <CodeEditorComponent ref={this.root}>
                <CodeEditorTextArea autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                          offset={this.getOffset()} ref={this.textArea}
                          onInput={onChange}>{code}</CodeEditorTextArea>
                    <CodeBlock {...rest} code={code}/>
                </CodeEditorComponent>
            </CodeEditorWrapper>
        )
    }

}


export default CodeEditor;