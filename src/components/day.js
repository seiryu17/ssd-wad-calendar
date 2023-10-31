import React from "react";

const Day = ({ date, events, openModal, deleteEvent, editEvent }) => {
  const renderEvents = () => {
    if (events && events.length > 0) {
      return events.map((event, index) => (
        <div
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            editEvent(index);
          }}
          className={`event divide-y ${
            index !== events.length - 1 ? "mb-2" : ""
          }`}
          style={{ backgroundColor: event.color }}
        >
          <p className="px-2 truncate">{event.name}</p>
          <p className="px-2 truncate">{event.time}</p>
          <p className="px-2 truncate">{event.invitees}</p>
          {/* <button
            className="bg-red-600 rounded-lg px-2 md:ml-1 text-xs md:text-base"
            onClick={(e) => {
              e.stopPropagation();
              deleteEvent(index);
            }}
          >
            Delete
          </button> */}
        </div>
      ));
    } else {
      return null;
    }
  };

  return (
    <div
      onClick={openModal}
      className="day border border-solid border-gray-200 min-h-[7rem] hover:cursor-pointer hover:bg-gray-100"
    >
      <p className="mx-3 m-2">{date.getDate()}</p>
      {renderEvents()}
    </div>
  );
};

export default Day;
