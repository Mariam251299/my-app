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
  console.log("Renderizando app");
  const [contador, setContador] = useState(0);
  const [data, setData] = useState(0); 
  const getData = async()=>{
    const response = await axios.get('http://127.0.0.1:8000');
    setData(response.data.data);
    console.log(response);
  }
  
  useEffect(()=>{
    getData()
  },[])
  var contadorVar=0;
  const click=()=>{
    //contadorVar+=1;
    setContador(contador+1);
    //console.log(contadorVar);
  }

  return (
    <div>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
      <p>{contador}</p>
      <p>{contadorVar}</p>
      <button onClick={click}>
        Aumentar
      </button>
    </div>
  );
}

export default App;
