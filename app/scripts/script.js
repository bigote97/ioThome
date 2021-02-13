
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


