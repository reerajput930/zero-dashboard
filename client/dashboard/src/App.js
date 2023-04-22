import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tasks from "./component/Tasks";
import CreateTask from "./component/CreateTask";
import Addtags from "./component/Addtags";
import Piechart from "./component/charts/Piechart";
import Barchart from "./component/charts/Barchart";
import Navbar from "./component/Navbar";
import Edit from "./component/Edit";
import Calender from "./component/Calender";
import MixBarchart from "./component/charts/MixedBarchart";
import Contributers from "./component/Contributers";
import Register from "./component/Register";
import Login from "./component/Login";
import UserInfo from "./component/UserInfo";
import Testing from "./component/Testing";
import { useAuthContext } from "./hooks/useAuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function App() {
  const { user } = useAuthContext();

  return (
    <>
      {/* <h1>hello</h1>         */}
      {!user && (
        <div className="w-full flex justify-center  items-center h-[40rem]">
          {/* signin/login/register means new user have to create the account before entering  */}
          <Link to={"/register"}>
            <li className=" font-bold text-4xl inline text-center mr-3">
              <FontAwesomeIcon className="mr-1" icon={faUser} /> SIGNUP{" "}
            </li>
          </Link>
          <span className="font-medium text-[60px] align-middle relative bottom-[3px] ">
            /
          </span>

          {/* login/signin means user has already register , put your credential and enter into application */}
          <Link to={"/login"}>
            <li className=" font-bold text-4xl inline ml-3">
               LOGIN{" "}
            </li>
          </Link>
        </div>
      )}
      {user && (
        <>
          <Navbar />
        </>
      )}
      <Routes>
        <Route path="/calender" element={<Calender/>}  />
        <Route path="/testing" element={<Testing/>}/>
        <Route path="/userinfo" element={<UserInfo/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contributers" element={<Contributers />} />
        <Route path="/piechart" element={<Piechart />} />
        <Route path="/mixbarchart" element={<MixBarchart />} />
        <Route path="/update" element={<Edit />} />
        <Route path="/barchart" element={<Barchart />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/createtask" element={<CreateTask />} />
      </Routes>
    </>
  );
}
