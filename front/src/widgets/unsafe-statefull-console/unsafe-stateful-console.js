import React, {Component, Fragment} from 'react';
import CodeEditor from "../../components/code-editor/code-editor";
import CodeBlock from "../../components/code-block/code-block";
import Icon from '../../components/icon/icon';
import styled, {css} from 'styled-components';

const QueryComponent = styled.div`
  display: flex;
  align-items: flex-start;
`;

const QueryBorder = styled.div`
  width: 100%;
  display: block;
  background: rgb(50,50,50);
  
  ${props => props.weak 
   ? css`height: 1px;`
   : css`height: 2px;`};
  
`;




const RunIconActive = ({onClick, className}) => (
    <Icon type="arrow-right" onClick={onClick} className={className} width="12" height="12"/>
);

const RunButtonActive = styled(RunIconActive)`
    fill: #4a90e2;
    cursor: pointer;
    margin-left: 5px;
    margin-top: 21px;
`;

const RunIcon = ({className})=>(
    <Icon type="arrow-right" className={className} width="12" height="12"/>
);

const RunButton = styled(RunIcon)`
   fill: #fff;
   margin-left: 5px;
   margin-top: 21px;
`;

const ResultIcon = ({className})=>(
    <Icon type="arrow-left" className={className} width="12" height="12"/>
);

const ResultButton = styled(ResultIcon)`
   fill: #fff;
   margin-left: 5px;
   margin-top: 21px;
`;

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
                <QueryComponent>
                    <RunButton/>
                    <CodeBlock code={code} showLineNumbers={false}/>
                </QueryComponent>
                <QueryBorder weak/>
                <QueryComponent>
                    <ResultButton/>
                    <CodeBlock code={result} showLineNumbers={false}/>
                </QueryComponent>
                <QueryBorder/>
            </Fragment>
        );

    }

    renderCurrentQuery() {
        return (
            <QueryComponent key={this.state.queries.length}>
                <RunButtonActive onClick={this.runQuery}/>
                <CodeEditor showLineNumbers={false} code={this.state.currentQueryCode}
                            onChange={this.onChange} ref={this.activeCodeEditor}/>
            </QueryComponent>
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