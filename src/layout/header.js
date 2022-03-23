import { getContract  , slrContract ,contractAddress , gerUserTokenBalance } from '../Helpers/contract';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import WalletLink from 'walletlink';
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import web3 from "web3";









// import React, { Component } from 'react'  
  
// export class Header extends Component {  
//     render() {  
//         return (  
//           <div>
  
//   <header class="topbar-nav">
//    <nav class="navbar navbar-expand fixed-top">
//     <ul class="navbar-nav mr-auto align-items-center">
//       <li class="nav-item">
//         <a class="nav-link toggle-menu" href="javascript:void();">
//          <i class="icon-menu menu-icon"></i>
//        </a>
//       </li>
//       {/* <li class="nav-item">
//         <form class="search-bar">
//           <input type="text" class="form-control" placeholder="Enter keywords" />
//            <a href="javascript:void();"><i class="icon-magnifier"></i></a>
//         </form>
//       </li> */}
//     </ul>
       






// <div class="input-group">
			 
//        <div class="right-nav-link ml-auto input-group-append">
       
//        <div class="contract2">	<a       class="nav-link dropdown-toggle-nocaret position-relative address"      >
//            $SLR Contract: 0xc24796458fbea043780eea59ebba4ad40e87c29b <i   class="zmdi zmdi-copy"></i> </a> </div>
//            {/* <div class="contract">	<a      class="nav-link dropdown-toggle-nocaret position-relative"     >
//              $SLR Contract: 0xc24..29b <i   class="zmdi zmdi-copy"></i> </a> </div> */}
 
           
 
 
 
           
//  <a  class="nav-link dropdown-toggle-nocaret position-relative"  href="https://pancakeswap.finance/swap?outputCurrency=0xc24796458fbea043780eea59ebba4ad40e87c29b" target="blank_">
//          <button   class="btn btn-white " type="button">BUY $SLR
//          </button></a>
//          <a  class="nav-link dropdown-toggle-nocaret position-relative"  href="" >
//          <button   class="btn btn-dark " type="button">Connect Wallet
//          </button></a>
        
//        </div>
//      </div>





//      {/* <ul class="navbar-nav align-items-center right-nav-link ml-auto">
			 
//        <li   class="nav-item dropdown-lg">
//          <a class="nav-link dropdown-toggle-nocaret position-relative" href="javascript:;" id="dropdownBasic1"  > 
//            <i   class="fa fa-bar-chart"></i>
           
//          </a>
//          <div   class="dropdown-menu-right">
//            <ul class="list-group list-group-flush">
              
//              <li class="list-group-item">
//                <a href="javaScript:;">
//                  <div class="media">
                    
//                    <div class="media-body">
//                      <h6 class="mt-0 msg-title"><a href="https://poocoin.app/tokens/0xc24796458fbea043780eea59ebba4ad40e87c29b" target="blank_">CHART ON POOCOIN</a></h6>
//                         </div>
//                  </div>
//                </a>
//              </li>
//              <li class="list-group-item">
//                <a href="javaScript:;">
//                  <div class="media">
                    
//                    <div class="media-body">
//                      <h6 class="mt-0 msg-title"><a href="https://www.dextools.io/app/bsc/pair-explorer/0x092307a44ee2033633d2cae9121e91892de6d7c2" target="blank_" >CHART ON DEXTOOLS</a></h6>
//                         </div>
//                  </div>
//                </a>
//              </li>
              
//            </ul>
//          </div>
//        </li>
      
//      </ul> */}


// <ul class="navbar-nav align-items-center right-nav-link">
      
//       <li class="nav-item language">
//         <a class="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();"><i class="fa fa-bar-chart chart-btn"></i></a>
//         <ul class="dropdown-menu dropdown-menu-right">
//             <li class="dropdown-item">  CHART ON POOCOIN</li>
//             <li class="dropdown-item">  CHART ON DEXTOOLS</li>
             
//           </ul>
//       </li>
      
//     </ul>


//   </nav>
//   </header> 
//   </div>
//         )  
//     }  
// }  
  
// export default Header 


















































































 

  export const gerUserUSDT_PAID = async (address) => {
    let decimals = 18;
	let info = await slrContract.methods.getAccountUSDTDividendsInfo(address).call();
    if (info[2] === 0) {
		return({
        status: "success",
        paidUSDT: info[3] / Math.pow(10, decimals),
        pendingUSDT: info[4] / Math.pow(10, decimals),
      });
    } else {
		return ({
        status: "pending",
        paidUSDT: info[3] / Math.pow(10, decimals) == info[4] / Math.pow(10, decimals) ? 0.0 : info[3] / Math.pow(10, decimals),
        pendingUSDT: info[4] / Math.pow(10, decimals),
      });
    }

// return 3;


	// let response = await slrContract.methods.getAccountUSDTDividendsInfo(address).call();
  
	// let weiBalance = web3.utils.fromWei(response[0]);
  
	//return weiBalance;
  };
  export const getTotalPaidUSDT  = async (address) => {
	 
	let response = await slrContract.methods.getTotalUSDTDividendsDistributed(address).call();
  
	let weiBalance = web3.utils.fromWei(response);
  
	return weiBalance;
  };
  

var address_local = localStorage.getItem('address');
var tokenBalance= 0 ;
var USDT_paid= 0 ;
var USDT_pendings= 0 ;

 

const getBalanceButton = async (address) => {
	 
	tokenBalance = await gerUserTokenBalance(address); 
	USDT_pendings = await gerUserUSDT_PAID(address); 
	address_local = address;
	localStorage.setItem('Balance', tokenBalance);
	localStorage.setItem('USDT_paid', USDT_paid);
	localStorage.setItem('USDT_pendings', USDT_pendings);
	localStorage.setItem('address', address);
	let date1 = new Date();
	localStorage.setItem('date1', date1); 
	 
  };

  
const getBalance_with_walletconnect = async (address) => {
	
	try{ 
	tokenBalance = await gerUserTokenBalance(address);
	USDT_paid = await getTotalPaidUSDT(address);
	//USDT_pendings  = await gerUserUSDT_PAID(address);
}catch{	}
 
	 
  };


const Header = () => {

	const balance = localStorage.getItem('balance');
	const date1 = localStorage.getItem('date1');
	const date2 = new Date();


	 
function getDifferenceInMinutes(date1, date2) {
	const diffInMs = Math.abs(new Date(date2) - new Date(date1));
	// alert( diffInMs / (1000 * 60));
	return diffInMs/ (1000 * 60) ;
  }
  var datediff = 0 ;
  if(date1){
	  datediff = getDifferenceInMinutes(date1,date2); 
  }

  if(datediff >= 15){
	localStorage.clear();
  }
	 
	//modal
	const [show, setShow] = useState(false);


	const [ web3Library, setWeb3Library ] = React.useState();
	const [ web3Account, setWeb3Account ] = React.useState();
	const [ walletlinkProvider, setWalletlinkProvider ] = React.useState();
	const [ walletConnectProvider, setWalletConnectProvider ] = React.useState();
	//vanilla
	const writeToContract = async () => {
		try {
			const randomNumber = Math.floor(Math.random() * 100);
			const myContract = getContract(web3Library, web3Account);
			const overrides = {
				gasLimit: 230000
			};
			const response = await myContract.store(randomNumber, overrides);
			alert('write ' + randomNumber);
		} catch (ex) {
			console.log(ex);
			alert(ex);
		}
	};

	 

	//vanilla metamask
	const connectMetamask = async () => {
		try {
			//debugger
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			// console.log(account);
			// console.log(accounts);
			setWeb3Account(account);
			const library = new Web3Provider(window.ethereum, 'any');
			 
			setWeb3Library(library);

			getBalanceButton(account);
			 
			
			

		} catch (ex) {
			console.log(ex);
		}

		if(tokenBalance != 0){
			setShow(false)	
			}
	};

	//vanilla walletconnect
	const connectWaletConnect = async () => {
	
		try {
			const RPC_URLS = {
				1: 'https://mainnet.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
				4: 'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4'
			};
			const provider = new WalletConnectProvider({
				rpc: {
					1: RPC_URLS[1],
					4: RPC_URLS[4]
				},
				qrcode: true,
				pollingInterval: 15000
			});
			setWalletConnectProvider(provider);
			const accounts = await provider.enable();
			const account = accounts[0];
			//debugger;
			const library = new Web3Provider(provider, 'any');
			
			
			setWeb3Library(library);
			setWeb3Account(account);



			 getBalance_with_walletconnect(account);
			 
			
	address_local = account;
	localStorage.setItem('Balance', tokenBalance);
	localStorage.setItem('USDT_paid', USDT_paid);
	localStorage.setItem('USDT_pendings', USDT_pendings);
	localStorage.setItem('address', account);
	let date1 = new Date();
	localStorage.setItem('date1', date1);



	//alert('read balance ' + tokenBalance);
			


		} catch (ex) {
			console.log(ex);
			//return;
		}

		
			
		if(web3Account){
			setShow(false)	
			}
	};

	//vanilla coinbase
	const connectCoinbase = async () => {
		try {
			// Initialize WalletLink
			const walletLink = new WalletLink({
				appName: 'Salary-app',
				darkMode: true
			});
			
			const provider = walletLink.makeWeb3Provider(
				'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
				4
			);
			setWalletlinkProvider(provider);
			const accounts = await provider.request({
				method: 'eth_requestAccounts'
			});
			const account = accounts[0];

			const library = new Web3Provider(provider, 'any');

			console.log('library');
			console.log(library);
			setWeb3Library(library);
			setWeb3Account(account);
		} catch (ex) {
			console.log(ex);
		}
	};
	 
	const disconnectWalletconnect = ()=>{
		try{
		walletConnectProvider.disconnect()
		setWalletConnectProvider(null);
		}catch{
			// console.log()
		}
		localStorage.clear();
		address_local = null;
		setShow(false)
  //  window.location.reload(false);
	}




















	return (


          <>
  
  <header class="topbar-nav">
   <nav class="navbar navbar-expand fixed-top">
    <ul class="navbar-nav mr-auto align-items-center">
      <li class="nav-item">
        <a class="nav-link toggle-menu" href="javascript:void();">
         <i class="icon-menu menu-icon"></i>
       </a>
      </li>
      {/* <li class="nav-item">
        <form class="search-bar">
          <input type="text" class="form-control" placeholder="Enter keywords" />
           <a href="javascript:void();"><i class="icon-magnifier"></i></a>
        </form>
      </li> */}
    </ul>
       






<div class="input-group">
			 
       <div class="right-nav-link ml-auto input-group-append">
       
       {/* <div class="contract2">	<a       class="nav-link dropdown-toggle-nocaret position-relative address"      >
           $SLR Contract: {contractAddress} <i   class="zmdi zmdi-copy"></i> </a> </div> */}

           {/* <div class="contract2 nav-link dropdown-toggle-nocaret position-relative address-connect">
           {address_local ? <p>{address_local}</p> : <p>Not Connected</p>}  </div> */}


          
           {/* <div class="contract">	<a      class="nav-link dropdown-toggle-nocaret position-relative"     >
             $SLR Contract: 0xc24..29b <i   class="zmdi zmdi-copy"></i> </a> </div> */}
 
           
 
 
 
           
 <a  class="nav-link dropdown-toggle-nocaret position-relative"  href="https://pancakeswap.finance/swap?outputCurrency=0xc24796458fbea043780eea59ebba4ad40e87c29b" target="blank_">
         <button   class="btn btn-white " type="button">BUY $SLR
         </button></a>
         {/* <a  class="nav-link dropdown-toggle-nocaret position-relative"  href="" > */}
		 
        
         <button 	onClick={() => setShow(true)}   className={address_local ? 'btn  btn-success btn-connect' : 'btn  btn-dark btn-connect'} type="button">{address_local ? address_local.substring(0, 6)+'...'+address_local.substring(36, 42) : 'Connect wallet'}
         </button>
		 {/* <button 	onClick={() => getBalance_with_walletconnect("0xc14a2a9bf6152640aed9525300c80931d2323d86")}     type="button"> balance
         </button> */}
 
 {/* <button onClick={getBalanceButton} className="buttonBalance">
              Get Balance
            </button> */}



      <Modal class="bg-theme bg-theme1" title="Connect wallet" onClose={() => setShow(false)} show={show}>


	  <button   	onClick={connectMetamask} className= {address_local ? ' hide' : 'btn  btn-connect btn-modal'}      type="button">   <img     class="meta-icon pointer icon_connect {address_local ? 'Connected' : 'Connect wallet'}" src="assets/images/MetaMask_Fox.svg.png"  width="45"/> <p class="bottom_0">Metamask</p> 
         </button>


	  <button  	onClick={connectWaletConnect}  className= {address_local ? ' hide' : 'btn  btn-connect btn-modal'} type="button"><img     class="meta-icon pointer icon_connect" src="assets/images/walletconnect.png"  width="45"/> <p class="bottom_0">WalletConnect</p>
         </button>

		 
 

		 <button 	onClick={disconnectWalletconnect}  className= {address_local ? ' btn btn-danger btn-connect' : 'hide'}  type="button">Disconnect
         </button>

      </Modal>




         {/* </a> */}
        
       </div>
     </div>





     {/* <ul class="navbar-nav align-items-center right-nav-link ml-auto">
			 
       <li   class="nav-item dropdown-lg">
         <a class="nav-link dropdown-toggle-nocaret position-relative" href="javascript:;" id="dropdownBasic1"  > 
           <i   class="fa fa-bar-chart"></i>
           
         </a>
         <div   class="dropdown-menu-right">
           <ul class="list-group list-group-flush">
              
             <li class="list-group-item">
               <a href="javaScript:;">
                 <div class="media">
                    
                   <div class="media-body">
                     <h6 class="mt-0 msg-title"><a href="https://poocoin.app/tokens/0xc24796458fbea043780eea59ebba4ad40e87c29b" target="blank_">CHART ON POOCOIN</a></h6>
                        </div>
                 </div>
               </a>
             </li>
             <li class="list-group-item">
               <a href="javaScript:;">
                 <div class="media">
                    
                   <div class="media-body">
                     <h6 class="mt-0 msg-title"><a href="https://www.dextools.io/app/bsc/pair-explorer/0x092307a44ee2033633d2cae9121e91892de6d7c2" target="blank_" >CHART ON DEXTOOLS</a></h6>
                        </div>
                 </div>
               </a>
             </li>
              
           </ul>
         </div>
       </li>
      
     </ul> */}


<ul class="navbar-nav align-items-center right-nav-link">
      
      <li class="nav-item language">
        <a class="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();"><i class="fa fa-bar-chart chart-btn"></i></a>
        <ul class="dropdown-menu dropdown-menu-right">
            <li class="dropdown-item">  CHART ON POOCOIN</li>
            <li class="dropdown-item">  CHART ON DEXTOOLS</li>
             
          </ul>
      </li>
      
    </ul>


  </nav>
  </header> 
  












		{/* <div className="flex flex-col space-y-7 items-start pt-10 w-1/2 border-2 border-yellow-300"> */}
			{/* <h2>Vanilla Control</h2> */}
			{/* {web3Account ? <p>{web3Account}</p> : <p>Not Connected</p>} */}
			{/* <div className="flex space-x-3">
				<button
					className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					onClick={writeToContract}
				>
					Write to Contract
				</button>
			</div>
			<div className="flex space-x-3">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectMetamask}
				>
					Connect Metamask
				</button>
			</div>
			<div className="flex space-x-3">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectWaletConnect}
				>
					Connect walletconnect
				</button>
				<button
					className=" bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
					onClick={disconnectWalletconnect}
				>
					Disconnect
				</button>
			</div> */}
		 
		{/* </div> */}
    </>
	);
};
export default Header;
