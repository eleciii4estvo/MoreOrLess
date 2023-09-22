const init = document.querySelector("#init")
const envisioned = document.querySelector("#envisioned")
const cfLess = document.querySelector("#coefficient_in_game_less")
const cfMore = document.querySelector("#coefficient_in_game_more")
const cfEqually = document.querySelector("#coefficient_in_game_equally")
const playBtn = document.querySelector("#play_btn")
const lessRadioButton = document.querySelector("#less");
const equallyRadioButton = document.querySelector("#equally");
const moreRadioButton = document.querySelector("#more");
const balanceField = document.querySelector("#balance")
const allertMsg = document.querySelector("#allert_message")
const slider = document.querySelector("#slider")
const sliderValue = document.querySelector("#slider_value")
//Last Game
const lastGameResult = document.querySelector("#result")
const lastGameInitial = document.querySelector("#initial")
const lastGameEnvisioned = document.querySelector("#envision")
const lastGameGuess = document.querySelector("#guess")
const lastGameBet = document.querySelector("#bet")
const lastGameCoefficient = document.querySelector("#coefficient")
const lastGameTime = document.querySelector("#time")
const time = new Date()
let cfLessNum = 0
let cfEqualNum = 98
let cfMoreNum = 0
let userCf = 0
let envisionedNum = 0
let envisionedNumLast = 0
let initNum = 0
let selection = 'nothing'
let ans = ''
let money = 1000
let bet = 0
let isMessageSend = false
let isBtnEnable = true
let timeoutInProgress = false
let resultVal = ''


//Отображение баланса и задание рэнджа слайдера
function balanceSet(){
    //Задание баланса
    balanceField.textContent = money.toFixed(1)
    //Задание рэнджа для слайдера
    slider.setAttribute("max", money)
}

balanceSet()

//Первый раунд после загрузки страницы
game()


function lastGameInfo(){
    lastGameResult.textContent = resultVal
    lastGameInitial.textContent = initNum
    lastGameEnvisioned.textContent = envisionedNumLast
    lastGameGuess.textContent = selection
    lastGameBet.textContent = bet
    lastGameCoefficient.textContent = userCf
    lastGameTime.textContent = time.toLocaleTimeString()
}

slider.addEventListener("input", function () {
    // Обновляем значение элемента #slider_value при изменении ползунка
    sliderValue.textContent = slider.value
  })

function randomNumber(){
    return Math.floor(Math.random() * 100) + 1
}



//Расчитывание коэффициентов
function coefficientSelection(initNum){
    if (initNum>10 && initNum<90){
        cfLessNum = ((100-initNum)/10).toFixed(1)
        cfMoreNum = (10 - cfLessNum).toFixed(1)
    } else if (initNum<10){
        cfLessNum = ((100-initNum)/10).toFixed(1)
        cfMoreNum = (1 + (10 - parseFloat(cfLessNum))).toFixed(1)
    } else if(initNum==10){
        cfLessNum=9
        cfMoreNum=2
    } else if(initNum==90){
        cfLessNum=2
        cfMoreNum=9
    }
    else{
        cfLessNum = (1 + ((100-initNum)/10)).toFixed(1)
        cfMoreNum = (10 - parseFloat(cfLessNum)).toFixed(1)
    }
    cfLess.textContent=cfLessNum
    cfMore.textContent=cfMoreNum
}


//Логика выбора ответа
// Обработчик события для радиокнопок
function handleRadioButtonChange() {
    if (lessRadioButton.checked) {
      console.log("Пользователь выбрал 'less'")
      selection = 'less'
      userCf = cfLessNum
    } else if (equallyRadioButton.checked) {
      console.log("Пользователь выбрал 'equally'")
      selection = 'equally'
      userCf = cfEqualNum
    } else {
      console.log("Пользователь выбрал 'more'")
      selection = 'more'
      userCf = cfMoreNum
    }
  }
  // Добавляем обработчик события к каждой радиокнопке
  lessRadioButton.addEventListener("change", handleRadioButtonChange)
  equallyRadioButton.addEventListener("change", handleRadioButtonChange)
  moreRadioButton.addEventListener("change", handleRadioButtonChange)

//Получение результата на серверной части
function getAnswer(initNum, envisionedNum){
    if(initNum>envisionedNum){
        ans = 'less'
    } else if (initNum<envisionedNum){
        ans='more'
    } else{
        ans='equally'
    }
}


//Проверка: выиграл человек или проиграл
function result(){
    if (ans==selection){
        money += bet * userCf
        resultVal='win'
        console.log('win')
    } else{
        money -= bet
        resultVal='lose'
        console.log('lose')
    }
}

//Показ второго числа перед новым раундом
function autopsy(){
    envisioned.textContent=envisionedNum
    timeoutInProgress=true

    setTimeout(()=>{
        envisioned.textContent='?',
        isBtnEnable=true
    }, 5000)

    console.log('NewRound')
}

//Пользователь нажимает на кнопку PLAY
//Проверка на попытку начать игру без выбора ответа
function checkAnswerValid(){
    if(selection=='nothing' && !isMessageSend){
        allertMsg.insertAdjacentHTML('beforeend',
        `            
        <span class="allert_msg"">You didn't make an assumption!</span>
        `
        )
        isMessageSend=true
        console.log()
        setTimeout(()=>{
            const insertMsg = allertMsg.querySelector('span')
            insertMsg.remove()
            isMessageSend=false
        }, 5000)
        console.log("You didn't make an assumption")
    }
}

//Проверка на отрицательный баланс с дальнейшим перебросом на страницу проигрыша и предложением перезагрузить страницу
function checkBalance(){
}


//Весь цикл игры, который будет повторяться при каждом раунде
function game(){
    slider.value=0
    sliderValue.textContent=0
    //Рандомное первое число
    initNum=randomNumber()
    init.textContent=initNum
    //Выбор второго числа
    envisionedNum = randomNumber()
    envisionedNumLast = envisionedNum
    balanceSet()
    //Задание коэффициентов
    coefficientSelection(initNum)
    //Обнуление выбора и ответа
    ans = ''

    //Получаем правильный ответ
    getAnswer(initNum, envisionedNum)

  
    // //Сравниваем ответ пользователя с реальным ответом
}

//Обработка введенных значений и получение результата

playBtn.addEventListener('click', ()=>{
    if (isBtnEnable){
        isBtnEnable=false
        autopsy()
        checkAnswerValid()
        bet = slider.value
        setTimeout(()=>{game()}, 5000)
        result()
        
        lastGameInfo()
        balanceSet()
        console.log(`user input ${selection}, init number - ${initNum}, envisioned - ${envisionedNum}. Answer = ${ans}. Bet - ${bet}. Cf - ${userCf}. Valid ans - ${ans}`)
    }
})
