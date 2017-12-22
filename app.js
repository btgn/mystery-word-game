const yargs = require('yargs')
const inquirer = require('inquirer')
const easy = require('./words.js').easy
const hard = require('./words.js').hard

let choose = require("chosen").choose
let ansiAlign = require('ansi-align')
let chalk = require('chalk')
let wrong = chalk.bold.red, correct = chalk.bold.green, board = chalk.bold.yellow, view = chalk.bold.blue

module.exports.run = (txt) => {
    const mystery_word = new MysteryWordGame()
    mystery_word.init(txt)
}

class MysteryWordGame {
    constructor()
    {
       this.counter = 5
       this.blanks = []
       this.word = ''
       this.input_word = ''
       this.dum = '', this.dum1 = ''
       this.guessed = []
       this.array = []
       this.remain = 0
   }
   init(txt) {
    if(txt === 'easy'){
        this.EasyGame()
    }
    else if(txt ==='hard'){
        this.HardGame()
    }
}

Guessing(str){
    inquirer.prompt([{
        type: 'input',
        name: 'guess',
        message: 'Guess a letter : '
    }]).then((input) => {
        this.guessed.push(input.guess)
        this.ConsoleInput(input.guess,str)
    })
}

GetHint(str){
    const clue = []
    for(let i = 0; i < str.length; i++) {
        if(!clue[str[i]])
            clue[str[i]] = 0
        ++clue[str[i]]
    }
    for(let j = 0; j < str.length; j++){
        if(clue[str[j]] < 2){
            this.dum = str.charAt(j)
            // this.count++
        }
        else if (clue[str[j]] >= 2 && this.remain <= 0){
            this.dum = str.charAt(j)
        }
        let index = this.dum1.indexOf(this.dum)
        if(index < 0){
         this.dum1 = this.dum1 + this.dum
         this.guessed.push(this.dum)
         this.remain-=1
         this.ConsoleInput(this.dum, str)
         break;
     }
 }
}

GuessLetter(str){
    console.log(view(ansiAlign.center('\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n')))
    console.log(view(ansiAlign.center('\t  ' + this.guessed)))
    console.log(view(ansiAlign.center('\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n')))
    this.Prompt(str)
}

Prompt (str) {
    if(this.counter === 5){
        for(let i = 0; i < str.length; i++){
            if(str.length != str.length-1){
                this.blanks[i] = '_'
                this.word = this.word + '_ '
            }
            else{
                this.blanks[i] = '_ '
                this.word = this.word + '_'
            }
        }
        this.counter = this.counter - 1
        console.log(board(ansiAlign.center('\n' + ' ~~~~~~~~~ Mystery Game ~~~~~~~~~~' + '\n\n' + this.word + '\n' + '\n' + ' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + '\n')))
    }
    console.log('You have only ' + this.counter + ' guesses left')
    if(this.counter > 0){
        inquirer.prompt([
        {
            type: 'list',
            name: 'answer',
            message: 'What would you like to do?',
            choices: [
            'Guess a Letter',
            'Get a Hint',
            'View Guessed Letters',
            {
                name: 'Oops',
                disabled: 'You will not get any if you are guessing for the first time'
            },
            ]
        }
        ]).then((list) => {
            if(list.answer === 'Guess a Letter'){
                this.Guessing(str)
            }
            else if(list.answer === 'Get a Hint'){
                this.GetHint(str)
            }
            else{
             this.GuessLetter(str) 
         }
     })
    }
    else{
        console.log(wrong(ansiAlign.center('~~~~~~~~~~ Game Over ~~~~~~~~~~')))
        console.log(wrong(ansiAlign.center('Answer: ' + this.input_word)))
        inquirer.prompt([
        {
            type: 'input',
            name: 'answer',
            message: 'Do you want to play other game... (yes or no) ? ',
        }
        ]).then((input) => {
            if(input.answer === 'yes'){
                inquirer.prompt([
                {
                    type: 'input',
                    name: 'answer',
                    message: 'What kind of difficulty... (easy or hard)? ',
                }
                ]).then((result) => {
                    if(result.answer === 'easy'){
                        this.counter = 5
                        this.blanks = []
                        this.word = ''
                        this.input_word = ''
                        this.dum = '', this.dum1 = ''
                        this.guessed = []
                        this.array = []
                        this.remain = 0
                        this.EasyGame()
                    }
                    else{
                        this.Guesscount = 5
                        this. guesletters = []
                        this. guessword = ''
                        this.input_word = ''
                        this.dum = '', this.dum1 = ''
                        this.guessed = []
                        this.array = []
                        this.remain = 0
                        this.HardGame()
                    }
                })
            }
        })
    }
}

getOccurences(str) {
  let u = '';
  for (let i = 0; i < str.length; i++) {
    if (str.lastIndexOf(str[i]) == str.indexOf(str[i])) {
      u += str[i];
    }
  }
  this.array=u.split('')
  this.remain=this.array.length
 
}

EasyGame(){
    let size=easy.length
    let getwordnum= Math.floor(Math.random() * size) + 0
    this. input_word=easy[getwordnum]
    this.input_word=this.input_word.toLowerCase()
    let count = {};
    this.input_word.split('').forEach(function(s) {
        count[s] ? count[s]++ : count[s] = 1;
    })
    this.getOccurences(this.input_word)
    this.Prompt(this.input_word)
}

HardGame(){
    let size=hard.length
    let getwordnum= Math.floor(Math.random() * size) + 0
    this. input_word=hard[getwordnum]
    this.input_word=this.input_word.toLowerCase()
    let count = {};
    this.input_word.split('').forEach(function(s) {

        count[s] ? count[s]++ : count[s] = 1;
    })
    this.getOccurences(this.input_word)
    this.Prompt(this.input_word)
}

ConsoleInput(input,str)  {
 this. word=''
 if(this.counter<5&&this.counter>0){
    if(str.indexOf(input)>=0){
        let index = str.indexOf(input);
        this.blanks[index]=input
        while(str.indexOf(input, index+1) >= index){
            index = str.indexOf(input, index+1);
            console.log(index)
            this.blanks[index] = input;
        }
        for(let i=0;i<this.blanks.length;i++){
          if(this.blanks[i]==this.blanks[i].match(/[a-z]/g)){
            this.word=this.word+this.blanks[i]
        }
        else{
            this.word=this.word+' _'
        }
    }

    console.log(board(ansiAlign.center('\n' + ' ~~~~~~~~~ Mystery Game ~~~~~~~~~~' + '\n\n' + this.word + '\n' + '\n' + ' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + '\n')))
    if(this.input_word==this.word){
        console.log(correct(ansiAlign.center('  ~~~~~~~~~~ You Win ~~~~~~~~~~~~\n')))

        inquirer.prompt([
        {
            type: 'input',
            name: 'answer',
            message: 'Do you want to play other game... (yes or no) ? ',
        }
        ]).then((input) => {
            if(input.answer == 'yes'){
                inquirer.prompt([
                {
                    type: 'input',
                    name: 'answer',
                    message: 'What kind of difficulty... (easy or hard)? ',
                }
                ]).then((result) => {
                    if(result.answer === 'easy'){
                        this.counter=5
                        this.blanks=[]
                        this.word=''
                        this.input_word=''
                        this.dum = '', this.dum1 = ''
                        this.guessed=[]
                        this.array = []
                        this.remain = 0
                        this.EasyGame()
                    }
                    else if(result.answer === 'hard'){
                        this.counter=5
                        this.blanks=[]
                        this.word=''
                        this.prevword=''
                        this.input_word=''
                        this.dum = '', this.dum1 = ''
                        this.guessed=[]
                        this.array = []
                        this.remain = 0
                        this.HardGame()
                    }
                })
            }
        })
    }else{
        this.Prompt(str)
    }
}
else{
   this.counter=this.counter-1
   this.Prompt(str)
}
}
else{
    console.log(wrong(ansiAlign.center(' ~~~~~~~~~~ You Loose ~~~~~~~~~~')))
}
}
}