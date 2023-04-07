import React, { PureComponent, useEffect, useState ,useCallback} from "react";
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";
// import './Piechart.css'
import { Audio,Circles,ThreeDots } from "react-loader-spinner";


export default function Piechart() {
  const [tagsdata, setTagsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const uniqueTags = [];

  const data = [
    // { name: "HTML", value: 1 },
    // { name: "CSS", value: 1 },
    // { name: "JAVASCRIPT", value: 10 },
    // { name: "MONGODB", value: 1 },
  ];
  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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
    return array.filter((v) => v === value).length;
  }

  if (loading) {
    console.log("loading is true");
    // console.log(tagsdata);
    let uniqueTags = [];
    let allTags = [];
    let countTags = [];

    tagsdata.map((element) => {
      // console.log(element);
      element.tags.map((tagElement) => {
        const upperCase = tagElement.toUpperCase();
        allTags.push(upperCase);
        if (uniqueTags.indexOf(upperCase) === -1)
          uniqueTags.push(tagElement.toUpperCase());
      });
    });

    // for finding the occurance
    uniqueTags.map((element) => {
      countTags.push(getOccurrence(allTags, element));
    });
    // console.log(countTags)

    // below is the way to iterate over the two array at the same  time
    uniqueTags.map((element, index) => {
      const value = countTags[index];
      const name = uniqueTags[index];

      return data.push({ name: name, "NUMBER OF TIME USED": value });
    });
  }
  // -----------------------------
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text className="font-extrabold text-2xl" x={cx} y={cy} dy={8} textAnchor="middle" fill={"#1C4E80"}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={"#EA6A47"}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={"#0091D5"}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
        className="font-bold"
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#1C4E80"
        >{`NO OF TIME USED : ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  // ------------------------------------
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  // ------------------------------------
  

  return (
    <div className="w-full flex  items-center flex-col ">
      <h2 className="mt-16 text-3xl font-medium text-center  " >Piechart Representation of Tech stack used!</h2>
     
      {!loading &&  <ThreeDots
      
          height="300"
          width="80"
          radius="9"
          color="blue"
          
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />}
    <PieChart  width={1050} height={600}>
    <Pie
      className="w-full"
      activeIndex={activeIndex}
      activeShape={renderActiveShape}
      data={data}
      cx={500}
      cy={300}
      innerRadius={150}
      outerRadius={250}
      fill="#0091D5"
      dataKey="NUMBER OF TIME USED"
      onMouseEnter={onPieEnter}
    />
  </PieChart>
  </div>
  );
}
