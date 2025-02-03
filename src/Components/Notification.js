import React, { useEffect, useState } from "react";
import axios from "axios";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/notifications");
        if (response.status === 200) {
          setNotifications(response.data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div
      style={{
        width: "300px",
        height: "350px",
        backgroundColor: "white",
        color: "black",
        padding: "20px",
        boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.3)",
        overflowY: "auto",
      }}
    >
      <h3>Notifications</h3>
      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "rgba(217, 217, 217, 1)",
                  padding: "10px",
                  margin: "5px 0",
                  borderRadius: "5px",
                }}
              >
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  Urgent! {notification.bloodType} blood is needed at {notification.hospital} in {notification.region}.
                </p>
                <p style={{ margin: "5px 0" }}>
                  For patient: <strong>{notification.patientName}</strong>
                </p>
                <p style={{ margin: 0 }}>Contact: {notification.phoneNumber}</p>
                <p style={{ margin: "5px 0", fontSize: "0.85rem", color: "gray" }}>
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </li>
            ))
          ) : (
            <li>No notifications available.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Notification;
