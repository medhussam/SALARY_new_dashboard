import React, { Component , useState } from 'react'  
 
import { getContract  , slrContract ,contractAddress , gerUserTokenBalance } from '../Helpers/contract';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import WalletLink from 'walletlink';
 
import Modal from "../Modal/Modal";
import web3 from "web3";


export const gerUserUSDT_PAID = async (address) => {
    let decimals = 18;
	let info = await slrContract.methods.getAccountUSDTDividendsInfo(address).call();
    if (info[2] === 0) {
		return({
        status: "success",
        paidUSDT: info[3] / Math.pow(10, decimals),
        pendingUSDT: info[4] / Math.pow(10, decimals),
		position : info[2],
		lastPAY : new Date(info[5] * 1000).toLocaleString() 
      });
    } else {
		return ({
        status: "pending",
        paidUSDT: info[3] / Math.pow(10, decimals) == info[4] / Math.pow(10, decimals) ? 0.0 : info[3] / Math.pow(10, decimals),
        pendingUSDT: info[4] / Math.pow(10, decimals),
		position : info[2],
		lastPAY : new Date(info[5] * 1000).toLocaleString() 
      });
    }
 
  };
  
  export const getTotalPaidUSDT  = async () => {
	 
 
    let decimals = 18;
  
    let info = await slrContract.methods.getTotalUSDTDividendsDistributed().call();
    


  //alert(info/ Math.pow(10, decimals))
	return info / Math.pow(10, decimals);
  };
  






  
  export default function Home(){  
    // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>  


	 
var address_local = localStorage.getItem('address');
var balance_last=  localStorage.getItem('Balance');
var _paidUSDT =  localStorage.getItem('USDT_pendings');
var _TotalPaidUSDT =  localStorage.getItem('TotalPaidUSDT');
var _USDT_pendings_exact =  localStorage.getItem('USDT_pendings_exact');

var _position =  localStorage.getItem('position');
var _lastPAY =  localStorage.getItem('lastPAY');



var tokenBalance= 0 ;

 
var USDT_paid= 0 ;
var USDT_pendings= 0 ;
var TotalPaidUSDT= 0 ;
var position= 0 ;
var lastPAY= 0 ;

//TotalPaidUSDT = await getTotalPaidUSDT(); 
// setTimeout(() => {
// 	  TotalPaidUSDT =  getTotalPaidUSDT(); 
	//   getBalanceButton("0xC14A2a9Bf6152640aED9525300c80931d2323d86");
//   }, 3000);
  
const getBalanceButton = async (address) => {
	 
	tokenBalance = await gerUserTokenBalance(address); 
	USDT_pendings = await gerUserUSDT_PAID(address); 
	
	 TotalPaidUSDT = await getTotalPaidUSDT(); 
	 
	setbalance_(tokenBalance);
	setUSDT_pendings_(USDT_pendings.paidUSDT);
	setpaidUSDT_(USDT_pendings.pendingUSDT );
	
	setposition(USDT_pendings.position);
	setlastPAY(USDT_pendings.lastPAY);


	address_local = address;
	localStorage.setItem('Balance', tokenBalance);
	localStorage.setItem('USDT_paid', USDT_paid);
	localStorage.setItem('USDT_pendings', USDT_pendings.paidUSDT);
	localStorage.setItem('TotalPaidUSDT', TotalPaidUSDT);
	localStorage.setItem('USDT_pendings_exact', USDT_pendings.pendingUSDT);


	localStorage.setItem('position', USDT_pendings.position);
	localStorage.setItem('lastPAY', USDT_pendings.lastPAY);



	localStorage.setItem('address', address);


	let date1 = new Date();
	localStorage.setItem('date1', date1); 
	 
  };

  
const getBalance_with_walletconnect = async (address) => {
	
	try{ 
	tokenBalance = await gerUserTokenBalance(address);
	USDT_pendings = await gerUserUSDT_PAID(address); 
	//USDT_pendings  = await gerUserUSDT_PAID(address);
	setbalance_(tokenBalance);
	setUSDT_pendings_(USDT_pendings.paidUSDT);
	setpaidUSDT_(USDT_pendings.pendingUSDT );


	address_local = address;
	localStorage.setItem('Balance', tokenBalance);
	localStorage.setItem('USDT_paid', USDT_paid);
	localStorage.setItem('TotalPaidUSDT', TotalPaidUSDT);
	localStorage.setItem('USDT_pendings', USDT_pendings.paidUSDT);
	localStorage.setItem('USDT_pendings_exact', USDT_pendings.pendingUSDT);
	localStorage.setItem('address', address);
 
	localStorage.setItem('position', USDT_pendings.position);
	localStorage.setItem('lastPAY', USDT_pendings.lastPAY);



}catch{	}
 
	 
  };

//  const TotalPaidUSDT = await getTotalPaidUSDT(); 
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
  const [ balance_, setbalance_ ] = React.useState();
  const [ USDT_pendings_, setUSDT_pendings_ ] = React.useState();
  const [ paidUSDT_, setpaidUSDT_ ] = React.useState();
  const [ TotalPaidUSDT_, setTotalPaidUSDT_ ] = React.useState();
  const [ position_, setposition ] = React.useState();
  const [ lastPAY_, setlastPAY ] = React.useState();
  
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

	  setbalance_(0);
	  setUSDT_pendings_(0);
	  setpaidUSDT_(0);
	  setShow(false)
//  window.location.reload(false);
  }







        return (  
            <div> 




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


                <div class="clearfix"></div>
            <div class="content-wrapper">
                <div class="container-fluid">






                <div class="col-12 col-lg-12 col-xl-12">
				<div class="input-group">
					<div class="input-group-prepend"> <span class="input-group-text"><i class="fa fa-edit"></i></span>
					</div>
					
					<input  type="text"   class="form-control" placeholder="Enter your address here (0x00....)" />
					<div    class="input-group-append"> 
						<button  class="btn btn-primary"><i class="fa fa-check"></i> Submit</button> 
					</div>
				</div>
			</div>









                <div class="card mt-3">
	<div class="card-content">
		<div class="row row-group m-0">



			 
			 
                <div class="col-12 col-lg-4 col-xl-4">
					<div class="card bubble">
						<div class="card-body card-block">
							<div class="media align-items-center">
								<div class="media-body">
									<p class="mb-0 text-white">Salary balance</p>
									<h4 class="mb-0 text-white"> {balance_ ? balance_ : balance_last}  SLR</h4>
									<p class="hint">$ </p>
									 
									<p class="extra-small-font mt-3 mb-0 text-white">Your SLR Holdings</p>
										<br/> 
								</div>
								<div class="position-relative"><img src="assets/images/salary.png"  width="80"/>
								</div>
							
						</div>
					</div>
                    </div></div>
				<div class="col-12 col-lg-4 col-xl-4">
					<div class="card bubble">
						<div class="card-body card-block">
							<div class="media align-items-center">
								<div class="media-body">
									<p class="mb-0 text-white">USDT Paid</p>
									<h4 class="mb-0 text-white">{paidUSDT_ ? paidUSDT_.toFixed( 2 ) : Number(_USDT_pendings_exact).toFixed( 2 )} USDT</h4>
									<p class="hint">Last Payout : {_lastPAY}  </p>
										  
									<p class="extra-small-font mt-3 mb-0 text-white">Your USDT Paid</p>
										<br/> 
								</div>
								<div class="position-relative"><img src="assets/images/teather.png"  width="80"/>
								</div>
							
						</div>
					</div>
                    </div></div>


				<div class="col-12 col-lg-4 col-xl-4">
					<div class="card bubble">
						<div class="card-body card-block">
							<div class="media align-items-center">
								<div class="media-body">
									<p class="mb-0 text-white">Pending USDT</p>
									<h4 class="mb-0 text-white">{USDT_pendings_ ? USDT_pendings_.toFixed( 2 ) : Number(_paidUSDT).toFixed( 2 )}  USDT</h4>
									<p class="hint">Queue Position :  {_position}
										<i placement="right"     
										 class="fa fa-exclamation-circle"></i>
										  </p>
									<p class="extra-small-font mt-3 mb-0 text-white">Your Pending USDT</p>
										<br/> 
								</div>
								<div class="position-relative"><img src="assets/images/teather.png"  width="80"/>
								</div>
                                </div>	</div>
						</div>
					</div>
				</div>
		 
                </div>

			<div class="col-12 col-lg-12 col-xl-12 border-light">
				<div class="card-body">
					<h5 class="text-white mb-0 text-center">Total USDT Paid To Salary Holders<span class="float-right"> </span></h5>
					<div class="my-3">
						<p>
						 
						</p>
                        <div class="progress my-3"  >
                                            <div class="progress-bar" ></div>
                                        </div>
					</div>
					<h3 class="mb-0 text-white text-center">{TotalPaidUSDT_ ? TotalPaidUSDT_.toFixed( 2 ) : Number(_TotalPaidUSDT).toFixed( 2 )}  USDT
						 
					</h3>
				</div>
                </div></div>








                <div class="row">
	<div class="col-12 col-lg-8 col-xl-8">
		 
				<div class="col-12 col-lg-12">
					<div class="card">
						<div class="card-body">
							<p class="text-left">Daily trading volume 24h</p>
							<h4   class="mb-0 text-left">$ 0000.00  <small class="small-font"> 
							 
							</small></h4>
						</div>
						<div class="chart-container-">
                        <canvas id="chart1"></canvas>
						</div>

                           
					</div>
                    
				</div>
			 <div class="card">
			<div class="row m-0 row-group text-center border-top border-light-3">
            
				<div class="col-12 col-lg-6">
					<div class="p-3">
						<h5  class="mb-0">$   </h5>
						<small class="mb-0">Trading volume, 24h 
                        
							</small>
                            
					</div>
				</div>
				<div class="col-12 col-lg-6">
					  <div class="p-3">
						<h5  class="mb-0">$  </h5>
						<small class="mb-0">Current price <span> 
						 
							</span></small>
					</div>  
				</div>
			</div>
		</div>
	</div>
	

	<div class="col-12 col-lg-4 col-xl-4">
		<div class="card">
			<div class="card-body text-center">
				
				<div class="icon-box bg-light  mx-auto imp"> <i class="fa fa-exclamation-triangle"></i>
				</div><h5 class="text-uppercase text-white">Important</h5>
				<p class="my-5 text-white">Rewards are automatically sent every 60 minutes. It can, however, take longer depending on your holdings and trading volume. Rewards will be triggered once they are big enough to cover the gas fees. If you are a smaller holder it may take from a couple hours to a few days for rewards to appear in your wallet.</p>  
                {/* style="font-size:15px;margin-bottom: 1em !important;margin-top: 1em !important;" */}
            </div>
		</div>
	</div>



 
</div>


<div class="row">
	<div class="col-12 col-lg-12 col-xl-12">
		<div class="card">
			 
			<div class="card-body text-center">
				
				 <h5 class="text-uppercase text-white">TOTAL TRADING VOLUME = $   </h5>
			 	</div>
			
			<div class="table-responsive">
				<table class="table table-hover align-items-center">
					<thead>
						<tr>
							<th>Date</th>
							<th>Volume</th>
							<th>Open</th>
							<th>Close</th>
						</tr>
					</thead>
					<tbody  >
					  <tr   >
 
						 
							 
						</tr> 
						
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="col-12 col-lg-12 col-xl-6">
		<div class="row">
		 
		</div>
	</div>
</div> 







                    <div class="overlay toggle-menu"></div>

                </div>

            </div><a href="javaScript:void();" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>
            </div>
   
         
        )  
    }   