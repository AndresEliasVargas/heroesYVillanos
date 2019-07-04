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
        const main = document.querySelector('#principal');

        //Heroes vars
        const section = document.createElement('section');
        const titleHeroes = document.createElement('h2');
        const secretBaseH = document.createElement('p');
        const homeTownH = document.createElement('p');
        const activeH = document.createElement('p');
        const divRow = document.createElement('div');
        const divCol = document.createElement('div');
        const col_3_left = document.createElement('div');
        const col_3_right = document.createElement('div');

        //Villains vars
        const section2 = document.createElement('section');
        const titleVillains = document.createElement('h2');
        const secretBaseV = document.createElement('p');
        const homeTownV = document.createElement('p');
        const activeV = document.createElement('p');

        //Creating section
        section.setAttribute('id', 'left');
        section.classList.add('col-6');
        section2.setAttribute('id', 'right');
        section2.classList.add('col-6');

        //Add sections in document
        main.appendChild(section);
        main.appendChild(section2);

        //Create titles and Squad information
        titleHeroes.setAttribute('id', 'titleHeroes');
        titleHeroes.classList.add('text-center');
        titleHeroes.innerHTML = heroes.squadName;

        titleVillains.setAttribute('id', 'titleVillains');
        titleVillains.classList.add('text-center');
        titleVillains.innerHTML = villains.squadName;

        //Create Heroes secretBase, homeTown, active
        secretBaseH.classList.add('font-italic', 'text-center');
        secretBaseH.innerHTML = heroes.secretBase;
        homeTownH.classList.add('ml-5', 'pl-5');
        homeTownH.innerHTML = '<b>Home Town </b>' + heroes.homeTown;
        activeH.classList.add('ml-5', 'pl-5');
        activeH.innerHTML = '<b>Active </b>' + heroes.active;
        divRow.classList.add('row');
        col_3_left.classList.add('col-md-3');
        divCol.classList.add('col-12 col-md-6');
        col_3_right.classList.add('col-md-3');

        //Create Villains secretBase, homeTown, active
        secretBaseV.classList.add('font-italic', 'text-center');
        secretBaseV.innerHTML = villains.secretBase;
        homeTownV.classList.add('ml-5', 'pl-5');
        homeTownV.innerHTML = '<b>Home Town </b>' + villains.homeTown;
        activeV.classList.add('ml-5', 'pl-5');
        activeV.innerHTML = '<b>Active </b>' + heroes.active;

        //Append all Squad data
        section.append(titleHeroes, secretBaseH, homeTownH, activeH, divRow);
        divRow.append(col_3_left, divCol, col_3_right);
        section2.append(titleVillains, secretBaseV, homeTownV, activeV);

        //Create Heroes dinamic cards
        heroes.members.map(memberData => {
            const cardH = document.createElement('div');
            const imageH = document.createElement('img');
            const cardBodyH = document.createElement('div');
            const titleH = document.createElement('h5');
            const informationH = document.createElement('div');
            const ul = document.createElement('ul');
            const liTitle = document.createElement('li');
            //console.log(memberData);

            cardH.classList.add('card', 'mb-3');

            imageH.setAttribute('alt', 'foto_heroe');
            imageH.setAttribute('src', memberData.image);
            imageH.setAttribute('class', 'card-img-top');

            cardBodyH.classList.add('card-body');

            titleH.classList.add('card-title', 'text-center');
            titleH.innerHTML = memberData.name;

            informationH.classList.add('card-text');
            informationH.innerHTML = '<p><strong>Secret Identity:</strong> '
                                     + memberData.secretIdentity +
                                     '</p><p><strong>Age:</strong> '
                                     + memberData.age +
                                     '</p>';

            liTitle.innerHTML = '<strong>Powers</strong>';

            divCol.append(cardH);
            cardH.append(imageH, cardBodyH);
            cardBodyH.append(titleH, informationH, ul);
            ul.append(liTitle);

            memberData.powers.map(memberPower => {
                //console.log(memberPowers);
                const li = document.createElement('li');
                li.innerHTML = memberPower;

                ul.append(li);
            });
        });

        //Create villains dinamic cards





        //console.log(heroes);
        //console.log(villains);
    };

};

getHeroes();
getVillains();