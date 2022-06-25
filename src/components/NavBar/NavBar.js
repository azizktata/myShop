import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import "./NavBar.css"
import { NavLink, Link } from "react-router-dom"
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';


export default function NavBar(props){
    const style = {
       
        marginLeft:"1%",
        marginRight:"",
        width:"14%",
        textDecoration:'none',
        color:'black'
    }
    
    
    const user = localStorage.getItem("user");
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = ()=>{
        localStorage.clear();
        window.location.reload(false);
    }

    return (
        
        <nav className="nave">
            <div className="nave__links">
            
                <div className="myShop-Logo">
                <NavLink className="shop" to="/" style={style}><ShoppingCartIcon /><p>MyShop</p></NavLink>
                </div>
                
                
                <div className="searchBar">
                    <Button 
                    variant="outlined" 
                    sx={{position:"absolute",right:"30%", height:"100%", cursor:"pointer",zIndex:1}}
                    onClick={props.handleSearchClick}
                    >
                        <Link to="/ads" style={{color:"blue"}}><SearchIcon sx={{pt:1}}/></Link>
                    </Button>
                    <TextField className="search-field" 
                    variant="outlined" 
                    size="small"
                    value={props.searchValue}
                    onChange={props.handleSearch}
                    placeholder="Search.." 
                    sx={{width:"70%", pr:"60px"}}
                    />
                </div>
                
                <NavLink to="/sell/step1"  style={style}>Sell item</NavLink>
                <a className="about-us" href="#Footer" style={style}>about us</a>

                <div className="account">
                {!user
                ? <Button variant="contained" sx={{fontSize:"75%", borderRadius:1,width:"100px"}}><NavLink to="/account" style={{textDecoration:'none', color:'white'}} > Sign in </NavLink></Button>
                :<div><Button
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={<PersonIcon />}
                    variant="outlined"
                >
                    {user}
                </Button>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                    'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}> <NavLink to="/profile">Profile</NavLink></MenuItem>
                    <MenuItem onClick={handleLogout}><NavLink to="/">Logout</NavLink></MenuItem>
                </Menu>
                </div>
                
                
                
                }
                </div>  
                

            </div>
            <div className="nav-menu">
            <div className="myShop-Logo">
                <NavLink className="shop" to="/" style={style}><ShoppingCartIcon /><p>MyShop</p></NavLink>
                </div>
                
                
                <div className="searchBar">
                    <Button 
                    variant="outlined" 
                    sx={{position:"absolute",right:"10%", height:"100%", cursor:"pointer",zIndex:1}}
                    onClick={props.handleSearchClick}
                    >
                        <Link to="/ads" style={{color:"blue"}}><SearchIcon sx={{pt:1}}/></Link>
                    </Button>
                    <TextField className="search-field" 
                    variant="outlined" 
                    size="small"
                    value={props.searchValue}
                    onChange={props.handleSearch}
                    placeholder="Search.." 
                    sx={{width:"90%", pr:"70px"}}
                    />
                </div>
                <div className="account">
                {!user
                ? <Button variant="contained" sx={{fontSize:"75%", borderRadius:1,width:"100px"}}><NavLink to="/account" style={{textDecoration:'none', color:'white'}} > Sign in </NavLink></Button>
                :<div><Button
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={<PersonIcon />}
                    variant="outlined"
                >
                    {user}
                </Button>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                    'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}> <NavLink to="/profile" style={style}>Profile</NavLink></MenuItem>
                    <MenuItem onClick={handleLogout}><NavLink to="/" style={style}>Logout</NavLink></MenuItem>
                    <MenuItem onClick={handleClose}><NavLink to={user ? "/sell/step1" : "/account"} style={style}>Sell item</NavLink></MenuItem>
                    <MenuItem onClick={handleClose}><a className="about-us" href="#Footer" style={style}>about us</a></MenuItem>
                </Menu>
                </div>
                
                
                
                }
                </div>  
            </div>
            
        </nav>
        
        
        )
}