import {  TextField } from "@mui/material";
import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
import "./LoginPage.css"
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import { useHistory } from "react-router-dom";


const user = axios.create({
  baseURL: "http://127.0.0.1:8000/api/login/user" 
});
export default function LoginPage(){
  const history = useHistory()
    // const {setAuth} = useContext(AuthContext);
      const [ setUserData] = React.useState(null)
    
    const [loginData, setLoginData]=React.useState({
        username:'',
        password:''
    });

    //  const [userData, setUserData] = React.useState();

   
  
    const [confirm, setConfirm] = React.useState("")
    const [registerData, setRegisterData] = React.useState({
        username:'',
        password:'',
        lastName:'',
        FirstName:'',
        email:'',
        phone:'',
        location:'',
    })
    const [error, setError] = React.useState({
        FirstName:'',
        lastName:'',
        username:'',
        email:'',
        password:'',
        confirm:'',
        phone:'',
        location:''
    })
    const [ErrMsg, setErrMsg] = React.useState("")

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
       
          switch (name) {
            case "FirstName":
              if (!value) {
                stateObj[name] = "Please enter your firstname.";
              }
              break;
              case "lastName":
              if (!value) {
                stateObj[name] = "Please enter your lastname.";
              }
              break;
              case "username":
              if (!value) {
                stateObj[name] = "Please enter your username.";
              }
              break;
              case "email":
              if (!value) {
                stateObj[name] = "Please enter your email.";
              }
              break;
              case "phone":
              if (!value) {
                stateObj[name] = "Please enter your phone.";
              }
              break;
              case "location":
              if (!value) {
                stateObj[name] = "Please enter your location.";
              }
              break;
       
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              } else if (confirm && value !== confirm) {
                stateObj["confirm"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["confirm"] = confirm ? "" : error.confirm;
              }
              break;
       
            case "confirm":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
              } else if (registerData.password && value !== registerData.password) {
                stateObj[name] = "Password and Confirm Password does not match.";
              }
              break;
       
            default:
              break;
          }
          
          return stateObj;
        });
      }
      
      async function  getuser() {
        const {username, password} = loginData
        try {
        
        const response =  await user.get(`/${username}/${password}`)
            //  console.log(response.data)
              
              return response.data.data;
              
        } catch (error) {
        //  console.log(error.response.data);
        if(error.response){
        setErrMsg(error.response.data)}
       }}
        const HandleClick=async(e)=>{
          e.preventDefault();
           
             const data = await getuser();
            //  window.location.reload(false);
               
            if(data){
              localStorage.setItem('user', loginData.username)
              
              setUserData(data);
              history.push("/");
              window.location.reload(false);
              
            }
            
          
        }

       
       
        function HandleInput(e){
          const {name, value} = e.target
          setRegisterData((prevdata)=>{return{...prevdata,[name]:value }})
        }

        const HandleSubmit = (e)=>{
          e.preventDefault()
          axios.post("http://127.0.0.1:8000/api/user/",registerData)
          .then((response)=>{
            setRegSuccess(true)
            console.log(response)
          }).catch((error)=>
          console.log(error)
          )
        }
      
     const [regsuccess, setRegSuccess] = React.useState(false)
    const isEnabled = registerData.password ===  registerData.confirm;
    const style = {width:"100%", backgroundColor:"white"}

    
    return (
        <Router>
            
        <div className="main">
            <Switch>
                <Route exact path="/account">
                    <div className="login">
                      
                      
                      <h2>LOGIN</h2>
                      
                      
                      <form  onSubmit={HandleClick} className="login-form">
                          <div className="input">
                          <InputLabel htmlFor="username">USERNAME </InputLabel>
                          <TextField 
                            
                              type="text"
                              name="username"
                              value={loginData.username}
                              onChange={(e)=>setLoginData(prevData => {return  {...prevData,username:e.target.value }})}
                              required
                              style={style}
                          />
                          </div>
                          <div className="input">
                          <InputLabel htmlFor="password">PASSWORD </InputLabel>
                          <TextField 
                              name="password"
                              type="password"
                              value={loginData.password}
                              onChange={(e)=>setLoginData(prevData => {return  {...prevData,password:e.target.value }})}
                              required
                              style={style}
                          />
                          {ErrMsg!=="" && <p className="err">{ErrMsg}</p>}
                          </div>
                          <Link className="create-account" to="/account/create">create account</Link>
                          <button >SIGN IN</button>
                         
                      </form>
                   
                   
                    </div>
                </Route>
                 <Route exact path="/account/create">
                <div className="register">
                  {regsuccess ? <div className="success"><h4>Account created successfuly</h4></div> 
                  :  <>
                
                <h2>CREATE AN ACCOUNT</h2>
                <form className="register-form" onSubmit={HandleSubmit}>
                  <div className="input">
                    <InputLabel htmlFor="FirstName">FIRST NAME</InputLabel>
                    <TextField 
                    size="large"
                        type="text"
                        name="FirstName"
                        value={registerData.FirstName}
                        onChange={HandleInput}
                        required
                        onBlur={validateInput}
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    {error.FirstName && <p className="err">{error.FirstName}</p>}
                    </div>
                    <div className="input">
                    <InputLabel htmlFor="lastName">LASTNAME</InputLabel>
                    <TextField 
                        type="text"
                        name="lastName"
                        value={registerData.lastName}
                        onChange={HandleInput}
                        required
                        onBlur={validateInput}
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    {error.lastName && <p className="err">{error.lastName}</p>}
                    </div>
                    <div className="input">
                    <InputLabel htmlFor="username">USERNAME</InputLabel>
                    <TextField 
                        type="text"
                        name="username"
                        value={registerData.username}
                        onChange={HandleInput}
                        required
                        onBlur={validateInput}
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    {error.username && <p className="err">{error.username}</p>}
                    </div>
                    <div className="input">
                    <InputLabel htmlFor="phone">PHONE</InputLabel>
                    <TextField 
                        type="number"
                        name="phone"
                        value={registerData.phone}
                        onChange={HandleInput}
                        required
                        onBlur={validateInput}
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    {error.phone && <p className="err">{error.phone}</p>}
                    </div>
                    <div className="input">
                    <InputLabel htmlFor="location">LOCATION</InputLabel>
                    <TextField 
                        type="text"
                        name="location"
                        value={registerData.location}
                        onChange={HandleInput}
                        required
                        onBlur={validateInput}
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    {error.location && <p className="err">{error.location}</p>}
                    </div>
                    <div className="input">
                    <InputLabel htmlFor="email">EMAIL</InputLabel>
                    <TextField 
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={HandleInput}
                        required
                        onBlur={validateInput}
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    {error.email && <p className="err">{error.email}</p>}
                    </div>
                    <div className="input">
                    <InputLabel htmlFor="password">PASSWORD</InputLabel>
                    <TextField 
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={HandleInput}
                        required
                        onBlur={validateInput}
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    {error.password && <p className="err">{error.password}</p>}
                    </div>
                    <div className="input">
                    <InputLabel htmlFor="confirm">CONFIRM PASSWORD</InputLabel>
                    <TextField 
                        type="password"
                        name="confirm"
                        value={registerData.confirm}
                        onChange={(e)=>setConfirm(e.target.value)}
                        required
                        onBlur={validateInput}
                        sx={{width:"100%", backgroundColor:"white"}}
                    />
                    {error.confirm && <p className="err">{error.confirm}</p>}
                    </div>
                    <button disabled={isEnabled}>REGISTER</button>
                    
                </form>
                <Link to="/account" className="cancel">CANCEL</Link>
                </> }
            </div>
                </Route> 
                
            </Switch>

        </div>
        </Router>
    )
}