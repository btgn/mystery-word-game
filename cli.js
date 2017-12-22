const   
    yargs = require('yargs'),
    game = require('./app')
    

const flags = yargs.usage('$0: Usage node cli.js')
    .options('h', {
        alias: 'help',
        describe: 'displays help'

    })
    .options('d', {
    alias: 'difficulty',
    describe: 'difficulty of the game',
    choices:['easy','hard']
    })
    
    .argv

if (flags.help)
    yargs.showHelp()

else if(flags.difficulty ==='easy'){
    game.run('easy')
}
else{
    game.run('hard')
}
