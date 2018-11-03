import React, {Component} from 'react';
import './App.css';
import UnSafeStatefulConsole from './widgets/unsafe-statefull-console/unsafe-stateful-console'


class App extends Component {
    render() {
        return (
            <div className='App'>
                <UnSafeStatefulConsole/>
            </div>
        );
    }
}

export default App;
