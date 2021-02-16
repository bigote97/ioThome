
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let data = Object;
let luces = Object;
let estadoRiego = Boolean;
let luzAugus = Boolean;

var firebaseRiego = firebase.database().ref("huerta");
firebaseRiego.on("value", function(snapshot){
  data = snapshot.val();
  console.log(data);
  dataSet();
})

let firebaseLuces = firebase.database().ref("luces");
firebaseLuces.on("value", function(snapshot) {
  luces = snapshot.val()
  console.log(luces)
  lucesSet();
})

function lucesSet(){
  if (luces.hasOwnProperty('augusto')){
    if (luces.augusto === 1) {
      luzAugus = true;
      console.log('luz prendida');
      document.getElementById('lampAugus').innerHTML = "apagar";
    } else {
      luzAugus = false;
      document.getElementById('lampAugus').innerHTML = "encender";
      console.log('luz apagada');
      
    }
  }
}


function dataSet(params) {
  if (data.hasOwnProperty('riego')) {  
    if (data.riego.regar === 1){
      estadoRiego = true;
      document.getElementById("estadoRiego").innerHTML = "Regando";
      document.getElementById("boton").innerHTML = "DEJAR DE REGAR";
    } else {
      estadoRiego = false;
      document.getElementById("estadoRiego").innerHTML = "Riego realizado";
      document.getElementById("boton").innerHTML = "REGAR";
    }
  }
}
//document.getElementById("boton").onclick = changeState();

document.getElementById('lampAugus').addEventListener('click', function() {
  console.log('click');
  if (luzAugus) {
    firebase.database().ref('luces/').set({
      augusto: 0,   
    });
  } else {
    firebase.database().ref('luces/').set({
      augusto: 1,    
    });
  }
})

function changeState() {
  if (estadoRiego) {
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


