// Espera a que se cargue la página antes de inicializar la escena
window.addEventListener('load', initScene)

// Array de posiciones iniciales para los meteoritos
// Cada objeto contiene coordenadas x, y, z para posicionar los meteoritos en el espacio 3D
const meteors = [
    { x: 0, y: 0, z: -30 },    // Frente
    { x: 0, y: 0, z: 30 },     // Atrás
    { x: 30, y: 0, z: 0 },     // Derecha
    { x: -30, y: 0, z: 0 },    // Izquierda
    { x: 20, y: 0, z: 20 },    // Diagonal derecha atrás
    { x: 20, y: 0, z: -20 },   // Diagonal derecha frente
    { x: -20, y: 0, z: -20 },  // Diagonal izquierda frente
    { x: -20, y: 0, z: 20 }    // Diagonal izquierda atrás
]

// Variables globales
let meteor        // Variable para crear meteoritos
let score = 0     // Contador de puntuación inicial

// Función principal para inicializar la escena
function initScene() {
    // Obtiene todas las órbitas del documento
    let orbits = document.querySelectorAll('.orbit')

    // Para cada órbita encontrada...
    orbits.forEach(orbit => {
        // Para cada posición definida en el array meteors...
        meteors.forEach(pos => {
            // Crea un nuevo meteorito
            meteor = document.createElement('a-entity')

            // Configura la geometría del meteorito
            // Usa una esfera con radio aleatorio entre 0.5 y 3.5
            meteor.setAttribute('geometry', { 
                primitive: 'sphere', 
                radius: Math.random() * 3 + 0.5 
            })

            // Establece el material del meteorito
            // Usa la textura precargada y shader plano
            meteor.setAttribute('material', { 
                shader: 'flat', 
                src: '#meteor' 
            })

            // Añade la clase 'meteor' para que sea detectado por el raycaster
            meteor.setAttribute('class', 'meteor')

            // Posiciona el meteorito según las coordenadas definidas
            meteor.object3D.position.set(pos.x, pos.y, pos.z)

            // Añade el componente 'shootable' para hacerlo interactivo
            meteor.setAttribute('shootable', '')

            // Añade el meteorito a la órbita actual
            orbit.appendChild(meteor)
        })
    })
}

// Registra un nuevo componente personalizado en A-Frame llamado 'shootable'
AFRAME.registerComponent('shootable', {
    // Método de inicialización del componente
    init: function () {
        // Añade un event listener para el evento 'click'
        this.el.addEventListener('click', () => {
            // Elimina el meteorito cuando es clickeado
            this.el.parentNode.removeChild(this.el)
            
            // Incrementa y actualiza el contador de puntuación
            document.querySelector('[text]').setAttribute('value', 
                `${++score} meteoritos cazados`)
        })
    }
})