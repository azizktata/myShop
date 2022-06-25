
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import LoginPage from './components/LoginPage/LoginPage';
import SellPage from './components/SellPage/SellPage';
import Ads from './components/ads/Ads';
import Product from './components/Product/Product';
import { UserContext } from './UserContext';
import axios from 'axios';
import Home from './components/Home/Home';
import ProductHowItWorks from './components/HowItWorks/HowItWorks';
import Profile from './components/Profile/Profile';


function App() {
  const [userData, setUserData] = React.useState(null);

const products = [
	{
    "item": {
      "id": 32,
      "title": "haval",
      "description": "bonne etat",
      "category": "cars",
      "price": "250000.000",
      "state": true,
      "seller": "aziz",
      "uploadDate": "2022-06-04T17:59:51.039711Z"
    },
    "images": [
      {
        "id": 28,
        "itemId": 32,
        "imageData": "/media/uploads/haval.jpg"
      }
    ]
  },
  {
    "item": {
      "id": 39,
      "title": "iphoneXR",
      "description": "bonne etat",
      "category": "electronics",
      "price": "250000.000",
      "state": true,
      "seller": "aziz",
      "uploadDate": "2022-06-06T22:21:36.590330Z"
    },
    "images": [
      {
        "id": 36,
        "itemId": 39,
        "imageData": "/media/uploads/iphoneXR.jpg"
      }
    ]
  },
  {
    "item": {
      "id": 40,
      "title": "house",
      "description": "germany",
      "category": "real estate",
      "price": "5000.000",
      "state": true,
      "seller": "aziz",
      "uploadDate": "2022-06-06T22:22:46Z"
    },
    "images": [
      {
        "id": 37,
        "itemId": 40,
        "imageData": "/media/uploads/housefrsale.jpg"
      }
    ]
  }
]
  const [filterItems,setFilterItems] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState("");
   
  const handleSearchClick = (e)=>{
    setFilterItems(()=>{return(
        items.filter((item)=>
          item.item.title===searchValue
        )
    )})
        console.log(filterItems)
      }

    const handleSearch = (event)=>{
      setSearchValue(event.target.value)
    }


  const item =  axios.create({
    baseURL : "http://127.0.0.1:8000/api/items"
  })
  const [items,setItems] = React.useState(products)
  React.useEffect(()=>{
    async function getItems(){
      try{
        const response = await item.get("/")
        // console.log(response.data.items)
        setItems(response.data.items)
        
      }
      catch(error){
        console.log(error)
      }
    }
    getItems();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  return (
    <Router>
      
      <div className="App">
      
        <NavBar handleSearch={handleSearch} handleSearchClick={handleSearchClick} searchValue={searchValue}/>
        
        <div className='content'>
          <Switch>
            
            <Route exact path="/">  
              <Home />
              <ProductHowItWorks />
            </Route>
            <Route path="/account">
            <UserContext.Provider value={[userData,setUserData]}>
              <LoginPage />
            </UserContext.Provider>
            </Route>
            <Route exact path="/sell/:step">
            
              <SellPage/>
            </Route>
            <Route exact path="/ads">
            
              <Ads items={filterItems ?filterItems:items} />
           
            </Route>
            {items && items.map((item)=>(
             
                <Route key={item.item.id}  path={`/ads/${item.item.title}`}>
                <Product 
                images={item.images && item.images}
                key={item.item.id}
                id={item.item.id}
                title={item.item.title}
                price={item.item.price}
                description={item.item.description}
                date={item.item.uploadDate}
                username={item.item.seller}
                
                />
                
              </Route>
                ))}

              <Route  path="/profile">
              
                  <Profile items={items}/>
              </Route>
                
            
          </Switch>
          
        </div>
        <Footer />
      </div>
      
    </Router>
  );
}

export default App;
