import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export default function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        DeliveryId ='',
        DeliveryName='',
        PhoneNumber='',
        MonthofPayment='',
        PaymentMethod='',
        NoOfDeliveries='',
        Deduction='',
        Payment='',
        NetPayment=''
    } = location.state ||{}; // Default to empty object if location.state is undefined

    const generateSlip = () => {
        
        console.log("Generating slip...");
        navigate('/payroll-summary');
    };

    const handleUpdate = () => {
        // Assuming location.state contains the MongoDB _id
        const { _id } = location.state; // Extract MongoDB _id from location.state
        navigate(`/edit-payroll/${_id}`, { state: location.state });
    };

    return (
        <div className="container mt-5">
            <div className="row p-3 bg-success text-light text-center">
                <h1>Delivery Payroll Summary</h1>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <h3 className="text-center">Payroll Details</h3>
                    <div className="form-group mx-auto">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Delivery ID</th>
                                    <td>{DeliveryId}</td>
                                </tr>
                                <tr>
                                    <th>Delivery Name</th>
                                    <td>{DeliveryName}</td>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <td>{PhoneNumber}</td>
                                </tr>
                                <tr>
                                    <th>Month of Payment</th>
                                    <td>{MonthofPayment}</td>
                                </tr>
                                <tr>
                                    <th>Payment Method</th>
                                    <td>{PaymentMethod}</td>
                                </tr>
                                <tr>
                                    <th>Number of Deliveries</th>
                                    <td>{NoOfDeliveries}</td>
                                </tr>
                                <tr>
                                    <th>Deduction</th>
                                    <td>{Deduction}</td>
                                </tr>
                                <tr>
                                    <th>Total Payment</th>
                                    <td>{Payment}</td>
                                </tr>
                                <tr>
                                    <th>Net Payment</th>
                                    <td>{NetPayment}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={generateSlip}
                            className="btn btn-dark btn-block mt-3"
                        >
                            Generate Slip
                        </button>
                  
                  
                       <button
                            onClick={handleUpdate}
                            className="btn btn-primary btn-block mt-3"
                        >
                            Update
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    );
}
