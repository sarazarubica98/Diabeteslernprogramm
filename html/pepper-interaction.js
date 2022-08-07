function PepperInteractionService() {
    var _session = null
    var _translations = language.german;

    QiSession(connected, disconnected, location.host);

    function connected(session) {
        console.log("Session connected");
        _session = session;
    }

    function disconnected(error) {
        console.log("Session disconnected");
    }

    function launchCorrectAnswer(correctAnswerText, afterSpeechFinishedCallback) {
        try {
            correctAnswerText = replaceTitleWithSpokenText(correctAnswerText);
            _session.service("ALTextToSpeech").then(function (speech) {
                speech.say(correctAnswerText).then(function () {
                    if (afterSpeechFinishedCallback) setTimeout(afterSpeechFinishedCallback, 2000);
                }).catch(function (err) {
                    if (afterSpeechFinishedCallback) setTimeout(afterSpeechFinishedCallback, 2000);
                });
            }).catch(function (err) {
                alert(_translations.errorSpeechFailedCorrectAnswer);
                if (afterSpeechFinishedCallback) setTimeout(afterSpeechFinishedCallback, 2000);
            });

            _session.service("ALMemory").then(function (memory) {
                var randomNumber = Math.floor(Math.random() * 4) + 1;
                memory.raiseEvent("event_correctAnswer", randomNumber);
            }).catch(function (err) {
                alert(_translations.errorCallEventFailedCorrectAnswer);
            });
        } catch (error) {
            alert(error);
        }
    }

    function launchWrongAnswer(wrongAnswerText, afterSpeechFinishedCallback) {
        try {
            wrongAnswerText = replaceTitleWithSpokenText(wrongAnswerText);
            _session.service("ALTextToSpeech").then(function (speech) {
                speech.say(wrongAnswerText).then(function () {
                    if (afterSpeechFinishedCallback) afterSpeechFinishedCallback();
                }).catch(function (err) {
                    if (afterSpeechFinishedCallback) afterSpeechFinishedCallback();
                });
            }).catch(function (err) {
                alert(err);
                alert(_translations.errorSpeechFailedWrongAnswer);
                if (afterSpeechFinishedCallback) afterSpeechFinishedCallback();
            });

            _session.service("ALMemory").then(function (memory) {
                var randomNumber = Math.floor(Math.random() * 5) + 1;
                memory.raiseEvent("event_wrongAnswer", randomNumber);
            }).catch(function (err) {
                alert(_translations.errorCallEventFailedWrongAnswer);
            });
        } catch (error) {
            alert(error);
        }
    }

    function launchEndOfGame(name, category, level, correctAnswerCount, questionCount) {
        if(!category){
            category = 'Theorie';
        }
        key = category+level;
        try {
            _session.service("ALMemory").then(function (memory) {
                memory.raiseEvent("event_endOfGame", "");
            }).catch(function (err) {
                alert(err);
            });
            _session.service("ALTextToSpeech").then(function (speech) {
                speech.say(_translations.endOfQuiz);
                if ((questionCount - correctAnswerCount) <= (questionCount - ((questionCount / 4) * 3))) {
                    speech.say(_translations.greatJob + name + " ! " + _translations.youHave + correctAnswerCount + _translations.from + questionCount + _translations.anwerdQuestionsPerfect);
                } else if ((questionCount - correctAnswerCount) <= (questionCount - ((questionCount / 4) * 2))) {
                    speech.say(_translations.wellDone + name + " ! " + _translations.youHave + correctAnswerCount + _translations.from + questionCount + _translations.answeredQuestionsNotBad);
                } else if ((questionCount - correctAnswerCount) <= (questionCount - (questionCount / 4))) {
                    speech.say(_translations.youHave + correctAnswerCount + _translations.from + questionCount + _translations.anweredQuestions + name + _translations.needToTrain);
                } else {
                    speech.say(_translations.youHave + correctAnswerCount + _translations.from + questionCount + _translations.anweredQuestions + name + _translations.talkWithNutritionist);
                }
            }).catch(function (err) {
                alert(errorSpeechFailedAtEnd);
            });

            _session.service("ALMemory").then(function (memory) {
                memory.getData(key).then(function (data) {
                    var highscore = JSON.parse(data);
                    highscore.push({ name: name, value: correctAnswerCount, questionCount: questionCount });
                    memory.insertData(key, JSON.stringify(highscore)).then(function () {
                        showHighscore(highscore, correctAnswerCount, questionCount);
                    }).catch(function (err) {
                        alert(_translations.errorAddingDatasetToHighscoreWhenExisting);
                    });
                }).catch(function (err) {
                    var highscore = [{ name: name, value: correctAnswerCount, questionCount: questionCount }];
                    memory.insertData(key, JSON.stringify(highscore)).then(function () {
                        showHighscore(highscore, correctAnswerCount, questionCount);
                    }).catch(function (err) {
                        alert(_translations.errorAddingDatasetToHighscore);
                    });
                });
            }).catch(function (err) {
                alert(err);
            });
        } catch (error) {
            alert(error);
        }
    }

    function getData(level, category) {
        var key = category + level;
        return new Promise(function (resolve, reject) {
            _session.service("ALMemory").then(function (memory) {
                memory.getData(key).then(function (data) {
                    resolve(JSON.parse(data));
                }).catch(function(e){
                    resolve(null);
                })
            }).catch(function(e){
                alert(language.german.errorLoadingData);
                reject(e);
            });
        });
    }

    function launchText(text, afterSpeechFinishedCallback) {
        try {
            text = replaceTitleWithSpokenText(text);
            _session.service("ALTextToSpeech").then(function (speech) {
                speech.say(text).then(function () {
                    if (afterSpeechFinishedCallback) afterSpeechFinishedCallback();
                }).catch(function (err) {
                    alert(err);
                    if (afterSpeechFinishedCallback) afterSpeechFinishedCallback();
                });
            }).catch(function (err) {
                alert(err);
                if (afterSpeechFinishedCallback) afterSpeechFinishedCallback();
            });
        } catch (error) {
            alert(error);
            if (afterSpeechFinishedCallback) afterSpeechFinishedCallback();
        }
    }

    return {
        launchCorrectAnswer: launchCorrectAnswer,
        launchWrongAnswer: launchWrongAnswer,
        launchEndOfGame: launchEndOfGame,
        launchText: launchText,
        getData: getData
    }
}