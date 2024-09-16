/*import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './payroll.css';

export default function EditPayroll() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ArtistId: '',
        ArtistName: '',
        PhoneNumber: '',
        EmailAddress: '',
        MonthofPayment: '',
        PaymentMethod: '',
        NoOfTshirt: 0,
        NoOfCaps: 0,
        NoOfToteBags: 0,
        NoOfLightSticks: 0,
        NoOfBands: 0,
        NoOfAlbums: 0,
        NoOfTickets: 0,
    });

    useEffect(() => {
        // Fetch the existing payroll details
        const fetchPayrollDetails = async () => {
            try {
                console.log(`Fetching data for ID: ${id}`);
                const response = await fetch(`http://localhost:8000/payroll/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Fetched data:", data);

                setFormData(data);
            } catch (error) {
                console.error("Error fetching the payroll details:", error);
            }
        };
        fetchPayrollDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform calculations based on form data
    const TotalPaymentofMerchandise = formData.NoOfTshirt * 2000 + formData.NoOfCaps * 1000 + formData.NoOfToteBags * 2000 + formData.NoOfLightSticks * 3500 + formData.NoOfBands * 500;
    const TotalPaymentofAlbums = formData.NoOfAlbums * 500;
    const TotalPaymentofTickets = formData.NoOfTickets * 1000;
    const Payment = TotalPaymentofMerchandise + TotalPaymentofAlbums + TotalPaymentofTickets;
    const HandlingFee = Payment * 0.2;
    const NetPayment = Payment - HandlingFee;

    // Prepare data for submission
    const resultData = {
        ...formData,
        TotalPaymentofMerchandise,
        TotalPaymentofAlbums,
        TotalPaymentofTickets,
        Payment,
        HandlingFee,
        NetPayment
    };


        console.log("Form data to submit:", formData); // Debugging line
        try {
            const response = await fetch(`http://localhost:8000/payroll/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resultData)
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            navigate('/result', { state: data });
        } catch (error) {
            console.error("Error updating the payroll:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row p-3 bg-success text-light text-center">
                <h1>Edit Artist Payroll</h1>
            </div>

            <div className="row mt-4">
                <h3 className="text-center">Edit Payroll Form</h3>
                <div className="form-group mx-auto" style={{ maxWidth: '600px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Artist ID"
                                className="form-control"
                                type="text"
                                name="ArtistId"
                                value={formData.ArtistId}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Artist Name"
                                className="form-control"
                                type="text"
                                name="ArtistName"
                                value={formData.ArtistName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Phone Number"
                                className="form-control"
                                type="text"
                                name="PhoneNumber"
                                value={formData.PhoneNumber}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Email Address"
                                className="form-control"
                                type="email"
                                name="EmailAddress"
                                value={formData.EmailAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Month of Payment"
                                className="form-control"
                                type="text"
                                name="MonthofPayment"
                                value={formData.MonthofPayment}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Payment Method"
                                className="form-control"
                                type="text"
                                name="PaymentMethod"
                                value={formData.PaymentMethod}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Number of T-shirts"
                                className="form-control"
                                type="number"
                                name="NoOfTshirt"
                                value={formData.NoOfTshirt}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Number of Caps"
                                className="form-control"
                                type="number"
                                name="NoOfCaps"
                                value={formData.NoOfCaps}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Number of Tote Bags"
                                className="form-control"
                                type="number"
                                name="NoOfToteBags"
                                value={formData.NoOfToteBags}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Number of Light Sticks"
                                className="form-control"
                                type="number"
                                name="NoOfLightSticks"
                                value={formData.NoOfLightSticks}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Number of Bands"
                                className="form-control"
                                type="number"
                                name="NoOfBands"
                                value={formData.NoOfBands}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Number of Albums"
                                className="form-control"
                                type="number"
                                name="NoOfAlbums"
                                value={formData.NoOfAlbums}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Number of Tickets"
                                className="form-control"
                                type="number"
                                name="NoOfTickets"
                                value={formData.NoOfTickets}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-dark btn-block mt-3">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}*/


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditPayroll() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(state || {});

    useEffect(() => {
        if (state) {
            setFormData(state);
        }
    }, [state]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       // Calculate payment fields directly in handleSubmit
       const TotalPaymentofMerchandise = formData.NoOfTshirt * 2000 +
       formData.NoOfCaps * 1000 +
       formData.NoOfToteBags * 2000 +
       formData.NoOfLightSticks * 3500 +
       formData.NoOfBands * 500;
const TotalPaymentofAlbums = formData.NoOfAlbums * 500;
const TotalPaymentofTickets = formData.NoOfTickets * 1000;
const Payment = TotalPaymentofMerchandise + TotalPaymentofAlbums + TotalPaymentofTickets;
const HandlingFee = Payment * 0.2;
const NetPayment = Payment - HandlingFee;


        try {
            const response = await fetch(`http://localhost:8000/payroll/${formData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify(formData)
             

                body: JSON.stringify({
                    ...formData,
                    TotalPaymentofMerchandise,
                    TotalPaymentofAlbums,
                    TotalPaymentofTickets,
                    Payment,
                    HandlingFee,
                    NetPayment
                })
                    




            });
            if (!response.ok) {
                throw new Error('Failed to update payroll');
            }

            navigate ("/all-payrolls"); 
            // Handle successful update, e.g., redirect or show a message
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="container mt-5">
            <div className="row p-3 bg-success text-light text-center">
                <h1>Edit Artist Payroll</h1>
            </div>

            <div className="row mt-4">
                <h3 className="text-center">Edit Payroll Form</h3>
                <div className="form-group mx-auto" style={{ maxWidth: '600px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Artist ID"
                                className="form-control"
                                type="text"
                                name="ArtistId"
                                value={formData.ArtistId}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Artist Name"
                                className="form-control"
                                type="text"
                                name="ArtistName"
                                value={formData.ArtistName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Phone Number"
                                className="form-control"
                                type="text"
                                name="PhoneNumber"
                                value={formData.PhoneNumber}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Email Address"
                                className="form-control"
                                type="email"
                                name="EmailAddress"
                                value={formData.EmailAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Month of Payment"
                                className="form-control"
                                type="text"
                                name="MonthofPayment"
                                value={formData.MonthofPayment}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Payment Method"
                                className="form-control"
                                type="text"
                                name="PaymentMethod"
                                value={formData.PaymentMethod}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Number of T-shirts"
                                className="form-control"
                                type="number"
                                name="NoOfTshirt"
                                value={formData.NoOfTshirt}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Number of Caps"
                                className="form-control"
                                type="number"
                                name="NoOfCaps"
                                value={formData.NoOfCaps}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Number of Tote Bags"
                                className="form-control"
                                type="number"
                                name="NoOfToteBags"
                                value={formData.NoOfToteBags}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Number of Light Sticks"
                                className="form-control"
                                type="number"
                                name="NoOfLightSticks"
                                value={formData.NoOfLightSticks}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Number of Bands"
                                className="form-control"
                                type="number"
                                name="NoOfBands"
                                value={formData.NoOfBands}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder="Number of Albums"
                                className="form-control"
                                type="number"
                                name="NoOfAlbums"
                                value={formData.NoOfAlbums}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                            <input
                                placeholder="Number of Tickets"
                                className="form-control"
                                type="number"
                                name="NoOfTickets"
                                value={formData.NoOfTickets}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-dark btn-block mt-3">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}