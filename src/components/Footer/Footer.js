import React from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import "./Footer.css"
export default function Footer(){
    return (
        <footer className="footer" id="Footer">
            <div className="firstline">
            <p>contact us</p>
            <p>Email</p> 
            <p>Follow us</p>
            </div>
            <div className="secondline">
            
            <p><span><LocalPhoneIcon color="info" fontSize="10px"/></span> +21645789125 </p> 
            <p><span><EmailIcon color="info" fontSize="10px"/></span> MyShop@gmail.com</p> 
            <p> <span><FacebookIcon color="info" fontSize="10px" /></span> MyShop</p>
            </div>

        </footer>
    )
}