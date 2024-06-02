import React from "react";

const Names = ({name, number, shouldDelete}) => {

    // delete decision 
    const decision = () => confirm(`Delete ${name}?`) ? shouldDelete() : console.log("Abort delete!")
    return (
        <li >
            {name} {(number)} 
            <button onClick={decision} >delete</button>
        </li>
    )
}

export default Names;