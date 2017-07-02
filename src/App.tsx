import * as React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { configureStore } from './store';
import { loadMockData } from './store/actions';
import { Routes } from './routes';

import 'react-select/dist/react-select.css';

const store = configureStore();

// tslint:disable-next-line:no-any 
store.dispatch(loadMockData() as any);

class App extends React.Component<{}, {}> {

    constructor() {
        super();
    }

    render() {

        return (
        <Provider store={store}>    
            <Router>
                <Routes />
            </Router>
        </Provider>
        );
    }
}



export default App;
