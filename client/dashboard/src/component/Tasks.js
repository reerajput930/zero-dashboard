import React, { useState, useEffect } from "react";
import "./Tasks.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import "../index.css";
import { Audio, Circles, ThreeDots } from "react-loader-spinner";

export default function Tasks() {
  // const [taskNo, setTaskNo] = useState(1);
  const [loading, setLoading] = useState(false);

  const [storeTasks, setStoreTasks] = useState({
    tasks: [],
  });
  var tasks = {
    todo: [],
    inprogress: [],
    close: [],
    done: [],
  };

  useEffect(() => {
    async function fetchAllTasks() {
      //   // e.preventDefault();
      const response = await fetch(
        "https://mern-backend-cdsb.onrender.com/api/alltasks"
      );

      const data = await response.json();

      if (data.status === "success") {
        // console.log("-----------------")
        // console.log(data.tasks);
        // console.log("-----------------")
        setStoreTasks({ tasks: data.tasks });
        console.log(storeTasks);
        setLoading(true);
      } else {
        console.log("error in fetching data from api");
      }
    }
    fetchAllTasks();
  }, []);
  async function updateTasks(task) {
    const response = await fetch(
      "https://mern-backend-cdsb.onrender.com/api/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
  }

  // drag and drop important methods---------------------
  const dragStart = (e, _id) => {
    console.log("this task is draged:", _id);
    e.dataTransfer.setData("id", _id);
  };
  const dragOver = (e) => {
    e.preventDefault();
  };
  const drop = (e, category) => {
    let id = e.dataTransfer.getData("id");
    // console.log(category);

    let task = storeTasks.tasks.filter((task) => {
      if (task._id == id) {
        task.category = category;
        // console.log(task)
        updateTasks(task);
      }
      return task;
    });
    // console.log(task);
    // don't know how is this working
    setStoreTasks({ ...storeTasks, task });
    // console.log(storeTasks);
  };

  // --------------------------------------------------

  async function del(e, taskId) {
    // console.log(taskId)
    const response = await fetch(
      "https://mern-backend-cdsb.onrender.com/api/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: taskId }),
      }
    ).catch((error) => {
      console.log(error);
    });

    window.location.reload();
  }
  console.log(storeTasks);
  storeTasks.tasks.map((task) => {
    console.log(task._id);
    tasks[task.category].push(
      <div
        onDragStart={(e) => dragStart(e, task._id)}
        draggable
        key={task._id}
        className="task--detail cursor-pointer "
        // style={{ backgroundColor: task.bgcolor }}
      >
        {/* <h3>{task.taskNo}</h3> */}
        <p>{task.taskDesc}</p>
        <div className="tags--block">
          {task.tags.map((tag) => {
            return <b>#{tag}</b>;
          })}
        </div>
        <div className="btn--block">
          <button
            className="bg-[#0091D5] text-white font-medium hover:bg-[#1C4E80] "
            onClick={(e) => del(e, task._id)}
          >
            DELETE{" "}
          </button>
          <Link to={"/update"} onClick={()=>{localStorage.setItem("task._id",task._id)}}>
            <FontAwesomeIcon className="mr-3" icon={faEdit} />
          </Link>
          {/* <button>edit</button> */}
        </div>
      </div>
    );
  });

  return (
    <div className="taskmanger--block  ">
      <h1 className="heading  mt-12 font-extrabold text-4xl ">
        Task progress Report!
      </h1>
      <div className="tasks--detail  m-8 p-8 ">
        {!loading && (
          <ThreeDots
            height="200"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        )}

        {loading && (
          <>
            {/* todo */}
            <div
              className="todo task--block  "
              onDragOver={(e) => dragOver(e)}
              onDrop={(e) => drop(e, "todo")}
            >
              <h2>To Do</h2>
              <div className="task--detail add--more">
                <Link to={"/tasks/createtask"}>
                  <span>
                    <b>+</b> Add task
                  </span>
                </Link>
              </div>
              {tasks.todo}
            </div>

            {/* in progress */}
            <div
              className="inprogress task--block"
              onDragOver={(e) => dragOver(e)}
              onDrop={(e) => drop(e, "inprogress")}
            >
              <h2>In Progress</h2>
              {tasks.inprogress}
            </div>

            {/* done */}
            <div
              className="done task--block"
              onDragOver={(e) => dragOver(e)}
              onDrop={(e) => drop(e, "done")}
            >
              <h2>Done</h2>
              {tasks.done}
            </div>

            {/* close the task */}
            <div
              className="close task--block"
              onDragOver={(e) => dragOver(e)}
              onDrop={(e) => drop(e, "close")}
            >
              <h2>Close</h2>
              <div className=" sed--task">{tasks.close}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
