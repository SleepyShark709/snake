// 用二维数组来控制蛇
// 监听键盘的按键，判断按了那个键就给数组 push 或者 pop

const log = console.log.bind(this)

const e = (selector) => {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        //
        return null
    } else {
        return element
    }
}


let snakeArr = [
    {
        x: 2,
        y: 0,
    },
    {
        x: 1,
        y: 0,
    },
    {
        x: 0,
        y: 0,
    }
]

let defaultFood = {
    x: '',
    y: '',
}

let snakeMoveState = 'right'

let timer = ''

const templateCell = (n, y) => {
    let t = ''
    for (let i = 0; i < n; i++) {
        let cell = y[i]
        if (cell === 1) {
            t += `<div class="cell sneak"  data-x="${i}" data-y="${y}"></div>`
        } else {
            t += `<div class="cell"  data-x="${i}" data-y="${y}"></div>`
        }
    }
    return t
}

const createRow = (n, y) => {
    let row = templateCell(n, y)
    return `<div class="row">${row}</div>`
}

const createContainer = (n) => {
    let container = document.querySelector('#id-div-mime')
    for (let i = 0; i < n; i++) {
        container.insertAdjacentHTML('beforeend', createRow(n, i))
    }
}

const bindEvent = () => {
    window.addEventListener('keydown', (e) => {
        let key = e['key']
        if (key === 'w') {
            // up
            // y + 1 , x 不变
            snakeMoveState = "up"
        } else if (key === 's') {
            snakeMoveState = "down"
        } else if (key === 'a') {
            // left
            // x - 1, y 不变
            snakeMoveState = "left"
        } else if (key === 'd') {
            // right
            // x + 1 , y 不变
            snakeMoveState = "right"
        }
    })
}

const renderSnake = () => {
    clearSnake()
    let snakeHead = snakeArr[0]
    if (snakeHead.x > 9 || snakeHead.x < 0 || snakeHead.y > 9 || snakeHead.y < 0) {
        alert('你死了')
        clearInterval(timer)
    } else {
        for (let i = 0; i < snakeArr.length; i++) {
            let c = snakeArr[i]
            let x = c.x
            let y = c.y
            let snake = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
            snake.classList.add('snake')
            if (i === 0) {
                // 当前是蛇头
                snake.classList.add('snakeHead')
            }
        }
    }
}

const clearSnake = () => {
    let snakes = document.querySelectorAll('.snake')
    for (let i = 0; i < snakes.length; i++) {
        let c = snakes[i]
        c.classList.remove('snake')
    }
    let snakesHead = document.querySelectorAll('.snakeHead')
    for (let i = 0; i < snakesHead.length; i++) {
        let c = snakesHead[i]
        c.classList.remove('snakeHead')
    }
}

const snakeMove = () => {
    if (snakeMoveState === 'up') {
        let new_location_x = snakeArr[0].x
        let new_location_y = snakeArr[0].y
        new_location_y -= 1
        let new_location = {x: new_location_x, y: new_location_y}
        // 这里要判断食物的地址
        snakeArr.splice(0, 0, new_location) // 把最新的蛇头添加到蛇数组里
        if (new_location_x === defaultFood.x && new_location_y === defaultFood.y) {
            let food = document.querySelector('.food')
            food.classList.remove('food')
            makeFood()
        } else {
            snakeArr.splice(snakeArr.length - 1, 1) // 如果没有吃到食物就删除最后一个元素
        }
        renderSnake()
    } else if (snakeMoveState === 'down') {
        // down
        // y -1 , x 不变
        let new_location_x = snakeArr[0].x
        let new_location_y = snakeArr[0].y
        new_location_y += 1
        let new_location = {x: new_location_x, y: new_location_y}
        // 这里要判断食物的地址
        snakeArr.splice(0, 0, new_location)
        if (new_location_x === defaultFood.x && new_location_y === defaultFood.y) {
            let food = document.querySelector('.food')
            food.classList.remove('food')
            makeFood()
        } else {
            snakeArr.splice(snakeArr.length - 1, 1) // 如果没有吃到食物就删除最后一个元素
        }
        renderSnake()
    } else if (snakeMoveState === 'left') {
        let new_location_x = snakeArr[0].x
        let new_location_y = snakeArr[0].y
        new_location_x -= 1
        let new_location = {x: new_location_x, y: new_location_y}
        // 这里要判断食物的地址
        snakeArr.splice(0, 0, new_location)
        if (new_location_x === defaultFood.x && new_location_y === defaultFood.y) {
            let food = document.querySelector('.food')
            food.classList.remove('food')
            makeFood()
        } else {
            snakeArr.splice(snakeArr.length - 1, 1) // 如果没有吃到食物就删除最后一个元素
        }
        renderSnake()
    } else if (snakeMoveState === 'right') {
        let new_location_x = snakeArr[0].x
        let new_location_y = snakeArr[0].y
        new_location_x += 1
        let new_location = {x: new_location_x, y: new_location_y}
        // 这里要判断食物的地址
        snakeArr.splice(0, 0, new_location)
        if (new_location_x === defaultFood.x && new_location_y === defaultFood.y) {
            let food = document.querySelector('.food')
            food.classList.remove('food')
            makeFood()
        } else {
            snakeArr.splice(snakeArr.length - 1, 1) // 如果没有吃到食物就删除最后一个元素
        }
        renderSnake()
    }
}

const snakeAutoMove = (start) => {
    timer = setInterval(() => {
        snakeMove()
    }, 200)
    if (start === false) {
        clearInterval(timer)
    }
}

const bindButtonEvent = () => {
    let start = document.querySelector('#id-button-start')
    let pause = document.querySelector('#id-button-pause')
    start.addEventListener('click', () => {
        snakeAutoMove(true)
    })
    pause.addEventListener('click', () => {
        clearInterval(timer)
    })
}

const makeFood = () => {
    let x = parseInt(Math.random() * 10)
    let y = parseInt(Math.random() * 10)
    let couldCreat = true
    for (let i = 0; i < snakeArr.length; i++) {
        let c = snakeArr[i]
        if (x === c.x || y === c.y) {
            couldCreat = false
        }
    }
    if (couldCreat) {
        let food = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
        defaultFood.x = x
        defaultFood.y = y
        food.classList.add('food')
    } else {
        makeFood()
    }
}


const __main = () => {
    let n = 10
    createContainer(n)
    renderSnake()
    bindEvent()
    bindButtonEvent()
    makeFood()
}
__main()