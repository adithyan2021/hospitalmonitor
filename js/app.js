import { getAuth,signInWithEmailAndPassword,signOut} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase,ref,set,get,child,push,update,remove} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";


 import{ticket}from "./customer.js";

const firebaseConfig = {
  apiKey: "AIzaSyDX_xrcDtn_X5CJWqA3Ew74OHmg3LuUtAs",
  authDomain: "health-9873e.firebaseapp.com",
  databaseURL: "https://health-9873e-default-rtdb.firebaseio.com",
  projectId: "health-9873e",
  storageBucket: "health-9873e.appspot.com",
  messagingSenderId: "515341389431",
  appId: "1:515341389431:web:f3cff69f29cef14ed50072",
  measurementId: "G-3T2GQEPY51"
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getDatabase(firebase);
///////////////////////
const auth = getAuth(firebase);
// connectAuthEmulator(auth,"http://localhost:9099");
var checkmail;

var popupInUpdateMode=false;
var selectedUuid="-1";
var currentStatus="Pending";
//////////////
var noSorting=true;
var sortingKey="sales";
////////////////////
var check_element;

///////////////////
var newnoSorting=true;
var newsortingKey="Pending";
// document.getElementById("two").style.display = "none";
// document.getElementById("one").style.display = "block";
document.getElementById("three").style.display = "block";
// document.getElementById("four").style.display = "none";
// document.getElementById("five").style.display = "none";
////////////////////////////////



// document.getElementById("bttt").addEventListener('click',Login_show)
// document.getElementById("bttt-sig").addEventListener('click',Logout)

// document.getElementById("checking").addEventListener('click',checking)

///////////
export function logpop(){
  document.getElementById("m1-o-new").style.display="block"; 

}

function Logout(){
  if( document.getElementById("bttt").style.display=="none"){
    document.getElementById("bttt").style.display="block";

  }
signOut(auth).then(() => {
// Sign-out successful.
}).catch((error) => {
// An error happened.
});

}

export function log(){
  var email = document.getElementById("email").value
var password = document.getElementById("password").value
  if(email!=""&&password!=""){
    Login(email,password);
    document.getElementById("m1-o-new").style.display="none";
   
    

  }
} 
export function logclose(){
  document.getElementById("m1-o-new").style.display="none";
}

// function Login_show(){
//   document.getElementById("loginPage").style.display="block";

// }
function Login(email,password){
console.log('Login Btn Call')

  const dbRef = ref(db);
  get(child(dbRef, `user`)).then((snapshot) => {    
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      console.log(`${childKey}`);
      get(child(dbRef, `emp_record/${childData.uuid}`)).then((snapshot) => {
        if (snapshot!=null)
        {if(noSorting || (snapshot.val().emp_type==sortingKey)) 
       { if (snapshot.exists()) {
         if(childData.name==email&&snapshot.val().emp_code==password){
          checkmail=email;
          alert("Loged in");
         }
       
        }} }else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      
    });    
  }).catch((error) => {
    console.error(error);
  });



  document.getElementById("m1-o-new").style.display="none";
  // document.getElementById("loginPage").style.display="none"; 
  
}



////////////////////////
// auth().onAuthStateChanged((user)=>{
//   if(!user){
//       location.replace("index.html")
//   }else{
//       document.getElementById("user").innerHTML = "Hello, "+user.email
//   }
// })


function checking_email(){
  var ml = document.getElementById("email").value
  // var em=document.getElementById("pathkey").value;

  
  

  // else if(){

  // }
}


// function getingUser(user){
//   console.log(user.email);

// }






export function Ticket(){
  // checking_email();
 
  document.getElementById("three").style.display = "block";
  // document.getElementById("four").style.display = "none";
  // document.getElementById("five").style.display = "none";

  ticket(firebase,db,noSorting,sortingKey,checkmail);

 
}



