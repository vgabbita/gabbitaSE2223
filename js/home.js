  // Import the functions you need from the SDKs you need
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth, signOut} 
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
  
  import { getDatabase, ref, set, update, child, get, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD21XU1MrE4-KJg7jclAfkO0RuG_QHnz0c",
    authDomain: "researchwebsitefb-cf75e.firebaseapp.com",
    databaseURL: "https://researchwebsitefb-cf75e-default-rtdb.firebaseio.com",
    projectId: "researchwebsitefb-cf75e",
    storageBucket: "researchwebsitefb-cf75e.appspot.com",
    messagingSenderId: "812310755886",
    appId: "1:812310755886:web:4f794ec6b0637031363dbf"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //Initialize authentication
const auth = getAuth();

//Return instance of your app's FRD
const db = getDatabase(app);

// ---------------------// Get reference values -----------------------------
let userLink = document.getElementById('userLink');   // user name for number
let signOutLink = document.getElementById('signOut'); // sign-out link
let welcome = document .getElementById('welcome');    // welcome header
let currentUser = null;                               // initialize currentUser to null


// ----------------------- Get User's Name'Name ------------------------------
function getUserName() {
  // Grab the value for the 'keep logged in' switch
  let keepLoggedIn = localStorage.getItem('keepLoggedIn');
  
  // Grab uder information passed in from signIn.js
  if (keepLoggedIn == 'yes') {
    currentUser = JSON.parse(localStorage.getItem('user'));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem('user'));
  }
}

function signOutUser() {
  sessionStorage.removeItem('user'); // clear session storage
  localStorage.removeItem('user');   // clear local storage
  localStorage.removeItem('keepLoggedIn');

  signOut(auth, db).then(() => {
    // Sign-out successful.
    window.location.href = 'index.html';
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}
  
  // Remove user info from local/session storage

// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD



// ------------------------Set (insert) data into FRD ------------------------
function setData(userID, day, extract, diameter){
  // Must use brackets around variable names to use it as a key
  set(ref(db, 'users/' + userID + '/data/' + day), {
    [extract]: diameter
  })
  .then(() => {
    alert('Data stored successfully.')
  }).catch((error) => {
    alert('There was an error. Error: ' + error)
  });
 }

// -------------------------Update data in database --------------------------
function updateData(userID, day, extract, diameter){
  // Must use brackets around variable names to use it as a key
  update(ref(db, 'users/' + userID + '/data/' + day), {
    [extract]: diameter
  })
  .then(() => {
    alert('Data updated successfully.')
  }).catch((error) => {
    alert('There was an error. Error: ' + error)
  });
 }

// ----------------------Get a datum from FRD (single data point)---------------
function getData(userID, year, month, day){
  
  let yearVal = document.getElementById('yearVal');
  let monthVal = document.getElementById('monthVal');
  let dayVal = document.getElementById('dayVal');
  let temperatureVal  = document.getElementById('tempVal');

  const dbref = ref(db); // firbease paramter to get a reference to the database

  //Provide the path thrugh the nodes
  get(child(dbref, 'users/' + userID + '/data/' + year + '/' + month)).then((snapshot) => {
    if (snapshot.exists()) {
      yearVal.textContent = year;
      monthVal.textContent = month;
      dayVal.textContent = day;

      //To fet set of data, use snapshot.val()
      temperatureVal.textContent = snapshot.val()[day];

    } else {
      alert("Unsuccessful, error" + error);
    }
  })
  .catch((error) => {
    alert("Unsuccessful, error" + error);
  });
 }

// ---------------------------Get a month's data set --------------------------
// Must be an async function because you need to get all the data from FRD
// before you can process it for a table or graph


// Add a item to the table of data



// -------------------------Delete a day's data from FRD ---------------------



// --------------------------- Home Page Loading -----------------------------
window.onload = function() {
  // ---------------------------------- Set Welcome Message -------------------------
  getUserName();
  if(currentUser == null) {
    userLink.innerHTML = currentUser.name;
    userLink.classList.replace("nav-link", "btn");
    userLink.classList.add("btn-primary");
    userLink.href = "register.html";

    signOutLink.innerHTML = "Sign In";
    signOutLink.classList.replace("nav-link", "btn");
    signOutLink.classList.add("btn-success");
    signOutLink.href = "signIn.html";
  
  }
  else {
    userLink.innerText = currentUser.firstName;
    welcome.innerText = `Welcome ${currentUser.firstName}`;
    userLink.classList.replace("btn", "nav-link");
    userLink.classList.add("btn-primary");
    userLink.href = "#";

    signOutLink.innerHTML = "Sign Out";
    signOutLink.classList.replace("btn", "nav-link");
    signOutLink.classList.add("btn-success");
    document.getElementById('signOut').onclick = function(){
      signOutUser();
    }
  } 

  // Set, Update, Get, Remove Temperature Data
  
  //Set Data
  document.getElementById('set').onclick = function() {
    const day = document.getElementById('day').value;
    const extract = document.getElementById('extract').value;
    const diameter = document.getElementById('diameter').value;
    const userID = currentUser.uid;
    setData(userID, day, extract, diameter);
};

// Update data
document.getElementById('update').onclick = function() {
  const trial = document.getElementById('trial').value;
  const extract = document.getElementById('extract').value;
  const diameter = document.getElementById('diameter').value;
  const userID = currentUser.uid;
  updateData(userID, trial, extract, diameter);

}

// get a datum
document.getElementById('get').onclick = function() {
  const year = document.getElementById('getYear').value;
  const month = document.getElementById('getMonth').value;
  const day = document.getElementById('getDay').value;
  const userID = currentUser.uid;
  getData(userID, year, month, day);

}
}
  // ------------------------- Set Welcome Message -------------------------

  
  // Get, Set, Update, Delete Sharkriver Temp. Data in FRD
  // Set (Insert) data function call
  

  // Update data function call
  

  // Get a datum function call
  

  // Get a data set function call
  

  // Delete a single day's data function call