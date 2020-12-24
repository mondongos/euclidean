const referenceColoursList = require('./referenceColours')
const deltaE = require('./deltaE')

const runProgram = (subjectColour) => {
    let colourDeltasAll = compareColours(subjectColour)
    let closestMatch = findClosestMatch(colourDeltasAll)
    closestMatch.perception = getSignificance(closestMatch.delta)
    return closestMatch
}

const compareColours = (subjectColour) => {
    let colourDeltas = []
    referenceColoursList.map(referenceColour => {
        let colourDelta = deltaE(subjectColour, referenceColour)
        colourDeltas.push({
            referenceColour: referenceColour,
            subjectColour: subjectColour,
            delta: colourDelta,
            perception: null
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

const getSignificance = (matchDelta) => {
    if (matchDelta <=1) {
        return 'Not perceptible by human eyes'
    } else if (matchDelta > 1 && matchDelta <= 2) {
        return 'Perceptible through close observation'
    } else if (matchDelta > 2 && matchDelta <= 10) {
        return 'Perceptible at a glance'
    } else if (matchDelta > 10 && matchDelta <= 49) {
        return 'Colors are more similar than opposite'
    } else if (matchDelta > 49 && matchDelta <= 100) {
        return 'Colours are not similar'
    } else if (matchDelta === 100) {
        return 'Colors are exact opposite'
    } 
    return mColour
}
