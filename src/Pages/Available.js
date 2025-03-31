import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from 'axios';
const Available = () => {
  const [bloodData, setBloodData] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formDetails, setFormDetails] = useState({
    region: "",
    hospital: "",
    bloodType: "",
    patientName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { region: "Downtown", hospital: "City Hospital", bloodType: "A+", unitsAvailable: 10 },
        { region: "Uptown", hospital: "Greenfield Hospital", bloodType: "O-", unitsAvailable: 5 },
        { region: "Midtown", hospital: "Riverbend Medical", bloodType: "B+", unitsAvailable: 7 },
        { region: "Westside", hospital: "Pinewood Clinic", bloodType: "O+", unitsAvailable: 8 },
      ];
      setBloodData(data);
    };

    fetchData();
  }, []);

  const handleRequest = (data) => {
    setFormDetails({
      ...formDetails,
      region: data.region,
      hospital: data.hospital,
      bloodType: data.bloodType,
    });
    setShowRequestForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://navpranserver.vercel.app/api/request-blood', formDetails);
  
      if (response.status === 200) {
        console.log("Blood request submitted successfully:", response.data);
        setRequestSuccess(true);
        setShowRequestForm(false);
        setTimeout(() => setRequestSuccess(false), 3000);
      } else {
        console.error("Error submitting blood request:", response.data.error);
        alert(response.data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error("Error submitting blood request:", error);
      alert('Failed to connect to the server.');
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const filteredData = bloodData.filter((data) => {
    return (
      (selectedBloodType === "" || data.bloodType === selectedBloodType) &&
      (selectedRegion === "" || data.region === selectedRegion)
    );
  });

  return (
    <div className="available-container">
      <Navbar />
      <h1 className="text-center my-4">Blood Availability</h1>

      {/* Filters */}
      <div className="filters mb-3">
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="filter-select"
        >
          <option value="">All Regions</option>
          <option value="Downtown">Downtown</option>
          <option value="Uptown">Uptown</option>
          <option value="Midtown">Midtown</option>
          <option value="Westside">Westside</option>
        </select>
        <select
          value={selectedBloodType}
          onChange={(e) => setSelectedBloodType(e.target.value)}
          className="filter-select"
        >
          <option value="">All Blood Types</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      {/* Blood Data Table */}
      {filteredData.length > 0 ? (
        <table className="blood-table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Hospital</th>
              <th>Blood Type</th>
              <th>Units Available</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td>{data.region}</td>
                <td>{data.hospital}</td>
                <td>{data.bloodType}</td>
                <td>{data.unitsAvailable}</td>
                <td>
                  <button onClick={() => handleRequest(data)} className="request-btn">
                    Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No blood available for the selected filters.
        <br />
        <button onClick={() => handleRequest()} className="request-btn">
                    Request
                  </button></p>
      )}

      {/* Request Form */}
      {showRequestForm && (
        <form onSubmit={handleFormSubmit} className="request-form">
          <h2>Blood Request Form</h2>
          <input
            type="text"
            name="region"
            value={formDetails.region}
            onChange={handleInputChange}
            placeholder="Region"
            required
          />
          <input
            type="text"
            name="hospital"
            value={formDetails.hospital}
            onChange={handleInputChange}
            placeholder="Hospital Name"
            required
          />
          <input
            type="text"
            name="bloodType"
            value={formDetails.bloodType}
            onChange={handleInputChange}
            placeholder="Blood Type"
            required
          />
          <input
            type="text"
            name="patientName"
            value={formDetails.patientName}
            onChange={handleInputChange}
            placeholder="Patient Name"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formDetails.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            required
          />
          <button type="submit" className="submit-btn">
            Submit Request
          </button>
        </form>
      )}

      {requestSuccess && <p className="success-message">Request submitted successfully!</p>}
    </div>
  );
};

export default Available;
