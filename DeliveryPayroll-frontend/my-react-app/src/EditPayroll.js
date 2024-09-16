/*import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPayroll() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    DeliveryId: '',
    DeliveryName: '',
    PhoneNumber: '',
    MonthofPayment: '',
    PaymentMethod: '',
    NoOfDeliveries: 0,
    Deduction: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8000/Deliverypayroll/${id}`)
      .then(response => response.json())
      .then(data => setFormData(data));
      
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

    const Payment = formData.NoOfDeliveries * 500;
    const NetPayment = Payment - formData.Deduction;

    const updatedData = {
      ...formData,
      Payment,
      NetPayment
    };

    try {
      const response = await fetch(`http://localhost:8000/Deliverypayroll/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update payroll');
      }
      
      const result = await response.json();
      navigate('/result', { state: /*updatedData*///result });
    //} catch (error) {
     // console.error('Error:', error);
    //}
  //};*/

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
        try {
            const response = await fetch(`http://localhost:8000/Deliverypayroll/${formData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to update payroll');
            }

            navigate ('/payroll-summary'); 
            // Handle successful update, e.g., redirect or show a message
        } catch (error) {
            console.error('Error:', error);
        }
    };


  return (
    <div className="container">
      <div className="form-header">
        <h1>Edit Delivery Payroll</h1>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}