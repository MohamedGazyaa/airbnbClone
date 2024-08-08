import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotosGrid from "../Components/SinglePage/PhotosGrid";
import PhotosCatalog from "../Components/SinglePage/PhotosCatalog";
import BookingWidget from "../Components/SinglePage/BookingWidget";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState();
  const [showPhotos, setShowPhotos] = useState(false);

  const fetchPlace = async (id) => {
    try {
      const { data } = await axios.get("/view-place/" + id);
      setPlace(data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPlace(id);
    }
  }, []);

  if (showPhotos) {
    return (
      <PhotosCatalog
        photos={place?.photos}
        setShowPhotos={setShowPhotos}
        title={place?.title}
      />
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 p-8">
      <h1 className="text-3xl">{place?.title}</h1>
      <a
        className="flex gap-1 my-3 block font-semibold underline "
        target="_blank"
        href={"https://maps.google.com/?q=" + place?.address}
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
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        {place?.address}
      </a>
      <PhotosGrid photos={place?.photos} setShowPhotos={setShowPhotos} />
      <div className="mt-8 bg-white shadow p-4 rounded-2xl">
        <h2 className="font-semibold text-2xl px-1">Description</h2>
        <p className="my-3 px-4">{place?.description}</p>
      </div>
      <div className="mt-8">
        <div className="my-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 ">
          <div>
            <div className="bg-white shadow p-4 rounded-2xl">
              <h2 className="font-semibold text-2xl px-1">Extra information</h2>
              <p className="my-3 px-4">{place?.extraInfo}</p>
            </div>
            <div className="mt-16 bg-white shadow p-4 rounded-2xl">
              <h2 className="font-semibold text-2xl px-1">Booking information</h2>
              <div className="flex flex-col gap-2 mt-4 px-4">
                <p><b>Check-in:</b> {place?.checkIn}:00</p>
                <p><b>Check-out:</b> {place?.checkOut}:00</p>
                <p><b>Maximum number of guests:</b> {place?.maxGuests}</p>
              </div>
            </div>
          </div>
          <BookingWidget price={place?.price} />
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
