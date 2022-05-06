import React from 'react';
import './App.css';
import {useState,useEffect} from "react";
import axios from "axios";

function App() {
  const [data,setData] = useState([]);
  const [state,setState] = useState([]);
  const [text,setText] = useState("");
  async function getdata(){
    await axios.get("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json").then(({data}) => {
      setData(data);
      setState(data)
    })
  }
  useEffect(() => {
    getdata();
  },[])

function handleSubmit(){
  let x = data.filter((e) => {
    return e.name == text;
  })
  if(x){
    setState(x);
  }
  else{
    setState(null)
  }
  console.log(x)
}

  return (
    <div className="App">
      <input onChange={(e) => setText(e.target.value)} className='search-input' type="text" />
      <button onClick={() => handleSubmit()} className='search-button'>Search</button>
      <div className='container'>
      {state.length!=0 ? (state.map((e) => {
        return (
          <div className = {`country-list-${e.id}`} key = {e.id}>
            <img src={e.flag} alt="flag" width="100%" height="60%" />
            <h5>{e.name}</h5>
            <p><b>Population</b>:{e.population}</p>
            <p><b>Region</b>:{e.region}</p>
            <p><b>Capital</b>:{e.capital}</p>
          </div>
        )
      })) : "No country found!"}
      </div>
    </div>
  );
}

export default App