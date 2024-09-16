import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeliveryPayroll from './DeliveryPayroll'; // Adjust the path as necessary
import ResultPage from './ResultPage';
import EditPayroll from './EditPayroll';
import PayrollSummary from './PayrollSummary';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DeliveryPayroll />} />
                <Route path="/result" element={<ResultPage />} />
                <Route path="/edit-payroll/:id" element={<EditPayroll />} />
                <Route path="/payroll-summary" element={<PayrollSummary />} /> 

             
            </Routes>
        </Router>
    );
}

export default App;
