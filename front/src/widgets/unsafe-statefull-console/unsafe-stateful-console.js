import React, {Component, Fragment} from 'react';
import CodeEditor from "../../components/code-editor/code-editor";
import CodeBlock from "../../components/code-block/code-block";


const RunButton  = ({onClick}) => (
    <button onClick={onClick} className='run-btn'>Run</button>
);

class Console {

    constructor(){
        this.result = '';
    }

    append(arg){
        this.result = this.result.concat(arg, '\n');
    }

    log(...args){
        this.append(args.join(' '));
    }

    error(e){
        this.append(e.message);
    }


}

function executeCode(code, console){
    try{
        eval(code);
    }catch(e){
        console.error(e);
    }
}

export default class UnsafeStatefulConsole extends Component {

    state = {
        currentQueryCode: '',
        queries: []
    };

    activeCodeEditor = React.createRef();

    onChange = ({target}) => {
        const {value} = target;
        this.setState({currentQueryCode: value});
    };

    runQuery = ()=>{
        const output = new Console();
        executeCode(this.state.currentQueryCode, output);
        const currentQuery = {
            code: this.state.currentQueryCode,
            result: output.result
        };
        const nextQueries = [...this.state.queries, currentQuery];
        this.setState({queries: nextQueries, currentQueryCode: '' }, ()=>{
            this.focusActiveCodeEditor();
        });
    };

    focusActiveCodeEditor =() =>{
        this.activeCodeEditor.current.textArea.current.focus();
    };

    componentDidMount(){
        this.focusActiveCodeEditor();
        document.addEventListener('keypress', this.focusActiveCodeEditor);
    }

    componentWillUnmount(){
        document.removeEventListener('keypress', this.focusActiveCodeEditor);
    }

    renderQuery({code, completed, result}, index) {

            return (
                <Fragment key={index}>
                    <CodeBlock code={code} showLineNumbers={false}/>
                    <div className='console-weak-separator' />
                    <CodeBlock code={result} showLineNumbers={false}/>
                    <div className='console-separator'/>
                </Fragment>
            );

    }

    renderCurrentQuery(){
        return (
            <Fragment key={this.state.queries.length}>
                <RunButton onClick={this.runQuery}/>
                <CodeEditor showLineNumbers={false} code={this.state.currentQueryCode}
                            onChange={this.onChange} ref={this.activeCodeEditor}/>
            </Fragment>
        )
    }

    render(){
        return (
            <Fragment>
                {this.state.queries.map(this.renderQuery)}
                {this.renderCurrentQuery()}
            </Fragment>
        )
    }

}