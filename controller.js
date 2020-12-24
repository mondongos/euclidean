const referenceColoursList = require('./referenceColours')
const deltaE = require('./deltaE')

const compareColours = (subjectColour) => {
    let colourDeltas = []
    referenceColoursList.map(referenceColour => {
        let colourDelta = deltaE(subjectColour, referenceColour)
        colourDeltas.push({
            referenceColour: referenceColour,
            subjectColour: subjectColour,
            delta: colourDelta
        })
    })
    return colourDeltas
}

const findClosestMatch = (colourDeltas) => {
    let holderDelta = colourDeltas[0].delta
    let holderColour = colourDeltas[0]
    colourDeltas.map(c => {
        c.delta < holderDelta ? (holderColour = c, holderDelta = c.delta) : null
        
    })
    return holderColour
}

const runProgram = (subjectColour) => {
    let colourDeltasAll = compareColours(subjectColour)
    let closestMatch = findClosestMatch(colourDeltasAll)
    console.log(closestMatch)
    return closestMatch
}

runProgram([71, 56, 33])