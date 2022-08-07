function getDistinct(questions, propertyName, selectedLanguage) {
    var result = [];
    for (var i = 0; i < questions.length; i++) {
      var question = questions[i];
      if (
        result.indexOf(question[propertyName]) === -1 &&
        question.language === selectedLanguage
      ) {
        result.push(question[propertyName]);
      }
    }
    return result;
  }