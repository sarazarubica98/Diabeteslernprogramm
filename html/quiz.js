function quiz(_userName, _deviceService) {
  var _answerClass = "answer";
  var _correctAnswerClass = "correctanswer";
  var _wrongAnswerClass = "wronganswer";

  var _selectionContainer = document.getElementById("settingSelectionContainer");
  var _quizContainer = document.getElementById("quizContainer");
  var _questionContainer = document.getElementById("questionContainer");

  var _answerElms = null;
  var _currentQuestionIndex = 0;
  var _questions = null;
  var _correctAnswerCount = 0;

  var _levels = null;
  var _types = null;
  var _categories = null;

  var _selectedLevel = null;
  var _selectedType = null;
  var _selectedCategory = null;
  var _selectedLanguage = "DE";
  var _translations = language.german;
  var _maxQuestionsPerGame = 8; 
  var pepper_busy_speeking = false;
  var question_answered = false;

  function init() {
    _selectedLevel = null;
    _selectedType = null;
    _selectedCategory = null;
    _questions = questions;
    displayQuizWithSelectedSettings();
  }

  function displayQuizWithSelectedSettings() {
    setPepperBusy();

    //Alter Auswahl
    _levels = getDistinct(_questions, "level", _selectedLanguage); 
    _deviceService.launchText(_translations.ageQuestion + " " + _userName, setPepperUnbusy);
    createSettingSelection(_translations.ageQuestion, _levels, function (level) {
      _selectedLevel = level; 
      _questions = getQuestionsBySelectedSettings();

      //Fragentyp Auswahl
      document.getElementsByTagName('body')[0].style.backgroundImage = 'url(pictures/background/type.png)';
      _types = getDistinct(_questions, "type", _selectedLanguage); 
      setPepperBusy();
      _deviceService.launchText(_translations.typeQuestion, setPepperUnbusy);
      createSettingSelection(_translations.typeQuestion, _types, function (type) {
        _selectedType = type;
        _questions = getQuestionsBySelectedSettings();

        //Kategorie Auswahl
        document.getElementsByTagName('body')[0].style.backgroundImage = 'url(pictures/background/module.png)';
        _categories = getDistinct(_questions, "category", _selectedLanguage); 
        if(!hasMoreThanOneCategory()){
          _questions = getRandomQuestions();
          //Starten des Spiels mit den ausgewählten Einstellungen
          startQuiz();
        }else{
          setPepperBusy();
          _deviceService.launchText(_translations.moduleQuestion, setPepperUnbusy);
          createSettingSelection(_translations.moduleQuestion, _categories, function (category) {
            _selectedCategory = category;
            _questions = getQuestionsBySelectedSettings();
            _questions = getRandomQuestions();
            //Starten des Spiels mit den ausgewählten Einstellungen
            startQuiz();
          });
        }
      });
    });
  }

  function hasMoreThanOneCategory(){
    return !(!_categories || _categories.length == 1 || _categories[0] == '');
  }

  function setPepperUnbusy(){
    pepper_busy_speeking = false;
  }

  function setPepperBusy(){
    pepper_busy_speeking = true;
  }

  function isPepperBusy(){
    return pepper_busy_speeking;
  }

  function startQuiz() {
    _selectionContainer.style.display = "none";
    _quizContainer.style.display = "block";
    _correctAnswerCount = 0;
    _currentQuestionIndex = 0;

    createQuestion(_questions[0]);
  }

  function nextQuestion() {
    _currentQuestionIndex++;
    if (atEndOfGame()) {
      _deviceService.launchEndOfGame(_userName, _selectedCategory, _selectedLevel, _correctAnswerCount, _currentQuestionIndex);
      return; 
    }
    createQuestion(_questions[_currentQuestionIndex]);
  }

  function atEndOfGame(){
    return _currentQuestionIndex >= _questions.length;
  }

  function createAnswerCallback(currentIndex, question) {
    return function () {
      if (question_answered) return;
      question_answered = true;
      if (isPepperBusy()) return;
      displayCorrectAnswer(currentIndex, question.correctAnswerIndex);
      var isCorrectAnswer = currentIndex === question.correctAnswerIndex;
      if (isCorrectAnswer) {
        _correctAnswerCount++;
        _deviceService.launchCorrectAnswer(question.correctAnswerText, nextQuestion);
      } else {
        _deviceService.launchWrongAnswer(question.wrongAnswerText, nextQuestion);
      }
    };
  }

  function getQuestionsBySelectedSettings() {
    var result = [];
    for (var i = 0; i < questions.length; i++) {
      if ((!_selectedLevel || questions[i].level == _selectedLevel) &&
        (!_selectedType || questions[i].type == _selectedType) &&
        (!_selectedCategory || questions[i].category == _selectedCategory) &&
        (!_selectedLanguage || questions[i].language == _selectedLanguage)) {
        result.push(questions[i]);
      }
    }
    return result;
  }

  function getRandomQuestions() {
    var randomNumbers = [];
    var questions = [];

    if(_questions.length < _maxQuestionsPerGame){
      _maxQuestionsPerGame = _questions.length;
    }

    for (var i = 0; i < _maxQuestionsPerGame; i) {
      var randomNumber = Math.floor(Math.random() * _questions.length); //Funktion genau anschauen
      if(randomNumbers.indexOf(randomNumber) == -1){
        randomNumbers.push(randomNumber);
        questions.push(_questions[randomNumber]);
        i++
      }
    }
    return questions;
  }

  function getSettingsCallback(setting, callback) {
    return function () {
      if (isPepperBusy()) return;
      callback(setting);
    };
  }

  function createSettingSelection(title, settings, callback) {
    setTimeout(function(){
      _selectionContainer.innerHTML = "";
      var questionTitle = document.createElement("h2");
      questionTitle.innerHTML = title;
      var buttonContainer = document.createElement("div");
      _selectionContainer.appendChild(questionTitle);
      _selectionContainer.appendChild(buttonContainer);
      for (var i = 0; i < settings.length; i++) {
        var container = document.createElement("div");
        container.id = "button";
        container.innerHTML = settings[i];
        container.addEventListener("click", getSettingsCallback(settings[i], callback));
        buttonContainer.appendChild(container);
        setPepperBusy();
        _deviceService.launchText(settings[i], setPepperUnbusy);

      }
      _quizContainer.style.display = "none";
      _selectionContainer.style.display = "block";
    }, 300);
  }

  function createQuestion(question) {
    question_answered = false;
    setupQuestionContainerMembers()
    appendTitleToQuestionContainer(question);
    
    if(question.imageUrl){
      appendImageToQuestionContainer(question.imageUrl);
    }

    appendAnswerContainerToQuestionContainer();

    setPepperBusy();
    _deviceService.launchText(question.title, function () {
      setPepperUnbusy();
      createAnswersRecursive(answerContainer, question, 0);
    });
  }

  function setupQuestionContainerMembers(){
    _answerElms = [];
    _questionContainer.innerHTML = "";
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(pictures/background/question.png)';
  }

  function appendTitleToQuestionContainer(question){
    var questionTitle = document.createElement("div");
    questionTitle.id = "questionTitle";
    questionTitle.innerHTML = question.title;
    _questionContainer.appendChild(questionTitle);

    if(question.imageUrl){
      questionTitle.style.marginBottom = '1%';
    }else{
      questionTitle.style.marginBottom = '5%';
    }
  }

  function appendImageToQuestionContainer(imageUrl){
    var imgElm = document.createElement("img");
      imgElm.id = "imageContainer";
      imgElm.setAttribute("src", imageUrl);
      _questionContainer.appendChild(imgElm);
  }

  function appendAnswerContainerToQuestionContainer(){
    var answerContainer = document.createElement("div");
    answerContainer.id = "answerContainer";
    _questionContainer.appendChild(answerContainer);
  }

  function createAnswersRecursive(answerContainer, question, answerIdx) {
    createAnswer(answerContainer, question.answers[answerIdx], createAnswerCallback(answerIdx, question));
    setPepperBusy();
    _deviceService.launchText(question.answers[answerIdx], answerIdx < question.answers.length - 1 ? function () {
      createAnswersRecursive(answerContainer, question, ++answerIdx);
    } : function () {
     setPepperUnbusy();
    });
  }

  function createAnswer(answerContainer, answer, callBack) {
    var answerElm = document.createElement("div");
    answerElm.classList.add(_answerClass);
    answerElm.innerHTML = answer;
    answerElm.addEventListener("click", callBack);
    answerContainer.appendChild(answerElm);
    _answerElms.push(answerElm);
  }

  function displayCorrectAnswer(currentIndex, correctAnswerIndex) {
    for (var i = 0; i < _answerElms.length; i++) {
      if(i == correctAnswerIndex){
        _answerElms[i].classList.add( _correctAnswerClass);
      }else if(i == currentIndex){
        _answerElms[i].classList.add( _wrongAnswerClass);
      }
    }
  }

  init();
}
