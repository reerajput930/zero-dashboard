import React, { useState, useEffect, useContext } from "react";
import defaultImg from "./default-profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faMessage,
  searching,
} from "@fortawesome/free-regular-svg-icons";
// import Loader from "./Loader";
import { Audio,Circles,ThreeDots } from "react-loader-spinner";


export default function Contributers() {
  const [users, setUsers] = useState({});
  const [filterUsers, setFilterUsers] = useState({});
  const [nameSearch, setNameSearch] = useState("RIYA");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAllUsers() {
      const response = await fetch(
        `https://mern-backend-cdsb.onrender.com/api/allusers`
      );
      const data = await response.json();

      if (data.status === "success") {
        // console.log(data.users)
        setUsers(data.users);
        setFilterUsers(data.users);
        setLoading(true);
      } else {
        console.log("error in fetching the all profiles");
      }
    }

    fetchAllUsers();
  }, []);

  let cards;
  function searching() {
    const nameSearch = document.querySelector("#search").value;
    console.log(nameSearch);
    if (nameSearch) {
      let filter = users.filter((user) => {
        let name = user.firstName.concat(user.lastName);
        console.log(name);
        return name.toUpperCase().indexOf(nameSearch.toUpperCase()) != -1;
      });

      console.log("_-----------------");
      console.log(filter);
      setFilterUsers(filter);

      cards = filterUsers.map((user) => {
        //  console.log(user)
        return (
          <div className="user--card bg-white shadow-md rounded-lg m-3 h-fit w-[26%]">
            <div className="upper--section flex justify-center align-bottom ">
              <div className="img--block w-24 h-20 m-3 ml-5">
                <img
                  className="rounded-full w-24 h-24 object-cover"
                  src={user.image ? user.image : defaultImg}
                  alt="profile image"
                />
              </div>
              <div className="detail--block flex flex-col justify-center ml-4 mr-8">
                <h2 className="name text-lg font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <h2 className="status text-sm">{user.status}</h2>
              </div>
            </div>

            <p className="ml-7 m-3 mt-0">{user.userdesc} </p>
            <div className="btn--section border-t-4 border-[#fafbfb] flex justify-evenly">
              <div className=" w-full text-center p-3 border-r-4 border-[#fafbfb] cursor-pointer hover:bg-[#0091D5] hover:text-white font-semibold rounded-bl-md">
                <FontAwesomeIcon className="mr-2" icon={faMessage} />{" "}
                <a href={user.email} target="_blank">
                  Send Email
                </a>
              </div>
              <div className=" w-full text-center p-3 cursor-pointer hover:bg-[#0091D5] hover:text-white font-semibold rounded-br-md">
                <a href={user.linkedin} target="_blank">
                  {" "}
                  <FontAwesomeIcon className="mr-2" icon={faFaceSmile} />
                  View Profile
                </a>{" "}
              </div>
            </div>
          </div>
        );
      });
    } else {
      setFilterUsers(users);
    }
  }

  if (loading) {
    cards = filterUsers.map((user) => {
      //  console.log(user)
      return (
        <div className="user--card bg-white shadow-md rounded-lg m-3 h-fit w-[26%]">
          <div className="upper--section flex justify-center align-bottom ">
            <div className="img--block w-24 h-20 m-3 ml-5">
              <img
                className="rounded-full w-24 h-24 object-cover"
                src={user.image ? user.image : defaultImg}
                alt="profile image"
              />
            </div>
            <div className="detail--block flex flex-col justify-center ml-4 mr-8">
              <h3 className="name text-lg font-bold">
                {user.firstName} {user.lastName}
              </h3>
              <h2 className="status text-sm">{user.status}</h2>
            </div>
          </div>
          <p className="ml-7 m-3 mb-2 mt-3 text-sm">{user.userdesc} </p>
          <div className="btn--section border-t-4 border-[#fafbfb] flex justify-evenly">
            <div className=" w-full text-center p-3 border-r-4 border-[#fafbfb] cursor-pointer hover:bg-[#0091D5] hover:text-white font-semibold rounded-bl-md">
              <FontAwesomeIcon className="mr-2" icon={faMessage} />{" "}
              <a href={user.email} target="_blank">
                Send Email
              </a>
            </div>
            <div className=" w-full text-center p-3 cursor-pointer hover:bg-[#0091D5] hover:text-white font-semibold rounded-br-md">
              <FontAwesomeIcon className="mr-2" icon={faFaceSmile} />
              <a href={user.linkedin} target="_blank">
                View Profile
              </a>{" "}
            </div>
          </div>
        </div>
      );
    });
    // setLoading(false)
  }

  return (
    <div className="contMainDIV flex flex-col  w-[-webkit-fill-available] items-center">
      <div className="search--block flex flex-col  w-[-webkit-fill-available] items-center">
        <input
          type="text"
          onChange={searching}
          id="search"
          className=" inline w-[60%]   h-[70px] outline-none mt-20 p-3 pt-[15px] rounded-xl shadow-lg"
          placeholder="Search for contributer's name... "
        />
        {/* <span><FontAwesomeIcon className="mr-2" icon={faFaceSmile} /></span> */}
      </div>

      <div className="cards--section flex flex-wrap w-[-webkit-fill-available] mt-24 items-baseline justify-center">
        
        {!loading &&  <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />}
        {cards}
      </div>
    </div>
  );
}
