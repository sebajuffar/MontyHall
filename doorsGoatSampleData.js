function getRandomInt(max) {
    var randomNumber = Math.random();
    var number;
    let partitions = [];
    let start = 0;
    let partitionLength = 1 / max;
    for(let i = 1; i <= max; i++) {
        partitions[i] = [start, partitionLength * i];
        start += partitionLength;
    }
    partitions.forEach(function(element, index) {
        if (randomNumber >= element[0] && randomNumber <= element[1]) {
            number = index;
        }
    }) 
    return number;
}

function createDoors(winDoor) {
    doors = [0, 0, 0];
    doors[winDoor] = 1;
    return doors;
}

function chooseDoor(doors, doorSelection) {
    if (doors[doorSelection] == 1) {
        return true;
    }
    return false;
}

function alternativeChooseDoor(doors, doorSelection) {
    goatIndex = revealGoat(doors);
    doorSelection = newDoorSelection(goatIndex, doorSelection);
    if (doors[doorSelection] == 1) {
        return true;
    }
    return false;
}

function newDoorSelection(goatIndex, doorSelection) {
    for(let i = 1; i <= 3; i++) {
        if (doorSelection != i && goatIndex != i) {
            return i;
        }
    }
}

function revealGoat(doors, doorSelection) {
    let randomSelection = getRandomInt(3);
    while (doors.length == 3) {
        if (randomSelection != doorSelection && doors[randomSelection] == 0) {
            return randomSelection;
        }
        randomSelection = getRandomInt(3);
    }
}

function updateWinnings(callback, type) {
    let result = callback(doors, doorSelection);
    if (result) {
        return type.winnings++;
    }
    return type.loses++;
}

let size = 10000;
let count = [0,0,0,0];
let randomWinnerDoor, doorSelection, doors, result;
let doorSelectionResults = {
    default: {
        winnings: 0,
        loses: 0,
    },
    alternative: {
        winnings: 0,
        loses: 0,
    }
};

for(let i = 0; i < size; i++) {
    randomWinnerDoor = getRandomInt(3)
    doors = createDoors(randomWinnerDoor);
    doorSelection = getRandomInt(3);
    updateWinnings(chooseDoor, doorSelectionResults.default);
    updateWinnings(alternativeChooseDoor, doorSelectionResults.alternative);
}

console.log('Total plays: ', size);
console.log('============');
console.log('DEFAULT MODE');
console.log('============');
console.log('Winnings:', doorSelectionResults.default.winnings);
console.log('Loses:', doorSelectionResults.default.loses);
console.log('Winning Rate:', parseFloat(doorSelectionResults.default.winnings/size * 100).toFixed(2) + '%');
console.log('Losing Rate:', parseFloat(doorSelectionResults.default.loses/size * 100).toFixed(2) + '%');
console.log('================');
console.log('ALTERNATIVE MODE');
console.log('================');
console.log('Winnings:', doorSelectionResults.alternative.winnings);
console.log('Loses:', doorSelectionResults.alternative.loses);
console.log('Winning Rate:', parseFloat(doorSelectionResults.alternative.winnings/size * 100).toFixed(2) + '%');
console.log('Losing Rate:', parseFloat(doorSelectionResults.alternative.loses/size * 100).toFixed(2) + '%');