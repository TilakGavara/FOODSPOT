import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { imguri } from "../config";
import Shimmering from "./Shimmering";
const RestaurantDetail=()=>{
    const [restaurantdata,setRestaurantdata]=useState(null);
    const [menu,setMenu] = useState([]);
    params=useParams();
    const {id}=params;
    async function getMenu(){
        const data=await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.743369&lng=83.2722721&restaurantId="+id+"&submitAction=ENTER");
        const json= await data.json();
        setRestaurantdata(json?.data?.cards[0]?.card?.card?.info);
        setMenu(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
    }

    console.log(menu);
    useEffect(()=>{
        getMenu();
    },[])
    return (!restaurantdata)?<Shimmering/>:(
        <>
        <div className="restaurant">
            <div className="details">
                <img src={imguri+restaurantdata.cloudinaryImageId} />
                <h2><b>restaurant: </b>{restaurantdata?.name}</h2>
                <p><b>address: </b>{restaurantdata?.locality+" , "+restaurantdata?.areaName} </p>
            </div>
            <p className="rating"><b>rating: </b>{restaurantdata?.avgRating+"*"}</p>
        </div>
        <div className="menubackground">
          <h2>Menu</h2>
                {menu?.map((item)=>
                   item?.card?.card?.itemCards?.map((details)=>
                   {
                    return(
                        <div className="menu" key={details?.card?.info?.id}>
                            <p>{details?.card?.info?.name}</p>
                            <img src={imguri+details?.card?.info?.imageId} alt="add"/>
                        </div>);
                    })
                )} 
        </div>
        </>
    );
};

export default RestaurantDetail;