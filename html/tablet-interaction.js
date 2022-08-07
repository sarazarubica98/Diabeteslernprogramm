function TabletInteractionService() {
  function launchCorrectAnswer(correctAnswerText, afterSpeechFinishedCallback) {
    console.log(correctAnswerText);
    setTimeout(afterSpeechFinishedCallback, 2000);
  }

  function launchWrongAnswer(wrongAnswerText, afterSpeechFinishedCallback) {
    console.log(wrongAnswerText);
    setTimeout(afterSpeechFinishedCallback, 2000);
  }

  function launchEndOfGame(
    name,
    category,
    level,
    correctAnswerCount,
    questionCount
  ) {
    console.log(name);
    console.log(category);
    console.log(level);
    console.log(correctAnswerCount);
    console.log(questionCount);
    if(!category){
      category = 'Theorie';
    }
    var key = category + level;

    var data = localStorage.getItem(key);
    var highscore = JSON.parse(data);
    if (!highscore) highscore = [];
    highscore.push({ name: name, value: correctAnswerCount, questionCount: questionCount });
    localStorage.setItem(key, JSON.stringify(highscore));
    showHighscore(highscore, correctAnswerCount, questionCount);
  }

  function getData(level, category) {
    var key = category + level;
    return new Promise(function (resolve, reject) {
      try {
        var data = localStorage.getItem(key);
        if (data) {
          data = JSON.parse(data);
        }
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }

  function launchText(text, afterSpeechFinishedCallback) {
    console.log(text);
    if (afterSpeechFinishedCallback) afterSpeechFinishedCallback();
  }

  return {
    launchCorrectAnswer: launchCorrectAnswer,
    launchWrongAnswer: launchWrongAnswer,
    launchEndOfGame: launchEndOfGame,
    launchText: launchText,
    getData: getData
  };
}
