import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import EventCard from './EventCard'

Modal.setAppElement('#root');

const Events = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newEvent, setNewEvents] = useState([
    {
      Title: "",
      Date: "",
      Description: "",
      Category: ""
    }
  ])


  const onChange = (e) => {
    let newArr = [...newEvent]
    newArr[0][e.target.name] = e.target.value
    setNewEvents(newArr)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/event', newEvent[0], {
      headers:  {'Content-Type': 'application/x-www-form-urlencoded'}
  })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log('err', err)
      })

    setIsOpen(false);
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/events`)
      .then(res => {
        setEvents(res.data)
      })
      .catch(err => {
        console.log('err', err)
      })
  }, [events])

  return (
    <div className="App">
      {events.map((event) => { return <EventCard event={event} /> })}
      <a className="fixedButton" href>
         <div className="roundedFixedBtn" onClick={openModal}><ion-icon name="add-outline"></ion-icon></div>
      </a>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        contentLabel="Example Modal"
      >
        <div className="container">
          <h3>Add New Event</h3>
          <form onSubmit={onSubmit}>
            <label className="label">Event:</label><br />
            <input onChange={onChange} type="text" name="Title" /><br />
            <label className="label">Date:</label><br />
            <input onChange={onChange} type="text" name="Date" /><br />
            <label className="label">Description:</label><br />
            <input onChange={onChange} type="text" name="Description" /><br />
            <label className="label">Category:</label><br />
            <input onChange={onChange} type="text" name="Category" /><br />
            <button onClick={closeModal}>Close</button>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Events;
