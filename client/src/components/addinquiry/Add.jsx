import React from 'react'
import "./add.css"
import {Link} from 'react-router-dom'

const Add = () => {
  return (
    <div className='addInquiry'>
        <Link to={"/"}>Back</Link>
        <h3>Raise New Inquiry</h3>
        <form className='addInquiryForm'>
        <div className="inputGroup">
            <label htmlFor="intype">Inquiry Type</label>
            <select id="intype" name="intype">
                        <option value="" disabled selected>Select Inquiry Type</option>
                        <option value="refund">Refund</option>
                        <option value="undelivered">Undelivered</option>
            </select>
        </div>
        <div className="inputGroup">
            <label htmlFor="orderId">Order ID</label>
            <input type="text" id="orderId" name="orderId" maxLength="4" autoComplete="off" placeholder="Enter Order ID"/>
        </div>  
        <div>
            <label htmlFor="placeDate">Order Placement Date</label>
            <input type="date" id="placeDate" name="placeDate" autoComplete="off" placeholder="Date of Order Placement"/> 
        </div> 
        <div className="inputGroup">
            <label htmlFor="driverId">Delivery Person's ID</label>
            <input type="text" id="driverId" name="driverId" maxLength="4" autoComplete="off" placeholder="Enter Driver's ID"/>
        </div>  
        <div>
            <label htmlFor="deliveryDate">Date of Delivery</label>
            <input type="date" id="deliveryDate" name="deliveryDate" autoComplete="off" placeholder="Date of Delivery"/> 
        </div>
        <div>
            <label htmlFor="indescription">Reason for Inquiry</label>
            <input type="" id="indescription" name="indescription" autoComplete="off"/> 
        </div>     
        <div>
            <label htmlFor="image">Upload Image for Inquiry</label>
            <input type="file" id="image" name="image" accept="image/*" autoComplete="off"/> 
        </div>
        <div className="inputGroup">
            <button type="submit"> Send </button>
        </div>

        </form>    
    </div>
  )
}

export default Add
