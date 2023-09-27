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
const mainPage = document.querySelector(".wrapper")
const lostPage = document.querySelector(".lost_window")
//Last Game
const lastGameResultInfo = document.querySelector(".result_info")
const lastGameIncome = document.querySelector(".last_game_income")
const lastGameResult = document.querySelector("#result")
const lastGameInitial = document.querySelector("#initial")
const lastGameEnvisioned = document.querySelector("#envision")
const lastGameGuess = document.querySelector("#guess")
const lastGameBet = document.querySelector("#bet")
const lastGameCoefficient = document.querySelector("#coefficient")
const lastGameTime = document.querySelector("#time")
const time = new Date()
const timeOut = 4000
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
let isGame = true
let income = ''
let resultInf = ''

//Отображение баланса и задание рэнджа слайдера
function balanceSet(){
    balanceField.textContent = money.toFixed(1) //Задание баланса
    slider.setAttribute("max", money)           //Задание рэнджа для слайдера
}

balanceSet()

//Первый раунд после загрузки страницы
game()

function lastGameInfo(){
    if (bet==0 || selection=='nothing'){
        lastGameResult.textContent = "unscored"
        lastGameInitial.textContent = '-'
        lastGameEnvisioned.textContent = '-'
        lastGameGuess.textContent = '-'
        lastGameBet.textContent = '-'
        lastGameCoefficient.textContent = '-'
        lastGameTime.textContent = time.toLocaleTimeString()
    } else{
        lastGameResult.textContent = resultVal
        lastGameInitial.textContent = initNum
        lastGameEnvisioned.textContent = envisionedNumLast
        lastGameGuess.textContent = selection
        lastGameBet.textContent = bet
        lastGameCoefficient.textContent = userCf
        lastGameTime.textContent = time.toLocaleTimeString()
    }
}

//Функция, которая выводит около баланса информацию о том сколько денег прибавилось/отнялось
function incomingInfo(){
    lastGameIncome.insertAdjacentHTML('beforeend',
    `            
    <span class="last_income">${income}</span>
    `
    )
    setTimeout(()=>{
        const insertMsg = lastGameIncome.querySelector('.last_income')
        insertMsg.remove()
    }, timeOut)
}

//Функция, которая выводит информациб о выигрыше или проигрыше каждый раунд
function resultInfo(){
    lastGameResultInfo.insertAdjacentHTML('beforeend',
    `            
    <h2 class="result_text">${resultInf}</h2>
    `
    )
    setTimeout(()=>{
        const insertMsg = lastGameResultInfo.querySelector('.result_text')
        insertMsg.remove()
    }, timeOut)
}

slider.addEventListener("input", function () {
    sliderValue.textContent = slider.value  // Обновляем значение элемента #slider_value при изменении ползунка
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

//Получение результата на 'серверной' части
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
        income = `+${(bet * userCf).toFixed(1)}`
        resultInf = 'You Win!'
        resultVal='win'
        // console.log('win')
    } else{
        money -= bet
        income = `-${bet}`
        resultInf = 'You Lose('
        resultVal='lose'
        // console.log('lose')
    }
    incomingInfo()
    resultInfo()
}

//Показ второго числа перед новым раундом
function autopsy(){
    envisioned.textContent=envisionedNum
    timeoutInProgress=true
    setTimeout(()=>{
        envisioned.textContent='?',
        isBtnEnable=true
    }, timeOut)
    // console.log('NewRound')
}

//Проверка на попытку начать игру без выбора ответа
function checkAnswerValid(){
    if(selection=='nothing' && !isMessageSend){
        allertMsg.insertAdjacentHTML('beforeend',
        `            
        <span class="allert_msg"">You didn't make an assumption!</span>
        `
        )
        isMessageSend=true
        setTimeout(()=>{
            const insertMsg = allertMsg.querySelector('span')
            insertMsg.remove()
            isMessageSend=false
        }, timeOut)
        isGame=false
        bet=0
    }
}

//Проверка на попытку сделать ставку = 0
function checkBet(){
    if (bet==0 && !isMessageSend){
        allertMsg.insertAdjacentHTML('beforeend',
        `            
        <span class="allert_msg"">The bet cannot be zero!</span>
        `
        )
        isMessageSend=true
        setTimeout(()=>{
            const insertMsg = allertMsg.querySelector('span')
            insertMsg.remove()
            isMessageSend=false
        }, timeOut)
        isGame=false
    }
}

//Проверка на отрицательный баланс с дальнейшим перебросом на страницу проигрыша и предложением перезагрузить страницу
function checkBalance(){
    if (money<=1){
        mainPage.style.display = 'none'
        lostPage.insertAdjacentHTML('beforeend',
        `
        <div class="no_balance">
            <h1>You lost!</h1> 
            <h2>Your balance has gone negative.</h2>
            <h2>To start a new game click on the button below.</h2>
            <button id="restart">RESTART</button>
        </div>
        `
        )
        const restartBtn = document.querySelector('#restart')
        restartBtn.addEventListener('click', function(){
            window.location.reload()
        })
    }
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
    coefficientSelection(initNum)       //Задание коэффициентов
    ans = ''                            //Обнуление выбора и ответа
    getAnswer(initNum, envisionedNum)   //Получаем правильный ответ
    checkBalance()                      //Проверка на отрицательный баланс
}

//Обработка введенных значений и получение результата
playBtn.addEventListener('click', ()=>{
    bet = slider.value
    if (isBtnEnable){
        isBtnEnable=false
        checkBet()
        checkAnswerValid()
        if (isGame){
        autopsy()
        } else {
            isBtnEnable=true
        }
        setTimeout(()=>{game()}, timeOut)
        result()   
        lastGameInfo()
        balanceSet()
        // console.log(`user input ${selection}, 
        // init number - ${initNum}, 
        // envisioned - ${envisionedNum}. 
        // Answer = ${ans}. Bet - ${bet}. 
        // Cf - ${userCf}. 
        // Valid ans - ${ans}.
        // income = ${income}`)
    }
})
