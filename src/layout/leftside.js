 
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ReactTooltip from "react-tooltip";



export class Leftside extends Component { 
   
    render() {  




      const addNetwork = () => {
        const params = [
          {
            chainId: "0x89",
            chainName: "Matic Mainnet",
            nativeCurrency: {
              name: "Matic",
              symbol: "MATIC",
              decimals: 18
            },
            rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"]
          }
        ];
        window.ethereum
          .request({ method: "wallet_addEthereumChain", params })
          .then(() => console.log("Success"))
          .catch((error) => console.log("Error", error.message));
      };
    
      async function addToken() {
        const tokenAddress = "0xc24796458fbea043780eea59ebba4ad40e87c29b";
        const tokenSymbol = "SLR";
        const tokenDecimals = 18;
        const tokenImage = "https://salaryeco.io/assets/images/favicon.png";
    
        try {
          // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          const wasAdded = await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage // A string url of the token logo
              }
            }
          });
    
          if (wasAdded) {
            console.log("Thanks for adding $DEMO");
          } else {
            console.log("Pfffft. Fine then.");
          }
        } catch (error) {
          console.log(error);
        }
      }
    






        return (  
            <div>
     <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
       <div class="brand-logo">
        <a  >
         <img src=" assets/images/logo-icon.png" class="logo-icon" alt="logo icon" />
         <h5 class="logo-text"><b>SALARY ECO FINANCE</b></h5>
       </a>
     </div>
     <ul class="sidebar-menu do-nicescrol">
        <li class="sidebar-header">MAIN NAVIGATION</li>
        {/* <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li> */}
        <li>
        <Link to='/'><a >
            <i class="zmdi zmdi-view-dashboard"></i>  Dashboard
                   <span> 
            
 
    {/* <Link to='/'> Dashboard
                    </Link>  */}
                </span>
          </a> </Link>
        </li>
  
        <li>
        <Link to='/calculator'><a >
            <i class="fa fa-calculator"></i>  Calculator
                      <span>
 
            {/* <Link to="/calculator">calculator</Link> */}
                     

            </span>
          </a> </Link>
        </li>
  
        <li>
          <a >
            <i class="fa fa-road"></i> <span>Bridge & Router</span>
            <small class="badge float-right badge-light">Soon</small>
          </a>
        </li>
  
        <li>
          <a  >
            <i class="fa fa-exchange"></i> <span>Swap</span>
            <small class="badge float-right badge-light">Soon</small>
          </a>
        </li>
  
        <li>
          <a  >
            <i class="fa fa-hashtag"></i> <span>Social media</span>
            
          </a>
        </li>
  
        <li>
          <a  >
            <i class="zmdi zmdi-notifications-active"></i> <span>Marketing proposal</span>
          </a>
        </li>
  
        {/* <li>
          <a   target="_blank">
            <i class="zmdi zmdi-face"></i> <span>Vote</span>
            <small class="badge float-right badge-light">New</small>
          </a>
        </li> */}
        <li>
        <Link to='/migration'><a  >
            <i class="fa fa-magic"></i>  Migration
                      <span>
                      <small class="badge float-right badge-primary">Event</small>
            {/* <Link to="/calculator">calculator</Link> */}
                     

            </span>
          </a> </Link>
          
        </li>
  


        {/* <button onClick={addNetwork}>Add Matic Network to MetaMask</button> */}
      
       


        <li class="bottom_">
          <a class="text-centre"  target="_blank ">
            <i class="zmdi zmdi-copy pointer"  data-tip data-for="copyTip"></i> <span >$SLR Contract  
               <img data-tip data-for="addTip"  onClick={addToken}  class="meta-icon pointer" src="assets/images/MetaMask_Fox.svg.png"  width="25"/>
             0xc24796458....ad40e87c29b</span> 
             
          </a>
        </li>
  
        <ReactTooltip id="addTip" place="top" effect="solid">
        Add to Metamask
      </ReactTooltip>
      <ReactTooltip id="copyTip" place="top" effect="solid">
        Copy
      </ReactTooltip>
        {/* <li class="sidebar-header">LABELS</li>
        <li><a href="javaScript:void();"><i class="zmdi zmdi-coffee text-danger"></i> <span>Important</span></a></li>
        <li><a href="javaScript:void();"><i class="zmdi zmdi-chart-donut text-success"></i> <span>Warning</span></a></li>
        <li><a href="javaScript:void();"><i class="zmdi zmdi-share text-info"></i> <span>Information</span></a></li> */}
  
      </ul>
     
     </div></div>
    
        )  
    }  
}  
  
export default Leftside  