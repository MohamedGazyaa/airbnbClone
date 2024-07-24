import React, { useState } from "react";
import axios from "axios";

const PhotosSelector = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    try {
      const { data: filenames } = await axios.post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      });
      setAddedPhotos((prev) => {
        const updatedArray = [...prev, ...filenames];
        return updatedArray;
      });
    } catch (err) {
      console.error("Error uploading photo from files:", err);
    }
  };

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const { data: filename } = await axios.post("upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        const updatedArray = [...prev, filename];
        return updatedArray;
      });
      setPhotoLink("");
    } catch (err) {
      console.error("Error uploading photo by link:", err);
    }
  };

  const removePhoto = (filename) => {
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  };
  const selectMain = (e,filename) => {
    e.preventDefault();
    setAddedPhotos([filename, ...addedPhotos.filter((photo) => photo !== filename)])
  };

  return (
    <div>
      <h2 className="text-2xl mt-4">Photos</h2>
      <p className="text-gray-500 text-sm">The more the better</p>
      <div className="flex gap-2">
        <input
          className="w-full border my-2 py-2 px-3 rounded-2xl"
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Add using a link"
        ></input>
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 grow px-4 rounded-2xl"
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-4 gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo, index) => {
            return (
              <div className="flex relative" key={index}>
                <img
                  className="rounded-2xl w-full h-full object-cover"
                  src={"http://localhost:4000/uploads/" + photo}
                  alt="Currently unavailable"
                />
                <button
                  onClick={() => removePhoto(photo)}
                  className="absolute p-1 bottom-1 right-1 bg-white bg-opacity-50 text-black rounded-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => selectMain(e,photo)}
                  className="absolute p-1 bottom-1 left-1 bg-white bg-opacity-50 text-black rounded-2xl"
                >
                  {photo === addedPhotos[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {photo !== addedPhotos[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            );
          })}
        <label className="cursor-pointer flex gap-1 items-center justify-center mt-2 border text-2xl text-gray-600 bg-transparent rounded-2xl px-24 py-8">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
          Upload
        </label>
      </div>
    </div>
  );
};

export default PhotosSelector;
