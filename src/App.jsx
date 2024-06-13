import { useEffect, useState } from 'react'
import './App.css'
import CoinInfo from './components/CoinInfo'

const API_KEY = import.meta.env.VITE_APP_API_EKY;
function App() {
  const [list, setList] = useState(null);

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
      <h1>My Crypto List</h1>
      {list && Object.entries(list.Data).map(
        ([coin])=> list.Data[coin].PlatformType === "blockchain" ?
        
          (<CoinInfo
            key={list.Data[coin].FullName}
            image={list.Data[coin].ImageUrl}
            name={list.Data[coin].FullName}
            symbol={list.Data[coin].Symbol}
          />
          ):null
      )}
    </div>
  )
}

export default App
