import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import img from "../icon/backgrounduserprofile.jpg"

export default function UserInfo() {
  
   const [userDetail, setUserDetail] = useState({});
   const [loading, setLoading] = useState(false);
   const { user } = useAuthContext();
   console.log("inside the userinfo!");

  useEffect(() => {
    const localstorageUser = JSON.parse(localStorage.getItem("user"));
    console.log("--localstorage--");
    console.log(localstorageUser);
    console.log(localstorageUser.email);
    async function fetchUserData() {
      // console.log(user.email)
      const response = await fetch(
        `https://mern-backend-cdsb.onrender.com/api/userdata/${localstorageUser.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(user.email),
        }
      );
      const data = await response.json();
      if (data.status == "success") {
        setUserDetail(data.userData);
        // console.log(userDetail)
        // console.log(userDetail.firstName)
      } else {
        console.log("error in fetching userdetail");
      }
      setLoading(false);
    }

    fetchUserData();
    console.log("hellow dear");
  }, []);

  async function Update(e) {
    e.preventDefault()
    console.log(userDetail)
    const response = await fetch(`https://mern-backend-cdsb.onrender.com/api/updatedata`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetail),
    });
    alert("UPDATED SUCCESSFULLY!")
    
  }

  return (
    <div className="register--section  w-[-webkit-fill-available] flex flex-col  items-center rounded-md ">
      <h1 className="font-bold  text-2xl mt-16 mb-10">USER PROFILE!</h1>
      
      <form className=" userInfo-form w-[-webkit-fill-available] ml-28 p-10 mr-28 mb-20 shadow-lg">
        {/* {<div className="mb-4 font-medium text-red-700">{error}</div>} */}

        {/* profile photo */}
        {/* <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setUserDetail({ ...userDetail, image: base64 })
            }
          /> */}

        {/* first name */}
        <label className="block font-medium mt-9 ">First Name</label>
        <input
          className="border-gray-300 border-2 w-[70%] rounded-md h-10 mb-8 mt-2 p-4"
          value={userDetail.firstName}
          onChange={(e) =>
            setUserDetail({
              ...userDetail,
              firstName: e.target.value.toUpperCase(),
            })
          }
        />

        {/* last name */}
        <label className="block font-medium">Last Name</label>
        <input
          className="border-gray-300 border-2 w-[70%] rounded-md h-10  mb-8 mt-2 p-4"
          value={userDetail.lastName}
          onChange={(e) =>
            setUserDetail({
              ...userDetail,
              lastName: e.target.value.toUpperCase(),
            })
          }
        />

        {/* email */}
        <label className="block font-medium">Email</label>
        <input
          className="border-gray-300 border-2 w-[70%] rounded-md h-10  mb-8 mt-2 p-4"
          type="email"
          value={userDetail.email}
          // onChange={(e) =>
          //   setUserDetail({ ...userDetail, email: e.target.value })
          // }
        />

        <label className="block font-medium">Linkedin ID</label>
        <input
          className="border-gray-300 border-2 w-[70%] rounded-md h-10  mb-8 mt-2 p-4"
          type="url"
          value={userDetail.linkedin}
          onChange={(e) =>
            setUserDetail({ ...userDetail, linkedin: e.target.value })
          }
        />

        <select
          className="block border-black rounded-md mb-8 border-2 w-[70%] p-2"
          value={userDetail.status}
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
        <label className="block font-medium">A Little bit about u!</label>
        <textarea
          className="border-gray-300 border-2 w-[70%] rounded-md h-40  mb-8 mt-2 p-4 "
          value={userDetail.userdesc}
          onChange={(e) =>
            setUserDetail({ ...userDetail, userdesc: e.target.value })
          }
        />

        <button
          onClick={Update}
          className="bg-[#0091D5] text-white font-medium hover:bg-[#1C4E80] p-2 rounded-lg mt-10 mb-2 block w-[70%]"
        >
          UPDATE THE PROFILE VALUE
        </button>
      </form>
    </div>
  );
}
