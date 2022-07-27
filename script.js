const generatePuzzle = document.getElementById('call_API')
const spinner = document.querySelector('.button')
const resetButton = document.querySelector('.reset')
const solveButton = document.getElementById('solve-button');
const gameOver = document.querySelector('.gameOver-alert')
const popup = document.querySelector('.popup')
const popup_time = document.querySelector('.pop-timing')
const gameOverCloseBtn = document.querySelector('#popup-close-gameOver')
const popup_close = document.getElementById('popup-close')

const popup_close_timing = document.getElementById('popup-close-timing')

popup_close_timing.addEventListener('click', ()=>{
    popup_time.classList.remove('pop')
    // window.location.reload()
})
const timer = document.getElementById('set-time')

gameOverCloseBtn.addEventListener('click', ()=>{
    gameOver.classList.remove('pop')
    
})

const beginner = document.getElementById('beginner')
const intermediate = document.getElementById('intermediate')
const hard = document.getElementById('hard')
const nightmare = document.getElementById('nightmare')

const options = document.getElementById('options')

let public_index = null

let grid_elements = []
let grid_9x9 = []

// The puzzle
const puzzleBoard = document.getElementById('puzzle');

popup_close.addEventListener('click', ()=>{
    popup.classList.remove('pop')
    window.location.reload()
})

timer.addEventListener('click', ()=>{ 
    popup_time.classList.add('pop')
    // alert("hel")
})

generatePuzzle.addEventListener('click', ()=>{
    let game_difficulty = 0
    popup.classList.add('pop')

    beginner.addEventListener('click', ()=>{
        game_difficulty = 70
        geneate_puzzle(grid_9x9, game_difficulty)
        popup.classList.remove('pop')
    })

    intermediate.addEventListener('click', ()=>{
        game_difficulty = 55
        geneate_puzzle(grid_9x9, game_difficulty)
        popup.classList.remove('pop')
    })

    hard.addEventListener('click', ()=>{
        game_difficulty = 40
        geneate_puzzle(grid_9x9, game_difficulty)
        popup.classList.remove('pop')
    })

    nightmare.addEventListener('click', ()=>{
        game_difficulty = 20
        geneate_puzzle(grid_9x9, game_difficulty)
        popup.classList.remove('pop')
    })
})

const loading_btn = document.querySelector(".button");
loading_btn.addEventListener("click", () => {
    loading_btn.classList.add("button--loading");
});

let selected_option = null

let level = 79
// Function to create API URL, fetch it and return the result which is a sudoku puzzle
function geneate_puzzle(grid_param, level){
    // spinner.classList.add('button--loading')
    
    generate_board(grid_param)
    generate_solution(grid_param)
    remove_board_numbers(grid_param, level)

    populate_grid(grid_param)
    generatePuzzle.disabled = true;
    generatePuzzle.style.backgroundColor = "rgba(104, 102, 102, 0.5)";
    generatePuzzle.style.cursor = "auto"
    resetButton.disabled = false
    solveButton.disabled = false
    timer_5.disabled = false
    timer_7.disabled = false
    timer_10.disabled = false
    timer.disabled = false
    generate_options()
}
let solution = false;
solveButton.disabled = true
timer.disabled = true
solveButton.addEventListener('click', ()=>{
    solution = true
    generate_solution(grid_9x9)
    populate_grid(grid_9x9)
    timer_5.disabled = true
    timer_7.disabled = true
    timer_10.disabled = true
    if(msLeft > 1){
        generateTime(0, 0)
    }
    
})

function validate_input2(index, row, col, grid) {
    if(isColSafe(grid, col, index) &&
    isRowSafe(grid, row, index) &&
    isBoxSafe(grid, row - row%3, col - col%3, index)) {
        return true;
    }
    return false
}

// Function to check values: validate column - row - 3X3
function validate_input(index, row, col, grid) {
    
    if(isColSafe(grid, col, index) &&
    isRowSafe(grid, row, index) &&
    isBoxSafe(grid, row - row%3, col - col%3, index)) {
        grid_elements[row][col].value = index
        grid_elements[row][col].innerText = grid_elements[row][col].value

        if(selected_option !== null){
            selected_option.classList.remove("number-selected");
        }
        selected_option = null;
    }
    else{
        console.log(index + " is wrong")
        //grid[row][col].style.backgroundColor = "#fff"
        grid[row][col].classList.add('animate')
        setTimeout(function() {
            grid[row][col].classList.remove('animate');},3000);
    }
    if(selected_option !== null) {
        selected_option.classList.remove("number-selected");
    }
    
    selected_option = null;
    return true
}

// maybe using grid would be better?
const isRowSafe = (grid, row, index)=> {
    for (let col = 0; col < 9; col++) {
        if (grid[row][col].value === index) {
            return false;
        }
    }
    return true;
}

// check duplicate number in col
const isColSafe = (grid, col, index) => {
    for (let row = 0; row < 9; row++) {
        if (grid[row][col].value === index) {
            return false;
        }
    }
    return true;
}

const isBoxSafe = (grid, box_row, box_col, index) => {
    //alert("this is box")
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (grid[row + box_row][col + box_col].value === index){
                return false;
            } 
        }
    }
    return true;
}

resetButton.disabled = true
resetButton.addEventListener('click', clearCells)
//Reset cells to blank
function clearCells(){
    window.location.reload()
    // zeroise_grid_elements(grid_elements)
    // zeroise_grid_9x9(grid_9x9)
    // generatePuzzle.disabled = false;
    // generatePuzzle.style.backgroundColor = "#007a63"
    // generatePuzzle.style.cursor = "pointer"
}

const temp = document.getElementById('temp')
// generate puzzle

function generate_options(){
    //Populate values in the grid
    for(let i = 1; i <= 9; i++){
        let number = document.createElement('span')
        number.id = i
        number.innerText = i
        number.classList.add('single_option')
        options.appendChild(number);
        number.addEventListener('click', select_option);
    }
}
const create_grid_9x9 = function(){
    for(let i = 0; i < 9; i++){
        grid_elements.push([]);
        for(let j = 0; j < 9; j++){
            grid_elements[i][j] = document.createElement('div')
            // cells[i][j].classList.add('style')
            grid_elements[i][j].classList.add('input-style')
            grid_elements[i][j].addEventListener('click', function(){
                if(public_index === null && mins === undefined){
                    alert("Please select an option")
                    return
                }else if(public_index === null && mins === 0){ 
                    return
                }
                console.log("Index: "+ public_index)
                console.log("Row: "+i)
                console.log("Column : "+j)
                if(solution === false){
                    validate_input(public_index, i, j, grid_elements)
                }
                else{
                    return
                }
                
            })
            if( (i <= 2 && j <= 2)||
                (i <=2  && j > 5 && j <= 8)||
                (i > 2 && i < 6  && j > 2 && j < 6)||
                (i > 5 && i <= 8  && j >= 0 && j < 3)||
                (i > 5 && i <= 8  && j > 5 && j <= 8)
            
            ){
                grid_elements[i][j].classList.add('odd-section')
            }
            puzzleBoard.appendChild(grid_elements[i][j])
        }
    }
    zeroise_grid_elements(grid_elements)
}

let box_row = 0
let box_col = 0

function select_option(){
    let parsed_option = null
    if (selected_option != null) {
        selected_option.classList.remove("number-selected");
    }
    selected_option = this;
    selected_option.classList.add("number-selected");
    parsed_option = parseInt(selected_option.innerText)
    public_index = parsed_option
}

const input_cells = puzzleBoard.querySelectorAll('div')


const zeroise_grid_elements = (grid_param) =>{
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            grid_param[i][j].value = 0
            grid_param[i][j].innerText = ''
        }
    }
}

const zeroise_grid_9x9 = (grid_param) =>{
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            grid_param[i][j] = 0
        }
    }
}

const populate_grid = (puzzle_param) =>{
    let counter = 0
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            grid_elements[i][j].value = puzzle_param[i][j]
            if(puzzle_param[i][j] !== 0){               
                grid_elements[i][j].innerText = grid_elements[i][j].value
            }
            counter +=1
        }
    }
}

const timer_5 = document.querySelector('#time-btn-5')
const timer_7 = document.querySelector('#time-btn-7')
const timer_10 = document.querySelector('#time-btn-10')

// timer_5.disabled = true
// timer_7.disabled = true
// timer_10.disabled = true

const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));
let seconds = 60
let millSec = 1000
let min = 1

const submitTime = document.querySelector('#setTime')

submitTime.addEventListener('click', function (){
    
    if(document.querySelector('#time-btn-5').checked){
        min = 0.1
    }else if(document.querySelector('#time-btn-7').checked){
        min = 7
    }else if(document.querySelector('#time-btn-10').checked){
        min = 10
    }
    generateTime(min, 0)
    timeUpAlert(min)
    popup_time.classList.remove('pop')
})

async function timeUpAlert(minParam){
    let minutes = minParam * seconds * millSec
    
    wait(minutes).then(() => {
        console.log("waited for 6 seconds");
        gameOver.classList.add('pop')
     })
 }

// timer_7.addEventListener('click', function (){
//     generateTime(7, 0 )
//     popup_time.classList.remove('pop')
// })

// timer_10.addEventListener('click', function (){
//     generateTime(10, 0 )
//     popup_time.classList.remove('pop')
// })

var element, endTime, hours, mins, msLeft, time;
element = document.getElementById('counter');
async function generateTime(minutes, seconds ) {
    function twoDigits( n ) {
        return (n <= 9 ? "0" + n : n);
    }
    function updateTimer() {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "Time up!";
            // popup_time.classList.add('pop');
            options.style.display = "none"
            timer_5.disabled = true
            timer_7.disabled = true
            timer_10.disabled = true

            
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500

    updateTimer();
    return;
}

function nextEmptySpot(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === 0)
                return [i, j];
        }
    }
    return [-1, -1];
}


let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const difficulty = 30;

function generate_board(board){
    if(board.length === 0){
        for(let row = 0; row < 9; row++) {
            board.push([])
            for(let col = 0; col < 9; col++){
                board[row][col] = 0
            }
        }
    } 
}


function checkRow(board, row, value){
    for(var i = 0; i < board[row].length; i++) {
        if(board[row][i] === value) {
            return false;
        }
    }
    return true;
}

function checkColumn(board, column, value){
    for(var i = 0; i < board.length; i++) {
        if(board[i][column] === value) {
            return false;
        }
    }
    return true;
};

function checkSquare(board, row, column, value){
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(column / 3) * 3;
    
    for (var r = 0; r < 3; r++){
        for (var c = 0; c < 3; c++){
            if (board[boxRow + r][boxCol + c] === value)
                return false;
        }
    }
    return true;
};

function checkValue(board, row, column, value) {
    if(checkRow(board, row, value) &&
      checkColumn(board, column, value) &&
      checkSquare(board, row, column, value)) {
        return true;
    }
    return false; 
};


function generate_solution(board) {  
    let emptySpot = nextEmptySpot(board);
    let row = emptySpot[0];
    let col = emptySpot[1];
    // there is no more empty spots
    if (row === -1) {
        return board;
    }

    for(let i = 0; i < shuffledNumbers.length; i++){
        let option = shuffledNumbers[i]

        if (checkValue(board, row, col, option)){
            board[row][col] = option;
            generate_solution(board);
        }
    }

    if (nextEmptySpot(board)[0] !== -1)
        board[row][col] = 0;
    return board;
}

function remove_board_numbers(board, level) {
    let non_empty_squares = []
    non_empty_squares = get_nonEmpty_cells(board)

    let rounds = 81
    let index1 = 0;
    let index2 = 1;

    non_empty_squares.sort(function () {
        return Math.random() - 0.5;
    });
    while(rounds >= level) {
        
        let row = non_empty_squares[index1]
        let col = non_empty_squares[index2]
        index1 +=1
        index2 +=1

        board[row][col] = 0
        rounds -=1
    }
}

function get_nonEmpty_cells(board){
    let non_empty_squares_row = []
    let non_empty_squares_col = []
    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++){
            if(board[row][col] !== 0){
                // return [row, col]
                non_empty_squares_row.push(row)
                non_empty_squares_col.push(col)
            }
        }
    }
    non_empty_squares_row.sort(function () {
        return Math.random() - 0.5;
    });
    non_empty_squares_col.sort(function () {
        return Math.random() - 0.5;
    });
    return non_empty_squares_row, non_empty_squares_col
}


let shuffledNumbers = numbers.sort(function () {
  return Math.random() - 0.5;
});


init = ()=>{
    create_grid_9x9()
}
init()