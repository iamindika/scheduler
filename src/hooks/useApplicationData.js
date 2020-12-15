import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const request = {
      "GET_DAYS"        : "http://localhost:8001/api/days",
      "GET_APPOINTMENTS": "http://localhost:8001/api/appointments",
      "GET_INTERVIEWERS": "http://localhost:8001/api/interviewers"
    }
    Promise.all([
      axios.get(request["GET_DAYS"]),
      axios.get(request["GET_APPOINTMENTS"]),
      axios.get(request["GET_INTERVIEWERS"])
    ])
    .then(all => {
      const [responseDays, responseAppointments, responseInterviewers] = all;
      setState((prev) => ({
        ...prev, 
        days        : responseDays.data, 
        appointments: responseAppointments.data,
        interviewers: responseInterviewers.data
      }));
    })
  }, []);

  const setDay = day => setState({...state, day});

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`/api/appointments/${id}`, { interview: {...interview} })
      .then(() => {
        setState({
          ...state,
          appointments
        })
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments
        })
      });
  }

  return { state, setDay, bookInterview, cancelInterview }
}