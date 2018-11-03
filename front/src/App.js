import React, {Component} from 'react';
import './App.css';
import StatefulCodeEditor from './widgets/stateful-code-editor/stateful-code-editor'


class App extends Component {
    render() {
        return (
            <div className='App'>
                <StatefulCodeEditor/>
            </div>
        );
    }
}

export default App;
