window.onload = function () {

  showCard();

  var numbersArray = [];
  var max = 10;
  var cardsCollection = {};
  var numClick = 0;
  var idFirst = 0;
  var idSecond = 0;
  var card = $(".card");
  var score = 0;
  var countWin = 0;

  //Створюємо масив
  for (let i = 1; i <= max; i++) {
    numbersArray.push(i, i);
  }

  //Сортуємо масив в довільному порядку
  numbersArray.sort(() => 0.5 - Math.random());
  console.log(numbersArray);

  //Створюємо об'єкт з масиву де елемент масиву є ключем + додаєм значення на перевірку співпадінь
  numbersArray.forEach(function (item, index) {
    cardsCollection[index + 1] = {
      value: item,
      isMatch: false
    };
  });

  //Створення карток + id
  function showCard() {
    var card = $('#card-wrap');
    for (var i = 1; i <= 20; i++) {
      $('<div/>', {
        "class": "card " + i,
      }).appendTo(card);
    }
    $('<div/>', {
      "class": "card__front"
    }).appendTo('.card');
    $('<div/>', {
      "class": "card__back",
    }).appendTo('.card');
    var id;
    for (var j = 1; j <= 20; j++) {
      id = "." + j;
      $(id).find(".card__back").attr({
        id: j
      });
    }
  };

  // Додаєм карткам номери
  function appendNumber(arr) {
    for (var i = 1; i <= arr.length; i++) {
      $('#' + i).append(arr[i - 1]);
    }
  }
  appendNumber(numbersArray);

  //Старт гри з функціоналом кліка картки
  function startGame(ev) {

    //Відключаємо кнопку після старта
    $(this).attr('disabled', true)
    //Показуємо всі карти на 2с.
    card.toggleClass('active');
    setTimeout(function () {
      card.toggleClass("active");
    }, 2000);

    //Відкриваєм картку 
    $('.card').on('click', function () {
      $(this).toggleClass('active');
      ++numClick;
      idFirst = $('.active').first().find(".card__back").attr('id');
      idSecond = $('.active').last().find(".card__back").attr('id');

      //Основна перевірка кількості кліків та підрахунок рахунку
      if (numClick % 2 == 0) {
        if (cardsCollection[idFirst].value == cardsCollection[idSecond].value) {
          cardsCollection[idFirst].isMatch = true;
          cardsCollection[idSecond].isMatch = true;
          $('.active').addClass("match");
          card.removeClass("active");
          score += 10;
          $(".score").text(score);
          $(".result").text(score);
          countWin++;
          if (countWin == 10) {
            return endGame();
          }
        } else {
          setTimeout(function () {
            card.removeClass("active");
          }, 500);
        }
        numClick = 0;
      }
    });
  }

  //Завершуємо гру
  function endGame() {
    for (var i in cardsCollection) {
      if (cardsCollection[i].isMatch == false) {
        $('.' + i).toggleClass("active");
        $('.active').addClass("match");
        card.removeClass("active");
      }
    }
    $(".main").addClass('end-game')
  }

  //Ставимо таймер
  function timer() {
    var seconds = 40;
    var seconds_timer_id = setInterval(function () {
      if (seconds > 0) {
        seconds--;
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        if (seconds == 00) {
          return endGame()
        }
        $(".seconds").text(seconds);
      } else {
        clearInterval(seconds_timer_id);
      }
    }, 1000);
  }

  $('#start').on('click', timer)
  $('#start').on('click', startGame)
}