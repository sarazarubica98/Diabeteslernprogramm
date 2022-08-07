var _maxRows = 10;

function showHighscore(highscores, correctAnswerCount, questionCount){
  document.getElementById('settingSelectionContainer').style.display = "none";
  document.getElementById('quizContainer').style.display = "none";

  var correctanswer = document.getElementById('correctAnswers');
  correctanswer.innerHTML = "Du hast " + correctAnswerCount + " von " + questionCount +" Fragen richtig beantwortet.";
  var container = document.getElementById('highscoreTableContainer');
  container.innerHTML = '';
  var highScoreToHighlight = highscores[highscores.length-1];
  highscores = sortHighScore(highscores);
  createHighScoreTable(highscores, container, highScoreToHighlight);

  document.getElementById('highscoreContainer').style.display = "block";
  document.getElementsByTagName('body')[0].style.backgroundImage = 'url(pictures/background/highscore.png)';
}

function createHighScoreTable(highscores, container, highScoreToHighlight){
    var table = document.createElement('table');
    var headRow = document.createElement('tr');
    var thName = document.createElement('th');
    var thScore = document.createElement('th');

    thName.innerText = 'Name';
    thScore.innerText = 'Score';
    
    headRow.appendChild(thName);
    headRow.appendChild(thScore);
    table.appendChild(headRow);

    var rowsAdded = 0;
    for(var idx in highscores){
        if(rowsAdded <= _maxRows){
            var highlight = highScoreToHighlight == highscores[idx];
            table.appendChild(createScoreRow(highscores[idx], highlight));
            rowsAdded++;
        }
    }

    container.appendChild(table);
}

function createScoreRow(score, highlight){
    var row = document.createElement('tr');
    var tdName = document.createElement('td');
    var tdScore = document.createElement('td');

    if(highlight){
        row.style.backgroundColor = "white"
    }

    tdName.innerText = score.name;
    tdScore.innerText = score.value
    row.appendChild(tdName);
    row.appendChild(tdScore);
    return row;
}

function sortHighScore(highscores){
   return highscores.sort(function(a,b){
      return b.value - a.value;
    });
}