var userName = "";
var _translations = language.german;
var isPepperAvailable = false;
var deviceService = null;
window.onload = function () {
    deviceService = isPepperAvailable ? new PepperInteractionService() : new TabletInteractionService();
    displayStartScreen();
};

var quizStarterEventHandler = function () {
    document.getElementsByTagName('body')[0].removeEventListener('click', quizStarterEventHandler);
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(pictures/background/name.png)';  
    document.getElementById('nameContainer').style.display = "block";
    document.getElementById('btnShowSuccessRates').style.display = "none";
    deviceService.launchText(_translations.enterName);
};

function startQuiz() {
    userName = document.getElementById('txtBoxName').value;
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(pictures/background/age.png)';
    if (userName && userName.length >= 3) {
        document.getElementById('nameContainer').style.display = "none";
        quiz(userName, deviceService);
    } else {
        document.getElementById('txtBoxName').title = _translations.enterValidName;
    }
}

function displayStartScreen(e) {
    document.getElementById('nameContainer').style.display = "none";
    document.getElementById('successRateContainer').style.display = "none";
    document.getElementById('highscoreContainer').style.display = "none";
    document.getElementById('settingSelectionContainer').style.display = "none";
    document.getElementById('quizContainer').style.display = "none";
    document.getElementById('btnShowSuccessRates').style.display = "block";

    document.getElementsByTagName('body')[0].style.backgroundImage = "url(pictures/background/home.png)";
    document.getElementsByTagName('body')[0].addEventListener("click", quizStarterEventHandler);
}

function navigateToAdminPage(e){
    e.stopPropagation();
    document.getElementById('btnShowSuccessRates').style.display = "none";
    document.getElementsByTagName('body')[0].removeEventListener('click', quizStarterEventHandler);
    document.getElementById('successRateContainer').style.display = "block";
    new successRate(deviceService);
}

function backToQuiz(e) {
    e.stopPropagation();
    displayStartScreen();
}