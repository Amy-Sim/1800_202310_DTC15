//Save the buddy last pair up

function saveBuddyPairUp() {
    var buddyPairUp = {
        buddy: buddy,
        pairUp: pairUp
    };
    localStorage.setItem('buddyPairUp', JSON.stringify(buddyPairUp));
}

