// MessageProof.js
import React, { useState } from 'react';
import UploadModal from './UploadModal';
import '../css/messages.css';

function MessageProof() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false); 

  const openUploadModal = () => {
    setIsModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setUploadSuccess(false); 
  };

  const handleUpload = (event) => {
    event.preventDefault();

    console.log('Title:', title.value);
    console.log('Description:', description.value);
    console.log('Selected File:', selectedFile);
    console.log('Alt Text:', altText.value);

    // Replace this with your actual logic

    if (uploadSuccess) {
      setUploadSuccess(true); // Set upload success status
      alert('Success!');
      window.location.href = '/';
    }    
    closeUploadModal();
  };


  return (
<div className="message">
    {/* <h1>logo here?</h1> */}
    <h2>Time to add a picture of the gift you received to the gallery!</h2>
    <p>
        Adding a picture lets us know that your match did their job. You will be given an opportunity to leave a little note describing your gift and/or thoughts. Our aim is to spread joy! 
    </p>
    <p>
        Please don't leave a negative note. 
    </p>
    <p>
        Even if you are disappointed in your gift, your match went out of their way to think about what you might like and sent it to you. If you really can't think of anything nice to say, saying "Thanks for the gift" is perfectly accceptable. 
    </p>
    <p>
        The one exception is if you received something inappropriate or against the rules. In that case, don't upload the picture and do let us know immediately at ResponseTeam@HappinessExchange.com.
    </p>

    {/* Modal */}
    <div id='upload-modal-button-in-message'>

      <UploadModal
        isOpen={isModalOpen}
        onRequestClose={closeUploadModal}
        onUpload={(event) => handleUpload(event)} // Ensure to pass the event object
      />
     {uploadSuccess && (
        <div>
          <h2>Thank You!</h2>
          <p>Your upload was successful. Thank you for sharing!</p>
        </div>
      )}
    </div>

    <p> </p>
    
    <p>We look forward to seeing you at our next event.</p>

    <p>Best Regards,</p>
    
    <p>Happiness Exchange</p>    
    
</div>
  )
}

export default MessageProof
