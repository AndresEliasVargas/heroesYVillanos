'use strict';

let heroes, villains;
let isGetHeroesComplete = false;
let isGetVillainsComplete = false;

const getHeroes = () => {
    let request = new XMLHttpRequest();
    request.open('GET', '../data/heroes.json', true);
    request.onreadystatechange = getHeroesCallback;
    request.send();
};

const getVillains = () => {
    console.log('Villains');
};

const getHeroesCallback = e => {
    let request = e.target;

    if (request.readyState == XMLHttpRequest.DONE) {
        let data = JSON.parse(request.responseText);
        console.log(data);

        heroes = new Squad(data.active, data.formed, data.homeTown, 
        data.secretBase, [], data.squadName);

        console.log(heroes);

        data.members.map(memberData => {
            let member = new Member(memberData.age, memberData.image, memberData.name, memberData.powers, memberData.secretIdentity);
            heroes.addMember(member);
        });

        console.log(heroes);

        isGetHeroesComplete = true;
        completeLoadUI();
    };
};

const completeLoadUI = () => {
    if (isGetHeroesComplete && isGetVillainsComplete) {
        //TODO Load UI
        console.log('complete load');
    }
};

getHeroes();
getVillains();