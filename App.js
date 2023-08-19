import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/Header";
import Body from "./src/Body";
import Footer from "./src/Footer";
import About from "./src/About";
import Error from "./src/Error";
import RestaurantDetail from "./src/RestaurantDetail";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";


const App=()=>{
    return(
        <div className="container">
        <Header/>
        <Outlet/>
        <Footer />
        </div>
    );
};
const appRouter=createBrowserRouter(
    [
        {
            path:"/",
            element: <App/>,
            errorElement:<Error/>,
            children:[
                {
                    path:"/about",
                    element:<About/>
                },
                {
                    path:"/",
                    element:<Body/>
                },
                {
                    path:"/restaurant/:id",
                    element:<RestaurantDetail/>
                }
            ]
        },
    ]
)
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);