import React, { useState } from "react";

const Event = ({
  addEvent,
  saveEditEvent,
  closeModal,
  eventData,
  deleteEvent,
}) => {
  const [eventName, setEventName] = useState(eventData ? eventData.name : "");
  const [eventTime, setEventTime] = useState(eventData ? eventData.time : "");
  const [eventInvitees, setEventInvitees] = useState(
    eventData ? eventData.invitees : ""
  );

  const handleSaveEvent = () => {
    if (eventName && eventTime && eventInvitees) {
      if (eventData) {
        saveEditEvent(eventData.id, eventName, eventTime, eventInvitees);
      } else {
        addEvent(eventName, eventTime, eventInvitees);
      }
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSaveEvent();
  };

  return (
    <div className="event-modal">
      <h3>{eventData ? "Edit Event" : "Add Event"}</h3>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          required
          type="text"
          className="border border-neutral-300 px-2"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <label>Time:</label>
        <input
          required
          type="time"
          className="border border-neutral-300 px-2"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
        <label>Invitees:</label>
        <input
          required
          type="email"
          className="border border-neutral-300 px-2"
          value={eventInvitees}
          onChange={(e) => setEventInvitees(e.target.value)}
        />
        <div className="flex gap-3 justify-end">
          <button onClick={closeModal}>Cancel</button>
          {eventData && (
            <button
              className="bg-red-600 rounded-lg px-2 md:ml-1 text-xs md:text-base text-white"
              onClick={(e) => {
                e.stopPropagation();
                deleteEvent(eventData.id);
              }}
            >
              Delete
            </button>
          )}
          <button
            className="bg-blue-500 rounded-lg px-2 py-1 text-white"
            type="submit"
          >
            {eventData ? "Save Changes" : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Event;
