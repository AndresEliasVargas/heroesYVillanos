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
    let request = new XMLHttpRequest();
    request.open('GET', '../data/villains.json', true);
    request.onreadystatechange = getVillainsCallBack;
    request.send();
};

const getHeroesCallback = e => {
    let request = e.target;

    if (request.readyState == XMLHttpRequest.DONE) {
        let data = JSON.parse(request.responseText);
        //console.log(data);

        heroes = new Squad(data.active, data.formed, data.homeTown, data.secretBase, [], data.squadName);
        data.members.map(memberData => {
            let member = new Member(memberData.age, memberData.image, memberData.name, memberData.powers, memberData.secretIdentity);
            heroes.addMember(member);
        });
        //console.log(heroes);

        isGetHeroesComplete = true;
        completeLoadUI();
    };
};

const getVillainsCallBack = e => {
    let request = e.target;

    if (request.readyState == XMLHttpRequest.DONE) {
        let data = JSON.parse(request.responseText);
        //console.log(data);

        villains = new Squad(data.active, data.formed, data.homeTown, data.secretBase, [], data.squadName);
        data.members.map(memberData => {
            let member = new Member(memberData.age, memberData.image, memberData.name, memberData.powers, memberData.secretIdentity);
            villains.addMember(member);
        });
        //console.log(villains);

        isGetVillainsComplete = true;
        completeLoadUI();
    };
};

const completeLoadUI = () => {
    if (isGetHeroesComplete && isGetVillainsComplete) {
        //TODO Load UI
        console.log(heroes);
        console.log(villains);
    }
};

getHeroes();
getVillains();