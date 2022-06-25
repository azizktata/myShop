import React, { useState } from "react";
import {Route} from "react-router-dom"
import "./SellPage.css"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from "axios";

export default function SellPage(){
    const types= [
        "clothes", "real estate", "electronics", "cars"
    ]
    const userData = localStorage.getItem("user");
    
    const [values, setValues] = useState({
        title:"",
        description:"",
        category:"",
        price:"",
        state:true,
        seller: userData,

    });
    const [images,setImages] = React.useState([])

    const [msg, setMsg] = React.useState("")

    const handleChange = (event) => {
        const {name, value} = event.target
        setValues(prevvalue => {return ({
            ...prevvalue,
            [name]:value
        })
    })
    };
    const handleImageChange = (e) => {
        setImages((previmage)=>
           [...previmage,...e.target.files]
        )
      };
      const HandleSubmit = async(e) => {
          e.preventDefault()
       
        const fd = new FormData();
        async function upload(){
        try{
          const response =  await axios.post("http://127.0.0.1:8000/api/item/",values)
          
          console.log(response)
         
            return response.data.id
        //   await setItemId(response.data.id)
        }catch(error){
            console.log(error)
        }
    }
            const id =await  upload()
        
          
          
              images.forEach(async (img)=>{
              try{
                fd.append('image',img)
                const itm = {
                    itemId:id,
                    imageData:`/media/uploads/${img.name}`
                }
                console.log(`/media/uploads/${img.name}`)
                  const response = await axios.post(`http://127.0.0.1:8000/api/image/`,itm)
                console.log(response);
                if(response.status===201)
                {
                    setMsg("item added successfuly")
                }
                
              }
              catch(error){
              console.log(error)
              }
              })
        
      }
      
      const style = {paddingBottom:4, width:'auto'}
    return (
        <div className="sell-content">
            {msg.length>0 && <div className="msg ">
                <p>{msg}</p>
            </div>}
            

            <div className="sell-container">
            
                <div className="output">
            
                    <Route exact path="/sell/step1">        
                            <TextField 
                            label="Title" 
                            variant="outlined"
                            name="title"
                            onChange={handleChange}
                            required
                            sx={style}>
                            </TextField>
                            <TextField sx={style}
                               name="description"
                               value={values.description}
                               onChange={handleChange}
                               multiline
                               rows={3}
                               required
                               label="Description">
                            </TextField>
                            <TextField
                                sx={style}
                                name="category"
                                select
                                value={values.category}
                                onChange={handleChange}
                                required
                                label="Category"
                            >
                                {types.map((option) => (
                                    <MenuItem  value={option}>
                                    {option}
                                    </MenuItem>
                                ))}

                            </TextField>
                            <TextField 
                            label="Price DT" 
                            variant="outlined"
                            name="price"
                            onChange={handleChange}
                            required
                            sx={style}>
                            </TextField>
                            <input type="file"
                                id="image"
                                style={{marginBottom:'15%'}}
                                accept="image/png, image/jpeg"  onChange={handleImageChange} required multiple />
                        
                            
                        <Button onClick={HandleSubmit} variant="contained">Share</Button>
                    </Route>

                    
                    </div>
                
            </div>
        </div>
    )
}