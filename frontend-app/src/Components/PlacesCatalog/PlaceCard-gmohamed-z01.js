import React from 'react'

const PlaceCard = ({index, place}) => {
  return (
    <div key={index}>
      {place.title}
    </div>
  )
}

export default PlaceCard