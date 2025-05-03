import React from 'react';

const FileUpload = ({
  file,
  onFileChange,
  filename = '',
  placeholder = 'https://placehold.co/300x200?text=Choose+image',
  label = 'Choose File',
  width = 300,
  height = 200,
  rootUrl = '',
}) => {

  const previewSrc = file
    ? URL.createObjectURL(file)
    : filename
      ? rootUrl + filename
      : placeholder;

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="file" className="mb-2 text-sm text-gray-300">
        Image / Video
      </label>

      <input
        name="file"
        type="file"
        id="file"
        accept="image/*,video/*"
        onChange={onFileChange}
        className="hidden"
      />

      <label
        htmlFor="file"
        className="mb-4 cursor-pointer rounded border border-yellow-500 px-4 py-2 font-semibold transition hover:bg-yellow-500 hover:text-black"
      >
        {file ? file.name : label}
      </label>

      <img
        src={previewSrc}
        alt="preview"
        className={`h-[${height}px] w-[${width}px] max-w-full rounded border border-gray-600 object-cover`}
      />
    </div>
  );
};

export default FileUpload;
