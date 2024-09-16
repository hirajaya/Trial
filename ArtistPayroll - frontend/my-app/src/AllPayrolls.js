import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllPayrolls() {
    const navigate = useNavigate();
    const [payrollData, setPayrollData] = useState([]);

    useEffect(() => {
        // Fetch all payroll data when the component loads
        const fetchPayrollData = async () => {
            try {
                const response = await fetch('http://localhost:8000/payroll');
                if (!response.ok) {
                    throw new Error('Failed to fetch payroll data');
                }
                const data = await response.json();
                setPayrollData(data);
            } catch (error) {
                console.error('Error fetching payroll data:', error);
            }
        };

        fetchPayrollData();
    }, []);

    const handleUpdate = (id, payroll) => {
        // Redirect to the update page with the payroll data
        navigate(`/edit-payroll/${id}`, { state: payroll });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/payroll/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete payroll');
            }
            // Remove the deleted payroll from the state
            setPayrollData(payrollData.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting payroll:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row p-3 bg-success text-light text-center">
                <h1>All Artist Payrolls</h1>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <h3 className="text-center">All Payroll Records</h3>
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Artist ID</th>
                                <th>Artist Name</th>
                                <th>Phone Number</th>
                                <th>Email Address</th>
                                <th>Month of Payment</th>
                                <th>Payment Method</th>
                                <th>No. of T-shirts</th>
                                <th>No. of Caps</th>
                                <th>No. of Tote Bags</th>
                                <th>No. of Light Sticks</th>
                                <th>No. of Bands</th>
                                <th>No. of Albums</th>
                                <th>No. of Tickets</th>
                                <th>Total Payment of Merchandise</th>
                                <th>Total Payment of Albums</th>
                                <th>Total Payment of Tickets</th>
                                <th>Total Payment</th>
                                <th>Handling Fee</th>
                                <th>Net Payment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrollData.length > 0 ? (
                                payrollData.map((payroll) => (
                                    <tr key={payroll._id}>
                                        <td>{payroll.ArtistId}</td>
                                        <td>{payroll.ArtistName}</td>
                                        <td>{payroll.PhoneNumber}</td>
                                        <td>{payroll.EmailAddress}</td>
                                        <td>{payroll.MonthofPayment}</td>
                                        <td>{payroll.PaymentMethod}</td>
                                        <td>{payroll.NoOfTshirt}</td>
                                        <td>{payroll.NoOfCaps}</td>
                                        <td>{payroll.NoOfToteBags}</td>
                                        <td>{payroll.NoOfLightSticks}</td>
                                        <td>{payroll.NoOfBands}</td>
                                        <td>{payroll.NoOfAlbums}</td>
                                        <td>{payroll.NoOfTickets}</td>
                                        <td>{payroll.TotalPaymentofMerchandise}</td>
                                        <td>{payroll.TotalPaymentofAlbums}</td>
                                        <td>{payroll.TotalPaymentofTickets}</td>
                                        <td>{payroll.Payment}</td>
                                        <td>{payroll.HandlingFee}</td>
                                        <td>{payroll.NetPayment}</td>
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
                                    <td colSpan="20" className="text-center">
                                        No payroll records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
