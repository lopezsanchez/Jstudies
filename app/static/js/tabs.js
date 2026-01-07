function limpiarFormulario() {
    document.getElementById("add-form").reset();
}

function mostrarConteo(total) {
    alert("Tienes " + total + " verbos para aprender 📚");
}

function corregir() {
    const respuestas = document.querySelectorAll(".respuesta");
    let aciertos = 0;

    respuestas.forEach(input => {
        const correcto = input.dataset.correcto.trim();
        const valor = input.value.trim();

        const fila = input.closest("tr");
        const celdaResultado = fila.querySelector(".resultado");

        // no se rompe el examen aunque no exista celdaResultado
        if (!celdaResultado){
            console.error("Falta la celda .resultado en la fila: ", fila);
            return;
        }

        input.disabled = true;

        if (valor.toLowerCase() === correcto.toLowerCase() ){
            aciertos++;
            input.value = correcto;
            input.classList.add("correcta");
            celdaResultado.innerHTML = "🟢🎉😄";
        } else {
            input.value = correcto;
            input.classList.add("incorrecta");
            celdaResultado.innerHTML = "❌😬💥";
        }

        // animación
        celdaResultado.classList.remove("pop");
        void celdaResultado.offsetWidth;
        celdaResultado.classList.add("pop");
    });

    const total = respuestas.length;
    const nota = Math.round((aciertos / total ) * 100);

    const box = document.getElementById("puntuacion");
    box.style.display = "block";
    box.innerHTML = `Has obtenido una puntuación de <strong>${nota}%</strong>`;
}
