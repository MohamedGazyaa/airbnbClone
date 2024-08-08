import React, { useState } from 'react'

const BookingWidget = ({price}) => {

    const [checkIn,setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

  return (
    <div>
            <div className="bg-white shadow p-4 rounded-2xl">
              <div className="text-2xl text-center">
                Price: ${price} / night
              </div>
              <div className="mt-4 border rounded-2xl">
                <div className="flex justify-center">
                  <div className="my-4  p-4 rounded-2xl">
                    <label className="text-lg">Check&nbsp;in:</label>
                    <input
                      className="w-full my-2 py-2 px-3 rounded-xl"
                      type="date"
                      value={checkIn}
                      onChange={e => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div className="my-4 p-4 border-l">
                    <label className="text-lg">Check&nbsp;out:</label>
                    <input
                      className="w-full my-2 py-2 px-3 rounded-xl"
                      type="date"
                      value={checkOut}
                      onChange={e => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
                <div className="px-4 py-3 mt-4 border-t">
                    <label className="text-lg">Number of guests:</label>
                    <input
                      className="w-full my-2 py-2 px-3 rounded-xl"
                      type="number"
                      value={guests}
                      onChange={e => setGuests(e.target.value)}
                    />
                  </div>
              </div>
              <div className="w-full px-16">
                <button className="mt-6 mb-2 bg-primary w-full p-2 text-white rounded-2xl">
                  Book this place
                </button>
              </div>
            </div>
          </div>
  )
}

export default BookingWidget
