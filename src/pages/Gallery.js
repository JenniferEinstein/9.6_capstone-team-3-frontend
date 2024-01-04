import React from 'react';
import FullGallery from '../components/FullGallery';
import UploadModal from '../components/UploadModal';

function Gallery() {
  return (
    <div className='gallery'>
      <FullGallery />
      <div className='testing-pictures'>
        <UploadModal />
      </div>
    </div>
  );
}

export default Gallery;
