const express = require("express")
const Event = require("../model/event")

const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const event = new Event(eventData);
    await event.save();
    console.log('Event data received from frontend:', eventData);
    res.status(200).json({ message: 'Event data received at backend' });
  } catch (err) {
    console.error('Failed to save event data:', err);
    res.status(500).json({ error: 'Failed to save event data' });
  }
};

const getEvents = async (req, res) => {
  try {
    const eventDataFromDatabase = await Event.find();
    res.status(200).json({ message: 'Events data retrieved from backend', eventData: eventDataFromDatabase });
  } catch (err) {
    console.error('Failed to retrieve events data:', err);
    res.status(500).json({ error: 'Failed to retrieve events data' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { _id, title, extendedProps } = req.body;
    console.log(_id);
    console.log(title);
    console.log(extendedProps);
    const updatedEvent = await Event.findByIdAndUpdate(_id, { title: title, extendedProps: extendedProps });
    console.log(updatedEvent);
    res.status(200).json({ "success ": 'Event data updated at backend' });
  } catch (err) {
    console.log('Failed to update event data:', err.message);
    res.status(500).json({ "error": 'Failed to update event data' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    const datadel = await Event.findByIdAndDelete({ _id });
    console.log(datadel);
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error('Failed to delete event data:', err.message);
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
};
