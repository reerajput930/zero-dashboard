import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
 
} from "recharts";
// import "."
import './Barchart.css'

export default function Piechart() {
  const [tagsdata, setTagsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const uniqueTags = [];

  const data1 = [
    // { name: "HTML", value: 1 },
    // { name: "CSS", value: 1 },
    // { name: "JAVASCRIPT", value: 10 },
    // { name: "MONGODB", value: 1 },
  ];
 
  // fetching the data
  useEffect(() => {
    async function fetchAllTasks() {
      //   // e.preventDefault();
      const response = await fetch("https://mern-backend-cdsb.onrender.com/api/alltasks");

      const data = await response.json();

      if (data.status === "success") {
        // console.log(data.tasks)
        setTagsData(data.tasks);
        setLoading(true);
      } else {
        console.log("error in fetching data from api");
      }
    }
    fetchAllTasks();
  }, []);

  function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}

  if (loading) {
    console.log("loading is true");
    // console.log(tagsdata);
    let uniqueTags = [];
    let allTags = [];
    let countTags=[];
    
        
     tagsdata.map((element) => {
      // console.log(element);
      element.tags.map((tagElement) => {
        const upperCase = tagElement.toUpperCase() 
        allTags.push(upperCase)
        if (uniqueTags.indexOf(upperCase) === -1) 
        uniqueTags.push(tagElement.toUpperCase() );
      });
    });


    // for finding the occurance
    uniqueTags.map((element)=>{
      countTags.push(getOccurrence(allTags,element))
    })
        
    
    // below is the way to iterate over the two array at the same  time
    uniqueTags.map((element,index)=>{
        const value = countTags[index]
        const name = uniqueTags[index]
      
      return data1.push({name:name,"NUMBER OF TIME USED":value})

    })
    // console.log(tagAndCount[0])   
  }

 

  //-----------------------------------
  return (
    <div className="bar--block ">
      <h2 className="text-3xl font-medium" >Barchart Representation of Tech stack used!</h2>
     

      <BarChart
        width={1100}
        height={520}
        data={data1}
        margin={{
          top: 8,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        barSize={90}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 60, right: 60 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="NUMBER OF TIME USED" fill="#0091D5" background={{ fill: "none" }} />
      </BarChart>
    </div>
  );
}
