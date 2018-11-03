import React, {Component} from 'react';
import CodeEditor from "../../components/code-editor/code-editor";


export default class StatefulCodeEditor extends Component{

    state = {
        code: ''
    };


    onChange = ({target}) =>{
        const {value} = target;
        this.setState({code: value});
    };

    render(){
        return <CodeEditor onChange={this.onChange} code={this.state.code}/>
    }

}