import React from 'react'

const EventCard = (props) => {
  const { event } = props

  const bgColor = (category) => {
    switch(category) {
      case "Concert":
        return "#16a085"
      case "Xbox":
        return "#27ae60"
      case "PS5":
        return "#2980b9"
      case "Nintendo":
        return "#c0392b";
      case "Movie":
        return "#f39c12"
      case "Movies":
        return "#f39c12"
      case "TV":
        return "#8e44ad"
      case "Music":
        return "#1abc9c"
      default:
        return "#fff"
    }
  }

  if (event.ID === "" && event.Title === "") return null;

  return (
    <div style={{ backgroundColor: bgColor(event.Category)}} className="event">
      <h2>{event.Title}</h2>
      <h3>{event.Date}</h3>
      <p>{event.Description}</p>
    </div>
  )
}

export default EventCard;
