import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './payrollsummary.css'; // Ensure to style your page accordingly

export default function PayrollSummary() {
    const navigate = useNavigate();
    const [payrollData, setPayrollData] = useState([]);

    useEffect(() => {
        // Fetch all payroll data when the component loads
        const fetchPayrollData = async () => {
            try {
                const response = await fetch('http://localhost:8000/Deliverypayroll');
                if (!response.ok) {
                    throw new Error('Failed to fetch payroll data');
                }
                const data = await response.json();
                setPayrollData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPayrollData();
    }, []);

    const handleUpdate = (id, payroll) => {
        // Redirect to the update page with the payroll data
        navigate(`/edit-payroll/${id}`, { state: payroll });
    };

   /* const handleUpdate = async (id, payroll) => {
        try {
            // Fetch the payroll data before navigating
            const response = await fetch(`http://localhost:8000/Deliverypayroll/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch payroll data');
            }
            //const payrollData = await response.json();
            
            // Navigate to the update page with fetched data
            navigate(`/edit-payroll/${id}`, { state: payroll});
        } catch (error) {
            console.error('Error:', error);
        }
    };*/


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/Deliverypayroll/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete payroll');
            }
            // Remove the deleted payroll from the state
            setPayrollData(payrollData.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row p-3 bg-success text-light text-center">
                <h1>Delivery Payroll Summary</h1>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <h3 className="text-center">All Payroll Records</h3>
                    <div className="table-responsive-sm">
                   
    
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Delivery ID</th>
                                <th>Delivery Name</th>
                                <th>Phone Number</th>
                                <th>Month of Payment</th>
                                <th>Payment Method</th>
                                <th>No. of Deliveries</th>
                                <th>Deduction</th>
                                <th>Payment</th>
                                <th>Net Payment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrollData.length > 0 ? (
                                payrollData.map((payroll) => (
                                    <tr key={payroll._id}>
                                        <td>{payroll.DeliveryId}</td>
                                        <td>{payroll.DeliveryName}</td>
                                        <td>{payroll.PhoneNumber}</td>
                                        <td>{payroll.MonthofPayment}</td>
                                        <td>{payroll.PaymentMethod}</td>
                                        <td>{payroll.NoOfDeliveries}</td>
                                        <td>{payroll.Deduction}</td>
                                        <td>{payroll.Payment}</td>
                                        <td>{payroll.NetPay}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary mr-2"
                                                onClick={() => handleUpdate(payroll._id, payroll)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(payroll._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">
                                        No payroll records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}
