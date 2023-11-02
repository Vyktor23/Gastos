let presupuestos = [];
let presupuestoInicial = null;
let presupuestoRestante = null;


function formatNumberWithCommas(number) {
  return number.toLocaleString('es-ES');
}

function guardar() {
  let gasto = document.getElementById("gasto").value;
  let cantidad = parseFloat(document.getElementById("cantidad").value);

  if (!presupuestoInicial) {
    swal('Advertencia', 'Por favor, ingrese un presupuesto antes de agregar gastos.', 'warning');
  } else if (gasto === '') {
    swal('Error', 'El campo "Gasto" está vacío.', 'warning');
  } else if (isNaN(cantidad) || cantidad <= 0) {
    swal('Error', 'Ingrese una cantidad válida en "Cantidad" (número mayor a 0).', 'error');
  } else if (cantidad>presupuestoRestante) {
    swal('Error','La cantidad se excede al presupuesto restante','error');
  } else{
    presupuestos.push({
      gastos: gasto,
      valor: cantidad,
    });

    swal('¡Excelente!', 'Tu gasto fue registrado correctamente', 'success');

    presupuestoRestante -= cantidad;
    document.getElementById("restante").value = presupuestoRestante;
    document.getElementById("gasto").value = "";
    document.getElementById("cantidad").value = "";

    document.getElementById("tarjetas").innerHTML = "";
    mostrar_tarjeta();
    cambiar_color();
    boton();
  }
}


function verificar_presupuesto() {
  let presupuesto = parseFloat(document.getElementById("presupuesto").value);

  if (isNaN(presupuesto) || presupuesto <= 0) {
    swal('Error', 'Ingrese un presupuesto válido (número mayor a 0).', 'error');
  } else {
    presupuestoInicial = presupuesto;
    presupuestoRestante = presupuesto;

    document.getElementById("presupuesto").value = formatNumberWithCommas(presupuesto);
    document.getElementById("restante").value = formatNumberWithCommas(presupuestoRestante);
  }
}


function mostrar_tarjeta() {
  presupuestos.forEach((item, index) => {
    let tr = document.createElement('tr');
    let nombre = document.createElement('td');
    let valor = document.createElement('td');
    let borrar = document.createElement('td');
    let borrar_boton = document.createElement('button');

    borrar_boton.textContent = '❌';
    borrar_boton.className = 'borrar-button';
    borrar_boton.addEventListener('click', () => {
      borrar_tarjeta(index);
    });

    nombre.textContent = item.gastos;
    valor.textContent = formatNumberWithCommas(item.valor);

    borrar.appendChild(borrar_boton);
    tr.appendChild(nombre);
    tr.appendChild(valor);
    tr.appendChild(borrar);

    document.getElementById('tarjetas').appendChild(tr);
  });
}

function borrar_tarjeta(index) {
  let cantidadEliminada = presupuestos[index].valor;
  presupuestos.splice(index, 1);

  presupuestoRestante += cantidadEliminada;

  document.getElementById("restante").value = formatNumberWithCommas(presupuestoRestante);

  document.getElementById("tarjetas").innerHTML = "";
  mostrar_tarjeta();
  cambiar_color();
  boton();
}


function cambiar_color() {
  let porcentaje  = (presupuestoRestante / presupuestoInicial) * 100;
  let restante = document.getElementById('restante');

  if (porcentaje < 20) {
    restante.style.backgroundColor = 'rgba(220, 20, 20, 0.33)';
  } else {
    restante.style.backgroundColor = 'rgba(0, 255, 0, 0.33)';
  }
}

function boton() {
  if (presupuestoRestante == 0){
      document.getElementById('agregar').disabled = true;
  }else {
      document.getElementById('agregar').disabled = false;
  }
}

