/*import logo from './logo.svg';
import './App.css';
import Payroll from './ArtistPayroll';

function App() {
  return (
    <div className="App">
      <Payroll></Payroll>
    </div>
  );
}

export default App;

/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payroll from './Payroll';
import Result from './Result';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Payroll />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </Router>
    );
}

export default App;

//blackbox
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payroll from './ArtistPayroll';
import Summary from './Summary';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Payroll />} />
                <Route path="/summary" element={<Summary />} />
            </Routes>
        </Router>
    );
}

export default App;
*/
// App.js or where you configure your routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtistPayroll from './ArtistPayroll'; // Adjust the path as needed
import Summary from './Summary'; // Adjust the path as needed
import EditPayroll from './EditPayroll';
import AllPayrolls from './AllPayrolls';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ArtistPayroll />} />
                <Route path="/result" element={<Summary />} />
                <Route path="/edit-payroll/:id" element={<EditPayroll />} />
                <Route path="/all-payrolls" element={<AllPayrolls />} />
            </Routes>
        </Router>
    );
}

export default App;

