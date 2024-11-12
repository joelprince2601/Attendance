import React from "react";
import "./Form.css";

function PatientForm() {
  return (
    <div className="form-container">
      <h2>Patient Registration Form</h2>
      <form>
        <label>First Name:</label>
        <input type="text" placeholder="Enter First Name" />

        <label>Last Name:</label>
        <input type="text" placeholder="Enter Last Name" />

        <label>Age:</label>
        <input type="text" placeholder="Enter Age" />

        <label>Gender:</label>
        <select>
          <option>Female</option>
          <option>Male</option>
        </select>


        <label>Do you have an appointment?:</label>
        <select>
          <option>Yes</option>
          <option>No</option>
        </select>

        <label>Phone:</label>
        <input type="text" placeholder="Enter Phone Number" />

        <label>Address:</label>
        <input type="text" placeholder="Enter Address" />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default PatientForm;