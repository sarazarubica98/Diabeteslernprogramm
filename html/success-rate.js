
function successRate(_deviceService) {
  var _selectedLevel;
  var _selectedCategory;
  var _container = null;
  var _innerContainer = null;
  var _selectedLanguage = "DE";
  var _translations = language.german;

  function createSettingSelection(titleText, settings, callback) {
    _innerContainer.innerHTML = "";
    var titleElm = document.createElement("h2");
    titleElm.innerHTML = titleText;
    var buttonContainer = document.createElement("div");
    _innerContainer.appendChild(titleElm);
    _innerContainer.appendChild(buttonContainer);
    for (var i = 0; i < settings.length; i++) {
      if (!settings[i]) continue;
      var container = document.createElement("div");
      container.id = "buttonSuccessRate";
      container.innerHTML = settings[i];
      container.addEventListener("click", getSettingsCallback(settings[i], callback));
      buttonContainer.appendChild(container);
    }
  }

  function getSettingsCallback(setting, callback) {
    return function () {
      callback(setting);
    };
  }

  function reset() {
    init();
  }

  function renderSuccessRate() {
    _deviceService.getData(_selectedLevel, _selectedCategory).then(function (data) {
      var title = _translations.resultForAge + _selectedLevel + _translations.andModule + _selectedCategory + "'";
      if (data && data.length && data.length > 0) {
        var result = [
          _translations.average + getNumberAsString(getAvg(data)) + '%',
          _translations.median + getNumberAsString(getMedian(data)) + '%'
        ]
        createSettingSelection(title, result, function () { });
      } else {
        createSettingSelection(title, [_translations.notAvailable], function () { });
      }
    }).catch(function () {
      alert(language.german.errorLoadingData);
    })
  }


  function getAvg(data) {
    var result = 0;
    for (var i = 0; i < data.length; i++) {
      result += (data[i].value / data[i].questionCount)
    }
    return (result / data.length) * 100;
  }

  function getMedian(data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
      result.push(data[i].value / data[i].questionCount)
    }

    return median(result) * 100;
  }

  function getNumberAsString(num) {
    return num.toFixed(2);
  }

  function median(numbers) {
    numbers.sort(function (a, b) { return a - b });
    var middle = Math.floor(numbers.length / 2);

    if (numbers.length % 2 === 0) {
      return (numbers[middle - 1] + numbers[middle]) / 2;
    }

    return numbers[middle];
  }

  function init() {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(pictures/background/module.png)';
    _container = document.getElementById('successRateContainer');
    _innerContainer = document.getElementById('successRateResultContainer');
    _innerContainer.innerHTML = "";
    _selectedCategory = null;
    _selectedLevel = null;
    document.getElementById('btnResetSuccessRate').style.display = 'none';
    document.getElementById('btnResetSuccessRate').addEventListener('click', reset);

    var levels = getDistinct(questions, "level", _selectedLanguage);
    createSettingSelection(language.german.selectAge, levels, function (level) {
      _selectedLevel = level;
      var types = getDistinct(questions, "type", _selectedLanguage);
      document.getElementById('btnResetSuccessRate').style.display = 'block';
      createSettingSelection(language.german.selectType, types, function (type) {
        if (type == 'Theorie') {
          _selectedCategory = 'Theorie'
          renderSuccessRate();
        } else {
          _categories = getDistinct(questions, "category", _selectedLanguage);
          createSettingSelection(language.german.selectCategory, _categories, function (category) {
            _selectedCategory = category;
            renderSuccessRate();
          });
        }
      });
    });
  }

  init();
}

