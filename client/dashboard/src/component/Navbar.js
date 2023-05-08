import React, { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useAuthContext } from "../hooks/useAuthContext";
import img from "../icon/pieChart.png";
import "../index.css";
import "./NavBar.css";

import logoImg from "../icon/image.png";

// importing userbuild hook (useLogout)
import useLogout from "../hooks/useLogout";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [focus, setFocus] = useState();
  const [prev, setPrev] = useState("class2");

  function handleLogout() {
    console.log("hy i am clicked");
    logout();
  }

  const [isClose, setClose] = useState(false);
  //   const nothing = false

  // function for highlight
  function highlight(e, idName) {
    e.preventDefault();

    if (prev) {
      document.querySelector(`#${prev}`).style.backgroundColor = null;
      document.querySelector(`#${prev}`).style.color = null;
    }

    // style the current
    document.querySelector(`#${idName}`).style.backgroundColor = "#1d4ed8";
    document.querySelector(`#${idName}`).style.color = "white";

    setPrev(idName);
  }

  return (
    <>
      {isClose ? (
        <>
          <h3 className=" font-extrabold text-4xl inline-block ml-3 text-blue-600 relative top-2">
            ZE
          </h3>
          <h3 className=" font-extrabold text-4xl inline-block text-red-600 relative top-2">
            RO
          </h3>
        </>
      ) : (
        <nav className="nav w-[310px]">
          <ul className="navbar--ul p-7 text-white h-full  shadow-2xl ">
            <div className="zero">
              {/* <span> <img src={logoImg} className="h-20 inline" /> </span> */}
              <h3 className=" font-extrabold text-4xl inline-block ml-3 text-blue-300 relative top-2">
                ZE
              </h3>
              <h3 className=" font-extrabold text-4xl inline-block text-red-600 relative top-2">
                RO
              </h3>
            </div>

            {/* <h3 className=" mt-20 mb-4 text-gray-400 "></h3> */}

            {user && (
              <>
                <div className="user--info">
                  <h4 className=" mt-16 mb-2 text-gray-400 ">USER PROFILE</h4>
                  {console.log(user)}
                  <li className=" font-small  mt-5 text-base m-4  mb-1 ">
                    <Link to={"/userinfo"}>
                      <span className="mr-2 cursor-pointer">
                        {user.firstName}
                      </span>
                    </Link>
                    <Link to={"/userinfo"}>
                      <span className=" cursor-pointer">{user.lastName}</span>
                    </Link>
                  </li>

                  <Link to={"/userinfo"}>
                    <li className="cursor-pointer font-small text-base m-4 mt-0 ">
                      {user.email}
                    </li>
                  </Link>
                </div>
              </>
            )}

            {/* ------ if user === null ----------------- */}
            {!user && (
              <>
                {/* signin/login/register means new user have to create the account before entering  */}
                <Link to={"/register"}>
                  <li className=" font-small text-sm mb-2 m-4 mr-2 mt-1 inline">
                    <FontAwesomeIcon className="mr-1" icon={faUser} /> SIGNUP{" "}
                  </li>
                </Link>
                <span className="font-medium text-[35px] align-middle relative bottom-[3px] ">
                  /
                </span>

                {/* login/signin means user has already register , put your credential and enter into application */}

                <Link to={"/login"}>
                  <li className=" font-small text-sm mb-8 m-4 ml-2 mt-1 inline  hover:bg-[#e6effc]">
                    <FontAwesomeIcon className="mr-1" icon={faUser} /> LOGIN{" "}
                  </li>
                </Link>
              </>
            )}

            <div className="dashboard">
              <h4 className=" mt-5 mb-4 text-gray-400 ">DASHBOARD</h4>

              <Link to={"/contributers"}>
                <li
                  className="  font-small  text-lg mb-8 m-0 mt-1 hover:bg-[#e6effc] hover:text-black pt-[14px] pb-[14px] pl-[15px] rounded-md"
                  id="class1"
                >
                  <FontAwesomeIcon className="mr-3" icon={faUser} /> Contributer{" "}
                </li>
              </Link>
            </div>

       
            <div className="growth">
            <h4 className=" mt-5 mb-4 text-gray-400 ">PROGRESS REPORT</h4>

            <Link to={"/tasks"}>
              <li
                className=" font-small text-lg mb-8 m-0 mt-1  hover:bg-[#e6effc] hover:text-black pt-[14px] pb-[14px] pl-[15px] rounded-md"
                id="class2"
                
              >
                <FontAwesomeIcon className="mr-3" icon={faClipboard} /> Progress </li>
            </Link>
            </div>

            <div className="calender">
              <h4 className=" mt-5 mb-4 text-gray-400">REMINDER AND EVENTS</h4>
              <Link to={"/calender"}>
                <li
                  className="  mb-8 font-small text-lg  mt-1  hover:bg-[#e6effc] hover:text-black pt-[14px] pb-[14px] pl-[15px] rounded-md"
                  id="class3"
                  //  onClick={(e)=> highlight(e,e.target.id)}
                >
                  <FontAwesomeIcon className="mr-3" icon={faCalendar} />{" "}
                  Calender
                </li>
              </Link>
            </div>

            <div className="charts">
              <h4 className=" mt-5 mb-4 text-gray-400">CHARTS</h4>
              <Link className="bar" to={"/barchart"}>
                <li
                  className=" font-small text-lg mb-3 hover:bg-[#e6effc] hover:text-black pt-[14px] pb-[14px] pl-[15px]  rounded-md"
                  id="class4"

                  // onClick={(e) => highlight(e, e.target.id)}
                >
                  <FontAwesomeIcon className="mr-3" icon={faChartBar} />{" "}
                  BarChart
                </li>
              </Link>

              <Link className="pie" to={"/piechart"}>
                <li
                  className=" font-small text-lg mb-3 mt-1  hover:bg-[#e6effc] hover:text-black pt-[14px] pb-[14px] pl-[15px]  rounded-md"
                  id="class5"
                  // onClick={(e)=> highlight(e,e.target.id)}
                >
                  <img className="w-[22px] inline mr-3" src={img}></img>{" "}
                  PieChart
                </li>
              </Link>

              <Link className="mix" to={"/mixbarchart"}>
                <li
                  className=" font-small text-lg mb-3    hover:bg-[#e6effc] hover:text-black pt-[14px] pb-[14px] pl-[15px] rounded-md"
                  id="class6"
                  // onClick={(e)=> highlight(e,e.target.id)}
                >
                  <FontAwesomeIcon className="mr-3" icon={faChartBar} />{" "}
                  MixBarChart
                </li>
              </Link>
            </div>

            {/* ------------ if user detail is present (login) --------------------- */}
            {user && (
              <li
                onClick={handleLogout}
                className="logout cursor-pointer ffont-small text-lg  mt-1  hover:bg-[#e6effc] hover:text-black pt-[14px] pb-[14px] pl-[15px] rounded-md "
              >
                LOGOUT
              </li>
            )}
          </ul>
        </nav>
      )}

      <Hamburger
        className="ham"
        style={{ margin: "2px" }}
        rounded
        onToggle={(toggled) => {
          if (toggled) {
            // console.log(isClose);
            setClose(true);
          } else {
            setClose(false);
            // console.log(isClose);
            // close a menu
          }
        }}
      />
    </>
  );
}
