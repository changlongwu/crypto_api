import React, { Component, useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinChart = ({symbol, market})=>{
    const [histData, setHistData] = useState(null);

    useEffect(()=>{
        const getCoinHist = async ()=>{
            try{
                const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&e=${market}&limit=30&api_key=` +
                    API_KEY);
        
                    const json = response.json();
                    setHistData(json.Data.Data)
            } catch(error){
                console.error(error);
            }

        }

        getCoinHist();

        

    },[market,symbol])

    return (
        <div>
            {
                histData?
                (
                    // rendering only if api call returned us data 
                    <div></div>
                ):null
            }
        </div>
    )

}

export default CoinChart;