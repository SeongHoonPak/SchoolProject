import React, { useRef } from "react";
const ImageFileInput = ({ imageUploader, onFileChange }) => {
  const inputRef = useRef();
  const onChange = async e => {
    const uploaded = await imageUploader.upload(e.target.files[0]);

    onFileChange({
      url: uploaded.url,
    });
  };
  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
    </div>
  );
};

export default ImageFileInput;
