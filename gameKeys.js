const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')

const board = document.querySelector('#desk')
const board_width = parseInt(window.getComputedStyle(board).getPropertyValue('width'))
const board_height = parseInt(window.getComputedStyle(board).getPropertyValue('height'))

const actor = document.querySelector('.cappuccini')
const actor_width = parseInt(window.getComputedStyle(actor).getPropertyValue('width'))

const score = document.querySelector('.score')
const timer = document.querySelector('.timer')

let coffee_counter = 0
let lostCoffee = 0

let id_number = 0
let t_id = 0

let timer_sec = 0
let timer_min = 0

let interval = 1600

let left = 0
let right = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})


document.onkeydown = function (event) {

    const actor_move = parseInt(window.getComputedStyle(actor).getPropertyValue('left'))


    if (event.key === "ArrowRight") {
        actor.classList.add('right')
        actor.style.left = left + 'px'

        if (actor_move < board_width - 80) {
            left += 10
        }
    }
    else if (event.key === "ArrowLeft") {
        if (actor.classList.contains('right')) {
            actor.classList.remove('right')
        }
        actor.style.left = left + 'px'
        if (actor_move > 10) {
            left -= 10
        }
    }

    else if (event.key === " ") {
        screens[1].classList.add('up')

        let countTime = setInterval (function () {
            timer_sec++
            if (timer_sec === 60) {
                timer_min++
                timer_sec = 0
            }
            else if (timer_sec === 40) {
                if (interval > 800) {
                    interval -= 100
                }
            }
        }, 1000)



        //for coffee items
        let coffee_timer = setTimeout(function dropCoffee() {
            const n = getRandomNumber ()

            const coffee = document.createElement('div')
            coffee.classList.add('coffee')
            coffee.classList.add(`c${n}`)

            coffee.id = `coffee${id_number}`
            const x = getRandomPosition()
            coffee.style.left = `${x}px`

            board.append(coffee)
            id_number++

            setInterval(function () {
                const coffee_top = parseInt(window.getComputedStyle(coffee).getPropertyValue('top'))
                const actor_left = parseInt(window.getComputedStyle(actor).getPropertyValue('left'))
                const coffee_left = parseInt(window.getComputedStyle(coffee).getPropertyValue('left'))

                if (500 > coffee_top && coffee_top> 400 && actor_left - 35 < coffee_left && coffee_left < (actor_left + 60) ) {
                    document.getElementById(coffee.id).remove()
                    coffee_counter++
                }
                else if ((board_height - 25) < coffee_top && board_height >= coffee_top) {
                    document.getElementById(coffee.id).remove()
                    lostCoffee++
                }
            }, 10)

            coffee_timer = setTimeout(dropCoffee, interval)

        }, interval) 

        //for trash items
        let trash_timer = setTimeout(function dropTrash() {
            const n = getRandomNumber ()

            const trash = document.createElement('div')
            trash.classList.add('trash')
            trash.classList.add(`t${n}`)

            trash.id = `trash${t_id}`
            const x = getRandomPosition()
            trash.style.left = `${x}px`

            board.append(trash)
            t_id++

            setInterval(function () {
                const trash_top = parseInt(window.getComputedStyle(trash).getPropertyValue('top'))
                const actor_left = parseInt(window.getComputedStyle(actor).getPropertyValue('left'))
                const trash_left = parseInt(window.getComputedStyle(trash).getPropertyValue('left'))

                if (500 > trash_top && trash_top> 400 && actor_left - 35 < trash_left && trash_left < (actor_left + 60) ) {
                    document.getElementById(trash.id).remove()
                    clearInterval(trash_timer)
                    clearInterval(coffee_timer)
                    clearInterval(countTime)
                    removeItems()
                    coffee_counter = coffee_counter
                    gameOver()

                }
                else if ((board_height - 25) < trash_top && board_height >= trash_top) {
                    document.getElementById(trash.id).remove()
                }

            }, 10)
            
            trash_timer = setTimeout(dropTrash, 1900 + interval)

        },  1900 + interval)

    }
    
    
};

function getRandomPosition () {
    max = board_width - 50
    min = 50
    return Math.round(Math.random() * (max - min) + min)
}

function scoreAndTimer (valueS, valueTM, valueTS) {
    score.innerHTML = `${valueS}`
    if (valueTM < 10 && valueTS < 10) {
        timer.innerHTML = `0${valueTM}:0${valueTS}`
    }
    else if (valueTS < 10) {
        timer.innerHTML = `${valueTM}:0${valueTS}`
    }
    else if (valueTM < 10){
        timer.innerHTML = `0${valueTM}:${valueTS}`
    }    
    else {
        timer.innerHTML = `${valueTM}:${valueTS}`
    }
}

function gameOver () {
    screens[2].classList.add('up')
    scoreAndTimer (coffee_counter, timer_min, timer_sec)
}

function removeItems () {
    const coffee_all = document.querySelectorAll('.coffee')
    for (let i = 0; i < coffee_all.length; i++) {
        coffee_all[i].classList.add('hide')
    }

}

function getRandomNumber () {
    max = 4
    min = 0
    return Math.round(Math.random() * (max - min) + min)
}