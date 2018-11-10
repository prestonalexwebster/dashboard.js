import React, {Component} from 'react';
import UnSafeStatefulConsole from './widgets/unsafe-statefull-console/unsafe-stateful-console'
import styled from 'styled-components';

const AppContainer = styled.div` 
  font-size: 13px;
  background: rgb(45, 45, 45);
  min-height: 100vh;
`;

class App extends Component {
    render() {
        return (
            <AppContainer>
                <UnSafeStatefulConsole/>
            </AppContainer>
        );
    }
}

export default App;
