import CodeBlock from '../code-block/code-block';
import React, {Component} from 'react';
import PropTypes from 'prop-types';


const defaultTextAreaStyle = {
    left: '5px',
    width: 'calc(100% - 7px)'
};

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

    computeStyle(){
       if(!this.root.current || !this.props.showLineNumbers) return defaultTextAreaStyle;
       const lineNumberBlock = this.root.current.querySelectorAll('code')[0];
       if(!lineNumberBlock) return defaultTextAreaStyle;
       const {width} = lineNumberBlock.getBoundingClientRect();
       return {
           left:`${width + 5}px` ,
           width:  `calc(100% - ${width+9}px)`
       }
    }

    componentDidMount(){
        const style = this.computeStyle();
        for(let name in style){
            this.textArea.current.style.setProperty(name,style[name]);
        }
    }

    render() {
        const {code, onChange, ...rest} = this.props;
        return (
            <div className='code-editor' ref={this.root}>
                <textarea className='code-editor-text-area' style={this.computeStyle()} ref={this.textArea}
                          onInput={onChange}>{code}</textarea>
                <CodeBlock {...rest} code={code} />
            </div>
        )
    }

}


export default CodeEditor;