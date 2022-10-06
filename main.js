// ---------------------- Сбор данных и вывод кнопок на страницу ---------------------- //

const banknoteOnPage = document.querySelector('.selectBanknote')
const amountPage = document.querySelector('.amountPage')
const statusPage = document.querySelector('.statusPage')
const addBanknote = document.querySelector('.addBanknote')
const showBanknote = document.querySelector('.buttons')
const stateBanknote = []
let totalTime;
const addBanknoteOnPage = (event) => {

    stateBanknote.push(
        {
            banknote: Number(banknoteOnPage.value), 
            amount: Number(amountPage.value), 
            status: statusPage.value
        }
    )

    showBanknote.insertAdjacentHTML('beforeend', buttonsMarkup(banknoteOnPage.value))
    
    

    stateBanknote.sort((x, y) => y.banknote - x.banknote)
    console.log(stateBanknote)
}

addBanknote.addEventListener('click', addBanknoteOnPage)

const buttonsMarkup = (prop) => {
    return `<button class='banknoteOnPage' >${prop}</button>`
}

// ---------------------- Сбор данных и вывод кнопок на страницу // ---------------------- //





// ---------------------------- Вычисление ---------------------------- //

const getMoney = (amount, banknotes = [
    // {banknote: 5000, amount: 2, status: 'Исправен'}, 
    // {banknote: 2000, amount: 3, status: 'Исправен'}, 
    // {banknote: 1000, amount: 2, status: 'Исправен'}, 
    // {banknote: 500, amount: 2, status: 'Исправен'}, 
    // {banknote: 200, amount: 2, status: 'Исправен'}, 
    {banknote: 100, amount: 1, status: 'Исправен'}, 
    {banknote: 50, amount: 2, status: 'Исправен'},
    {banknote: 10, amount: 4, status: 'Исправен'}
]) => {

    let startTime = new Date().getMilliseconds()
    // Сюда возвращаем полученный результат
    let result = [];
    
    const currentBanknotes = []
    banknotes.map((el) => {
        currentBanknotes.push(
            {banknote: el.banknote, amount: el.amount, status: el.status}
        )
    })

    let currentAmount = amount
    let totalSum = 0

    // Получаем последнее число вводимой суммы
    let checkAmount = Number(String(amount).split('').pop());

    // Получаем общую сумму денег в банкомате
    banknotes.map((num) => {totalSum = totalSum + num.banknote * num.amount});

    // Проверка на корретный ввод суммы
    if (checkAmount != 0) {
        console.log('Введите корретную сумму')
        return false
    }
    // Проверка наличия запрашиваемой суммы
    else if (totalSum < amount) {
        console.log('В банкомате недостаточно денег', totalSum)
        return 'В банкомате недостаточно денег'
    } 
    // Вычислением нужных купюр для выдачи
    else {
        currentBanknotes.map((num, i) => {
            let amountBanknote = num.amount;
            while (currentAmount >= num.banknote) {

                if (amountBanknote === 0) {
                    num.status = 'Неисправен'
                    break

                } else {
                    currentAmount = currentAmount - num.banknote
                    result.push(num.banknote)
                    amountBanknote = amountBanknote - 1
                    amountBanknote === 0 ? num.status = 'Неисправен' : true
                }
            }
            // Запись текущего кол-ва банкнот
            num.amount = amountBanknote
            // console.log(`Current amount of banknote ${num.banknote}--> `, num.amount)
        })
    }

    // Вот с этой проверкой немного застопорился. 
    // Тут нужно выдать ответ на случай, если в банкомате есть только банкнота в 500, а снимают 200
    console.log(result)
    if (result.length === 0) {
        if (result != amount) {
            console.log('Нет таких банкнот')
            console.log('Выходные данные --> ', banknotes)
            return result = 'Нехватает нужных банкнот. Выберите другую сумму'
        } else {
            result.join(', ')
            currentBanknotes.map((el, index) => {
                stateBanknote[index].amount = el.amount
                stateBanknote[index].status = el.status
            })
        }
    } else {
        result.reduce((a=0, b=0) => a + b) != amount ? 
        {
            one: console.log('Нет таких банкнот'), 
            three: console.log('Выходные данные --> ', banknotes), 
            two: result = 'Нехватает нужных банкнот. Выберите другую сумму', 
        }
        : {
            one: result.join(', '), 
            two: currentBanknotes.map((el, index) => {
                stateBanknote[index].amount = el.amount
                stateBanknote[index].status = el.status
            }), 
            three: console.log('Выходные данные --> ', banknotes)
        }
    }
    let startEnd = new Date().getMilliseconds()
    totalTime = startEnd - startTime
    return result
}

// getMoney(240)

// ---------------------------- Вычисление // ---------------------------- //




// ---------------------------- Вывод выданных денег на страницу ---------------------------- //

const getSum = document.querySelector('.getSum')
const toGet = document.querySelector('.toGet')
const numOnPage = document.querySelectorAll('.banknoteOnPage')

let totalSum = 0;

window.addEventListener('click', (event) => {
    if (event.target.className === 'banknoteOnPage') {
        totalSum = 0
        totalSum = totalSum + Number(event.target.innerText)

        getSum.value = Number(getSum.value) + totalSum
        
        console.log(totalSum)
    }
})

const getSumFunction = (event) => {
    // console.log(Number(getSum.value))
    return Number(getSum.value)
}
const takeBanknote = document.querySelector('.done')

toGet.addEventListener('click', () => {
    takeBanknote.innerHTML = `Вывод: ${getMoney(getSumFunction(), stateBanknote)} <br>Сумма: ${getSumFunction()}.руб <br> Время: ${totalTime} ms`;
})