import React, { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function MixedBarchart() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  let tasksData = {
    todo: 0,
    progress: 0,
    done: 0,
    close: 0,
  };
  let tagsData ={
    todoTags:0,
    progressTags: 0,
    doneTags: 0,
    closeTags: 0,

  }
  console.log(tasksData);

  useEffect(() => {
    async function fetchAllTasks() {
      //   // e.preventDefault();
      const response = await fetch("https://mern-backend-cdsb.onrender.com/api/alltasks");

      const data = await response.json();

      if (data.status === "success") {
        console.log(data.tasks)
        // console.log(data.tasks);
        setTasks(data.tasks);
        setLoading(true);
        // setLoading(true);
      } else {
        console.log("error in fetching data from api");
      }
    }
    fetchAllTasks();
  }, []);

  if (loading) {
    tasks.map((task) => {
      // console.log(task)
      if (task.category === "todo") {
        tasksData.todo += 1;
        tagsData.todoTags += task.tags.length
        
        
        
      } else if (task.category === "inprogress") {
        tasksData.progress += 1;
        tagsData.progressTags += task.tags.length

      } else if (task.category === "done") {
        tasksData.done += 1;
        tagsData.doneTags += task.tags.length

      } else if (task.category === "close") {
        tasksData.close += 1;
        tagsData.closeTags += task.tags.length
      }
    });

    console.log(tasksData);
    console.log(tagsData);
  }

  const data = [
    {
      name: "ToDo",
      "Number of Tasks": tasksData.todo,
      "Number of Tech Stacks": tagsData.todoTags,
      amt: 2400,
    },
    {
      name: "In Progress",
      "Number of Tasks": tasksData.progress,
      "Number of Tech Stacks": tagsData.progressTags,
      amt: 2210,
    },
    {
      name: "Done",
      "Number of Tasks": tasksData.done,
      "Number of Tech Stacks": tagsData.doneTags,
      amt: 2290,
    },
    {
      name: "Closed",
      "Number of Tasks": tasksData.close,
      "Number of Tech Stacks": tagsData.closeTags,
      amt: 2000,
    },
  ];

  return (
    <div className="w-full flex justify-unset items-center flex-col" >
      <h1 className="mt-10 mb-16 text-3xl font-medium text-center " >BarChart Representing the Number of Tasks and Tech Stack!</h1>
      <BarChart
        width={1100}
        height={520}
        data={data}
        margin={{
          top: 8,
          right: 2,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Number of Tasks" fill="#0091D5" />
        <Bar dataKey="Number of Tech Stacks" fill="#EA6A47" />
      </BarChart>
    </div>
  );
}
