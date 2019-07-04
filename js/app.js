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
        const divRowV = document.createElement('div');
        const divColV = document.createElement('div');
        const col_3_leftV = document.createElement('div');
        const col_3_rightV = document.createElement('div');

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
        homeTownH.classList.add('text-center');
        homeTownH.innerHTML = '<b>Home Town </b>' + heroes.homeTown;
        activeH.classList.add('text-center');
        activeH.innerHTML = '<b>Active </b>' + heroes.active;
        divRow.classList.add('row');
        col_3_left.classList.add('col-md-3');
        divCol.classList.add('col-12', 'col-md-6');
        col_3_right.classList.add('col-md-3');

        //Create Villains secretBase, homeTown, active
        secretBaseV.classList.add('font-italic', 'text-center');
        secretBaseV.innerHTML = villains.secretBase;
        homeTownV.classList.add('text-center');
        homeTownV.innerHTML = '<b>Home Town </b>' + villains.homeTown;
        activeV.classList.add('text-center');
        activeV.innerHTML = '<b>Active </b>' + heroes.active;
        divRowV.classList.add('row');
        col_3_leftV.classList.add('col-md-3');
        divColV.classList.add('col-12', 'col-md-6');
        col_3_rightV.classList.add('col-md-3');

        //Append all Squad data
        section.append(titleHeroes, secretBaseH, homeTownH, activeH, divRow);
        divRow.append(col_3_left, divCol, col_3_right);
        section2.append(titleVillains, secretBaseV, homeTownV, activeV, divRowV);
        divRowV.append(col_3_leftV, divColV, col_3_rightV);

        //Create Heroes dinamic cards
        heroes.members.map(memberData => {
            const card = document.createElement('div');
            const image = document.createElement('img');
            const cardBody = document.createElement('div');
            const title = document.createElement('h5');
            const information = document.createElement('div');
            const ul = document.createElement('ul');
            const liTitle = document.createElement('li');
            //console.log(memberData);

            card.classList.add('card', 'mb-3');

            image.setAttribute('alt', 'foto_heroe');
            image.setAttribute('src', memberData.image);
            image.setAttribute('class', 'card-img-top');

            cardBody.classList.add('card-body');

            title.classList.add('card-title', 'text-center');
            title.innerHTML = memberData.name;

            information.classList.add('card-text');
            information.innerHTML = '<p><strong>Secret Identity:</strong> '
                                     + memberData.secretIdentity +
                                     '</p><p><strong>Age:</strong> '
                                     + memberData.age +
                                     '</p>';

            liTitle.innerHTML = '<strong>Powers</strong>';

            divCol.append(card);
            card.append(image, cardBody);
            cardBody.append(title, information, ul);
            ul.append(liTitle);

            memberData.powers.map(memberPower => {
                //console.log(memberPowers);
                const li = document.createElement('li');
                li.innerHTML = memberPower;

                ul.append(li);
            });
        });

        //Create villains dinamic cards
        villains.members.map(memberData => {
            const card = document.createElement('div');
            const image = document.createElement('img');
            const cardBody = document.createElement('div');
            const title = document.createElement('h5');
            const information = document.createElement('div');
            const ul = document.createElement('ul');
            const liTitle = document.createElement('li');
            //console.log(memberData);

            card.classList.add('card', 'mb-3');

            image.setAttribute('alt', 'foto_heroe');
            image.setAttribute('src', memberData.image);
            image.setAttribute('class', 'card-img-top');

            cardBody.classList.add('card-body');

            title.classList.add('card-title', 'text-center');
            title.innerHTML = memberData.name;

            information.classList.add('card-text');
            information.innerHTML = '<p><strong>Secret Identity:</strong> '
                                     + memberData.secretIdentity +
                                     '</p><p><strong>Age:</strong> '
                                     + memberData.age +
                                     '</p>';

            liTitle.innerHTML = '<strong>Powers</strong>';

            divColV.append(card);
            card.append(image, cardBody);
            cardBody.append(title, information, ul);
            ul.append(liTitle);

            memberData.powers.map(memberPower => {
                //console.log(memberPowers);
                const li = document.createElement('li');
                li.innerHTML = memberPower;

                ul.append(li);
            });
        });
        //console.log(heroes);
        //console.log(villains);
    };

};

getHeroes();
getVillains();