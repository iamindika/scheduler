

export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];
  let schedule = state.days.find(dayObj => dayObj.name === day);
  if (schedule && schedule.appointments) {
    appointmentsForDay = schedule.appointments.map(appointmentId => state.appointments[appointmentId]);
  }
  return appointmentsForDay;
}

export function getInterviewersForDay(state, day) {
  let interviewersForDay = [];
  let schedule = state.days.find(dayObj => dayObj.name === day);
  if (schedule && schedule.interviewers) {
    interviewersForDay = schedule.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  }
  return interviewersForDay;
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    return {...interview, interviewer}
  }
  return interview;
}