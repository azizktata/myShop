import React from "react";
import "./Ads.css"
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ListIcon from '@mui/icons-material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import Card from "./card";

export default function Ads(props){
    const data = [
        { icon: <Home />, label: 'real estate' },
        { icon: <CheckroomIcon/>, label: 'clothes' },
        { icon: <FlashOnIcon />, label: 'electronics' },
        { icon: <DirectionsCarIcon />, label: 'cars' },
      ];
      const filters = [
         'Recently added' ,
         'Price' ,
         'Year' ,
      ];

      const items = props.items;
      const [open, setOpen] = React.useState(true);
      const [openfilter, setOpenFilter] = React.useState(true);
      const [checked, setChecked] = React.useState([0]);
     

  const handleToggle = (value) => () => {
    setFilter(value)
  
    // setChecked(true)
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  
  };
  

  const [categorie, setCategorie] = React.useState("");
  const [filter,setFilter] = React.useState("");

    return (
        <div className="ads-container">
            <div className="left">
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                }}
            >
                <ListIcon
                  sx={{
                    marginRight: 2,
                  }}
                />
            <ListItemText
                  primary="Departments"
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px',
                  }}
                  secondary="Real Estate, clothes,  Electronics, Cars"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: '16px',
                    color: open ? 'rgba(0,0,0,0)' : 'black)',
                  }}
                  sx={{ my: 0 }}
                />
                
              </ListItemButton>
              {open &&
                data.map((item) => (
                  <ListItemButton
                    key={item.label}
                    sx={{  minHeight: 32, color: 'black' , pt:3}}
                    onClick={()=>{setCategorie(item.label)}}
                  >
                    <ListItemIcon sx={{ color: 'inherit', marginLeft:3 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                  </ListItemButton>
                  ))}

                <ListItemButton
                    alignItems="flex-start"
                    onClick={()=> setOpenFilter(!openfilter)}
                    sx={{
                    px: 3,
                    pt: 2.5,
                    pb: openfilter ? 0 : 2.5,
                    }}
                >
                    {!openfilter ? <ExpandLess /> : <ExpandMore />}
                <ListItemText
                  primary="Filters"
                  primaryTypographyProps={{
                    fontSize: 17,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    marginLeft:2.5,
                    mb: '2px',
                  }}>
                </ListItemText>
                </ListItemButton>
                {openfilter &&
                [0, 1, 2].map((value) => {
                    const labelId = `filter ${value}`;
            
                    return (
                      <ListItem
                        key={value}
                        disablePadding
                        sx={{ml:3}}
                      >
                        <ListItemButton
                         role={undefined}
                          onClick={handleToggle(filters[value])}
                           dense
                           sx={{mr:8}}
                           
                           >
                          
                            <Checkbox
                              edge="start"
                              name={filters[value]}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                         
                          <ListItemText id={labelId} primary={filters[value]} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
            </div>
            <div className="right">
              <section className="cards-list">
                
              {items &&  
              
               items.sort((a,b)=> {
                 if(filter==="Price"){
               return  a.item.price-b.item.price}
                else if (filter==="Year"){
               return  b.item.id - a.item.id}
               else if (filter==="Recently added"){
                return  a.item.id - b.item.id}
               })
              .map((item) =>{return (
                <>
                {categorie!=="" ? item.item.category===categorie &&
                
                  <Card 
                   key={item.item.id}
                   img={item.images && item.images}
                   title={item.item.title}
                   price={item.item.price}
                   
                 />
                 :<Card 
                 key={item.item.id}
                 img={item.images && item.images}
                //  location={item.location}
                 title={item.item.title}
                 price={item.item.price}
                 
                 />
                
                   }
                   </>
                   )})}
                   </section>
             
            </div>
        </div>
        
    )
}

