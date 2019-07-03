'use strict';

class Squad {
    constructor(pactive, pformed, phomeTown, psecretBase, pmembers, psquadName){
        this.active = pactive;
        this.formed = pformed;
        this.homeTown = phomeTown;
        this.secretBase = psecretBase;
        this.members = pmembers;
        this.squadName = psquadName;
    }

    addMember(member) {
        this.members.push(member);
    };

}