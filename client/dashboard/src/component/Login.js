import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";


// ----------- login meaning ----------------- (signup is kind of login)
// storing email and token in localstorage
// updating the global state with dispatch (storing email and token in user state)

// ----------- logout means -------------------
//  removing the user detail(email and token) from localstorage
//  changing the global user state with help of dispatch (storing null in user state)


export default function Login() {
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(false);
   

   async function submitted(e){
    e.preventDefault();
    const response = await fetch("https://mern-backend-cdsb.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetail),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      // save the user info to local storage
      // storing the email and token in localstorage (technically means login)
      localStorage.setItem("user", JSON.stringify(data));

      // nd change the global state in context
      // update the auth context
      dispatch({ type: "LOGIN", payload: data });
      window.location.href = '/tasks';
    }


    setUserDetail({
      email: "",
      password: "",
    })

   }

  return (
    <div className="register--section  w-[-webkit-fill-available] flex flex-col  items-center rounded-md ">
      <h1 className="font-bold  text-2xl mt-16 mb-10">LOGIN HERE!</h1>
      <form className="w-[-webkit-fill-available]  ml-28 bg-white p-10 mr-28 mb-20 shadow-lg">
      {<div className="mb-4 font-medium text-red-700">{error}</div>}
        {/* email */}
        <label className="block font-medium">Email</label>
        <input
          className="border-gray-300 border-2 w-[70%] rounded-md h-10  mb-8 mt-2 p-4"
          type="email"
          value={userDetail.email.toLowerCase()}
          onChange={(e) =>
            setUserDetail({ ...userDetail, email: e.target.value })
          }
        />

        {/* password */}
        <label className="block font-medium">Password</label>
        <input
          className="border-gray-300 border-2 w-[70%] rounded-md h-10  mb-8 mt-2 p-4"
          type="password"
          value={userDetail.password}
          onChange={(e) =>
            setUserDetail({ ...userDetail, password: e.target.value })
          }
        />

        <button
          onClick={submitted}
          type="submit"
          className="bg-[#0091D5] text-white font-medium hover:bg-[#1C4E80] p-2 rounded-lg mt-14 mb-2 block w-[70%]"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
