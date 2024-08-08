import React from "react";

const PhotosCatalog = ({ photos, title, setShowPhotos }) => {
  return (
    <div className="absolute inset-0 bg-black text-white min-h-screen">
      <div className="bg-black p-8 grid gap-4">
        <div>
            <h2 className="text-3xl">{title}</h2>
          <button onClick={()=>setShowPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
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
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Close photos
          </button>
        </div>
        {photos?.length > 0 &&
          photos.map((photo, index) => (
            <div className="w-full object-cover" key={index}>
              <img
                className="w-full object-cover"
                src={"http://localhost:4000/uploads/" + photo}
                alt=""
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhotosCatalog;
