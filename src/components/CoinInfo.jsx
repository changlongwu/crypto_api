import React, {useEffect, useState} from 'react';
const API_KEY = import.meta.env.VITE_APP_API_EKY;
import {Link} from "react-router-dom";

const CoinInfo = ({image, name, symbol}) =>{
    const [price, setPrice] = useState(null);

    
    // this will run whenever the symbol we pass in changes
    useEffect(()=>{
        const getCoinPrice = async () =>{
            const response = await fetch (
                `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
            )
            const json = await response.json();
            setPrice(json);
        };
        getCoinPrice().catch(console.error);
        

    }, [symbol]);



    return (

        <div className='CoinInfo'>


            {price? (
            <li className='main-list' key={symbol}>
                <img 
                className='icons' 
                src={`https://www.cryptocompare.com${image}`}
                alt={`Small icon for ${name} crypto coin`}
                width='200px'
                />
                <Link 
                style = {{color:"White"}}
                to = {`/coinDetails/${symbol}`}
                key={symbol}
                >
                    {name}  <span className='tab'></span> ${price?.USD} USD 
                </Link>
            
            </li>
            ):null
            
        }

        </div>

    )
}

export default CoinInfo;