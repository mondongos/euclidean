const runProgram = require('./controllers/controller')
const terminalInput = process.argv.slice(2)[0].split("-")

let finalArr = []

terminalInput.map(t => {
    finalArr.push(Number(t))
})

runProgram(finalArr)