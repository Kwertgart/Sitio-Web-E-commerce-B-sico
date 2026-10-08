document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Contador ficticio del carrito (menú) ---------- */
  var contador = document.getElementById("contador-carrito");
  var total = 0;

  /* ---------- REGISTRO ---------- */
  var formRegistro = document.getElementById("form-registro");
  if (formRegistro) {
    var checkTerminos = document.getElementById("terminos");
    var btnRegistro = document.getElementById("btn-registro");
    var msgRegistro = document.getElementById("mensaje-registro");

    // El botón permanece deshabilitado hasta marcar el checkbox
    checkTerminos.addEventListener("change", function () {
      btnRegistro.disabled = !checkTerminos.checked;
    });

    formRegistro.addEventListener("submit", function (e) {
      e.preventDefault();
      var campos = ["nombre", "email", "password", "fecha", "telefono"];
      var vacios = campos.filter(function (id) {
        return document.getElementById(id).value.trim() === "";
      });

      if (vacios.length > 0) {
        msgRegistro.textContent = "Por favor completa todos los campos.";
        msgRegistro.className = "mensaje error";
        return;
      }

      // Validación HTML5 (patrones) sin usar "required"
      if (!formRegistro.checkValidity()) {
        msgRegistro.textContent = "Revisa que el correo, la contraseña y el teléfono tengan el formato correcto.";
        msgRegistro.className = "mensaje error";
        return;
      }

      msgRegistro.textContent = "¡Registro exitoso! Bienvenido, " + document.getElementById("nombre").value.trim() + ".";
      msgRegistro.className = "mensaje ok";
      formRegistro.reset();
      btnRegistro.disabled = true;
    });
  }

  /* ---------- QUIÉNES SOMOS ---------- */
  var btnVerMas = document.getElementById("btn-ver-mas");
  if (btnVerMas) {
    var info = document.getElementById("info-adicional");
    btnVerMas.addEventListener("click", function () {
      var oculto = info.classList.toggle("oculto");
      btnVerMas.textContent = oculto ? "Ver más" : "Ver menos";
    });
  }

  /* ---------- CATÁLOGO ---------- */
  var botonesAgregar = document.querySelectorAll(".btn-agregar");
  if (botonesAgregar.length > 0) {
    var msgCarrito = document.getElementById("mensaje-carrito");
    botonesAgregar.forEach(function (btn) {
      btn.addEventListener("click", function () {
        total++;
        contador.textContent = total;
        msgCarrito.textContent = "✔ \"" + btn.dataset.nombre + "\" se agregó al carrito.";
        msgCarrito.className = "mensaje ok";
      });
    });
  }

  /* ---------- CARRITO ---------- */
  var inputsCantidad = document.querySelectorAll(".cantidad");
  if (inputsCantidad.length > 0) {
    var formato = function (n) {
      return "$" + n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    var recalcular = function () {
      var suma = 0;
      inputsCantidad.forEach(function (input) {
        var fila = input.closest("tr");
        var precio = Number(fila.querySelector(".precio-unit").dataset.precio);
        var cantidad = parseInt(input.value, 10) || 0;
        var subtotal = precio * cantidad;
        fila.querySelector(".subtotal").textContent = formato(subtotal);
        suma += subtotal;
      });
      document.getElementById("total").textContent = formato(suma);
    };

    inputsCantidad.forEach(function (input) {
      input.addEventListener("input", function () {
        input.value = input.value.replace(/\D/g, ""); // solo números
        recalcular();
      });
    });
    recalcular();
  }

  /* ---------- BÚSQUEDA ---------- */
  var formBusqueda = document.getElementById("form-busqueda");
  if (formBusqueda) {
    formBusqueda.addEventListener("submit", function (e) {
      e.preventDefault();
      var texto = document.getElementById("texto-busqueda").value.trim();
      var cont = document.getElementById("resultados");
      if (texto === "") {
        cont.innerHTML = "<p class='mensaje error'>Escribe algo para buscar.</p>";
        return;
      }
      var seguro = document.createElement("span");
      seguro.textContent = texto; // evita inyectar HTML
      cont.innerHTML =
        "<p class='mensaje'>Resultados para la búsqueda de " + seguro.innerHTML + "</p>" +
        "<ul>" +
        "<li>👕 Camisa casual - $299.00</li>" +
        "<li>👟 Tenis deportivos - $899.00</li>" +
        "<li>🎒 Mochila escolar - $450.00</li>" +
        "<li>🧢 Gorra urbana - $150.00</li>" +
        "</ul>";
    });
  }
});
