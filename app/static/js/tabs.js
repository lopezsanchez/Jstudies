function limpiarFormulario() {
    document.getElementById("add-form").reset();
}

function mostrarConteo(total) {
    alert("Tienes " + total + " verbos para aprender 📚");
}

function corregir() {
    const respuestas = document.querySelectorAll(".respuesta");
    let aciertos = 0;

    // Recorremos todas las respuestas para corregirlas
    respuestas.forEach(input => {
        const correcto = input.dataset.correcto.trim();
        const valor = input.value.trim();

        const fila = input.closest("tr");
        const celdaResultado = fila.querySelector(".resultado");

        // No se rompe el examen aunque no exista celdaResultado
        if (!celdaResultado){
            console.error("Falta la celda .resultado en la fila: ", fila);
            return;
        }

        input.disabled = true;

        // Se definen los iconos que van a mostrarse para cada
        // respuesta correcta o incorrecta
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

        // Animación de los emojis
        celdaResultado.classList.remove("pop");
        void celdaResultado.offsetWidth;
        celdaResultado.classList.add("pop");
    });

    // Se muestra la puntuación obtenida tras calcular la media
    const total = respuestas.length;
    const nota = Math.round((aciertos / total ) * 100);

    const box = document.getElementById("puntuacion");
    box.style.display = "block";
    box.innerHTML = `Has obtenido una puntuación de <strong>${nota}%</strong>`;
    
    // Lanzamos confetti tras terminar el examen
    requestAnimationFrame(() => {
        setTimeout(() => {
            lanzarConfetti();
        }, 100);
    });
}
