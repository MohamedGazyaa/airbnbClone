import React, { useEffect, useState } from "react";
import axios from "axios";
import PerksSelector from "./PerksSelector";
import PhotosSelector from "./PhotosSelector";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const NewPlaceForm = () => {
  const { id } = useParams();
  const perks = ["wifi", "free parking", "TV", "iron", "dish washer", "pets"];
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [details, setDetails] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(1);
  const [checkIn, setCheckIn] = useState(0);
  const [checkOut, setCheckOut] = useState(0);

  const navigate = useNavigate();
  const token = useSelector((state) => state.currentUser.token);

  useEffect(() => {
    if (id) {
      fetchPlace(id);
    }
  }, [id]);

  const fetchPlace = async (id) => {
    try {
      const { data } = await axios.get("/place/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDetails(data.description);
      setSelectedPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    } catch (err) {
      alert(err);
    }
  };

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      details,
      selectedPerks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    try {
      if (id) {
        await axios.put(
          "/update-place",
          { id, ...placeData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post("/add-place", placeData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      alert("Place saved successfully");
      navigate("/account/places");
    } catch (err) {
      alert("failed to save place please try again");
    }
  };

  return (
    <div>
      <form className="max-w-2xl mx-auto">
        <div>
          <h2 className="text-2xl mt-4">Title</h2>
          <p className="text-gray-500 text-sm">
            Title that would appear for your place
          </p>
          <input
            className="w-full border my-2 py-2 px-3 rounded-2xl"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title, for example: My lovely apartment"
          />
        </div>
        <div>
          <h2 className="text-2xl mt-4">Address</h2>
          <p className="text-gray-500 text-sm">Address for this place</p>
          <input
            className="w-full border my-2 py-2 px-3 rounded-2xl"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </div>
        <PhotosSelector
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
        <div>
          <h2 className="text-2xl mt-4">Details</h2>
          <p className="text-gray-500 text-sm">Details about the place</p>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full h-28 border my-1 py-2 px-3 rounded-2xl"
          ></textarea>
        </div>
        <div>
          <h2 className="text-2xl mt-4">Perks</h2>
          <p className="text-gray-500 text-sm">Select all perks of the place</p>
          <PerksSelector
            perks={perks}
            selectedPerks={selectedPerks}
            setSelectedPerks={setSelectedPerks}
          />
        </div>
        <div>
          <h2 className="text-2xl mt-4">Extra information</h2>
          <p className="text-gray-500 text-sm">Forexample: house rules</p>
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            className="w-full h-36 border my-1 py-2 px-3 rounded-2xl"
          ></textarea>
        </div>
        <div>
          <h2 className="text-2xl mt-4">Price per night</h2>
          <p className="text-gray-500 text-sm">
            The price to stay at the place for one night
          </p>
          <input
            className="w-full border my-2 py-2 px-3 rounded-2xl"
            type="Number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="ex: 3"
          ></input>
        </div>
        <div>
          <h2 className="text-2xl mt-4">Maximum number of guests</h2>
          <p className="text-gray-500 text-sm">Maximum capacity of the place</p>
          <input
            className="w-full border my-2 py-2 px-3 rounded-2xl"
            type="Number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            placeholder="ex: 3"
          ></input>
        </div>
        <div>
          <h2 className="text-2xl mt-4">Check in and check out times</h2>
          <p className="text-gray-500 text-sm">
            Remember to leave a window for cleaning the place between guests.
          </p>
          <div className="grid gap-2 xs:grid-cols-1 sm:grid-cols-2">
            <div>
              <h3 className="mt-3 -mb-1">Check in time</h3>
              <input
                className="w-full border my-2 py-2 px-3 rounded-2xl"
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-3 -mb-1">Check out time</h3>
              <input
                className="w-full border my-2 py-2 px-3 rounded-2xl"
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="12:00"
              />
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={savePlace}
            className="my-4 bg-primary w-full p-2 text-white rounded-2xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPlaceForm;
