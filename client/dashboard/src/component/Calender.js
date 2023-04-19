import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// // import './MyCalender.css';


export const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [selectedEventInfo, setSelectedEventInfo] = useState(null);
  const [editingMode, setEditingMode] = useState(false)
  const [editedEventName, setEditedEventName] = useState("");
  const [editedEventDesc, setEditedEventDesc] = useState("");

  // to get the data
  useEffect(() => {
    async function fetchedData() {
      await fetch("http://localhost:5000/api/events").then(response => response.json())
        .then(data => {
          setEvents(data.eventData);
          console.log('Events data fetched:', data);
        })
        .catch(error => {
          console.error('Error fetching events data:', error);
        });
    }
    fetchedData();
  }, []);

  const handleSelect = (info) => {   // getting info abt the particular selected date 
    setSelectedInfo(info);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEventName("");
    setEventDesc("");
    setSelectedInfo(null);
    setEditingMode(false);
  };


  const handleModalSubmit = () => {
    if (eventName) {
      if (editingMode) {
        //Updating Data
        console.log("updating info");
        console.log("editedEventDesc:", editedEventDesc);
        console.log(selectedEventInfo.extendedProps._id)
        fetch(`http://localhost:5000/api/update_event`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            start: selectedEventInfo.start,
            end: selectedEventInfo.end,
            title: editedEventName,
            extendedProps: {
              description: editedEventDesc
            },
            _id: selectedEventInfo.extendedProps._id,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Event data updated:', data);
            setEvents((prevEvents) =>
              prevEvents.map((event) => {
                if (event.id === selectedEventInfo.id) {
                  return {
                    ...event,
                    start: selectedEventInfo.start,
                    end: selectedEventInfo.end,
                    title: editedEventName,
                    extendedProps: {
                      ...event.extendedProps,
                      description: editedEventDesc,
                    },
                  };
                }
                return event;
              })
            );
            setEditingMode(false);
            setEditedEventName("");
            setEditedEventDesc("");
            handleModalClose();
            window.location.reload();
          })
          .catch(error => {
            console.error('Error updating event data:', error);
          });
      }

      else {
        //creating Data
        const eventData = {
          start: selectedInfo.start,
          end: selectedInfo.end,
          title: eventName,
          extendedProps: {
            description: eventDesc,
          },
        };
        console.log(eventData)
        fetch('http://localhost:5000/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Event data sent to backend:', data);
            setEvents([...events, eventData]);
            handleModalClose();
          })
          .catch(error => {
            console.error('Error sending event data to backend:', error);
          });
      }
    }
  };

  // for deleting data
  const handleEventDelete = (id) => {
    console.log(id);
    fetch('http://localhost:5000/api/delete_event/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: id })
    })
      .then((response) => {
        if (response.ok) {
          console.log('Event data deleted at backend');
        } else {
          console.error('Failed to delete event data:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Failed to delete event data:', error);
      });
    window.location.reload();
  };


  const handleEventInfo = (event) => {
    console.log(event.event)
    setSelectedEventInfo(event.event);
    setShowEventInfo(true);
  };

  const handleEditEvent = (event) => {
    console.log("edit clicking ")
    console.log(event.event.title)
    console.log(event.event.extendedProps.description)
    setShowModal(true);
    console.log(event.event)
    console.log(events)
    setSelectedEventInfo(event.event);
    setEditingMode(true);
    setEditedEventName(event.event.title);
    setEditedEventDesc(event.event.extendedProps.description);
    setEventName(event.event.title);
    setEventDesc(event.event.extendedProps.description);

  }

  return (
    <div>
      <FullCalendar
        editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: "today prev next",
          center: 'title',
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        height={'100vh'}
        eventContent={(eventInfo) => {
          return (
            <>
           <div className="event-container">
      <div className="event-title" onClick={() => setSelectedInfo(eventInfo)}>
        {eventInfo.event.title}
      </div>
      <div className="icon-container">
  <FontAwesomeIcon icon={faEdit} size="sm" className="btn" onClick={() => handleEditEvent(eventInfo)} />
  <FontAwesomeIcon icon={faInfoCircle} size="sm" onClick={() => handleEventInfo(eventInfo)} />
</div>
    </div>
            </>
          );
        }}
      />

      {/* Modal to show event name,desc and also a remove button to del event */}
      <Modal show={showEventInfo} onHide={() => setShowEventInfo(false)} className={'modalOne'} >
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <Modal.Title> Event Name : {selectedEventInfo?.title} </Modal.Title>
          <Button variant="danger" className=" mr-2 delIcon"  onClick={() => handleEventDelete(selectedEventInfo.extendedProps._id)}>
            <FontAwesomeIcon icon={faTrash} />                                                                       {/* delete icon */}
            </Button>
          <Button type="button" className="btn btn-secondary" onClick={() => setShowEventInfo(false)}>Close </Button>
        </Modal.Header >
        <Modal.Body>
          <h4>Event Description :</h4>
          {selectedEventInfo?.extendedProps.description}
        </Modal.Body>
      </Modal>

      {/* Modal to create event and edit event */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingMode ? "Edit Event" : "Enter event name:"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {editingMode && (
              <>
                <Form.Group controlId="formEventName">
                  <Form.Label>Event name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter event name"
                    value={editedEventName}
                    onChange={(e) => setEditedEventName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formEventDesc">
                  <Form.Label>Event description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editedEventDesc}
                    onChange={(e) => setEditedEventDesc(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
            {!editingMode && (
              <>
                <Form.Group controlId="formEventName">
                  <Form.Label>Event name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter event name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEventDesc">
                  <Form.Label>Event description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter event description"
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            {editingMode ? "Save" : "Add Event"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyCalendar;
