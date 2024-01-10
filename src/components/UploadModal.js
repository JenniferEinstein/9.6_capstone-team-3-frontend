import React, { useState, useEffect, useRef } from "react";
import { storageRef } from "../firebaseStorage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

import "../css/Upload.css";

const UploadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null); 
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [altText, setAltText] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const MAX_FILE_SIZE_MB = 5; // Maximum file size in MB
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const openModal = () => setIsOpen(true);
  const openModalButtonRef = useRef(null); 
  const firstInputRef = useRef(null);


  useEffect(() => {
    if (isOpen) {
        firstInputRef.current.focus(); // Set focus to the first input when modal opens
    }
  }, [isOpen]);



  const closeModal = () => {
    setIsOpen(false);
    if (openModalButtonRef.current) {
      openModalButtonRef.current.focus(); // Return focus to the open modal button when closed
    }
    setTitle("");
    setBlurb("");
    setFileUrl(null);  //reset thumbnail preview
    setAltText("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      alert(
        `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`
      );
      return;
    }

    setSelectedFile(file);

    // Read and display a thumbnail preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log('File read result:', reader.result); // Add this to check the file data URL

      setFileUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAltTextChange = (event) => {
    setAltText(event.target.value);
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("Please choose a file to upload.");
      return;
    }

    setIsUploading(true);

    try {
      const fileName = `${Date.now()}_${selectedFile.name}`;
      const fileRef = ref(storageRef, fileName);

      // Upload the file
      const snapshot = await uploadBytes(fileRef, selectedFile);

      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(fileRef);

      console.log("File uploaded successfully:", snapshot);
      console.log("Download URL:", downloadURL);

      // Now you can use the downloadURL to make a POST request to your backend
      const picturePostData = {
        pictures_post_title: title, //this is a required field and should not have a default value
        pictures_post_blurb: blurb, //this is a required field and should not have a default value
        pictures_post_URL: downloadURL,
        alt_text: altText || "No alt text provided",
        likes_count: 0,
      };

      //POST request to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/pictures`,
        picturePostData
      );

      if (response.data && response.data.success) {
        console.log("Upload success!", response.data);
      } else {
        console.error("Upload failed. Server response:", response.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      console.log("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      closeModal();
    }
  };

  return (
    <div>
      <button
        ref={openModalButtonRef}
        id="upload-gift-button" 
        onClick={openModal}
      >
        Upload Picture
      </button>
      {isOpen && (
        <div className="upload-modal-container">
          <div className="upload-modal-content">
            <span
              id="upload-close-container"
              className="upload-modal-close"
              onClick={closeModal}
            >
              &times;
            </span>
            <div id="upload-modal-header">
              <h2 className="upload-modal-title">Share the Exchange!</h2>
            </div>
            <div id="upload-form-container">
              <div className="upload-input-container title-568">
                <label>Title (required)</label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="picture-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="upload-input-container description-568">
                <label>Thoughts on your gift (required)</label>
                <textarea
                  id="picture-description"
                  value={blurb}
                  onChange={(e) => setBlurb(e.target.value)}
                ></textarea>
                <input
                  id="upload-input"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div className="upload-input-container alt-text-568">
                <label htmlFor="altText">
                  Alt Text - Describe the image briefly to help users with visual impairments understand what it shows.
                </label>
                <textarea
                  id="altText"
                  value={altText}
                  onChange={handleAltTextChange} 
                />
              </div>
              
              {selectedFile && (
              <div className='thumbnail' id="upload-modal-thumbnail">
                <h2>Thumbnail Preview:</h2>
                <img src={fileUrl} alt={altText || "Image preview"} className="thumbnail-image" />
                </div>
                )}
              <div className="upload-button-container">
                <button
                  id="upload-button"
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadModal;
