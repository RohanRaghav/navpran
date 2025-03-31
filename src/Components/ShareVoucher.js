import React, { useState } from "react";
import axios from "axios";

const ShareVoucher = ({ donor }) => {
  const [recipientId, setRecipientId] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleShareVoucher = async (donorId) => {
    const formData = new FormData();
    formData.append('voucher', selectedFile); // `selectedFile` from file input
    formData.append('sharedBy', username); // Current admin's username
  
    try {
      const response = await axios.post(
        `https://navpranserver.vercel.app/api/donors/${donorId}/share-voucher`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
  
      if (response.status === 200) {
        setMessage('Voucher shared successfully');
      } else {
        setMessage('Error sharing voucher');
      }
    } catch (error) {
      console.error('Error sharing voucher:', error);
      setMessage('Error sharing voucher');
    }
  };
  
 

  return (
    <div>
      <h2>Share Voucher</h2>
      <form onSubmit={handleShareVoucher}>
        <label>
          Recipient Unique ID:
          <input
            type="text"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
          />
        </label>
        <label>
          Upload Proof:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Share Voucher</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ShareVoucher;
