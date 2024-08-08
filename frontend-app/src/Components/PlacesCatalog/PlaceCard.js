import React from "react";
import { Link } from "react-router-dom";

const PlaceCard = ({ place }) => {
  return (
    <Link to={"/place/"+place._id}>
      <div className="rounded-2xl bg-gray-500 flex mb-2">
        {place.photos?.[0] && (
          <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:4000/uploads/" + place.photos?.[0]} alt=""/>
        )}
      </div>
      <h2 className="font-bold ">{place.address}</h2>
      <h3 className="text-sm text-gray-500 ">{place.title}</h3>
      <div className="mt-1">
        <span className="font-bold">${place.price} </span>per night
      </div>
    </Link>
  );
};

export default PlaceCard;
