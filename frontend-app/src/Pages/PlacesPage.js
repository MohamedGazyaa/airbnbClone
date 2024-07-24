import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import NewPlaceForm from "../Components/NewPlaceForm/NewPlaceForm";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  const token = useSelector((state) => state.currentUser.token);


  const fetchPlaces = async () => {
    try {
      const { data } = await axios.get("/user-places", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaces(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div>
      {action !== "new" && (
        <div>
          <div className="text-center">
            <Link
              className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full "
              to={"/account/places/new"}
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add new place
            </Link>
          </div>
          <div className="mt-6">
            {places.length > 0 &&
              places.map((place, index) => {
                return (
                  <Link
                  to = {"/account/places/" +place._id}
                    key={index}
                    className="flex cursor-pointer gap-4 bg-gray-100 mt-2 p-4 rounded-2xl"
                  >
                    <div className="w-40 h-full bg-gray-300 shrink-0">
                      {place.photos.length > 0 && (
                        <img
                        className="h-32 w-full"
                          src={"http://localhost:4000/uploads/" + place.photos[0]}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="grow-0 shrink">
                      <h2 className="text-xl">{place.title}</h2>
                      <p className="text-sm mt-2">{place.description}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      )}
      {action === "new" && <NewPlaceForm />}
    </div>
  );
};

export default PlacesPage;
