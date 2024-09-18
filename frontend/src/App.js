import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ProductPage from './components/ProductPage';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/product" component={ProductPage} />
          <Route path="/profile" component={ProfilePage} />
          {/* You can add a default route or a home page route here */}
          <Route path="/" exact>
            <h1>Welcome to the App</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
