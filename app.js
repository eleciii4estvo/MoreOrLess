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
const langBtnRu = document.querySelector("#btn_ru")
const langBtnEn = document.querySelector("#btn_en")
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
let userCf
let envisionedNum = 0
let envisionedNumLast
let initNum
let selection = 'nothing'
let ruSelection = ''
let ans = ''
let money = 1000
let bet
let resultVal = ''
let ruResultVal =''
let isGame = true
let income = ''
let resultInf = ''
let isBtnready = false
let isTimeOut = false
let isInRangeBet = true
let currentLang = 'ru'

//Мультиязычность
const languages = {
    'balance_header':{
        ru:'Баланс:',
        en:'Balance:'
    },
    'rules':{
        ru:'Правила',
        en:'Rules'
    },
    'rules_item_1':{
        ru:'1. В верхем квадрате появляется число от 0 до 100.',
        en:'1. A number from 0 to 100 appears in the top square.'
    },
    'rules_item_2':{
        ru:'2. Вы выбираете, какое число спрятанно за знаком вопроса "?": больше, меньше или равно текущему.',
        en:'2. You choose which number is hidden behind the question mark "?": greater than, less than or equal to the current number.'
    },
    'rules_item_3':{
        ru:'3. Вводите свою ставку.',
        en:'3. Enter your bet.'
    },
    'rules_item_4':{
        ru:'4. Коэффициент зависит от того, какое число с большей вероятностью выпадет следующим. Однако на вариант "равно" коэффициент всегда одинаковый = 98',
        en:'4. The odds depend on which number is more likely to come up next. However, the odds are always the same for the "equal" option = 98'
    },
    'rules_item_5':{
        ru:'5. После нажатия на кнопку "играть" выпадет следующий номер и результат игры.',
        en:'5. After clicking on the "play" button, the next number and the result of the game will fall out.'
    },
    'rules_item_6':{
        ru:'6. В правом углу экрана можно увидеть историю последней игры.',
        en:'6. In the right corner of the screen you can see the history of the last game.'
    },
    'guess_less':{
        ru:'меньше',
        en:'less'
    },
    'guess_equals':{
        ru:'равно',
        en:'equals'
    },
    'guess_more':{
        ru:'больше',
        en:'more'
    },
    'bet_label':{
        ru:'СТАВКА',
        en:'BET'
    },
    'last_game':{
        ru:'Последняя игра',
        en:'Last game'
    },
    'last_game_item_1':{
        ru:'Результат: ',
        en:'Result: '
    },
    'last_game_item_2':{
        ru:'Доход: ',
        en:'Income: '
    },
    'last_game_item_3':{
        ru:'Исходное: ',
        en:'Initial: '
    },
    'last_game_item_4':{
        ru:'Загаданное: ',
        en:'Envisioned: '
    },
    'last_game_item_5':{
        ru:'Предположение: ',
        en:'Guess: '
    },
    'last_game_item_6':{
        ru:'Ставка: ',
        en:'Bet: '
    },
    'last_game_item_7':{
        ru:'Коэффициент: ',
        en:'Coefficient: '
    },
    'last_game_item_8':{
        ru:'Время: ',
        en:'Time: '
    },
    'footer_item_1':{
        ru:'Данный сайт является учебным проектом и не предназначен для коммерческого использования. Игра, представленная на сайте, предназначена только для образовательных целей, а все виртуальные деньги, предоставляемые пользователям, носят исключительно виртуальный характер.',
        en:'This website is a training project and is not intended for commercial use. All games featured on this website are designed for educational purposes only, and all virtual money given to users is of a virtual nature only.'
    },
    'footer_item_2':{
        ru:'Этот сайт размещен на GitHub Pages. GitHub Pages предоставляет бесплатный хостинг для статических сайтов. Более подробную информацию о GitHub Pages можно получить на их официальном сайте.',
        en:'This site is hosted on GitHub Pages. GitHub Pages provides free hosting for static websites. You can learn more about GitHub Pages on their official website.'
    },
    'footer_item_3':{
        ru:'2023 Eleciii4estvo, все права защищены.',
        en:'2023 Eleciii4estvo, all rights reserved.'
    }
}

function changeLang(){
    for (const key in languages) {
        const el = document.querySelector(`[data-lang=${key}]`)
        if(el){
            el.textContent=languages[key][currentLang];
        }
    }
    lastGameInfo()
}
changeLang()

function clearLangClasses(){
    langBtnRu.classList.remove('animate__swing')
    langBtnEn.classList.remove('animate__swing')
}

function startLang(){
    if(currentLang==="ru"){
        langBtnRu.classList.add('animate__swing')
    } else{
        langBtnEn.classList.add('animate__swing')
    }
}

startLang()

function chooseLang(event){
    if(event.target===langBtnRu){
        clearLangClasses()
        currentLang="ru"
        langBtnRu.classList.add('animate__swing')
        changeLang()
    } else{
        clearLangClasses()
        currentLang="en"
        langBtnEn.classList.add('animate__swing')
        changeLang()
    }
}

langBtnEn.addEventListener("click", chooseLang)
langBtnRu.addEventListener("click", chooseLang)

//Перезапуск анимации
function animationReset(element, animation){
    element.classList.remove(animation)
    setTimeout(function() {
        element.classList.add(animation)
      }, 100)

}

//Проверка на верную ставку и проставленое предположение
function checkCorrectInput(){
    if (slider.value!=0 && selection!='nothing' && !isBtnready && !isTimeOut && isInRangeBet){
        if(currentLang=='ru'){
            playBtnField.insertAdjacentHTML('beforeend',
            `            
            <button class="play_button animate__animated animate__flipInX" id="play_btn">ИГРАТЬ</button>
            `
            )
        } else{
            playBtnField.insertAdjacentHTML('beforeend',
            `            
            <button class="play_button animate__animated animate__flipInX" id="play_btn">PLAY</button>
            `
            )
        }       
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
    currentLang==='ru' ? lastGameResult.textContent = ruResultVal : lastGameResult.textContent = resultVal
    lastGameIncomeInfo.textContent = income
    lastGameInitial.textContent = initNum
    lastGameEnvisioned.textContent = envisionedNumLast
    currentLang==='ru' ? lastGameGuess.textContent = ruSelection : lastGameGuess.textContent = selection
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
    cfLessNum = lessProbability*5
    cfMoreNum = moreProbability*5
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
      ruSelection = 'меньше'
      lessButton.classList.add('animate__flip')
      userCf = cfLessNum
    } else if (event.target === equallyButton) {
      selection = 'equally'
      ruSelection = 'равно'
      equallyButton.classList.add('animate__flip')
      userCf = cfEqualNum
    } else {
      selection = 'more'
      ruSelection = 'больше'
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
        if(currentLang=='ru'){
            resultInf = 'Победа!'
        } else{
            resultInf = 'You Win!'
        }
        resultVal='win'
        ruResultVal='победа'
    } else{
        money -= bet
        income = `-${bet}`
        if(currentLang=='ru'){
            resultInf = 'Проигрыш'
        } else{
            resultInf = 'You lose'
        }
        resultVal='lose'
        ruResultVal='проигрыш'
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
    if (money<=1){
        mainPage.style.display = 'none'
        if(currentLang=='ru'){
            lostPage.insertAdjacentHTML('beforeend',
            `
            <div class="no_balance">
                <h1>Ты проиграл!</h1> 
                <h2>Ваш баланс меньше единицы, что меньше минимальной ставки.</h2>
                <h2>Чтобы начать новую игру, нажмите на кнопку ниже.</h2>
                <button id="restart">Новая игра</button>
            </div>
            `
            )
        } else{
            lostPage.insertAdjacentHTML('beforeend',
            `
            <div class="no_balance">
                <h1>You lost!</h1> 
                <h2>Your balance is less than one, which is less than the minimum bet.</h2>
                <h2>To start a new game click on the button below.</h2>
                <button id="restart">RESTART</button>
            </div>
            `
            )
        }
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