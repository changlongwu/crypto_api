import { useEffect, useState } from 'react'
import './App.css'
import CoinInfo from './components/CoinInfo'
import SideNav from './components/SideNav'


const API_KEY = import.meta.env.VITE_APP_API_EKY;
function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // a function to take in the search input and filter the results of api call
  const searchItems = (searchValue) =>{
    setSearchInput(searchValue);

    if (searchValue !==""){
      // Object.keys(list.Data):  is the keys array
      // .filter((item):   loop through the item (key) in the keys array

      // the key array include the user input or not
      // filteredData are what we're looking for.
      const filteredData = Object.keys(list.Data).filter((item)=>
        Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchValue.toLowerCase())
      )
    setFilteredResults(filteredData);
    }  else{
      setFilteredResults(Object.keys(list.Data));
    }
  };


// call this at the very beginning
  useEffect(() => {
    const fetchAllCoinData = async () =>{
      // get all coin data
      const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist"
        + `?api_key=${API_KEY}`
      );
      const json = await response.json();
      setList(json);
    }

    fetchAllCoinData().catch(console.error);
  },[]);

  return (
    <div className='whole-page'>
      <SideNav />
      
      <h1>My Crypto List</h1>
      <input 
      type='text'
      placeholder='Search...'
      onChange={(inputString) => searchItems(inputString.target.value)}
      />

      {
        searchInput.length>0 
        ?
        filteredResults.map((coin) =>
          list.Data[coin].PlatformType === "blockchain" ?
          <CoinInfo
            key={list.Data[coin].FullName}
            image={list.Data[coin].ImageUrl}
            name={list.Data[coin].FullName}
            symbol={list.Data[coin].Symbol}
          />
          :null
        )
        :list && Object.entries(list.Data).map(
          ([coin])=> list.Data[coin].PlatformType === "blockchain" ?
          
            <CoinInfo
              key={list.Data[coin].FullName}
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
            :null
        )
      }
    </div>
  )
}

export default App
