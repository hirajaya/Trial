   /* import React from 'react';
    //import 'bootstrap/dist/css/bootstrap.min.css';
    import './payroll.css'; // Create and import a custom CSS file for additional styles
    
    export default function Payroll() {
        return (
            <>
                <div className="container mt-5">
                    <div className="row p-3 bg-success text-light text-center">
                        <h1>Artist Payroll Form</h1>
                    </div>
    
                    <div className="row mt-4">
                        <h3 className="text-center">New Payroll Form</h3>
                        <p className="text-success text-center">Form created successfully</p>
                        <div className="form-group mx-auto" style={{ maxWidth: '600px' }}>
                            <div className="d-flex gap-2 mb-3">
                                <input
                                    placeholder="Artist ID"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                                <input
                                    placeholder="Artist Name"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="d-flex gap-2 mb-3">
                                <input
                                    placeholder="Phone Number"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                                <input
                                    placeholder="Email Address"
                                    className="form-control"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="d-flex gap-2 mb-3">
                                <input
                                    placeholder="Month of Payment"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                                <input
                                    placeholder="Payment Method"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="d-flex gap-2 mb-3">
                                <input
                                    placeholder="Number of T-shirts"
                                    className="form-control"
                                    type="number"
                                    required
                                />
                                <input
                                    placeholder="Number of Caps"
                                    className="form-control"
                                    type="number"
                                    required
                                />
                            </div>
                            <div className="d-flex gap-2 mb-3">
                                <input
                                    placeholder="Number of Tote Bags"
                                    className="form-control"
                                    type="number"
                                    required
                                />
                                <input
                                    placeholder="Number of Light Sticks"
                                    className="form-control"
                                    type="number"
                                    required
                                />
                            </div>
                            <div className="d-flex gap-2 mb-3">
                                <input
                                    placeholder="Number of Bands"
                                    className="form-control"
                                    type="number"
                                    required
                                />
                                <input
                                    placeholder="Number of Albums"
                                    className="form-control"
                                    type="number"
                                    required
                                />
                            </div>
                            <div className="d-flex gap-2 mb-3">
                                <input
                                    placeholder="Number of Tickets"
                                    className="form-control"
                                    type="number"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-dark btn-block mt-3">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
 */
    import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './payroll.css'; // Make sure this file is properly imported and exists

export default function Payroll() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ArtistId: '',
        ArtistName: '',
        PhoneNumber: '',
        EmailAddress: '',
        MonthofPayment: '',
        PaymentMethod: '',
        NoOfTshirt: '',
        NoOfCaps: '',
        NoOfToteBags: '',
        NoOfLightSticks: '',
        NoOfBands: '',
        NoOfAlbums: '',
        NoOfTickets: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const TotalPaymentofMerchandise = formData.NoOfTshirt * 2000 + formData.NoOfCaps * 1000 + formData.NoOfToteBags * 2000 + formData.NoOfLightSticks * 3500 + formData.NoOfBands * 500;
        const TotalPaymentofAlbums = formData.NoOfAlbums * 500;
        const TotalPaymentofTickets = formData.NoOfTickets * 1000;
        const Payment = TotalPaymentofMerchandise + TotalPaymentofAlbums + TotalPaymentofTickets;
        const HandlingFee = Payment * 0.2;
        const NetPayment = Payment - HandlingFee;

        const resultData = {
            ...formData,
            TotalPaymentofMerchandise,
            TotalPaymentofAlbums,
            TotalPaymentofTickets,
            Payment,
            HandlingFee,
            NetPayment
        };

        try {
            const response = await fetch('http://localhost:8000/payroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resultData)
            });

            if (!response.ok) {
                throw new Error('Failed to create payroll');
            }

            const result = await response.json();
            navigate('/result', { state: result });
        } catch (error) {
            console.error('Error:', error);
        }
    };


        //navigate('/result', { state: resultData });
    

    return (
        <div className="container mt-5">
            <div className="row p-3 bg-success text-light text-center">
                <h1>Artist Payroll Form</h1>
            </div>

            <div className="row mt-4">
                <h3 className="text-center">New Payroll Form</h3>
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
                                //required
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
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

