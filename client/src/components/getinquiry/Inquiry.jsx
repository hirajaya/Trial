import React from 'react'
import "./inquiry.css"
import { Link } from 'react-router-dom'

const Inquiry = () => {
  return (
    <div className='inquiryTable'>
      <Link to={"/add"} className='addButton'>Add New Inquiry</Link>
      <table border={1} cellPadding={15} cellSpacing={0}>
        <thead>
            <tr>
                <th>Inquiry ID</th>
                <th>Inquiry Type</th>
                <th>Order ID</th>
                <th>Placement Date</th>
                <th>Driver ID</th>
                <th>Delivery Date</th>
                <th>Description</th>
                <th>Proof</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Refund</td>
                <td>O123</td>
                <td>2024-08-25T09:30:00Z</td>
                <td>D002</td>
                <td>2024-08-27T09:45:00Z</td>
                <td>It was damaged</td>
                <td></td>
                <td className='actionButtons'>
                    <button><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <Link to={'/edit'}><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Inquiry
