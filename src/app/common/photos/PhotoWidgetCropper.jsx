import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const PhotoWidgetCropper = ({ setImage, imagePreview }) => {
    const cropper = useRef(null)
    const cropImage = () => {
        if (typeof cropper.current.getCroppedCanvas() === 'undefined') return

        cropper.current.getCroppedCanvas().toBlob(blob => {
            setImage(blob)
        }, 'image/jpeg')
    }

  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      // Cropper.js options
      aspectRatio={1}
      guides={false}
      preview=".img-preview"
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
      ref={cropper}
    />
  );
};

export default PhotoWidgetCropper