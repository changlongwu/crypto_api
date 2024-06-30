import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_EKY;

const CoinDetail = ()=>{
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(()=>{
        const getCoinDetail = async ()=>{
            try{
                console.log(1);
                const details = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=` +API_KEY);
                
                const description = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=` +API_KEY);
    
                const detailsJson = await details.json();
                const descripJson = await description.json();
    
    
                setFullDetails({"numbers":detailsJson.DISPLAY, "textData":descripJson.Data});
                console.log(detailsJson);
                console.log(descripJson);
            } catch(error){
                console.error(error);
            }

            
        };
        getCoinDetail();

    },[params.symbol]);
    if(!fullDetails){
        return <div>Loading...</div>;
    }

    return (
        <div>

            <h1>{fullDetails.textData[params.symbol].FullName}</h1>
            <img
                className="images"
                src={`https://www.cryptocompare.com${
                    fullDetails.numbers[params.symbol].USD.IMAGEURL
                }`}
                alt={`Small icon for ${params.symbol} crypto coin`}
            />

            <div> {fullDetails.textData[params.symbol].Description}</div>
            <br></br>
            <div>
            This coin was built with the algorithm{" "}
            {fullDetails.textData[params.symbol].Algorithm}{" "}
            </div>

        </div>
    )

;
}
export default CoinDetail;


