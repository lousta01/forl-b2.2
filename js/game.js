'use strict'

//Spilvariabler
let score = 0; // Holder styr på spillerens point

// Starter spillet
function initGame() {
    score = 0; // Nulstiller point
    updateScore(); // Opdatere pointvisningen
    showScene('intro'); // Viser introen
}

// Starter spillet = intro til scene 1
function startGame() {
    showScene('scene1');
}





// DEL 1. VISNING AF SCENE
function showScene(sceneId) {
    // Skjuler alle scener (finder alle elementer med class="scene")
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    
    // Viser den valgte scene (finder element med det specifikke id)
    const scene = document.getElementById(sceneId);
    if (scene) {
        scene.classList.add('active');
    }
}





// DEL 2. HÅNDTERING AF VALG
function handleChoice(button) {
    // Henter point og feedback fra knappens data-attributer
    const points = parseInt(button.dataset.points);
    const feedback = button.dataset.feedback;
    
    // Opdatere point
    score += points;
    updateScore();
    
    // Vis feedback-scenen
    showFeedbackScene(feedback, button.closest('.scene').id);
}





// DEL 3. FEEDBACK SCENE
function showFeedbackScene(feedback, previousSceneId) {
    // Opretter eller finder feedback-scenen
    let feedbackScene = document.getElementById('feedback-scene');
    if (!feedbackScene) {
        // Opretter ny feedback scene hvis den ikke findes
        feedbackScene = document.createElement('section');
        feedbackScene.id = 'feedback-scene';
        feedbackScene.className = 'scene';
        
        // Opretter indholdet
        const feedbackContent = document.createElement('div');
        feedbackContent.className = 'feedback-content';
        
        const feedbackText = document.createElement('p');
        feedbackText.id = 'feedback-text';
        
        const continueButton = document.createElement('button');
        continueButton.className = 'choice';
        continueButton.textContent = 'Fortsæt';
        
        // Sætter det hele sammen
        feedbackContent.appendChild(feedbackText);
        feedbackContent.appendChild(continueButton);
        feedbackScene.appendChild(feedbackContent);
        
        document.querySelector('.container').appendChild(feedbackScene);
    }
    
    // Opdatere feedback-text
    document.getElementById('feedback-text').textContent = feedback;
    
    // Sætter "fortsæt" knappen til at gå til næste scene
    const continueButton = feedbackScene.querySelector('.choice');
    continueButton.onclick = () => {
        const nextSceneId = getNextSceneId(previousSceneId);
        if (nextSceneId === 'ending') {
            showEnding();
        } else {
            showScene(nextSceneId);
        }
    };
    
    // Vis feedback-scenen
    showScene('feedback-scene');
}

// Finder IDet på næste scene
function getNextSceneId(currentSceneId) {
    const scenes = ['intro', 'scene1', 'scene2', 'scene3', 'scene4', 'scene5', 'ending'];
    const currentIndex = scenes.indexOf(currentSceneId);
    return scenes[currentIndex + 1] || 'ending';
}

// Opdaterer scoren
function updateScore() {
    let scoreElement = document.getElementById('score');
    if (!scoreElement) {
        scoreElement = document.createElement('div');
        scoreElement.id = 'score';
        scoreElement.className = 'score-display';
        document.body.appendChild(scoreElement);
    }
    scoreElement.textContent = `Score: ${score}`;
}





// DEL 4. SLUTNINGEN
function showEnding() {
    const endingText = document.getElementById('ending-text');
    let message = '';
    // Viser en slutning ud fra hvor mange point man har samlet sammen
    if (score === 5) {
        message = "Cyberhelt! Du tog ansvar, tænkte dig om og fulgte best practices. Du er en rollemodel for sikker digital adfærd!";
    } else if (score >= 0) {
        message = "Sikkerhedsrookie. Du undgik det værste, men tog også nogle risici. En IT-introduktion eller awareness-kursus kunne hjælpe dig";
    } else {
        message = "Digital katastrofe! Du klikkede, delte og uploadede uden omtanke. Virksomhedens sikkerhed er kompromitteret. Du bliver indkaldt til krisemøde med IT.";
    }
    
    endingText.textContent = message;
    showScene('ending');
}

// Genstarter spillet
function restartGame() {
    initGame();
}

// DEL 5. INITIALISERING: Tilføjer event listeners når siden er loaded
document.addEventListener('DOMContentLoaded', () => {
    // Tilføjer click handlers til alle valg-knapper
    document.querySelectorAll('.choice').forEach(button => {
        if (button.dataset.points) {  // Kun til valg-knapper, ikke navigationsknapper
            button.addEventListener('click', () => handleChoice(button));
        }
    });
    
    // Starter spillet
    initGame();
});





/* Spillets Flow 
1. Start:
    - HTML: id="intro" class="scene active" vises først
    - JavaScript: initGame() kører og sætter alt op

2. Vælg svar:
    - HTML: Knapper med class="choice" og data-points/data-feedback
    - JavaScript: handleChoice() tager imod klik og håndterer valget

3. Feedback:
    - HTML: Dynamisk oprettet scene med id="feedback-scene"
    - JavaScript: show FeedbackScene() viser feedback og "Fortsæt" knap

4. Næste scene:
    - HTML: Hver scene hae et unikt id (scene1, scene2, osv.)
    - JavaScript: getNextSceneId() finder næsten scene i rækkefølgen

5. Slutning
    - HTML: id="endning" ecene med id="ending-text"
    - JavaScript: showEnding() viser passende slutning baseret på score

Vigtige HTML/JavaScript relationer
    - class="scene" bruges til at vise/skjule scener
    - class="choice" bruges til at identificere valg-knapper
    - data-points og data-feedback bruges til at gemme information om hvert valg
    - id attributter bruges til at markere den aktive scene
*/