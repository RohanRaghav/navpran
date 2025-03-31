import React, { useState, useEffect } from "react";
import Notification from "../Components/Notification";
import Admin from "./Admin";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(""); // To store the role
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://navpranserver.vercel.app/api/userData?username=${username}`
        );

        if (!response.ok) {
          throw new Error("Error fetching user data");
        }

        const data = await response.json();

        setUserData({
          overallBloodDonations: data.overallBloodDonations || 0,
          locationDonations: data.locationDonations || 0,
          plasmaDonations: data.plasmaDonations || 0,
          vouchers: data.vouchers || 0,
          uniqueId: data.uniqueId || null,
          phonenumber: data.phonenumber || 0,
          address: data.address,
          role: data.role
        });
        setUserRole(data.role || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}>
        <div className="profile">
          <nav className="navbar">
            <div className="handle">
              <img src="/Logo.png" className="logo" alt="Logo" />
              <div className="login">
                <button className="buttonsignin">SignOut</button>
              </div>
            </div>
          </nav>

          <nav className="navbars">
            <div className="handles">
              <div className="abc">
                <a href="/" style={{ color: "rgba(0, 0, 0, 1)" }}>
                  Other Services
                </a>
              </div>
              <div className="abc">
                <a href="/provide-voucher" style={{ color: "rgba(0, 0, 0, 1)" }}>
                  Guidances
                </a>
              </div>
              <div className="abc">
                <a href="/" style={{ color: "rgba(0, 0, 0, 1)" }}>
                  Credit Store
                </a>
              </div>
              <div>
                <a href="/" style={{ color: "rgba(0, 0, 0, 1)" }}>
                  Contact us
                </a>
              </div>
            </div>
          </nav>

          <center>
            <img src="/abcd.jpg" alt="avatar" className="avatar" />
          </center>
<div className="division">
          {userRole === "Donor" ? (
            <div style={{ width: "80%", margin: "20px auto" }}>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div
                  className="grid-container"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    padding: "20px",
                    maxWidth:"600px",
                  }}
                >
                  <div className="grid-item">
                    <strong>Name:</strong> {username}
                  </div>
                  <div className="grid-item">
                    <strong>Unique Id:</strong> {userData.uniqueId}
                  </div>
                  <div className="grid-item">
                    <strong>Mobile No.:</strong> {userData.phonenumber}
                  </div>
                  <div className="grid-item">
                    <strong>Overall Donations:</strong>{" "}
                    {userData.overallBloodDonations}
                  </div>
                  <div className="grid-item">
                    <strong>At Location:</strong> {userData.locationDonations}
                  </div>
                  <div className="grid-item">
                    <strong>Plasma Donations:</strong>{" "}
                    {userData.plasmaDonations}
                  </div>
                  <div className="grid-item">
                    <strong>Credits:</strong> {userData.vouchers}
                  </div>
                  <div className="grid-item">
                    <strong>Address:</strong> {userData.address}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <h3>Welcome, {username}!</h3>
              <Admin />
            </div>
          )}
           <div style={{ height: "550px" }}>
          <Notification />
        </div>
        </div>
        </div>
      </div>
      <center>
        <div style={{ paddingBottom: "40px" }}>
          <button className="Donation">Donate Blood</button>
        </div>
      </center>
    </div>
  );
};

export default Profile;
