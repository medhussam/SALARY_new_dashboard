



































































import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link , Routes} from 'react-router-dom'; 
import Leftside from './leftside';  
import Header from './header'  
import Footer from './footer'  
import Home from './home' 
import Calcul from './calculator' 
import Migration from './migration' 

// import {   Route, Switch, Redirect  } from 'react-router-dom';  
//import { Routes ,Route,Router } from 'react-router-dom';

// import {
//     BrowserRouter as Router, 
//     Routes, 
//     Route
//   } from 'react-router-dom';



  
export class Layout extends Component {  








  
       render() {  
        return (  
            <div>  
                <div id="wrapper">  


                 {/* <Header  />   */}



                   <Router> 
    
                  <Leftside></Leftside>  


                        <Routes>
                        <Route exact path="/" element={<Home  />} />
                        <Route path="/calculator" element={<Calcul />} />
                        <Route path="/migration" element={<Migration />} />
                        

                        </Routes>
                      
                    </Router>


                        <Footer />  
                  
                </div>  
            </div>  
        )  
    }  
}  
  
export default Layout









