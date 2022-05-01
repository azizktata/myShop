import React from "react";
import "./Product.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import Chip from '@mui/material/Chip';
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import InputLabel from '@mui/material/InputLabel';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';


export default function Product(props){

    const user =  axios.create({
        baseURL : "http://127.0.0.1:8000/api/user"
      })
      const [usersell,setUsersell] = React.useState({})
      
    //   const tosell = {props.seller ? }
    React.useEffect(()=>{
        async function getuser(){
            try{
                const response = await user.get(`/${props.username}`);
                setUsersell(response.data)
                
            }catch(error){
                console.log(error)
            }
            
        }
        getuser();
    },[])

   

    const style = {
        position: 'absolute',
        display:"flex",
        flexDirection:"column",
        margin:"5px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height:260,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius:5,
        boxShadow: 24,
        p: 4,
      };

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userData = localStorage.getItem('user')
  const [report, setReport] = React.useState({
    username:userData,
    title:"",  
    item:props.id,
    description:"",
    state:true
  })

  const handleClick = async(e)=>{
      e.preventDefault();
      try{
        const response =await axios.post("http://127.0.0.1:8000/api/report/",report)
        console.log(response)
        window.location.reload(false);       
      }catch(error){
          console.log(error);
      }

  }
    return (
        <div className="content-container">
            <Link to="/ads" style={{textDecoration:"none"}}><Chip icon={<ArrowBackIcon />} label="Ads"  /></Link><span>  {props.title}</span>
            <div className="product-container">
                <ImageList sx={{ width: "100%", height: "70%", margin:"7% 1%",ml:"15%" }}  >
                    {props.images.map((img)=> {
                        return (
                        <ImageListItem key={props.title}  >
                        <img
                        src={`../..${img.imageData}?w=248&fit=crop&auto=format`}
                        // srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={props.title}
                        loading="lazy"
                    />
                    </ImageListItem>
                        )
                    })}
                    
                </ImageList>
                <div className="details-container">
                <h5>{props.price}DT</h5>
                <h5>{props.title}</h5>
                <hr/>
                <h5>{props.date}</h5>
                <h5>{usersell.location}</h5>
                <hr/>
                <h5>{props.username}</h5>
                <h5>{usersell.phone}</h5>

                </div>
            </div>
            <div className="product-description">
            <h4>description :</h4>
            <p>{props.description}</p>
            <button className="report-btn" onClick={handleOpen}>report</button>
            <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <InputLabel htmlFor="title">Title </InputLabel>
                <TextField     
                    type="text"
                    name="title"
                    value={report.title}
                    onChange={(e)=>{setReport((prevReport)=>{return {...prevReport,title:e.target.value}})}}
                    required
                />

          <InputLabel htmlFor="description">Description </InputLabel>
                <TextField     
                    type="text"
                    name="description"
                    value={report.description}
                    onChange={(e)=>{setReport((prevReport)=>{return {...prevReport,description:e.target.value}})}}
                    required
                    multiline
                    rows={3}
                />
            <Button type="submit" variant="contained" sx={{mt:"15px"}} onClick={handleClick}> report </Button>
            
          </Box>
        </Fade>
      </Modal>
            </div>
        </div>
    )
}