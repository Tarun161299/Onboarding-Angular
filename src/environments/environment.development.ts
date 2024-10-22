export const environment = {
    production: false,
    apiURL: 'https://demo.ecounselling.nic.in/pmucounse/OnBoardingSystemAPI/api/',
   // apiURL: 'http://localhost:5197/api/',
   action:'https://identity.ecounselling.nic.in/authserver/Api/Authorize/',
   response_type:"token",
   //client_Id:"1000110W8V8FJFMS0380",
   client_Id:"10002175RG7CB52K2280",
   //old//client_Id:"1000107W1S07X348D435",
   redirect_uri:"http://localhost:55480/api/ExtEndPoint",
   scope:"Profile",
   state:"12132132131",


   logout_action:"https://identity.ecounselling.nic.in/authserver/Api/ExpireToken",

  };
  