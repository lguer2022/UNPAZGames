// Estado del juego
let gameState = {
    teams: {
        team1: { name: '', score: 0 },
        team2: { name: '', score: 0 }
    },
    currentTeam: 1,
    questionsAnswered: 0,
    totalQuestions: 20
};

// Variables globales para preguntas
let allQuestions = [];
let gameQuestions = {};
let categoryNames = [];
let currentQuestionData = null;
let selectedGame = 'trivia-deportiva';

// Variables específicas para ruleta nutricional
let nutritionQuestions = [];
let nutritionCategoryNames = [];
let rouletteGameState = {
    teams: {
        team1: { name: '', score: 0 },
        team2: { name: '', score: 0 }
    },
    currentTeam: 1,
    currentRound: 1,
    totalRounds: 6,
    isSpinning: false
};

// Variables específicas para quiz de educación física
let quizQuestions = [];
let quizCategoryNames = [];
let selectedQuizCategory = 0;
let quizGameState = {
    teams: {
        team1: { name: '', score: 0 },
        team2: { name: '', score: 0 }
    },
    currentTeam: 1,
    currentQuestion: 1,
    totalQuestions: 6,
    categoryQuestions: [],
    selectedAnswer: null
};

// Elementos del DOM
const screens = {
    initial: document.getElementById('initial-screen'),
    game: document.getElementById('game-screen'),
    roulette: document.getElementById('roulette-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('results-screen')
};

const elements = {
    gameSelection: document.getElementById('game-selection'),
    teamInputs: document.getElementById('team-inputs'),
    continueBtn: document.getElementById('continue-setup'),
    team1Input: document.getElementById('team1-name'),
    team2Input: document.getElementById('team2-name'),
    startBtn: document.getElementById('start-game'),
    team1Display: document.getElementById('team1-display'),
    team2Display: document.getElementById('team2-display'),
    team1Score: document.getElementById('team1-score'),
    team2Score: document.getElementById('team2-score'),
    currentTurn: document.getElementById('current-turn'),
    questionModal: document.getElementById('question-modal'),
    questionCategory: document.getElementById('question-category'),
    questionValue: document.getElementById('question-value'),
    questionText: document.getElementById('question-text'),
    answerInput: document.getElementById('answer-input'),
    checkAnswerBtn: document.getElementById('check-answer-btn'),
    correctBtn: document.getElementById('correct-btn'),
    incorrectBtn: document.getElementById('incorrect-btn'),
    endGameBtn: document.getElementById('end-game-btn'),
    // Elementos específicos de la ruleta
    rouletteWheel: document.getElementById('roulette-wheel'),
    spinRouletteBtn: document.getElementById('spin-roulette-btn'),
    rouletteTeam1Display: document.getElementById('roulette-team1-display'),
    rouletteTeam2Display: document.getElementById('roulette-team2-display'),
    rouletteTeam1Score: document.getElementById('roulette-team1-score'),
    rouletteTeam2Score: document.getElementById('roulette-team2-score'),
    rouletteCurrentTurn: document.getElementById('roulette-current-turn'),
    roundCounter: document.getElementById('round-counter'),
    endRouletteBtn: document.getElementById('end-roulette-btn'),
    nutritionQuestionModal: document.getElementById('nutrition-question-modal'),
    nutritionQuestionCategory: document.getElementById('nutrition-question-category'),
    nutritionRoundInfo: document.getElementById('nutrition-round-info'),
    nutritionQuestionText: document.getElementById('nutrition-question-text'),
    nutritionAnswerInput: document.getElementById('nutrition-answer-input'),
    nutritionCheckAnswerBtn: document.getElementById('nutrition-check-answer-btn'),
    nutritionCorrectBtn: document.getElementById('nutrition-correct-btn'),
    nutritionIncorrectBtn: document.getElementById('nutrition-incorrect-btn'),
    finalTeam1Name: document.getElementById('final-team1-name'),
    finalTeam2Name: document.getElementById('final-team2-name'),
    finalTeam1Score: document.getElementById('final-team1-score'),
    finalTeam2Score: document.getElementById('final-team2-score'),
    winnerText: document.getElementById('winner-text'),
    playAgainBtn: document.getElementById('play-again'),
    // Elementos específicos del quiz
    quizTeam1Display: document.getElementById('quiz-team1-display'),
    quizTeam2Display: document.getElementById('quiz-team2-display'),
    quizTeam1Score: document.getElementById('quiz-team1-score'),
    quizTeam2Score: document.getElementById('quiz-team2-score'),
    quizCurrentTurn: document.getElementById('quiz-current-turn'),
    quizRoundCounter: document.getElementById('quiz-round-counter'),
    endQuizBtn: document.getElementById('end-quiz-btn'),
    quizSelectedCategory: document.getElementById('quiz-selected-category'),
    nextQuizQuestionBtn: document.getElementById('next-quiz-question-btn'),
    quizQuestionModal: document.getElementById('quiz-question-modal'),
    quizQuestionCategory: document.getElementById('quiz-question-category'),
    quizQuestionInfo: document.getElementById('quiz-question-info'),
    quizQuestionText: document.getElementById('quiz-question-text'),
    optionA: document.getElementById('option-A'),
    optionB: document.getElementById('option-B'),
    optionC: document.getElementById('option-C'),
    optionD: document.getElementById('option-D')
};

// Inicialización del juego
document.addEventListener('DOMContentLoaded', function() {
    // Cargar preguntas de trivia deportiva por defecto
    loadQuestions().then(() => {
        initializeEventListeners();
        checkStartButtonState();
    });
});

// Cargar preguntas del archivo JSON
async function loadQuestions() {
    try {
        if (selectedGame === 'trivia-deportiva') {
            const response = await fetch('preguntas.json');
            const data = await response.json();
            allQuestions = data.categorias;
            categoryNames = allQuestions.map(cat => cat.nombre);
            console.log('✅ Preguntas cargadas correctamente');
        } else if (selectedGame === 'ruleta-nutricional') {
            const response = await fetch('preguntas-nutricionales.json');
            const data = await response.json();
            nutritionQuestions = data.categorias;
            nutritionCategoryNames = nutritionQuestions.map(cat => cat.nombre);
            console.log('✅ Preguntas nutricionales cargadas correctamente');
        } else if (selectedGame === 'quiz-educacion-fisica') {
            const response = await fetch('preguntas-educacion-fisica.json');
            const data = await response.json();
            quizQuestions = data.categorias;
            quizCategoryNames = quizQuestions.map(cat => cat.nombre);
            console.log('✅ Preguntas de educación física cargadas correctamente');
        } else {
            // Para otros juegos, mostrar mensaje de "próximamente"
            console.log('🚧 Juego en desarrollo');
        }
    } catch (error) {
        console.error('❌ Error cargando preguntas:', error);
        alert('Error cargando las preguntas. Por favor, recarga la página.');
    }
}

// Seleccionar 5 preguntas aleatorias por categoría
function selectRandomQuestions() {
    gameQuestions = {};
    const pointValues = [200, 400, 600, 800, 1000];
    
    allQuestions.forEach((categoria, categoryIndex) => {
        gameQuestions[categoryIndex] = {};
        const availableQuestions = [...categoria.preguntas];
        
        pointValues.forEach(points => {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            const selectedQuestion = availableQuestions.splice(randomIndex, 1)[0];
            gameQuestions[categoryIndex][points] = selectedQuestion;
        });
    });
    
    console.log('🎲 Preguntas aleatorias seleccionadas');
}

// Configurar event listeners
function initializeEventListeners() {
    // Botones de selección de juego
    document.querySelectorAll('.game-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectGame(this.dataset.game);
        });
    });
    
    // Botón continuar
    elements.continueBtn.addEventListener('click', showTeamInputs);
    
    // Botón de inicio
    elements.startBtn.addEventListener('click', startGame);
    
    // Inputs de nombres de equipos
    elements.team1Input.addEventListener('input', checkStartButtonState);
    elements.team2Input.addEventListener('input', checkStartButtonState);
    
    // Tecla Enter en inputs
    elements.team1Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') elements.team2Input.focus();
    });
    
    elements.team2Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && elements.startBtn.disabled === false) startGame();
    });
    
    // Input de respuesta - Enter para verificar
    elements.answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') elements.checkAnswerBtn.click();
    });
    
    // Celdas de preguntas
    document.querySelectorAll('.question-cell').forEach(cell => {
        cell.addEventListener('click', function() {
            if (!this.classList.contains('answered')) {
                showQuestion(this);
            }
        });
    });
    
    // Botones de respuesta
    elements.checkAnswerBtn.addEventListener('click', checkUserAnswer);
    elements.correctBtn.addEventListener('click', () => handleAnswer(true));
    elements.incorrectBtn.addEventListener('click', () => handleAnswer(false));
    
    // Botón terminar juego
    elements.endGameBtn.addEventListener('click', endGameEarly);
    
    // Botón jugar de nuevo
    elements.playAgainBtn.addEventListener('click', resetGame);
    
    // Event listeners para ruleta nutricional
    if (elements.spinRouletteBtn) {
        elements.spinRouletteBtn.addEventListener('click', spinRoulette);
    }
    if (elements.endRouletteBtn) {
        elements.endRouletteBtn.addEventListener('click', endRouletteGameEarly);
    }
    if (elements.nutritionAnswerInput) {
        elements.nutritionAnswerInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') elements.nutritionCheckAnswerBtn.click();
        });
    }
    if (elements.nutritionCheckAnswerBtn) {
        elements.nutritionCheckAnswerBtn.addEventListener('click', checkNutritionAnswer);
    }
    if (elements.nutritionCorrectBtn) {
        elements.nutritionCorrectBtn.addEventListener('click', () => handleNutritionAnswer(true));
    }
    if (elements.nutritionIncorrectBtn) {
        elements.nutritionIncorrectBtn.addEventListener('click', () => handleNutritionAnswer(false));
    }
    
    // Event listeners para quiz de educación física
    if (elements.nextQuizQuestionBtn) {
        elements.nextQuizQuestionBtn.addEventListener('click', showQuizQuestion);
    }
    if (elements.endQuizBtn) {
        elements.endQuizBtn.addEventListener('click', endQuizGameEarly);
    }
    
    // Event listeners para opciones del quiz
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            selectQuizOption(this.dataset.option);
        });
    });
    
    // Cerrar modal al hacer clic fuera
    elements.questionModal.addEventListener('click', function(e) {
        if (e.target === this) {
            hideQuestion();
        }
    });
    
    // Cerrar modal nutricional al hacer clic fuera
    if (elements.nutritionQuestionModal) {
        elements.nutritionQuestionModal.addEventListener('click', function(e) {
            if (e.target === this) {
                // No permitir cerrar durante el juego
            }
        });
    }
}

// Verificar si se pueden habilitar botones
function checkStartButtonState() {
    const team1Name = elements.team1Input.value.trim();
    const team2Name = elements.team2Input.value.trim();
    
    const canStart = team1Name && team2Name;
    elements.startBtn.disabled = !canStart;
    elements.startBtn.style.display = canStart ? 'block' : 'none';
}

// Iniciar el juego
function startGame() {
    const team1Name = elements.team1Input.value.trim();
    const team2Name = elements.team2Input.value.trim();
    
    if (!team1Name || !team2Name) {
        alert('Por favor, ingresa los nombres de ambos equipos.');
        return;
    }
    
    if (!validateTeamNames(team1Name, team2Name)) {
        return;
    }
    
    if (selectedGame === 'trivia-deportiva') {
        // Seleccionar preguntas aleatorias
        selectRandomQuestions();
        
        // Guardar nombres de equipos
        gameState.teams.team1.name = team1Name;
        gameState.teams.team2.name = team2Name;
        
        // Actualizar displays
        elements.team1Display.textContent = team1Name;
        elements.team2Display.textContent = team2Name;
        updateTurnDisplay();
        
        // Cambiar a pantalla de juego
        showScreen('game');
    } else if (selectedGame === 'ruleta-nutricional') {
        // Configurar juego de ruleta
        startRouletteGame(team1Name, team2Name);
    } else if (selectedGame === 'quiz-educacion-fisica') {
        // Configurar quiz de educación física
        startQuizGame(team1Name, team2Name);
    }
}

// Mostrar pantalla específica
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Actualizar indicador de turno
function updateTurnDisplay() {
    const currentTeamName = gameState.teams[`team${gameState.currentTeam}`].name;
    elements.currentTurn.textContent = `Turno de: ${currentTeamName}`;
}

// Mostrar pregunta
function showQuestion(cell) {
    const category = parseInt(cell.dataset.category);
    const value = parseInt(cell.dataset.value);
    
    // Obtener datos de la pregunta
    const questionData = gameQuestions[category][value];
    currentQuestionData = questionData;
    
    // Configurar modal
    elements.questionCategory.textContent = categoryNames[category];
    elements.questionValue.textContent = `por ${value} puntos`;
    elements.questionText.textContent = questionData.pregunta;
    
    // Limpiar input de respuesta
    elements.answerInput.value = '';
    elements.answerInput.focus();
    
    // Guardar datos de la pregunta actual
    elements.questionModal.dataset.category = category;
    elements.questionModal.dataset.value = value;
    elements.questionModal.dataset.cellElement = Array.from(document.querySelectorAll('.question-cell')).indexOf(cell);
    
    // Mostrar modal
    elements.questionModal.classList.add('show');
}

// Ocultar pregunta
function hideQuestion() {
    elements.questionModal.classList.remove('show');
}

// Manejar respuesta
function handleAnswer(isCorrect) {
    const value = parseInt(elements.questionModal.dataset.value);
    const cellIndex = parseInt(elements.questionModal.dataset.cellElement);
    const cell = document.querySelectorAll('.question-cell')[cellIndex];
    
    // Marcar celda como respondida
    cell.classList.add('answered');
    cell.textContent = '✓';
    
    // Actualizar puntuación si es correcto
    if (isCorrect) {
        gameState.teams[`team${gameState.currentTeam}`].score += value;
        updateScoreDisplay();
        
        // Animación de puntuación
        animateScoreUpdate(gameState.currentTeam);
    }
    
    // Incrementar contador de preguntas respondidas
    gameState.questionsAnswered++;
    
    // Cambiar turno
    gameState.currentTeam = gameState.currentTeam === 1 ? 2 : 1;
    updateTurnDisplay();
    
    // Ocultar modal
    hideQuestion();
    
    // Verificar si el juego ha terminado
    if (gameState.questionsAnswered >= gameState.totalQuestions) {
        setTimeout(() => showResults(), 1000);
    }
}

// Actualizar display de puntuaciones
function updateScoreDisplay() {
    elements.team1Score.textContent = gameState.teams.team1.score;
    elements.team2Score.textContent = gameState.teams.team2.score;
}

// Animación de actualización de puntuación
function animateScoreUpdate(teamNumber) {
    const scoreElement = document.getElementById(`team${teamNumber}-score`);
    scoreElement.style.transform = 'scale(1.3)';
    scoreElement.style.color = '#00ff00';
    
    setTimeout(() => {
        scoreElement.style.transform = 'scale(1)';
        scoreElement.style.color = '#ffd700';
    }, 500);
}

// Mostrar resultados finales
function showResults() {
    let team1Score, team2Score, team1Name, team2Name;
    
    if (selectedGame === 'quiz-educacion-fisica') {
        team1Score = quizGameState.teams.team1.score;
        team2Score = quizGameState.teams.team2.score;
        team1Name = quizGameState.teams.team1.name;
        team2Name = quizGameState.teams.team2.name;
    } else if (selectedGame === 'ruleta-nutricional') {
        team1Score = rouletteGameState.teams.team1.score;
        team2Score = rouletteGameState.teams.team2.score;
        team1Name = rouletteGameState.teams.team1.name;
        team2Name = rouletteGameState.teams.team2.name;
    } else {
        team1Score = gameState.teams.team1.score;
        team2Score = gameState.teams.team2.score;
        team1Name = gameState.teams.team1.name;
        team2Name = gameState.teams.team2.name;
    }
    
    // Actualizar nombres y puntuaciones finales
    elements.finalTeam1Name.textContent = team1Name;
    elements.finalTeam2Name.textContent = team2Name;
    elements.finalTeam1Score.textContent = `${team1Score} puntos`;
    elements.finalTeam2Score.textContent = `${team2Score} puntos`;
    
    // Determinar ganador
    let winnerMessage = '';
    if (team1Score > team2Score) {
        winnerMessage = `🎊 ¡${team1Name} GANA! 🎊`;
    } else if (team2Score > team1Score) {
        winnerMessage = `🎊 ¡${team2Name} GANA! 🎊`;
    } else {
        winnerMessage = '🤝 ¡EMPATE! 🤝';
    }
    
    elements.winnerText.textContent = winnerMessage;
    
    // Mostrar pantalla de resultados
    showScreen('results');
}

// Verificar respuesta del usuario
function checkUserAnswer() {
    const userAnswer = elements.answerInput.value.trim().toLowerCase();
    const correctAnswer = currentQuestionData.respuesta.toLowerCase();
    
    if (userAnswer === '') {
        alert('Por favor, escribe una respuesta.');
        return;
    }
    
    // Verificar si la respuesta es correcta
    const isCorrect = userAnswer === correctAnswer || 
                     userAnswer.includes(correctAnswer) || 
                     correctAnswer.includes(userAnswer);
    
    if (isCorrect) {
        showAnswerFeedback(true, `¡Correcto! La respuesta es: ${currentQuestionData.respuesta}`);
        setTimeout(() => handleAnswer(true), 2000);
    } else {
        showAnswerFeedback(false, `Incorrecto. La respuesta correcta es: ${currentQuestionData.respuesta}`);
        setTimeout(() => handleAnswer(false), 3000);
    }
}

// Mostrar feedback de respuesta
function showAnswerFeedback(isCorrect, message) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `answer-feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`;
    feedbackDiv.textContent = message;
    
    // Insertar feedback en el modal
    const answerSection = document.querySelector('.answer-section');
    answerSection.insertBefore(feedbackDiv, answerSection.firstChild);
    
    // Remover después de mostrar
    setTimeout(() => {
        if (feedbackDiv.parentNode) {
            feedbackDiv.remove();
        }
    }, isCorrect ? 1900 : 2900);
}

// Terminar juego anticipadamente
function endGameEarly() {
    if (confirm('¿Estás seguro de que quieres terminar el juego? Se declarará ganador al equipo con más puntos.')) {
        showResults();
    }
}

// Validar nombres de equipos
function validateTeamNames(name1, name2) {
    if (name1.toLowerCase() === name2.toLowerCase()) {
        alert('Los nombres de los equipos deben ser diferentes.');
        return false;
    }
    return true;
}

// Seleccionar juego
function selectGame(gameType) {
    selectedGame = gameType;
    
    // Actualizar estilos de botones
    document.querySelectorAll('.game-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`[data-game="${gameType}"]`).classList.add('selected');
    
    // Cargar preguntas del juego seleccionado
    if (gameType === 'ruleta-nutricional' || gameType === 'quiz-educacion-fisica') {
        loadQuestions();
    }
    
    // Mostrar botón continuar
    elements.continueBtn.style.display = 'block';
    
    console.log(`🎮 Juego seleccionado: ${gameType}`);
}

// Mostrar inputs de equipos
function showTeamInputs() {
    if (selectedGame !== 'trivia-deportiva' && selectedGame !== 'ruleta-nutricional' && selectedGame !== 'quiz-educacion-fisica') {
        alert('¡Este juego estará disponible próximamente!');
        return;
    }
    
    elements.gameSelection.style.display = 'none';
    elements.continueBtn.style.display = 'none';
    elements.teamInputs.style.display = 'block';
    
    // Actualizar título según el juego
    if (selectedGame === 'trivia-deportiva') {
        document.querySelector('.title').innerHTML = '🏆 TRIVIA DEPORTIVA 🏆';
        document.querySelector('.subtitle').textContent = 'Estilo Jeopardy';
    } else if (selectedGame === 'ruleta-nutricional') {
        document.querySelector('.title').innerHTML = '🥗 RULETA NUTRICIONAL 🥗';
        document.querySelector('.subtitle').textContent = '¡Gira y aprende sobre nutrición!';
    } else if (selectedGame === 'quiz-educacion-fisica') {
        document.querySelector('.title').innerHTML = '🏃‍♂️ QUIZ DE EDUCACIÓN FÍSICA 🏃‍♂️';
        document.querySelector('.subtitle').textContent = '¡Demuestra tus conocimientos!';
        showCategorySelection();
        return; // Salir aquí para mostrar selección de categoría
    }
    
    // Enfocar primer input
    setTimeout(() => {
        elements.team1Input.focus();
    }, 100);
}

// Reiniciar juego
function resetGame() {
    // Resetear estado del juego
    gameState = {
        teams: {
            team1: { name: '', score: 0 },
            team2: { name: '', score: 0 }
        },
        currentTeam: 1,
        questionsAnswered: 0,
        totalQuestions: 20
    };
    
    // Limpiar variables globales
    currentQuestionData = null;
    gameQuestions = {};
    selectedGame = 'trivia-deportiva';
    selectedQuizCategory = 0;
    
    // Resetear estado de ruleta
    rouletteGameState = {
        teams: {
            team1: { name: '', score: 0 },
            team2: { name: '', score: 0 }
        },
        currentTeam: 1,
        currentRound: 1,
        totalRounds: 6,
        isSpinning: false
    };
    
    // Resetear estado de quiz
    quizGameState = {
        teams: {
            team1: { name: '', score: 0 },
            team2: { name: '', score: 0 }
        },
        currentTeam: 1,
        currentQuestion: 1,
        totalQuestions: 6,
        categoryQuestions: [],
        selectedAnswer: null
    };
    
    // Limpiar inputs
    elements.team1Input.value = '';
    elements.team2Input.value = '';
    
    // Resetear todas las celdas de preguntas
    document.querySelectorAll('.question-cell').forEach((cell, index) => {
        cell.classList.remove('answered');
        const value = cell.dataset.value;
        cell.textContent = value;
    });
    
    // Resetear puntuaciones
    updateScoreDisplay();
    
    // Resetear interfaz inicial
    elements.gameSelection.style.display = 'block';
    elements.teamInputs.style.display = 'none';
    elements.continueBtn.style.display = 'none';
    elements.startBtn.style.display = 'none';
    
    // Resetear selección de juego
    document.querySelectorAll('.game-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector('[data-game="trivia-deportiva"]').classList.add('selected');
    
    // Restaurar título original
    document.querySelector('.title').innerHTML = '🎮 CENTRO DE JUEGOS 🎮';
    document.querySelector('.subtitle').textContent = 'Elige tu desafío favorito';
    
    // Verificar estado del botón de inicio
    checkStartButtonState();
    
    // Volver a pantalla inicial
    showScreen('initial');
}

// Función para manejar teclas de escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && elements.questionModal.classList.contains('show')) {
        hideQuestion();
    }
});

// Efectos visuales adicionales
function addVisualEffects() {
    // Efecto de partículas para celebración (simplificado)
    if (gameState.questionsAnswered >= gameState.totalQuestions) {
        document.body.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ffd700 50%, #4CAF50 100%)';
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
        }, 3000);
    }
}

// Inicializar tooltips para mejor UX
function initializeTooltips() {
    document.querySelectorAll('.question-cell').forEach(cell => {
        cell.title = 'Haz clic para seleccionar esta pregunta';
    });
    
    document.querySelectorAll('.question-cell.answered').forEach(cell => {
        cell.title = 'Esta pregunta ya fue respondida';
    });
}

// Auto-guardar progreso en localStorage (opcional para futuras mejoras)
function saveGameState() {
    localStorage.setItem('triviaDeportivaState', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('triviaDeportivaState');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

// ===== FUNCIONES DEL QUIZ DE EDUCACIÓN FÍSICA =====

// Mostrar selección de categoría
function showCategorySelection() {
    const categoryHtml = `
        <div class="quiz-category-selection" style="background: rgba(0, 0, 0, 0.3); padding: 30px; border-radius: 15px; margin: 20px auto; max-width: 600px; text-align: center; backdrop-filter: blur(10px); border: 2px solid #ffd700;">
            <h2 style="font-size: 1.8rem; color: #ffd700; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">Selecciona una categoría:</h2>
            <div style="display: flex; flex-direction: column; gap: 15px;">
                <button class="quiz-category-btn" data-category="0" style="background: linear-gradient(45deg, #4ECDC4, #44b3c2); color: white; border: none; padding: 15px 25px; font-size: 1.2rem; font-weight: bold; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
                    💪 Salud y Actividad Física
                </button>
                <button class="quiz-category-btn" data-category="1" style="background: linear-gradient(45deg, #FF6B6B, #e55555); color: white; border: none; padding: 15px 25px; font-size: 1.2rem; font-weight: bold; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
                    📋 Reglas del Deporte
                </button>
                <button class="quiz-category-btn" data-category="2" style="background: linear-gradient(45deg, #FFD700, #e6c200); color: #333; border: none; padding: 15px 25px; font-size: 1.2rem; font-weight: bold; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
                    📚 Historia del Deporte
                </button>
            </div>
        </div>
    `;
    
    const container = document.querySelector('#initial-screen .container');
    container.insertAdjacentHTML('beforeend', categoryHtml);
    
    // Event listeners para botones de categoría
    document.querySelectorAll('.quiz-category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectedQuizCategory = parseInt(this.dataset.category);
            document.querySelector('.quiz-category-selection').remove();
            elements.teamInputs.style.display = 'block';
            setTimeout(() => {
                elements.team1Input.focus();
            }, 100);
        });
        
        btn.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        });
        
        btn.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Iniciar juego de quiz
function startQuizGame(team1Name, team2Name) {
    // Configurar estado del juego
    quizGameState = {
        teams: {
            team1: { name: team1Name, score: 0 },
            team2: { name: team2Name, score: 0 }
        },
        currentTeam: 1,
        currentQuestion: 1,
        totalQuestions: 6,
        categoryQuestions: [],
        selectedAnswer: null
    };
    
    // Seleccionar preguntas aleatorias de la categoría elegida
    const categoryQuestions = [...quizQuestions[selectedQuizCategory].preguntas];
    const shuffled = categoryQuestions.sort(() => 0.5 - Math.random());
    quizGameState.categoryQuestions = shuffled.slice(0, 6);
    
    // Actualizar displays
    elements.quizTeam1Display.textContent = team1Name;
    elements.quizTeam2Display.textContent = team2Name;
    elements.quizSelectedCategory.textContent = `Categoría: ${quizCategoryNames[selectedQuizCategory]}`;
    updateQuizDisplay();
    
    // Cambiar a pantalla de quiz
    showScreen('quiz');
    
    console.log(`📚 Quiz de Educación Física iniciado - Categoría: ${quizCategoryNames[selectedQuizCategory]}`);
}

// Actualizar display del quiz
function updateQuizDisplay() {
    elements.quizTeam1Score.textContent = quizGameState.teams.team1.score;
    elements.quizTeam2Score.textContent = quizGameState.teams.team2.score;
    
    const currentTeamName = quizGameState.teams[`team${quizGameState.currentTeam}`].name;
    elements.quizCurrentTurn.textContent = `Turno de: ${currentTeamName}`;
    elements.quizRoundCounter.textContent = `Pregunta ${quizGameState.currentQuestion}/6`;
}

// Mostrar pregunta del quiz
function showQuizQuestion() {
    if (quizGameState.currentQuestion > quizGameState.totalQuestions) {
        showResults();
        return;
    }
    
    const currentQuestionData = quizGameState.categoryQuestions[quizGameState.currentQuestion - 1];
    
    // Configurar modal
    elements.quizQuestionCategory.textContent = quizCategoryNames[selectedQuizCategory];
    elements.quizQuestionInfo.textContent = `Pregunta ${quizGameState.currentQuestion}/6`;
    elements.quizQuestionText.textContent = currentQuestionData.pregunta;
    
    // Configurar opciones
    elements.optionA.querySelector('.option-text').textContent = currentQuestionData.opciones[0];
    elements.optionB.querySelector('.option-text').textContent = currentQuestionData.opciones[1];
    elements.optionC.querySelector('.option-text').textContent = currentQuestionData.opciones[2];
    elements.optionD.querySelector('.option-text').textContent = currentQuestionData.opciones[3];
    
    // Limpiar selecciones anteriores
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    quizGameState.selectedAnswer = null;
    
    // Mostrar modal
    elements.quizQuestionModal.classList.add('show');
    
    console.log(`❓ Pregunta ${quizGameState.currentQuestion}: ${currentQuestionData.pregunta}`);
}

// Seleccionar opción del quiz
function selectQuizOption(option) {
    if (quizGameState.selectedAnswer) return; // Ya respondió
    
    // Limpiar selecciones anteriores
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Marcar opción seleccionada
    document.getElementById(`option-${option}`).classList.add('selected');
    quizGameState.selectedAnswer = option;
    
    // Mostrar respuesta después de 1 segundo
    setTimeout(() => {
        showQuizAnswer(option);
    }, 1000);
}

// Mostrar respuesta del quiz
function showQuizAnswer(selectedOption) {
    const currentQuestionData = quizGameState.categoryQuestions[quizGameState.currentQuestion - 1];
    const correctAnswer = currentQuestionData.respuesta;
    
    // Marcar respuesta correcta
    document.getElementById(`option-${correctAnswer}`).classList.add('correct');
    
    // Si la respuesta seleccionada es incorrecta, marcarla
    if (selectedOption !== correctAnswer) {
        document.getElementById(`option-${selectedOption}`).classList.add('incorrect');
    } else {
        // Sumar punto si es correcto
        quizGameState.teams[`team${quizGameState.currentTeam}`].score++;
        updateQuizDisplay();
        animateScoreUpdate(quizGameState.currentTeam);
    }
    
    // Avanzar después de 3 segundos
    setTimeout(() => {
        nextQuizTurn();
    }, 3000);
}

// Siguiente turno del quiz
function nextQuizTurn() {
    elements.quizQuestionModal.classList.remove('show');
    
    // Cambiar turno
    quizGameState.currentTeam = quizGameState.currentTeam === 1 ? 2 : 1;
    quizGameState.currentQuestion++;
    
    updateQuizDisplay();
    
    // Verificar si el juego ha terminado
    if (quizGameState.currentQuestion > quizGameState.totalQuestions) {
        setTimeout(() => showResults(), 1000);
    }
}

// Terminar quiz anticipadamente
function endQuizGameEarly() {
    if (confirm('¿Estás seguro de que quieres terminar el quiz? Se declarará ganador al jugador con más puntos.')) {
        showResults();
    }
}


// ===== FUNCIONES DE LA RULETA NUTRICIONAL =====

// Iniciar juego de ruleta nutricional
function startRouletteGame(team1Name, team2Name) {
    // Configurar estado del juego de ruleta
    rouletteGameState = {
        teams: {
            team1: { name: team1Name, score: 0 },
            team2: { name: team2Name, score: 0 }
        },
        currentTeam: 1,
        currentRound: 1,
        totalRounds: 6,
        isSpinning: false
    };
    
    // Actualizar displays
    elements.rouletteTeam1Display.textContent = team1Name;
    elements.rouletteTeam2Display.textContent = team2Name;
    updateRouletteDisplay();
    
    // Cambiar a pantalla de ruleta
    showScreen('roulette');
    
    console.log('🎯 Ruleta Nutricional iniciada');
}

// Actualizar display de la ruleta
function updateRouletteDisplay() {
    elements.rouletteTeam1Score.textContent = rouletteGameState.teams.team1.score;
    elements.rouletteTeam2Score.textContent = rouletteGameState.teams.team2.score;
    
    const currentTeamName = rouletteGameState.teams[`team${rouletteGameState.currentTeam}`].name;
    elements.rouletteCurrentTurn.textContent = `Turno de: ${currentTeamName}`;
    
    elements.roundCounter.textContent = `Ronda ${rouletteGameState.currentRound}/${rouletteGameState.totalRounds}`;
}

// Girar la ruleta
function spinRoulette() {
    if (rouletteGameState.isSpinning) return;
    
    rouletteGameState.isSpinning = true;
    elements.spinRouletteBtn.disabled = true;
    elements.spinRouletteBtn.textContent = 'Girando...';
    
    // Generar rotación aleatoria (mínimo 3 vueltas completas + ángulo aleatorio)
    const minRotation = 1080; // 3 vueltas completas
    const randomRotation = Math.random() * 360;
    const totalRotation = minRotation + randomRotation;
    
    // Aplicar la rotación
    elements.rouletteWheel.style.setProperty('--spin-rotation', `${totalRotation}deg`);
    elements.rouletteWheel.classList.add('spinning');
    
    // Calcular la categoría seleccionada
    const normalizedRotation = totalRotation % 360;
    const segmentAngle = 36; // 360/10 segmentos
    const selectedSegment = Math.floor(normalizedRotation / segmentAngle);
    
    setTimeout(() => {
        elements.rouletteWheel.classList.remove('spinning');
        rouletteGameState.isSpinning = false;
        elements.spinRouletteBtn.disabled = false;
        elements.spinRouletteBtn.innerHTML = '🎯 Girar Ruleta';
        
        // Mostrar pregunta de la categoría seleccionada
        showNutritionQuestion(selectedSegment);
    }, 3000);
}

// Mostrar pregunta nutricional
function showNutritionQuestion(categoryIndex) {
    const category = nutritionQuestions[categoryIndex];
    const availableQuestions = [...category.preguntas];
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    currentQuestionData = selectedQuestion;
    
    // Configurar modal
    elements.nutritionQuestionCategory.textContent = category.nombre.toUpperCase();
    elements.nutritionRoundInfo.textContent = `Ronda ${rouletteGameState.currentRound}/${rouletteGameState.totalRounds}`;
    elements.nutritionQuestionText.textContent = selectedQuestion.pregunta;
    
    // Limpiar input de respuesta
    elements.nutritionAnswerInput.value = '';
    elements.nutritionAnswerInput.focus();
    
    // Mostrar modal
    elements.nutritionQuestionModal.classList.add('show');
    
    console.log(`❓ Pregunta de ${category.nombre}: ${selectedQuestion.pregunta}`);
}

// Verificar respuesta nutricional
function checkNutritionAnswer() {
    const userAnswer = elements.nutritionAnswerInput.value.trim().toLowerCase();
    const correctAnswer = currentQuestionData.respuesta.toLowerCase();
    
    if (userAnswer === '') {
        alert('Por favor, escribe una respuesta.');
        return;
    }
    
    const isCorrect = userAnswer === correctAnswer || 
                     userAnswer.includes(correctAnswer) || 
                     correctAnswer.includes(userAnswer);
    
    if (isCorrect) {
        showNutritionFeedback(true, `¡Correcto! La respuesta es: ${currentQuestionData.respuesta}`);
        setTimeout(() => handleNutritionAnswer(true), 2000);
    } else {
        showNutritionFeedback(false, `Incorrecto. La respuesta correcta es: ${currentQuestionData.respuesta}`);
        setTimeout(() => handleNutritionAnswer(false), 3000);
    }
}

// Mostrar feedback nutricional
function showNutritionFeedback(isCorrect, message) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `answer-feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`;
    feedbackDiv.textContent = message;
    
    const answerSection = elements.nutritionQuestionModal.querySelector('.answer-section');
    answerSection.insertBefore(feedbackDiv, answerSection.firstChild);
    
    setTimeout(() => {
        if (feedbackDiv.parentNode) {
            feedbackDiv.remove();
        }
    }, isCorrect ? 1900 : 2900);
}

// Manejar respuesta nutricional
function handleNutritionAnswer(isCorrect) {
    if (isCorrect) {
        rouletteGameState.teams[`team${rouletteGameState.currentTeam}`].score++;
        updateRouletteDisplay();
        animateRouletteScore(rouletteGameState.currentTeam);
    }
    
    // Avanzar ronda
    rouletteGameState.currentRound++;
    
    // Cambiar turno
    rouletteGameState.currentTeam = rouletteGameState.currentTeam === 1 ? 2 : 1;
    
    // Ocultar modal
    elements.nutritionQuestionModal.classList.remove('show');
    
    // Verificar si el juego ha terminado
    if (rouletteGameState.currentRound > rouletteGameState.totalRounds) {
        setTimeout(() => showRouletteResults(), 1000);
    } else {
        updateRouletteDisplay();
    }
}

// Animar puntuación en ruleta
function animateRouletteScore(teamNumber) {
    const scoreElement = document.getElementById(`roulette-team${teamNumber}-score`);
    scoreElement.style.transform = 'scale(1.3)';
    scoreElement.style.color = '#00ff00';
    
    setTimeout(() => {
        scoreElement.style.transform = 'scale(1)';
        scoreElement.style.color = '#ffd700';
    }, 500);
}

// Mostrar resultados de la ruleta
function showRouletteResults() {
    const team1Score = rouletteGameState.teams.team1.score;
    const team2Score = rouletteGameState.teams.team2.score;
    
    // Actualizar nombres y puntuaciones finales
    elements.finalTeam1Name.textContent = rouletteGameState.teams.team1.name;
    elements.finalTeam2Name.textContent = rouletteGameState.teams.team2.name;
    elements.finalTeam1Score.textContent = `${team1Score} puntos`;
    elements.finalTeam2Score.textContent = `${team2Score} puntos`;
    
    // Determinar ganador
    let winnerMessage = '';
    if (team1Score > team2Score) {
        winnerMessage = `🎉 ¡${rouletteGameState.teams.team1.name} GANA! 🎉`;
    } else if (team2Score > team1Score) {
        winnerMessage = `🎉 ¡${rouletteGameState.teams.team2.name} GANA! 🎉`;
    } else {
        winnerMessage = '🤝 ¡EMPATE! 🤝';
    }
    
    elements.winnerText.textContent = winnerMessage;
    
    // Mostrar pantalla de resultados
    showScreen('results');
}

// Terminar juego de ruleta anticipadamente
function endRouletteGameEarly() {
    if (confirm('¿Estás seguro de que quieres terminar el juego? Se declarará ganador al jugador con más puntos.')) {
        showRouletteResults();
    }
}

console.log('🏆 Trivia Deportiva cargada correctamente. ¡Que comience el juego!');
