import './App.css';
import axios from 'axios';
import { Chart } from "react-google-charts";
import { useEffect, useState } from 'react';

const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};


const App=()=>{

  const [data, setData] = useState(0); 
  
  const getData = async()=>{
    const response = await axios.get('http://127.0.0.1:8000');
    setData(response.data.data);
    // console.log(response);
  }
  
  useEffect(()=>{
    getData()
  },[]);
  
  return (
    <div>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default App;
