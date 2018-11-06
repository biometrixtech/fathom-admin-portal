// import React specific components
import React from 'react';

// import third-party libraries
import { BrowserRouter as Router, Route, } from 'react-router-dom';

// import components
import { Login, } from './components';

// import AWS specific components
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const App = () => (
    <Router>
        <div>
            <Route exact path={'/'} component={Login} />
        </div>
    </Router>
);

export default App;
