import React from "react"
import { Link } from "react-router-dom"
import "./card.css"
export default function Card(props) {
    let images = props.img;
    const style = {textDecoration:'none'}
    return (
        <div className="card">
            <div className="img-div">
            <Link to={`/ads/${props.title}`} style={style}> <img src={`../..${images[0].imageData}`} alt="img" className="card--image" /></Link> 
            </div>
            <Link to={`/ads/${props.title}`} style={style}><p className="card--title">{props.title}</p></Link>
            <p className="card--price"><span className="bold">{props.price}DT</span></p>
        </div>

    )
}