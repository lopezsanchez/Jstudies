// Script para generar confetti en la página
// Créditos: OneReplay Team, Oct 21, 2025 
// https://blog.openreplay.com/es/agregar-efectos-confeti-javascript/

let canvas, contexto;
let particulas = [];
let confettiActivo = false;

// Encapsulamos la inicialización 
function initConfetti() {
    canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
        console.warn("Canvas de confetti no encontrado");
        return false;
    }

    contexto = canvas.getContext('2d');

    // Adaptar el tamaño del canvas a la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return true;
}

// Crear partículas de propiedades aleatorias
function crearParticula(inicial = false) {
    return {
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        size: Math.random() * 6 + 6
    }
}

// Bucle de animación
function animar() {
    contexto.clearRect(0, 0, canvas.width, canvas.height)

    // Lluvia continua de partículas
    if (confettiActivo && particulas.length < 300 ) { 
        particulas.push(crearParticula());
    }

    particulas.forEach((p, index) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // gravedad

        contexto.fillStyle = p.color
        contexto.fillRect(p.x, p.y, p.size, p.size)

        // Eliminar partículas fuera de pantalla
        if (p.y > canvas.height){
            particulas.slice(index, 1)
        }
    })

            
    if (confettiActivo || particulas.length > 0 ){
        requestAnimationFrame(animar)
    }
}

// Limpiar el canvas tras la celebración
function recogerConfetti() {
    // Se esperan 5 segundos (5000 miliseg) para limpiar
    setTimeout (() => {
        particulas.length = 0
        contexto.clearRect(0, 0, canvas.width, canvas.height)
    }, 5000 );
}

// Lanzamiento de confetti
function lanzarConfetti() {
    if(!canvas) {
        const ok = initConfetti();
        if (!ok) return;
    }

    // Capturar las preferencias de usuario relativas al movimiento
    const preferenciasReduccionMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if(preferenciasReduccionMovimiento) {
        // Si las preferencias de usuario limitan el movimiento,
        // no se activa el confetti
        showSuccessMessage('¡Enhorabuena! ¡Has completado el examen!')
        return;
    }

    confettiActivo = true;
    
    for (let i = 0; i < 150; i++){
        particulas.push(crearParticula(true));
    }

    animar()
    recogerConfetti()
}
