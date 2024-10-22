// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:7146/api/',
  action:'https://identity.ecounselling.nic.in/authserver/Api/Authorize/',
  response_type:"token",
  //client_Id:"1000110W8V8FJFMS0380",
  client_Id:"10002175RG7CB52K2280",
  //old//client_Id:"1000107W1S07X348D435",
  redirect_uri:"http://localhost:7146/api/ExtEndPoint",
  scope:"Profile",
  state:"12132132131",
  secretKey:"37ZA3D89D64C115122DF9178C8R99c1x",
  salt:"213A26DBB4A358C5",
  logout_action:"https://identity.ecounselling.nic.in/authserver/Api/ExpireToken",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
