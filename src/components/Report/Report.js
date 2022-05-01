import React from "react";
import "./Report.css"
export default function Report(props){

    return (
        <>
        {props.isShownReport && 
        <div className="box">
        <div className="report">
            <form className="report-form">

            </form>

        </div>
        </div>}
        </>
        
    )
}