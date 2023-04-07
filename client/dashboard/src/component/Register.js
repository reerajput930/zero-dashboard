import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useAuthContext } from "../hooks/useAuthContext";

// ----------- login meaning ----------------- (signup is kind of login)
// storing email and token in localstorage
// updating the global state with dispatch (storing email and token in user state)

// ----------- logout means -------------------
//  removing the user detail(email and token) from localstorage
//  changing the global user state with help of dispatch (storing null in user state)

import "../index.css";
export default function Register() {
  const [userDetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedin: "",
    password: "",
    status: "",
    userdesc: "",
    image: "",
  });
  const [error, setError] = useState(false);
  const { dispatch } = useAuthContext();

  console.log(userDetail);

  async function submitted(e) {
    e.preventDefault();
    const response = await fetch("https://mern-backend-cdsb.onrender.com/api/signup", {
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
      firstName: "",
      lastName: "",
      email: "",
      linkedin: "",
      password: "",
      status: "",
      userdesc: "",
      image: "",
    });
  }
  

  return (
    <div className="register--section  w-[-webkit-fill-available] flex flex-col  items-center rounded-md ">
      <h1 className="font-bold  text-2xl mt-16 mb-10">REGISTER HERE!</h1>
      <form className=" flex flex-col items-center w-[80%] rounded-lg register--form text-white  ml-28 bg-white p-20 mr-28 mb-20 shadow-lg">
        {<div className="mb-4  font-medium text-left w-[100%] text-red-700">{error}</div>}

        {/* profile photo */}
        <FileBase64
         
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setUserDetail({ ...userDetail, image: base64 })
          }
        />

        {/* first name */}
        <label className="block  font-medium text-left w-[100%]  mt-10">First Name</label>
        <input
          className="border-gray-300 border-2   w-[100%] rounded-md h-10 mb-8 mt-2   p-4  outline-none border-none text-black"
          value={userDetail.firstName}
          onChange={(e) =>
            setUserDetail({ ...userDetail, firstName: e.target.value.toUpperCase() })
          }
        />

        {/* last name */}
        <label className="block  font-medium text-left w-[100%]">Last Name</label>
        <input
          className="border-gray-300 border-2   w-[100%] rounded-md h-10  mb-8 mt-2   p-4  outline-none border-none text-black"
          value={userDetail.lastName}
          onChange={(e) =>
            setUserDetail({ ...userDetail, lastName: e.target.value.toUpperCase() })
          }
        />

        {/* email */}
        <label className="block  font-medium text-left w-[100%]">Email</label>
        <input
          className="border-gray-300 border-2   w-[100%] rounded-md h-10  mb-8 mt-2   p-4  outline-none border-none text-black"
          type="email"
          value={userDetail.email.toLowerCase()}
          onChange={(e) =>
            setUserDetail({ ...userDetail, email: e.target.value })
          }
        />

        <label className="block  font-medium text-left w-[100%]">Linkedin ID</label>
        <input
          className="border-gray-300 border-2   w-[100%] rounded-md h-10  mb-8 mt-2   p-4  outline-none border-none text-black"
          type="url"
          value={userDetail.linkedin}
          onChange={(e) =>
            setUserDetail({ ...userDetail, linkedin: e.target.value })
          }
        />

        {/* password */}
        <label className="block  font-medium text-left w-[100%]">Password</label>
        <input
          className="border-gray-300 border-2   w-[100%] rounded-md h-10  mb-8 mt-2   p-4  outline-none border-none text-black"
          type="password"
          value={userDetail.password}
          onChange={(e) =>
            setUserDetail({ ...userDetail, password: e.target.value })
          }
        />

        <select
          className="block text-black outline-none border-none border-black rounded-md mb-8 border-2   w-[100%] p-2"
          onClick={(e) =>
            setUserDetail({ ...userDetail, status: e.target.value })
          }
        >
          <option value="Status">Status</option>
          <option value="Contributer">contributer</option>
          <option value="Team Lead">Team Lead</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Marketing Lead">Marketing Lead</option>
          <option value="Content Writer">Content Writer</option>
        </select>

        {/* userdesc */}
        <label className="block  font-medium text-left w-[100%]">A Little bit about u!</label>
        <input
          className="border-gray-300 border-2   w-[100%] rounded-md h-10  mb-8 mt-2   p-4  outline-none border-none text-black"
          value={userDetail.userdesc}
          onChange={(e) =>
            setUserDetail({ ...userDetail, userdesc: e.target.value })
          }
        />

        <button
          onClick={submitted}
          type="submit"
          className="bg-[#25007c] text-white  font-medium w-[100%] hover:bg-blue-400 hover:text-[#25007c] p-2 rounded-lg mt-10 mb-2 block "
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
