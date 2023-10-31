import React, { useState, useEffect } from "react";
import { monthNames } from "../constant/months";
import Day from "./day";
import { daysName } from "../constant/days";
import Event from "./event";
import Modal from "./modal";

const Calendar = () => {
  const [currentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventData, setEventData] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const firstDayOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
      days.push(new Date(day));
    }

    return days;
  };

  const loadEvents = () => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const getEventsForDay = (selectedDay) => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const allEvents = JSON.parse(storedEvents);
      return allEvents[selectedDay.toDateString()] || [];
    }
    return [];
  };

  const openModal = (day) => {
    setSelectedDay(day);
    setIsFormOpen(true);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setIsFormOpen(false);
    setEventData(null);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const addEvent = (name, time, invitees) => {
    const selectedDayString = selectedDay.toDateString();
    const storedEvents = localStorage.getItem("events");
    const allEvents = storedEvents ? JSON.parse(storedEvents) : {};

    if (
      allEvents[selectedDayString] &&
      allEvents[selectedDayString].length >= 3
    ) {
      alert("You can only add three events per day.");
      return;
    }

    const eventId = Date.now().toString();
    const newEvent = {
      id: eventId,
      name,
      time,
      invitees,
      color: getRandomColor(),
    };

    allEvents[selectedDayString] = allEvents[selectedDayString] || [];
    allEvents[selectedDayString].push(newEvent);

    localStorage.setItem("events", JSON.stringify(allEvents));
  };

  const deleteEvent = (day, index) => {
    const selectedDayString = day.toDateString();
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const allEvents = JSON.parse(storedEvents);
      if (allEvents[selectedDayString]) {
        allEvents[selectedDayString].splice(index, 1);
        localStorage.setItem("events", JSON.stringify(allEvents));
        setEvents([...allEvents[selectedDayString]]);
      }
    }
  };

  const editEvent = (day, index) => {
    openModal(day);
    const storedEvents = localStorage.getItem("events");
    const selectedDayString = day.toDateString();
    const allEvents = JSON.parse(storedEvents);
    if (allEvents && allEvents[selectedDayString][index]) {
      setEventData(allEvents[selectedDayString][index]);
    }
  };

  const saveEditEvent = (eventId, name, time, invitees) => {
    const selectedDayString = selectedDay?.toDateString();

    const updatedEvents = { ...events };

    if (updatedEvents[selectedDayString]) {
      const index = updatedEvents[selectedDayString].findIndex(
        (event) => event.id === eventId
      );

      if (index !== -1) {
        updatedEvents[selectedDayString][index] = {
          ...updatedEvents[selectedDayString][index],
          name,
          time,
          invitees,
        };

        const storedEvents = localStorage.getItem("events");
        const allEvents = storedEvents ? JSON.parse(storedEvents) : {};
        allEvents[selectedDayString] = updatedEvents[selectedDayString];
        localStorage.setItem("events", JSON.stringify(allEvents));

        setEvents(updatedEvents);
      }
    }
    closeModal();
  };

  const renderDays = (openModal) => {
    const daysInMonth = getDaysInMonth(currentDate);

    const emptyCells = [...Array(firstDayOfWeek)].map((_, index) => (
      <div key={`empty-${index}`} className="day empty-day"></div>
    ));

    const allDays = [
      ...emptyCells,
      ...daysInMonth.map((day) => {
        const dayEvents = getEventsForDay(day);
        return (
          <Day
            key={day}
            date={day}
            openModal={() => openModal(day)}
            events={dayEvents}
            deleteEvent={(index) => deleteEvent(day, index)}
            editEvent={(index) => editEvent(day, index)}
          />
        );
      }),
    ];

    return allDays;
  };

  return (
    <div className="calendar p-4">
      <div className="header flex justify-center items-center">
        <h2 className="text-xl font-semibold">
          {monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear()}
        </h2>
      </div>
      <div className="days grid grid-cols-7 gap-2 mt-3">
        {daysName.map((day) => (
          <div key={day} className="day font-semibold text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="days grid grid-cols-7">{renderDays(openModal)}</div>
      <Modal isOpen={isFormOpen} closeModal={closeModal}>
        <Event
          day={selectedDay}
          eventData={eventData}
          events={events}
          closeModal={closeModal}
          addEvent={addEvent}
          saveEditEvent={saveEditEvent}
        />
      </Modal>
    </div>
  );
};

export default Calendar;
