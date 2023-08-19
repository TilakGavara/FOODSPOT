import React, { useEffect, useState } from "react";
import { imguri,config } from "../config";
import Shimmering from "./Shimmering";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
/*
restaurantlist
    card
        -img
        -name
        -rating
        */

function filterData(search,restaurant) {
  return restaurant.filter((restaurant)=>restaurant.data.name.toLowerCase().includes(search.toLowerCase()));
}
const Card=({cloudinaryImageId,name,cuisines,avgRating})=>{
    return(
        <div className="card">
            <img src={imguri+cloudinaryImageId} alt="data" />
            <h3>{name}</h3>
            <p>{cuisines.join(',')}</p>
            <h5>{avgRating}</h5>
        </div>
    );
}
const searchStyle={
    border:"1px solid black",
    borderRadius:"1px",
    display:"inline-block",
    width:"100%",
    height:"100%",
}
const Body=()=>{
    const [filteredData,setFilteredData]=useState([]);
    const [searchText,setSearchText]=useState("");
    const [restaurantdata,setRestaurantdata]=useState([]);
    const [isLoading,setLoading]=useState(true);
    const isOnline=useOnline();
    async function getData(){
        const resp=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.743369&lng=83.2722721&page_type=DESKTOP_WEB_LISTING");
        const data=await resp.json();
        setRestaurantdata(data?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredData(data?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        console.log(restaurantdata);
        setLoading(false);
    }
    useEffect(()=>{getData()},[]);
    const linkstyle={
        margin:"1rem",
        textDecoration:"none",
        color:"black",
    };
    if(isLoading) return <Shimmering/>;
    if(!isOnline) return <h1>You are Offline Dude.....</h1>
    return (
      <>
      <div className="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
        <input id="search" type="text" placeholder="What are you looking for?" onChange={(e)=>
        {setSearchText(e.target.value);}}/>

        <div className="input-field second-wrap">
        <button className="btn" type="button" onClick={()=>
                {
                const data=filterData(searchText,restaurantdata);
                setFilteredData(data);
                }}>SEARCH</button>
            </div>
        </div>
        <div className="body">
        {(filteredData.length===0)?<h1>No matches</h1>: (filteredData).map((restaurant) =>
            <Link to={"/restaurant/"+restaurant.info.id} key={restaurant.info.id} style={linkstyle}>
            <Card {...restaurant.info} key={restaurant.info.id}/>
            </Link>)}
        </div>
        </>
    )
}

export default Body;