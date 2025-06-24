// Button //
const button = document.getElementById("button");

// Stat Counters //
const skibidiBucksCounter = document.getElementById("skibidiBucks");
const bucksPerClickCounter = document.getElementById("BucksPerClick")
const passiveBucksCounter = document.getElementById("BucksPerSecond");

// Button Upgrades //
const upgradeButton1 = document.getElementById("upgrade1");
const upgradeButton2 = document.getElementById("upgrade2");

// Idle Upgrades //
const idleButton1 = document.getElementById("idle1");
const idleButton2 = document.getElementById("idle2");

// Toggle Switch Buttons //
const switchToIdle = document.getElementById("switchToIdle");
const switchToButton = document.getElementById("switchToButton");

// Patch Notes Menu //
const infoButton = document.getElementById("infoButton");
const infoExit = document.getElementById("infoExit");
const infoMenu = document.getElementById("infoSection");

// Rebirth //
const bossFightUI = document.getElementById("bossFightSection");
const rebirthButton = document.getElementById("rebirthButton");

class GameClass{
    constructor(){
        this.skibidiBucks = 0;

        this.passiveBucks = 0;
        this.clickedBucks = 1;
    }

    updateCounter(){ 
        skibidiBucksCounter.textContent = `Skibidi Bucks: ${this.skibidiBucks}`;
    }

    updatePassiveBucks(){
        passiveBucksCounter.textContent = `Skibidi Bucks Per Second: ${this.passiveBucks}`
    }

    updateClickedBucks(){
        bucksPerClickCounter.textContent = `Skibidi Bucks Per Click: ${this.clickedBucks}`
    }
}

class GameMechanicsClass{
    buttonClicked(gameObject,counter){
        gameObject.skibidiBucks += gameObject.clickedBucks;
        gameObject.updateCounter();
    }

    getPassiveBucks(gameObject,counter){
        gameObject.skibidiBucks += gameObject.passiveBucks;
        gameObject.updateCounter();
    }
}

class upgradeMechanicsClass{
    constructor(){
        this.upgradeButtonsCosts = {
            "Button1": 100,
            "Button2": 500,

            "Idle1": 1000,
            "Idle2": 10000
        };

        this.upgradeButtonsIncrease = {
            "Button1": 1,
            "Button2": 10,

            "Idle1": 1,
            "Idle2": 10
        }

    }

    switchUpgrades(currentButton, otherButton){
        let currentParentElement = currentButton.parentElement

        let otherParentElement = otherButton.parentElement

        currentParentElement.style.visibility = `hidden`;
        otherParentElement.style.visibility = `visible`;
    };


    buyUpgrade(gameObject, button, element, type){
        let price = this.upgradeButtonsCosts[button];

        let text = element.textContent;

        let prefix = text.slice(0,text.indexOf(":")+2);

        if(gameObject.skibidiBucks >= price){
            gameObject.skibidiBucks -= price;
            gameObject.updateCounter();

            this.upgradeButtonsCosts[button] = Math.round(this.upgradeButtonsCosts[button] *1.5)
            element.textContent = `${prefix} ${this.upgradeButtonsCosts[button]} Skibidi Bucks`
        }

        else{
            soundMechanics.tooPoorSound();
            return;
        }

        if (type == "button"){
            gameObject.clickedBucks += this.upgradeButtonsIncrease[button]
            gameObject.updateClickedBucks()
        }

        else{
            gameObject.passiveBucks += this.upgradeButtonsIncrease[button]
            gameObject.updatePassiveBucks()
        }
        
        soundMechanics.successfulPurchase(button);
    };
}

class soundMechanicsClass{
    constructor(){
        this.upgradeSounds = {
            "Button1": "Diddy.mp3",
            "Button2": "Drizzy.mp3",

            "Idle1": "Sigma.mp3",
            "Idle2": "Gooners.mp3"
        }

        this.buttonClickSound = new Audio(`sounds/fart.mp3`);
        this.failedPurchaseSound = new Audio(`sounds/failed.mp3`)
    }
    clickSound(){
        this.buttonClickSound.playbackRate = 3;
        this.buttonClickSound.volume = 0.2;
        this.buttonClickSound.play()
    }

    tooPoorSound(){
        this.failedPurchaseSound.playbackRate = 2;
        this.failedPurchaseSound.volume = 0.2;
        this.failedPurchaseSound.play()
        
    }

    successfulPurchase(button){
        const currentSound = new Audio(`sounds/${this.upgradeSounds[button]}`)

        currentSound.playbackRate = 2;
        currentSound.volume = 0.5;

        currentSound.play()
    }
}

class menuMechanicsClass{
    constructor(){
        this.menus = {
            "Info": infoMenu
        }
    }
    openMenu(menu){
        this.menus[menu].style.visibility = "visible";
    }

    closeMenu(menu){
        this.menus[menu].style.visibility = "hidden";
    }
}

class rebirthMechanicsClass{
    constructor(){
        this.rebirthPrice = 100000
    }
    startBossFight(game){
        soundMechanics.tooPoorSound();
    }
}

// Class Objects //

const game = new GameClass();
const gameMechanics = new GameMechanicsClass();
const upgradeMechanics = new upgradeMechanicsClass();
const soundMechanics = new soundMechanicsClass();
const menuMechanics = new menuMechanicsClass();
const rebirthMechanics = new rebirthMechanicsClass();

button.onclick = function(){
    gameMechanics.buttonClicked(game);
    soundMechanics.clickSound();
};

setInterval(function(){
    gameMechanics.getPassiveBucks(game)
}, 1000);

// Upgrade Buttons //
upgradeButton1.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Button1", upgradeButton1, "button");
};

upgradeButton2.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Button2", upgradeButton2, "button");
}

idleButton1.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Idle1", idleButton1, "idle");
};

idleButton2.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Idle2", idleButton2, "idle");
}

// Toggle Upgrade Section //

switchToButton.onclick = function(){
    upgradeMechanics.switchUpgrades(switchToButton, switchToIdle)
}

switchToIdle.onclick = function(){
    upgradeMechanics.switchUpgrades(switchToIdle, switchToButton)
}

// Toggle Menus //

infoButton.onclick = function(){
    menuMechanics.openMenu("Info")
}

infoExit.onclick = function(){
    menuMechanics.closeMenu("Info")
}

// Rebirth //

rebirthButton.onclick = function(){
    rebirthMechanics.startBossFight(game);
}



