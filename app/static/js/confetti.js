// Script para generar confetti en la página
// Créditos: OneReplay Team, Oct 21, 2025 
// https://blog.openreplay.com/es/agregar-efectos-confeti-javascript/

const canvas = document.getElementById('confetti-canvas')
const contexto = canvas.getContext('2d')
const particulas = []

// Adaptar el tamaño del canvas a la ventana
canvas.width = window.innerWidth
canvas.height = window.innerHeight



// Crear partículas de propiedades aleatorias
function crearParticula() {
    return {
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        size: Math.random() * 3 + 2
    }
}

// Bucle de animación
function animar() {
    contexto.clearRect(0, 0, canvas.width, canvas.height)

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

            
    if (particulas.length > 0 ){
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

    // Capturar las preferencias de usuario relativas al movimiento
    const preferenciasReduccionMovimiento = window.matchMedia('(prefers-reduce-motion: reduce)').matches

    if(!preferenciasReduccionMovimiento){    

        for (let i = 0; i < 100; i++){
            particulas.push(crearParticula())
        }

        animar()
        recogerConfetti()
    } else {
        // Si las preferencias de usuario limitan el movimiento,
        // no se activa el confetti
        showSuccessMessage('¡Enhorabuena! ¡Has completado el examen!')
    }
}
