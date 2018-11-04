import React, {Component} from 'react';
import CodeEditor from "../../components/code-editor/code-editor";

/**
 * State controlling component for Code Editor.
 */
export default class StatefulCodeEditor extends Component{

    state = {
        code: ''
    };


    onChange = ({target}) =>{
        const {value} = target;
        this.setState({code: value});
    };

    render(){
        return <CodeEditor {...this.props} onChange={this.onChange} code={this.state.code}/>
    }

}