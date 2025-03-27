import { isLoading } from "expo-font";
import { createContext, useContext, useReducer } from "react";
import { database } from "../firebaseConfig";
import { ref, set, update } from "firebase/database";
import { onValue } from "firebase/database";

const EventContext = createContext();

const initialState = {
  selectedEvent: null,
  isLoading: false,
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SELECTED_EVENT":
      return {
        ...state,
        isLoading: true,
        selectedEvent: action.payload,
      };
    case "SELECTED_EVENT_SAVED":
      return {
        ...state,
        isLoading: false,
      };
    case "SELECTED_EVENT_NOT_SAVED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default: {
      throw new Error("Invalid action type");
    }
  }
}

function EventProvider({ children }) {
  const [{ selectedEvent, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // functions
  function markAttendance(event, user) {
    update(ref(database, `Attendance/${event.event_id}/${user.matricNumber}`), {
      Event: event.event_name,
      Event_id: event.event_id,
      date: event.date,
      student_name: user.firstName + " " + user.lastName,
      matricNumber: user.matricNumber,
      checkin_time: Date.now(),
    });
  }
  function handleSelectedEvent(event, user) {
    console.log(event);
    console.log(user);
    markAttendance(event, user);

    // dispatch({ type: "SET_SELECTED_EVENT", payload: [event, user] });
  }

  return (
    <EventContext.Provider
      value={{ selectedEvent, isLoading, error, dispatch, handleSelectedEvent }}
    >
      {children}
    </EventContext.Provider>
  );
}

function useEvent() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("EventProvider must be used within a UserProvider");
  }
  return context;
}

export { EventProvider, useEvent };
