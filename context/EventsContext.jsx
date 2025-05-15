import { isLoading } from "expo-font";
import { createContext, useContext, useReducer } from "react";
import { database } from "../firebaseConfig";
import { ref, set, update, push } from "firebase/database";
import { onValue } from "firebase/database";
import { ObjectSchema } from "firebase/vertexai";

const EventContext = createContext();

const initialState = {
  selectedEvent: null,
  isLoading: false,
  error: false,
  errorMessage: "",
  success: false,

  // create Events State
  event_name: "",
  description: "",
  location: "",
  start_date: "",
  end_date: "",

  // all events from db
  allEvents: null,
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
    case "SET_CREATED_EVENT":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case "SET_CREATING_EVENT":
      return {
        ...state,
        isLoading: true,
        error: action.payload,
      };
    case "SET_CREATED_SAVED":
      return {
        ...state,
        isLoading: false,
        error: false,
        success: true,
        event_name: "",
        description: "",
        location: "",
        start_date: "",
        end_date: "",
      };
    case "GET_ALL_EVENTS":
      return {
        ...state,
        isLoading: false,
        allEvents: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };
    default: {
      throw new Error("Invalid action type");
    }
  }
}

function EventProvider({ children }) {
  const [
    {
      selectedEvent,
      event_name,
      description,
      location,
      start_date,
      end_date,
      isLoading,
      allEvents,
      error,
      errorMessage,
      success,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // functions
  function markAttendance(event, user) {
    update(ref(database, `Attendance/${event.event_id}/${user.matricNumber}`), {
      Event: event.event_name,
      Event_id: event.event_id,
      // date: event.date,
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

  // Create Events
  function handelChange(field, value) {
    dispatch({ type: "SET_CREATED_EVENT", payload: { field, value } });
  }
  //  Create Event and save to database
  function createEvent() {
    if (
      !event_name?.trim() ||
      !description?.trim() ||
      !start_date ||
      !end_date
    ) {
      dispatch({
        type: "ERROR",
        payload: "Fill in the complete Details of the event",
      });
      console.log("error");
      return;
    }
    const ISO_String_Start_Date = new Date(start_date).toISOString();
    const ISO_String_End_Date = new Date(end_date).toISOString();

    console.log("Start Date: ", ISO_String_Start_Date);
    console.log("END Date: ", ISO_String_End_Date);

    dispatch({ type: "SET_CREATING_EVENT", payload: null });
    const newEventRef = push(ref(database, "Events"));
    const event_id = newEventRef.key;
    set(newEventRef, {
      event_name: event_name,
      event_id: event_id,
      description: description,
      start_time: ISO_String_Start_Date,
      end_time: ISO_String_End_Date,
      location: location,
    })
      .then(() => {
        console.log("pushed");
        dispatch({ type: "SET_CREATED_SAVED", payload: null });
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch({ type: "SET_CREATED_SAVED", payload: null });
  }

  // Get All Events
  function getAllEvents() {
    const userRef = ref(database, `Events/`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (userRef) {
        const allEventsArray = Object.entries(data).map(([id, event]) => ({
          id, // Firebase key
          ...event,
        }));
        dispatch({ type: "GET_ALL_EVENTS", payload: allEventsArray });
      }
    });
    // console.log(allEvents);
  }

  return (
    <EventContext.Provider
      value={{
        selectedEvent,
        isLoading,
        error,
        errorMessage,
        success,
        event_name,
        description,
        location,
        start_date,
        end_date,
        allEvents,
        dispatch,
        handleSelectedEvent,
        handelChange,
        createEvent,
        getAllEvents,
      }}
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
