//Save the buddy last pair up

function saveBuddyPairUp() {
    last_pairup = [];
    for (var i = 0; i < buddy_list.length; i++) {
        last_pairup.push(buddy_list[i].id);
    }

}
