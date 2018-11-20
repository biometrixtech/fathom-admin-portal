// import React specific components
import React from 'react';
import { connect } from 'react-redux';

// import third-party libraries
import { BrowserRouter as Router, Route, } from 'react-router-dom';

// import components
import { CreateAccountCodes, Login, SingleAccountCode, } from './components';

// import AWS specific components
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const App = () => (
    <Router>
        <div>
            <Route exact path={'/'} component={Login} />
            <Route exact path={'/account_codes'} component={CreateAccountCodes} />
            <Route exact path={'/account_code/:athlete_code/:coach_code'} component={SingleAccountCode} />
        </div>
    </Router>
);

export default connect()(App);
