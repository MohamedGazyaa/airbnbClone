import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PlaceCard from './PlaceCard'


const PlacesCatalog = () => {

  const [places, setPlaces] = useState([])

    useEffect(()=>{
      axios.get("/places").then(response => {
        setPlaces(response.data)
      })
    },[])

  return (
    <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8'>
      {places.length >0 && places.map((place, index) => {
        return (
          <PlaceCard  key={index} place={place}/>
        )
      })}
    </div>
  )
}

export default PlacesCatalog 