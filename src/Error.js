import React from "react";
import { useRouteError } from "react-router-dom";
const Error=()=>{
    const errors=useRouteError();
    const {status,statusText}=errors;
    return(
        <>
        <h2>oyy oyy oyy......</h2>
        <h3>{status}:{statusText}</h3>
        </>
    )
}

export default Error;