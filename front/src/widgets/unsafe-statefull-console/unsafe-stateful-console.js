import React, {Component, Fragment} from 'react';
import CodeEditor from "../../components/code-editor/code-editor";
import CodeBlock from "../../components/code-block/code-block";
import Icon from '../../components/icon/icon';

const RunButton = ({onClick}) => (
    <Icon type="arrow-right" onClick={onClick} className='run-btn-active' width="12" height="12" fill="#4a90e2"/>
);

const RunIcon = ()=>(
    <Icon type="arrow-right" className='run-btn' width="12" height="12" fill="#fff"/>
);

const ResultIcon = ()=>(
    <Icon type="arrow-left" className='run-btn' width="12" height="12" fill="#fff"/>
);


class Console {

    constructor() {
        this.result = '';
    }

    append(arg) {
        this.result = this.result.concat(arg, '\n');
    }

    log(...args) {
        this.append(args.join(' '));
    }

    error(e) {
        this.append(e.message);
    }


}

function executeCode(code, console) {
    try {
        eval(code);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Stateful console emitator. Uses main thread eval to execute javascript. Wraps console
 * Monkey-matches console object to output console stream to output element.
 */
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

    runQuery = () => {
        const output = new Console();
        executeCode(this.state.currentQueryCode, output);
        const currentQuery = {
            code: this.state.currentQueryCode,
            result: output.result
        };
        const nextQueries = [...this.state.queries, currentQuery];
        this.setState({queries: nextQueries, currentQueryCode: ''}, () => {
            this.focusActiveCodeEditor();
        });
    };

    focusActiveCodeEditor = () => {
        this.activeCodeEditor.current.textArea.current.focus();
    };

    componentDidMount() {
        this.focusActiveCodeEditor();
        document.addEventListener('keypress', this.focusActiveCodeEditor);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.focusActiveCodeEditor);
    }

    renderQuery({code, completed, result}, index) {

        return (
            <Fragment key={index}>
                <div className='query'>
                    <RunIcon/>
                    <CodeBlock code={code} showLineNumbers={false}/>
                </div>
                <div className='console-weak-separator'/>
                <div className='query'>
                    <ResultIcon/>
                    <CodeBlock code={result} showLineNumbers={false}/>
                </div>
                <div className='console-separator'/>
            </Fragment>
        );

    }

    renderCurrentQuery() {
        return (
            <div className='query' key={this.state.queries.length}>
                <RunButton onClick={this.runQuery}/>
                <CodeEditor showLineNumbers={false} code={this.state.currentQueryCode}
                            onChange={this.onChange} ref={this.activeCodeEditor}/>
            </div>
        )
    }

    render() {
        return (
            <Fragment>
                {this.state.queries.map(this.renderQuery)}
                {this.renderCurrentQuery()}
            </Fragment>
        )
    }

}