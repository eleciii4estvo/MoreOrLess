const init = document.querySelector("#init")
const envisioned = document.querySelector("#envisioned")
const cfLess = document.querySelector("#coefficient_in_game_less")
const cfMore = document.querySelector("#coefficient_in_game_more")
const cfEqually = document.querySelector("#coefficient_in_game_equally")
const lessButton = document.querySelector("#less");
const equallyButton = document.querySelector("#equally");
const moreButton = document.querySelector("#more");
const balanceField = document.querySelector("#balance")
const allertMsg = document.querySelector("#allert_message")
const slider = document.querySelector("#slider")
const sliderValue = document.querySelector("#slider_value")
const mainPage = document.querySelector(".wrapper")
const lostPage = document.querySelector(".lost_window")
const playBtnField = document.querySelector(".play_btn_field")
let playBtn = ''
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
const lastGameIncomeInfo = document.querySelector("#income")
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
let resultVal = ''
let isGame = true
let income = ''
let resultInf = ''
let isBtnready = false
let isTimeOut = false
let isInRangeBet = true


function animationReset(element, animation){
    element.classList.remove(animation)
    setTimeout(function() {
        element.classList.add(animation)
      }, 100)

}

//Проверка на верную ставку и проставленое предположение
function checkCorrectInput(){
    if (slider.value!=0 && selection!='nothing' && !isBtnready && !isTimeOut && isInRangeBet){
        playBtnField.insertAdjacentHTML('beforeend',
        `            
        <button class="play_button animate__animated animate__flipInX" id="play_btn">PLAY</button>
        `
        )
        playBtn = document.querySelector("#play_btn")
        isBtnready=true
        //Обработка введенных значений и получение результата
        playBtn.addEventListener('click', ()=>{
            isTimeOut=true
            resultInf=''
            bet = slider.value
            playBtn.remove()
            isBtnready=false
            autopsy()
            setTimeout(()=>{game()}, timeOut)
            animationReset(envisioned, 'animate__tada')
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
        })
    } 
}

//Отображение баланса и задание рэнджа слайдера
function balanceSet(){
    balanceField.textContent = money.toFixed(1) //Задание баланса
    slider.setAttribute("max", money)           //Задание рэнджа для слайдера
}

balanceSet()

//Первый раунд после загрузки страницы
game()

function lastGameInfo(){
    lastGameResult.textContent = resultVal
    lastGameIncomeInfo.textContent = income
    lastGameInitial.textContent = initNum
    lastGameEnvisioned.textContent = envisionedNumLast
    lastGameGuess.textContent = selection
    lastGameBet.textContent = bet
    lastGameCoefficient.textContent = userCf
    lastGameTime.textContent = time.toLocaleTimeString()
}

//Функция, которая выводит около баланса информацию о том сколько денег прибавилось/отнялось
function incomingInfo(){
    lastGameIncome.insertAdjacentHTML('beforeend',
    `            
    <p class="last_income">${income}</p>
    `
    )
    setTimeout(()=>{
        const insertMsg = lastGameIncome.querySelector('.last_income')
        insertMsg.remove()
    }, timeOut)
}

//Функция, которая выводит информациб о выигрыше или проигрыше каждый раунд
function resultInfo(){
    playBtnField.insertAdjacentHTML('beforeend',
    `            
    <h2 class="result_text animate__animated animate__fadeInDown">${resultInf}</h2>
    `
    )
    setTimeout(()=>{

        const insertMsg = document.querySelector('.result_text')
        insertMsg.remove()
        btnClassCleaner()
    }, timeOut)
}

slider.addEventListener("input", function () {
    sliderValue.value = slider.value  // Обновляем значение элемента #slider_value при изменении ползунка
    playButton = checkCorrectInput()
    if (slider.value==0){
        playBtn.remove()
        checkCorrectInput()
        isBtnready=false
    }
  })

sliderValue.addEventListener("input",function (event) {
    slider.value = sliderValue.value
    isInRangeBet=true
    playButton = checkCorrectInput()
    if(sliderValue.value>money){
        slider.value=money
        playBtn.remove()
        isBtnready=false
    }
    if(sliderValue.value===""){
        slider.value=0
        playBtn.remove()
        isBtnready=false
    }
  })

function randomInitialNumber(){
    return Math.floor(Math.random() * 91) + 5   //От 5 до 95
}

function randomEnvisionedNumber(){
    return Math.floor(Math.random() * 100) + 1  //от 0 до 100
}

//Расчитывание коэффициентов
function coefficientSelection(initNum){
    lessProbability=(100-initNum)/100
    moreProbability=1 - lessProbability
    cfLessNum = lessProbability*4
    cfMoreNum = moreProbability*4
    cfLessNum<1 ? cfLessNum+=1 : cfLessNum=cfLessNum
    cfMoreNum<1 ? cfMoreNum+=1 : cfMoreNum=cfMoreNum
    cfLessNum = cfLessNum.toFixed(2)
    cfMoreNum = cfMoreNum.toFixed(2)
    cfLess.textContent=cfLessNum
    cfMore.textContent=cfMoreNum
}

// Обработчик события для кнопок
function handleButtonChange(event) {
    btnClassCleaner()
    if (event.target === lessButton) {
      selection = 'less'
      lessButton.classList.add('animate__flip')
      userCf = cfLessNum
    } else if (event.target === equallyButton) {
      selection = 'equally'
      equallyButton.classList.add('animate__flip')
      userCf = cfEqualNum
    } else {
      selection = 'more'
      moreButton.classList.add('animate__flip')
      userCf = cfMoreNum
    }
    checkCorrectInput()
  }

//Чистка классов у кнопок
function btnClassCleaner(){
    moreButton.classList.remove('animate__flip')
    lessButton.classList.remove('animate__flip')
    equallyButton.classList.remove('animate__flip')
    selection = 'nothing'
}

// Добавляем обработчик события к каждой кнопке
lessButton.addEventListener("click", handleButtonChange)
equallyButton.addEventListener("click", handleButtonChange)
moreButton.addEventListener("click", handleButtonChange)

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
    } else{
        money -= bet
        income = `-${bet}`
        resultInf = 'You Lose('
        resultVal='lose'
    }
    incomingInfo()
    resultInfo()
}

//Показ второго числа перед новым раундом
function autopsy(){

    envisioned.textContent=envisionedNum
    setTimeout(()=>{
        envisioned.textContent='?'

        isTimeOut=false
    }, timeOut)


    // console.log('NewRound')
}

//Проверка на отрицательный баланс с дальнейшим перебросом на страницу проигрыша и предложением перезагрузить страницу
function checkBalance(){
    if (money<=0){
        mainPage.style.display = 'none'
        lostPage.insertAdjacentHTML('beforeend',
        `
        <div class="no_balance">
            <h1>You lost!</h1> 
            <h2>Your balance is zero.</h2>
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
    sliderValue.value=0
    //Рандомное первое число
    initNum=randomInitialNumber()
    init.textContent=initNum
    //Выбор второго числа
    envisionedNum = randomEnvisionedNumber()
    envisionedNumLast = envisionedNum
    balanceSet()
    coefficientSelection(initNum)       //Задание коэффициентов
    ans = ''                            //Обнуление выбора и ответа
    getAnswer(initNum, envisionedNum)   //Получаем правильный ответ
    checkBalance()                      //Проверка на отрицательный баланс
}