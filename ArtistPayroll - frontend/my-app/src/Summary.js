            import React from 'react';
        import { useLocation,useNavigate } from 'react-router-dom';

        //import './summary.css'; // Import any custom CSS if needed

        
        
        export default function Summary() {
            const location = useLocation();
            const navigate = useNavigate();
            const {
                ArtistId,
                ArtistName,
                PhoneNumber,
                EmailAddress,
                MonthofPayment,
                PaymentMethod,
                NoOfTshirt,
                NoOfCaps,
                NoOfToteBags,
                NoOfLightSticks,
                NoOfBands,
                NoOfAlbums,
                NoOfTickets,
                TotalPaymentofMerchandise,
                TotalPaymentofAlbums,
                TotalPaymentofTickets,
                Payment,
                HandlingFee,
                NetPayment
            } = location.state || {}; // Default to empty object if location.state is undefined
        
            const generateSlip = () => {
                // Function to generate or download the slip
                // You can use libraries like jsPDF to create a PDF document
                // For demonstration, this just logs to the console
                console.log("Generating slip...");
                navigate('/all-payrolls');
            };

           /* const handleUpdate = () => {
                navigate(`/edit-payroll/${ArtistId}`, { state: location.state });
            };*/

           const handleUpdate = () => {
                // Assuming location.state contains the MongoDB _id
                const { _id } = location.state; // Extract MongoDB _id from location.state
                navigate(`/edit-payroll/${_id}`, { state: location.state });
            };


        
            return (
                <div className="container mt-5">
                    <div className="row p-3 bg-success text-light text-center">
                        <h1>Artist Payroll Summary</h1>
                    </div>
        
                    <div className="row mt-4">
                        <div className="col-12">
                            <h3 className="text-center">Payroll Details</h3>
                            <div className="form-group mx-auto">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Artist ID</th>
                                            <td>{ArtistId}</td>
                                        </tr>
                                        <tr>
                                            <th>Artist Name</th>
                                            <td>{ArtistName}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone Number</th>
                                            <td>{PhoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Email Address</th>
                                            <td>{EmailAddress}</td>
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
                                            <th>Number of T-shirts</th>
                                            <td>{NoOfTshirt}</td>
                                        </tr>
                                        <tr>
                                            <th>Number of Caps</th>
                                            <td>{NoOfCaps}</td>
                                        </tr>
                                        <tr>
                                            <th>Number of Tote Bags</th>
                                            <td>{NoOfToteBags}</td>
                                        </tr>
                                        <tr>
                                            <th>Number of Light Sticks</th>
                                            <td>{NoOfLightSticks}</td>
                                        </tr>
                                        <tr>
                                            <th>Number of Bands</th>
                                            <td>{NoOfBands}</td>
                                        </tr>
                                        <tr>
                                            <th>Number of Albums</th>
                                            <td>{NoOfAlbums}</td>
                                        </tr>
                                        <tr>
                                            <th>Number of Tickets</th>
                                            <td>{NoOfTickets}</td>
                                        </tr>
                                        <tr>
                                            <th>Total Payment of Merchandise</th>
                                            <td>{TotalPaymentofMerchandise}</td>
                                        </tr>
                                        <tr>
                                            <th>Total Payment of Albums</th>
                                            <td>{TotalPaymentofAlbums}</td>
                                        </tr>
                                        <tr>
                                            <th>Total Payment of Tickets</th>
                                            <td>{TotalPaymentofTickets}</td>
                                        </tr>
                                        <tr>
                                            <th>Total Payment</th>
                                            <td>{Payment}</td>
                                        </tr>
                                        <tr>
                                            <th>Handling Fee</th>
                                            <td>{HandlingFee}</td>
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
        
    

