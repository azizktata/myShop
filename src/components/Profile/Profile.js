import React from "react";
import axios from "axios";
import {  Card, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import "./Profile.css"
export default function Profile(props){
    const {items} = props
    const user = localStorage.getItem('user')
    const [userUpdate, setUserUpdate] = React.useState({
        username:user,
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        password:"",
    })
    
   
    function HandleInput(e){
        const {name, value} = e.target
        setUserUpdate((prevdata)=>{return{...prevdata,[name]:value }})
      }

      const HandleSubmit = (e)=>{
        e.preventDefault()
        axios.put(`http://127.0.0.1:8000/api/user/${user}/`,userUpdate)
        .then((response)=>{
          
            window.location.reload(false);
        }).catch((error)=>
        console.log(error)
        )
      }
      function handleDelete(value){
          
          axios.delete(`http://127.0.0.1:8000/api/item/${value}/`)
          .then((response)=>{
              console.log(response)
              window.location.reload(false);
          }).catch((error)=>{
              console.log(error)
          })
      }
    return (
            
        <div className="profile">
            <div className="user-information">
            <form className="update-form" onSubmit={HandleSubmit}>
                  <div className="input">
                    <InputLabel htmlFor="FirstName">FIRST NAME</InputLabel>
                    <TextField 
                    size="large"
                        type="text"
                        name="FirstName"
                        value={userUpdate.FirstName}
                        onChange={HandleInput}
                        required
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    
                    </div>
                    <div className="input">
                    <InputLabel htmlFor="lastName">LASTNAME</InputLabel>
                    <TextField 
                        type="text"
                        name="lastName"
                        value={userUpdate.lastName}
                        onChange={HandleInput}
                        required
                        
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    </div>
                    
                    <div className="input">
                    <InputLabel htmlFor="phone">PHONE</InputLabel>
                    <TextField 
                        type="number"
                        name="phone"
                        value={userUpdate.phone}
                        onChange={HandleInput}
                        required
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    </div>
                    <div className="input">
                    <InputLabel htmlFor="location">LOCATION</InputLabel>
                    <TextField 
                        type="text"
                        name="location"
                        value={userUpdate.location}
                        onChange={HandleInput}
                        required
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    </div>
                    <div className="input">
                    <InputLabel htmlFor="email">EMAIL</InputLabel>
                    <TextField 
                        type="email"
                        name="email"
                        value={userUpdate.email}
                        onChange={HandleInput}
                        required
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    </div>
                    <div className="input">
                    <InputLabel htmlFor="password">PASSWORD</InputLabel>
                    <TextField 
                        type="password"
                        name="password"
                        value={userUpdate.password}
                        onChange={HandleInput}
                        required
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    </div>
                    <Button onClick={HandleSubmit} variant="contained" sx={{width:"80%",alignItems:"center",margin:"3% 9%", border:"2px solid"}}>Update</Button>
                    </form>
            </div>
           
            <div className="user-ads">
            <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {items && items.filter((it)=>{if(it.item.seller===user)return it}).map((card) => (
              <Grid item key={card.item.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={`../..${card.images[0].imageData}`} 
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.item.title}
                    </Typography>
                    <Typography>
                      {card.item.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={()=>(handleDelete(card.item.id))}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
            </div>

        </div>
        
        
    )
}