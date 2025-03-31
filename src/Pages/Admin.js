import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [donors, setDonors] = useState([]);
  const [editingDonor, setEditingDonor] = useState(null);
  const [formData, setFormData] = useState({
    overallBloodDonations: 0,
    locationDonations: 0,
    plasmaDonations: 0,
    vouchers: 0,
  });
  const [message, setMessage] = useState(""); // For displaying success or error messages
  const [searchQuery, setSearchQuery] = useState(""); // For storing the search input
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // File state updated to handle null initially

  // Fetch all donors
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("https://navpranserver.vercel.app/api/donors");
        setDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
        setMessage("Error fetching donors.");
      }
    };

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    fetchDonors();
  }, []);

  // Fetch user data based on username
  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://navpranserver.vercel.app/api/userData?username=${username}`
        );

        if (response.status !== 200) {
          throw new Error("Error fetching user data");
        }

        setUserData({
          vouchers: response.data.vouchers || 0,
          phonenumber: response.data.phonenumber || "Not Available",
          address: response.data.address || "Not Provided",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error fetching user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle edit button click
  const handleEdit = (donor) => {
    setEditingDonor(donor);
    setFormData({
      overallBloodDonations: donor.overallBloodDonations,
      locationDonations: donor.locationDonations,
      plasmaDonations: donor.plasmaDonations,
      vouchers: donor.vouchers,
    });
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      const updatedDonor = {
        ...editingDonor,
        overallBloodDonations: formData.overallBloodDonations,
        locationDonations: formData.locationDonations,
        plasmaDonations: formData.plasmaDonations,
        vouchers: formData.vouchers,
      };

      await axios.put(`https://navpranserver.vercel.app/api/donors/${editingDonor._id}`, updatedDonor);
      setDonors((prev) =>
        prev.map((donor) =>
          donor._id === editingDonor._id ? updatedDonor : donor
        )
      );

      setMessage("Donor data updated successfully.");
      setEditingDonor(null);
      setFormData({
        overallBloodDonations: 0,
        locationDonations: 0,
        plasmaDonations: 0,
        vouchers: 0,
      });
    } catch (error) {
      console.error("Error updating donor:", error);
      setMessage("Error updating donor.");
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setEditingDonor(null);
    setFormData({
      overallBloodDonations: 0,
      locationDonations: 0,
      plasmaDonations: 0,
      vouchers: 0,
    });
  };

  // Handle search query input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter donors based on search query
  const filteredDonors = donors.filter((donor) =>
    donor.uniqueId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle file selection for voucher upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setMessage(""); // Clear any previous error message
    }
  };

  // Handle file upload and voucher sharing
  const handleShareVoucher = async (donorId) => {
    if (!selectedFile) {
      setMessage("Please select a file to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append("voucher", selectedFile);
  
    try {
      const response = await axios.post(
        `https://navpranserver.vercel.app/donors/${donorId}/share-voucher`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        setMessage("Voucher shared successfully.");
        setSelectedFile(null);
      } else {
        setMessage("Error sharing voucher.");
      }
    } catch (error) {
      console.error("Error sharing voucher:", error);
      setMessage("Error sharing voucher. Please try again.");
    }
  };
  
  
   
  return (
    <div className="admin-container">
      {message && <p>{message}</p>} {/* Displaying success or error messages */}

      {/* Search Bar */}
      <div
  className="grid-container"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    padding: "20px",
    maxWidth: "600px",
  }}
>
  <div className="grid-item">
    <strong>Name:</strong> {username}
  </div>
  <div className="grid-item">
    <strong>Mobile No.:</strong> {userData?.phonenumber || "Loading..."}
  </div>
  <div className="grid-item">
    <strong>Credits:</strong> {userData?.vouchers || "0"}
  </div>
  <div className="grid-item">
    <strong>Address:</strong> {userData?.address || "Loading..."}
  </div>
</div>

              

      <div className="donor-list">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Overall Blood Donations</th>
              <th>Location Donations</th>
              <th>Plasma Donations</th>
              <th>Vouchers</th>
              <th>Unique Id <input
          type="text"
          placeholder="Search by Unique ID"
          value={searchQuery}
          onChange={handleSearchChange}
        /></th>
              <th>Actions</th>
              <th>Upload</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <tr key={donor._id}>
                  <td>{donor.username}</td>
                  <td>{donor.phonenumber}</td>
                  <td>{donor.overallBloodDonations}</td>
                  <td>{donor.locationDonations}</td>
                  <td>{donor.plasmaDonations}</td>
                  <td>{donor.vouchers}</td>
                  <td>{donor.uniqueId}</td>
                  <td>
                    <button onClick={() => handleEdit(donor)}>Edit</button>
                  </td>
                  <td>
  <input
    type="file"
    onChange={handleFileChange}
    style={{ marginBottom: "10px" }}
  />
  <button
    onClick={() => handleShareVoucher(donor._id)}
    disabled={!selectedFile} // Disable the button if no file is selected
  >
    Share Voucher
  </button>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No donors found with the provided Unique ID.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingDonor && (
        <div className="edit-form">
          <h2>Edit Donor: {editingDonor.username}</h2>
          <form>
            <label>
              Overall Blood Donations:
              <input
                type="number"
                name="overallBloodDonations"
                value={formData.overallBloodDonations}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Location Donations:
              <input
                type="number"
                name="locationDonations"
                value={formData.locationDonations}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Plasma Donations:
              <input
                type="number"
                name="plasmaDonations"
                value={formData.plasmaDonations}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Vouchers:
              <input
                type="number"
                name="vouchers"
                value={formData.vouchers}
                onChange={handleInputChange}
              />
            </label>
            <div className="buttons">
              <button type="button" onClick={handleSave}>
                Save Changes
              </button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
