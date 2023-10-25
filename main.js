let presupuestos=[];
let global=null;

function guardar(){
  let gasto = document.getElementById("gasto").value;
  let cantidad = document.getElementById("cantidad").value;

  if(gasto=='')
    swal('Error','el campo gasto está vacío.','warning')
  else if(cantidad=='')
    swal('Error','el campo cantidad está vacía.','warning')
  else if(cantidad<1)
    swal('Error','Ingrese una cantidad mayor a 0','error')
  else if(!isNaN(gasto))
    swal('Error','Ingrese solo letras en gasto.','error')
  else if(isNaN(cantidad))
    swal('Error','Iingrese solo números en cantidad.','error')
  else {
    swal('¡Excelente!','Tu gasto fue registrado correctamente','success');
    gastos();
  }
}


function verificar_presupuesto(){
  let presupuesto = document.getElementById("presupuesto").value;

  if(presupuesto=='')
  swal('Error','El campo presupuesto está vacío.','warning')
else if (presupuesto<1)
swal('Error','El presupuesto debe ser mayor a 0','error')
else
global=presupuesto
}


function gastos(){
  let gasto = document.getElementById("gasto").value;
  let cantidad = document.getElementById("cantidad").value;

  presupuestos.push({
    gastos:gasto,
    valor: cantidad,
  })

  document.getElementById("tarjetas").innerHTML="";
  mostrar_tarjeta()
}

// function mostrar_tarjeta() {
//   presupuestos.forEach((item,index)=>{
//     let tr = document.createElement('tr');
//     let nombre = document.createElement('td');
//     let valor = document.createElement('td');
//     let borrar = document.createElement('td');
//     let borrar_boton = document.createElement('button');

//     borrar_boton.textContent = '❌';
//     borrar_boton.addEventListener('click',()=>{
//       borrar_tarjeta(index);
//     })

//     nombre.textContent = item.gastos;
//     valor.textContent = item.valor;

//     borrar.appendChild(borrar_boton);
//     tr.appendChild(nombre);
//     tr.appendChild(valor);
//     tr.appendChild(borrar);

//     document.getElementById('tarjetas').appendChild(tr);
//   })}

function mostrar_tarjeta() {
  presupuestos.forEach((item, index) => {
    let tr = document.createElement('tr');
    let nombre = document.createElement('td');
    let valor = document.createElement('td');
    let borrar = document.createElement('td');
    let borrar_boton = document.createElement('button');

    borrar_boton.textContent = '❌';
    borrar_boton.className = 'borrar-button'; // Agregar la clase 'borrar-button'
    borrar_boton.addEventListener('click', () => {
      borrar_tarjeta(index);
    });

    nombre.textContent = item.gastos;
    valor.textContent = item.valor;

    borrar.appendChild(borrar_boton);
    tr.appendChild(nombre);
    tr.appendChild(valor);
    tr.appendChild(borrar);

    document.getElementById('tarjetas').appendChild(tr);
  });
}

  function borrar_tarjeta(index) {
    presupuestos.splice(index, 1);
  
    document.getElementById('tarjetas').innerHTML = ""; // Cambiar 'tarjeta' a 'tarjetas'
  
    mostrar_tarjeta();
  }


