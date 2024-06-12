let dineroEnCaja;
const historialVentas = [];
document.getElementById("montoInicialBtn").addEventListener("click", function() {
    let montoAlAbrirCaja = parseFloat(document.getElementById("cantEnCaja").value);
    if (isNaN(montoAlAbrirCaja) || montoAlAbrirCaja < 0) {
        mostrarMensaje("Ingrese un monto inicial válido.", true);
    } else {
        dineroEnCaja = montoAlAbrirCaja;
        document.getElementById("seccionMontoInicial").style.display = "none";
        document.getElementById("seccionVentas").style.display = "block";
        mostrarMensaje(`Dinero en caja actualmente: $${dineroEnCaja.toFixed(2)}`, false);
    }
});


document.getElementById("registrarVenta").addEventListener("click", registrarVenta);
document.getElementById("toggleHistorial").addEventListener("click", toggleHistorial);

function registrarVenta() {
    const costoProducto = parseFloat(document.getElementById("costoProducto").value);
    const dineroRecibido = parseFloat(document.getElementById("dineroRecibido").value);
   
    
    if (isNaN(costoProducto) || isNaN(dineroRecibido) || costoProducto < 0 || dineroRecibido < 0) {
        mostrarMensaje("Ingrese valores válidos para el costo del producto y el dinero recibido.", true);
        return;
    }

    if (dineroRecibido < costoProducto) {
        mostrarMensaje("Dinero insuficiente para completar la venta.", true);
    } else {
        const vuelto = dineroRecibido - costoProducto;
        dineroEnCaja += costoProducto;
        mostrarMensaje(`Venta completada. Vuelto: $${vuelto.toFixed(2)}. Dinero en caja: $${dineroEnCaja.toFixed(2)}`, false);
        registrarEnHistorial(costoProducto, dineroRecibido, vuelto);
    }
    dineroEnDia = dineroEnDia + costoProducto;
}

function registrarEnHistorial(costo, recibido, vuelto) {
    const venta = {
        costo: costo.toFixed(2),
        recibido: recibido.toFixed(2),
        vuelto: vuelto.toFixed(2)
    };
    historialVentas.push(venta);
    actualizarHistorial();
}

function actualizarHistorial() {
    const historialContent = document.getElementById("historialContent");
    historialContent.innerHTML = "";

    historialVentas.forEach((venta, index) => {
        const ventaDiv = document.createElement("div");
        ventaDiv.textContent = `Venta ${index + 1}: Costo - $${venta.costo}, Recibido - $${venta.recibido}, Vuelto - $${venta.vuelto}`;
        historialContent.appendChild(ventaDiv);
    });

    document.getElementById("historialVentas").style.display = "block";
}

function toggleHistorial() {
    const historialContent = document.getElementById("historialContent");
    const toggleButton = document.getElementById("toggleHistorial");

    if (historialContent.style.display === "none") {
        historialContent.style.display = "block";
        toggleButton.textContent = "Minimizar";
    } else {
        historialContent.style.display = "none";
        toggleButton.textContent = "Expandir";
    }
}

function mostrarMensaje(mensaje, esError) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = mensaje;
    messageDiv.style.display = "block";
    messageDiv.style.backgroundColor = esError ? "#f8d7da" : "#d4edda";
    messageDiv.style.color = esError ? "#721c24" : "#155724";
    messageDiv.style.borderColor = esError ? "#f5c6cb" : "#c3e6cb";
}
