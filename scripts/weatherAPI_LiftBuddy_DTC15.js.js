//----------------------------------------
//  Your web app's weather api configuration
//----------------------------------------
var weatherapiConfig = {
    apiKey: "a320538d868647c4ba465819230903",
  };
  
  //--------------------------------------------
  // initialize the weather api
  //--------------------------------------------
  const app = weatherapi.initializeApp(weatherapiConfig);
  const db = weatherapi.firestore();
  
