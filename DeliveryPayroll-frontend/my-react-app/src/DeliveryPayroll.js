import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Dpay.css'; // Ensure the CSS file is properly imported and exists

export default function DeliveryPayroll() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        DeliveryId: '',
        DeliveryName: '',
        PhoneNumber: '',
        MonthofPayment: '',
        PaymentMethod: '',
        NoOfDeliveries: 0,
        Deduction: 0,
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

        const Payment = formData.NoOfDeliveries * 500; // Assuming 500 is the rate per delivery
        const NetPayment = Payment - formData.Deduction;

        const resultData = {
            ...formData,
            Payment,
            NetPayment
        };
 
        console.log(resultData);

        try {
            const response = await fetch('http://localhost:8000/Deliverypayroll', {
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

    

    
    

    return (
        <div className="container">
            <div className="form-header">
                <h1>Delivery Payroll Form</h1>
            </div>

            <div className="table-form">
                <form onSubmit={handleSubmit}>
                    <div className="table-row">
                        <div className="table-cell">
                            <input
                                placeholder="Delivery ID"
                                type="text"
                                name="DeliveryId"
                                value={formData.DeliveryId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                placeholder="Delivery Name"
                                type="text"
                                name="DeliveryName"
                                value={formData.DeliveryName}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <input
                                placeholder="Phone Number"
                                type="text"
                                name="PhoneNumber"
                                value={formData.PhoneNumber}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                placeholder="Month of Payment"
                                type="text"
                                name="MonthofPayment"
                                value={formData.MonthofPayment}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <input
                                placeholder="Payment Method"
                                type="text"
                                name="PaymentMethod"
                                value={formData.PaymentMethod}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                placeholder="Number of Deliveries"
                                type="number"
                                name="NoOfDeliveries"
                                value={formData.NoOfDeliveries}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell">
                            <input
                                placeholder="Deduction"
                                type="number"
                                name="Deduction"
                                value={formData.Deduction}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
