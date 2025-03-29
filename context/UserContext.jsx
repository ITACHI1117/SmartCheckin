import { createContext, useContext, useReducer, useState } from "react";
import { auth } from "../firebaseConfig";
import { database } from "../firebaseConfig";
import { onValue, ref, set } from "firebase/database";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const UserContext = createContext();

const initialState = {
  user: null,
  firstName: "",
  lastName: "",
  matricNumber: "",
  email: "",
  password: "",
  isFetching: false,
  LoginLoading: false,
  LoginError: false,
  SignUpLoading: false,
  SignUpError: false,
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CREDENTIALS":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case "SIGN_UP_START":
      return {
        ...state,
        SignUpLoading: true,
        error: false,
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        SignUpLoading: false,
        user: action.payload,
      };
    case "SIGN_UP_FAILURE":
      return {
        ...state,
        SignUpLoading: false,
        SignUpError: action.payload,
        error: action.payload,
      };
    case "LOGIN_START":
      return {
        ...state,
        LoginLoading: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        LoginLoading: false,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        LoginLoading: false,
        LoginError: action.payload,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default: {
      throw new Error("Invalid action type");
    }
  }
}

function UserProvider({ children }) {
  const [
    {
      user,
      firstName,
      lastName,
      matricNumber,
      email,
      password,
      LoginLoading,
      LoginError,
      SignUpLoading,
      SignUpError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handelChange(field, value) {
    dispatch({ type: "SET_CREDENTIALS", payload: { field, value } });
  }

  function addNewUser(user) {
    set(ref(database, "users/" + user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      matricNumber: matricNumber,
    });
  }

  function getUserInfo(user) {
    const userRef = ref(database, "users/" + user.uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    });
  }

  function SignUp() {
    dispatch({ type: "SIGN_UP_START", payload: user });
    console.log(email);
    console.log(password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        addNewUser(user);
        // get the user info from DB
        const userRef = ref(database, "users/" + user.uid);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          dispatch({ type: "SIGN_UP_SUCCESS", payload: data });
        });
        // console.log(user);
        // dispatch({ type: "SIGN_UP_SUCCESS", payload: userInfo });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch({ type: "SIGN_UP_FAILURE", payload: errorMessage });
        console.log(errorMessage);
      });
  }

  function Login() {
    dispatch({ type: "LOGIN_START", payload: user });

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sign in
        const user = userCredential.user;
        getUserInfo(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
        console.log(errorMessage);
      });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        firstName,
        lastName,
        matricNumber,
        email,
        password,
        LoginLoading,
        LoginError,
        SignUpLoading,
        SignUpError,
        dispatch,
        SignUp,
        Login,
        handelChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserProvider must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
