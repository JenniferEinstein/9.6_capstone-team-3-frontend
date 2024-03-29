import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storageRef } from "../firebaseStorage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

import "../css/uploadModal.css";

const UploadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [altText, setAltText] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const MAX_FILE_SIZE_MB = 5; // Maximum file size in MB
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add("modal-open");
  };
  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("modal-open");
    setTitle("");
    setBlurb("");
    setFileUrl(null);
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

    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("File read result:", reader.result);
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

      const snapshot = await uploadBytes(fileRef, selectedFile);
      const downloadURL = await getDownloadURL(fileRef);

      console.log("File uploaded successfully:", snapshot);
      console.log("Download URL:", downloadURL);

      const picturePostData = {
        pictures_post_title: title,
        pictures_post_blurb: blurb,
        pictures_post_URL: downloadURL,
        alt_text: altText || "No alt text provided",
        likes_count: 0,
      };

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
      navigate("/gallery");
    }
  };

  return (
    <div id="upload-page">
      <button id="upload-button" onClick={openModal}>
        Upload
      </button>
      {isOpen && (
        <>
          <div className="overlay" onClick={closeModal}></div>
          <div className="upload-modal-container">
            <div
              className={`upload-modal-content${fileUrl ? " with-thumbnail" : ""}`}
            >
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
                <div id="input-fields-container">
                  <div className="upload-input-container">
                    <input
                      type="text"
                      id="picture-title"
                      placeholder="Title:"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="upload-input-container">
                    <textarea
                      id="picture-description"
                      placeholder="Comments:"
                      value={blurb}
                      onChange={(e) => setBlurb(e.target.value)}
                    ></textarea>
                    <div id="file-thumbnail-container">
                      <input
                        id="upload-input"
                        type="file"
                        onChange={handleFileChange}
                      />
                      {selectedFile && (
                        <div className="thumbnail">
                          <img
                            src={fileUrl}
                            alt={altText || "Image preview"}
                            className="thumbnail-image"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="upload-input-container">
                    <label htmlFor="altText"></label>
                    <textarea
                      id="altText"
                      placeholder="Alt Text - For Visually Impaired:"
                      value={altText}
                      onChange={handleAltTextChange}
                    />
                  </div>
                </div>
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
        </>
      )}
    </div>
  );
};

export default UploadModal;
