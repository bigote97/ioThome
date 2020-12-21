
var firebaseConfig = {
  apiKey: "AIzaSyA0MznDVGU_KWFKmEyKHERuedluRGOxflk",
  authDomain: "iot-home-843f7.firebaseapp.com",
  databaseURL: "https://iot-home-843f7-default-rtdb.firebaseio.com",
  projectId: "iot-home-843f7",
  storageBucket: "iot-home-843f7.appspot.com",
  messagingSenderId: "761324482462",
  appId: "1:761324482462:web:fa51436d6ce6be3ad0f08f",
  measurementId: "G-DE44SP3Y0W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var data = Object;
let estado = Boolean;

var firebaseRef = firebase.database().ref("huerta");
firebaseRef.on("value", function(snapshot){
  data = snapshot.val();
  dataSet();
})
function dataSet(params) {
  if (data.hasOwnProperty('riego')) {  
    if (data.riego.regar === 1){
      estado = true;
      document.getElementById("estado").innerHTML = "Regando";
      document.getElementById("boton").innerHTML = "DEJAR DE REGAR";
    } else {
      estado = false;
      document.getElementById("estado").innerHTML = "Riego realizado";
      document.getElementById("boton").innerHTML = "REGAR";
    }
  }
}
//document.getElementById("boton").onclick = changeState();

function changeState() {
  if (estado) {
    firebase.database().ref('huerta/riego/').set({
      regar: 0,   
    });
  } else {
    firebase.database().ref('huerta/riego/').set({
      regar: 1,    
    });
  }
}

function setAutomatizacion() {
  // let dia = document.forms[0];
  // let hora = document.forms[1];
  // let minuto = document.forms[2];
  var dias = document.getElementById("dias").value;
  var horas = document.getElementById("horas").value;
  var minutos = document.getElementById("minutos").value;
  enviaHorario(dias, horas, minutos);
}
function enviaHorario(dias, horas, minutos) {
  firebase.database().ref('huerta/automatizacion/').set({
    dias: dias,
    horaRiego: horas, 
    minutoRiego: minutos
  });
}


