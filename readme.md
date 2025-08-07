# Centro de Juegos Educativos - UNPAZ

## Visión General

Este proyecto es un centro de juegos educativos web que incluye tres propuestas interactivas: **Trivia Deportiva**, **Ruleta Nutricional** y **Quiz de Educación Física**. Está diseñado para promover el aprendizaje significativo y competitivo entre dos equipos o jugadores. 

La aplicación funciona completamente en el navegador como una *single-page application* (SPA) utilizando únicamente **HTML5**, **CSS3** y **JavaScript puro**, sin dependencias externas, lo que permite su uso incluso sin conexión.

---

## Características Principales

- Aplicación web responsiva y liviana
- Tres juegos educativos integrados:
  - **Trivia Deportiva** (estilo Jeopardy)
  - **Ruleta Nutricional** (ruleta giratoria con preguntas)
  - **Quiz de Educación Física** (opciones múltiples)
- Interfaz dinámica con cambio de pantallas mediante clases CSS
- Juego por turnos con control de puntajes
- Marcador visible en tiempo real
- Sin necesidad de servidor backend
- Funciona offline una vez cargada

---

## Estructura del Proyecto

/index.html # Pantalla principal con todos los juegos
/style.css # Estilos generales y específicos por juego
/script.js # Lógica de juegos y manejo del estado
/preguntas.json # Preguntas de la trivia deportiva
/preguntas-nutricionales.json # Preguntas para la ruleta nutricional
/preguntas-educacion-fisica.json # Preguntas del quiz de educación física
/README.md # Documentación general del proyecto

yaml
Copiar
Editar

---

## Requisitos del Sistema

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Soporte para ES6+ y CSS3 (flexbox, animaciones, etc.)
- No se requiere instalación ni conexión a internet permanente

---

## Juegos Incluidos

### 1. Trivia Deportiva

- Formato: tablero tipo Jeopardy
- Categorías: Deportes en equipo, Deportes individuales, Juegos Olímpicos, Equipamiento
- 4 categorías x 5 preguntas cada una (valores de 200 a 1000 pts)
- Juego por turnos
- Puntaje acumulativo

### 2. Ruleta Nutricional

- Formato: ruleta giratoria con 10 categorías
- 6 rondas totales (3 preguntas por jugador)
- 1 punto por respuesta correcta
- Categorías codificadas por color

### 3. Quiz de Educación Física

- Formato: preguntas de opción múltiple (A, B, C, D)
- Temáticas: salud, historia del deporte, reglas deportivas
- 3 preguntas por jugador
- Nivel: universitario/profesional

---

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilizado responsivo y animaciones
- **JavaScript ES6**: Lógica del juego y manipulación del DOM
- **JSON local**: Almacenamiento de preguntas por tipo de juego

---

## Implementación y Uso

1. Descargar o clonar el repositorio
2. Abrir `index.html` en un navegador moderno
3. No requiere servidor ni conexión externa
4. Puede utilizarse offline tras su primera carga

---

## Cambios Recientes (Agosto 2025)

- Agregado selector de tipo de juego
- Implementación de la Ruleta Nutricional
- Creación del Quiz de Educación Física con sistema de respuestas múltiples
- Mejora visual por juego
- Separación modular del estado por tipo de juego

---

## Créditos

**Desarrollado por:** Leandro Guerschberg  
**Institución:** Universidad Nacional de José C. Paz (UNPAZ)  
**Año:** 2025
