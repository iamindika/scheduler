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
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
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
    
    const dayId = state.days.find(day => day.appointments.includes(id)).id - 1;
    
    const day = {
      ...state.days[dayId], 
      appointments: [...state.days[dayId].appointments],
      interviewers: [...state.days[dayId].interviewers],
      spots: --state.days[dayId].spots
    }
     
    const days = [
      ...state.days
    ]

    days[dayId] = day;

    // console.log(days);

    return axios
      .put(`/api/appointments/${id}`, { interview: {...interview} })
      .then(() => {
        setState({
          ...state,
          appointments,
          days
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

    const dayId = state.days.find(day => day.appointments.includes(id)).id - 1;
    
    const day = {
      ...state.days[dayId], 
      appointments: [...state.days[dayId].appointments],
      interviewers: [...state.days[dayId].interviewers],
      spots: ++state.days[dayId].spots
    }
     
    const days = [
      ...state.days
    ]

    days[dayId] = day;

    // console.log(days);

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        })
      });
  }

  // function availableSpots(appointmentId, add = true){
  //   const dayInfo = state.days.find(day => day.appointments.includes(appointmentId));
  //   add ? dayInfo.spots++ : dayInfo.spots--;
  //   const days = state.days;
  //   days[dayInfo.id - 1] = dayInfo;
  //   return days;
  // }

  return { state, setDay, bookInterview, cancelInterview }
}