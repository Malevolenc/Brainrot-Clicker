// Button //
const button = document.getElementById("button");

// Stat Counters //
const skibidiBucksCounter = document.getElementById("skibidiBucks");
const bucksPerClickCounter = document.getElementById("BucksPerClick")
const passiveBucksCounter = document.getElementById("BucksPerSecond");
const multiplierCounter = document.getElementById("multiplier");
const hawkTuahCoinsCounter = document.getElementById("hawkTuahCoins");

// Button Upgrades //
const upgradeButton1 = document.getElementById("upgrade1");
const upgradeButton2 = document.getElementById("upgrade2");
const upgradeButton3 = document.getElementById("upgrade3");
const upgradeButton4 = document.getElementById("upgrade4");
const upgradeButton5 = document.getElementById("upgrade5");

// Idle Upgrades //
const idleButton1 = document.getElementById("idle1");
const idleButton2 = document.getElementById("idle2");
const idleButton3 = document.getElementById("idle3");
const idleButton4 = document.getElementById("idle4");
const idleButton5 = document.getElementById("idle5");

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

const rebirthRewardsSection = document.getElementById("rebirthRewardsSection");

const hawkTuahCoinsIncrease = document.getElementById("hawkTuahCoinsIncrease");

// Rebirth Shop //
const rebirthShopSection = document.getElementById("rebirthShopSection");
const rebirthShopButton = document.getElementById("rebirthShopButton");

const rebirthShopExit = document.getElementById("rebirthShopExit");

const rebirthUpgrade1 = document.getElementById("rebirthUpgrade1");
const rebirthUpgrade2 = document.getElementById("rebirthUpgrade2");

// Choice Buttons //
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choice4 = document.getElementById("choice4");
const choice5 = document.getElementById("choice5");
const choice6 = document.getElementById("choice6");

class GameClass{
    constructor(){
        this.skibidiBucks = 1000000;

        this.passiveBucks = 0;
        this.passiveBucksTime = 1000;
        this.clickedBucks = 1;

        this.multiplier = 1;

        this.rebirthCount = 0;
        this.hawkTuahCoins = 0;

        this.discountMultiplier = 1;
    }

    updateCounter(){
        // Updates the counter element for skibidi bucks everytime this method is called.
        skibidiBucksCounter.textContent = `Skibidi Bucks: ${this.skibidiBucks}`;
    }

    updatePassiveBucks(){
        // Updates the counter element for passive bucks gained everytime this method is called.
        // Called when user upgrades idle upgrades. upgradeMechanicsClass
        passiveBucksCounter.textContent = `Skibidi Bucks Per Second: ${this.passiveBucks}`
    }

    updateClickedBucks(){
        // Updates the counter element for bucks gained per click everytime method is called.
        // Called when user upgrades button upgrades. upgradeMechanicsClass
        bucksPerClickCounter.textContent = `Skibidi Bucks Per Click: ${this.clickedBucks}`
    }

    updateHawkTuahCoins(){
        hawkTuahCoinsCounter.textContent = `Hawk Tuah Coins: ${Number((this.hawkTuahCoins).toFixed(2))}`
    }
}

class GameMechanicsClass{
    buttonClicked(gameObject,counter){
        // Gets the current game instance and updates the skibidiBucks attribute when button is clicked.
        gameObject.skibidiBucks += gameObject.clickedBucks;
        gameObject.updateCounter();
    }

    getPassiveBucks(gameObject,counter){
        // Gets the current game instance and updates skibidiBucks attirbute every time this method is called.
        // Method is called with setInterval() every 1000 milliseconds.
        gameObject.skibidiBucks += gameObject.passiveBucks;
        gameObject.updateCounter();
    }

    setMultiplier(gameObject){
        // This method is only called after rebirthing.

        gameObject.updateCounter();

        // Multiplier //

        // Sets the correct multiplier for the counter element for multiplier. 
        multiplierCounter.textContent = `Multiplier: ${gameObject.multiplier}x`;

        gameObject.updatePassiveBucks();

        // Button //

        // Multiply clicked bucks with multiplier and update the counter with correct stat. 
        gameObject.clickedBucks *= gameObject.multiplier;
        gameObject.updateClickedBucks();
    }
}

class upgradeMechanicsClass{
    constructor(){
        // [Button Element, Cost, Stat Increase]
        this.upgradeButtons = {
            "Button1": [upgradeButton1, 100, 1],
            "Button2": [upgradeButton2, 500, 10],
            "Button3": [upgradeButton3, 1000, 50],
            "Button4": [upgradeButton4, 20000, 100],
            "Button5": [upgradeButton5, 50000, 250],

            "Idle1": [idleButton1, 1000, 1],
            "Idle2": [idleButton2, 10000, 10],
            "Idle3": [idleButton3, 20000, 25],
            "Idle4": [idleButton4, 50000, 100],
            "Idle5": [idleButton5, 100000, 500]
        }

    }

    switchUpgrades(currentButton, otherButton){
        // Toggles between idle and button upgrades when method is called. //
        // Only called when the toggle button is clicked //

        // Takes the current button's parent element (which is the whole div section that is visible) //
        let currentParentElement = currentButton.parentElement;

        // Takes the other button's parent element (which is the whole div section that is hidden) //
        let otherParentElement = otherButton.parentElement;

        // Swaps the css visibility style to show the other upgrade section //
        currentParentElement.style.visibility = `hidden`;
        otherParentElement.style.visibility = `visible`;
    };


    buyUpgrade(gameObject, button, type){
        // Parameters //
        // gameObject = current game instance
        // button = the button that was clicked
        // type = either button upgrade or idle upgrade

        let price = this.upgradeButtons[button][1];

        const priceMultiplier = 1.5

        if(gameObject.skibidiBucks >= price){
            // This block only executes if the user's Skibidi Bucks is more than or equal to the price
            gameObject.skibidiBucks -= price;
            gameObject.updateCounter();


            this.upgradeButtons[button][1] = Math.round(this.upgradeButtons[button][1] * priceMultiplier); // Updates the cost
            this.setUpgradeCosts(gameObject);
        }

        else{
            // Plays a sound if the user does not have enough skibidi bucks
            soundMechanics.tooPoorSound();
            return;
        }

        if (type == "button"){
            // Only executes this block if the argument passed for 'type' is "button"
            gameObject.clickedBucks += this.upgradeButtons[button][2]
            gameObject.updateClickedBucks()
        }

        else{
            // Only executes this block if the argument passed for 'type' is "idle"
            gameObject.passiveBucks += this.upgradeButtons[button][2]
            gameObject.updatePassiveBucks()
        }
        
        soundMechanics.successfulPurchase(button);
    };

    setUpgradeCosts(gameObject){
        // Method Called when first initializing game, upgrading, 
        for (let key in this.upgradeButtons){
            let currentButton = this.upgradeButtons[key][0]; 
            let text = currentButton.textContent; // Retrieves the text content for each button element. 

            let prefix = text.slice(0, text.indexOf(":") +1);

            let price = this.upgradeButtons[key][1];

            currentButton.textContent = `${prefix} ${price} Skibidi Bucks`
        }
    }

    applyDiscount(){
        for (let key in this.upgradeButtons){
            this.upgradeButtons[key][1] *= gameObject.discountMultiplier;
        }
    }

    setUpgradeIncrement(gameObject){
        // Method only called when rebirthing //
        for (let key in this.upgradeButtons){
            let currentButton = this.upgradeButtons[key][0]; 
            let text = currentButton.textContent; // Retrieves the text content for each button element. 

            let suffix = text.slice(text.indexOf(" "), -1)

            this.upgradeButtons[key][2] *= gameObject.multiplier; // Reassigns the value of the key by multiplying the skibidi bucks gained by the upgrade by the multiplier. 

            let newIncrement = this.upgradeButtons[key][2]; 

            currentButton.textContent = `+${newIncrement} ${suffix}`;

        }
    }

    resetUpgradeCosts(){
        this.upgradeButtons = {
            "Button1": [upgradeButton1, 100, 1],
            "Button2": [upgradeButton2, 500, 10],
            "Button3": [upgradeButton3, 10000, 50],
            "Button4": [upgradeButton4, 20000, 100],
            "Button5": [upgradeButton5, 50000, 250],

            "Idle1": [idleButton1, 1000, 1],
            "Idle2": [idleButton2, 10000, 10],
            "Idle3": [idleButton3, 20000, 25],
            "Idle4": [idleButton4, 50000, 100],
            "Idle5": [idleButton5, 100000, 500]
        };
    }
}

class soundMechanicsClass{
    constructor(){
        this.button1Sound = new Audio(`sounds/Diddy.mp3`);
        this.button2Sound = new Audio(`sounds/Drizzy.mp3`)

        this.idle1Sound = new Audio(`sounds/Sigma.mp3`);
        this.idle2Sound = new Audio(`sounds/Gooners.mp3`);

        this.upgradeSounds = {
            "Button1": this.button1Sound,
            "Button2": this.button2Sound,

            "Idle1": this.idle1Sound,
            "Idle2": this.idle2Sound
        };

        this.buttonClickSound = new Audio(`sounds/fart.mp3`);
        this.failedPurchaseSound = new Audio(`sounds/failed.mp3`)
    }
    clickSound(){
        this.buttonClickSound.playbackRate = 3;
        this.buttonClickSound.volume = 0.2;
        this.buttonClickSound.play()
    }

    tooPoorSound(){
        // Method only called if user tries to purchase an upgrade without having enough skibidi bucks.
        this.failedPurchaseSound.playbackRate = 2;
        this.failedPurchaseSound.volume = 0.2;
        this.failedPurchaseSound.play()
        
    }

    successfulPurchase(button){
        // Method only called if user tries to purchase an upgrade while having enough skibidi bucks.
        try{
            const currentSound = this.upgradeSounds[button]

            if (!currentSound){
                throw new Error("This upgrade does not have a sound yet sorry!");
            }

            currentSound.playbackRate = 2;
            currentSound.volume = 0.5;
            currentSound.play();

        }

        catch (error) {
            console.error(error.message)
        }
    }
}

class menuMechanicsClass{
    constructor(){
        this.menus = {
            "Info": infoMenu,
            "Boss Fight": bossFightUI,
            "Rebirth Rewards": rebirthRewardsSection,
            "Rebirth Shop": rebirthShopSection
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

        this.choices = [
            choice1,
            choice2,
            choice3,
            choice4,
            choice5,
            choice6
        ]
    }
    startBossFight(gameObject){
        if (gameObject.skibidiBucks >= this.rebirthPrice){
            // Only starts boss fight if user has enough skibidi bucks
            menuMechanics.openMenu("Boss Fight")
        }

        else{
            soundMechanics.tooPoorSound();  
        }
    }

    generateRandomChoice(){
        // Randomly chooses a button that allows the user to successfully rebirth.
        return this.choices[Math.floor((Math.random()*6))]
    }

    chooseChoice(gameObject, upgradeObject, chosenButton){
        let correctChoice = this.generateRandomChoice();

        if (chosenButton == correctChoice){
            menuMechanics.closeMenu("Boss Fight"); // Closes Boss Fight
            this.giveRebirthRewards(gameObject, upgradeObject);

            this.rebirthResetStats(gameObject, upgradeObject);
        
            setTimeout(function(){
                menuMechanics.closeMenu("Rebirth Rewards")
            }, 3000)

            gameMechanics.setMultiplier(gameObject, upgradeObject);
        }

        else{
            gameObject.skibidiBucks -= this.rebirthPrice;
            gameObject.updateCounter();
            menuMechanics.closeMenu("Boss Fight");
        }
    }

    giveRebirthRewards(gameObject, upgradeObject){
        menuMechanics.openMenu("Rebirth Rewards");

        // 10000 Skibidi Bucks == 1 Rebirth Coin
        let hawkTuahCoinsGained = Number((gameObject.skibidiBucks / 10000).toFixed(2));
        
        hawkTuahCoinsIncrease.textContent = `Hawk Tuah Coins +${hawkTuahCoinsGained}`;

        gameObject.multiplier++;
        gameObject.hawkTuahCoins += hawkTuahCoinsGained;
        gameObject.rebirthCount++;

        gameObject.updateHawkTuahCoins();

        upgradeObject.setUpgradeIncrement(gameObject);
    }

    rebirthResetStats(gameObject, upgradeObject){
        gameObject.skibidiBucks = 0;

        gameObject.passiveBucks = 0;
        gameObject.clickedBucks = 1;

        upgradeObject.resetUpgradeCosts();
        upgradeObject.setUpgradeCosts(gameObject);

    }
}

class rebirthShopMechanicsClass{
    constructor(){
        this.rebirthUpgradesCosts = {
            "Goon Speed": 50,
            "Aura": 50
        }
    }

    buyUpgrade(gameObject, upgradeObject, upgrade, currentUpgrade){
        if (gameObject.hawkTuahCoins >= this.rebirthUpgradesCosts[upgrade]){
            switch(upgrade){
                case "Goon Speed":
                    if (gameObject.passiveBucksTime >= 100){
                        gameObject.passiveBucksTime-=100;
                    }
                    break;
                case "Aura":
                    if (gameObject.discountMultiplier >= 0.05){
                        gameObject.discountMultiplier-= 0.05;
                        upgradeObject.applyDiscount();
                        upgradeObject.setUpgradeCosts(gameObject);
                    }
                    break;
                    
            }
        }

        else{
            soundMechanics.tooPoorSound();
            return;
        }

        gameObject.hawkTuahCoins-= this.rebirthUpgradesCosts[upgrade];
        this.rebirthUpgradesCosts[upgrade]*=2;

        gameObject.updateHawkTuahCoins();

        let text = currentUpgrade.textContent;
        let prefix = text.slice(0,text.indexOf(":")+2)

        currentUpgrade.textContent = `${prefix} ${this.rebirthUpgradesCosts[upgrade]} Hawk Tuah Coins`
    }
}

// Class Objects //

const game = new GameClass();
const gameMechanics = new GameMechanicsClass();
const upgradeMechanics = new upgradeMechanicsClass();
const soundMechanics = new soundMechanicsClass();
const menuMechanics = new menuMechanicsClass();
const rebirthMechanics = new rebirthMechanicsClass();
const rebirthShopMechanics = new rebirthShopMechanicsClass();

gameMechanics.setMultiplier(game, upgradeMechanics);
upgradeMechanics.setUpgradeCosts(game);

button.onclick = function(){
    gameMechanics.buttonClicked(game);
    soundMechanics.clickSound();
};

function passiveBucksLoop(){
    gameMechanics.getPassiveBucks(game);
    setTimeout(passiveBucksLoop, game.passiveBucksTime);
}

passiveBucksLoop();

// Upgrade Buttons //

// Button //
upgradeButton1.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Button1", "button");
};

upgradeButton2.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Button2", "button");
}

upgradeButton3.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Button3", "button");
};

upgradeButton4.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Button4", "button");
}

upgradeButton5.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Button5", "button");
}

// Idle //

idleButton1.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Idle1", "idle");
};

idleButton2.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Idle2", "idle");
}

idleButton3.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Idle3", "idle");
};

idleButton4.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Idle4", "idle");
}

idleButton5.onclick = function(){
    upgradeMechanics.buyUpgrade(game, "Idle5", "idle");
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

// Bossfight Choices //
choice1.onclick = function(){
    rebirthMechanics.chooseChoice(game, upgradeMechanics, choice1);
}

choice2.onclick = function(){
    rebirthMechanics.chooseChoice(game, upgradeMechanics, choice2);
}

choice3.onclick = function(){
    rebirthMechanics.chooseChoice(game, upgradeMechanics, choice3);
}

choice4.onclick = function(){
    rebirthMechanics.chooseChoice(game, upgradeMechanics, choice4);
}

choice5.onclick = function(){
    rebirthMechanics.chooseChoice(game, upgradeMechanics, choice5);
}

choice6.onclick = function(){
    rebirthMechanics.chooseChoice(game, upgradeMechanics, choice6);
}

// Rebirth Shop //
rebirthShopButton.onclick = function(){
    menuMechanics.openMenu("Rebirth Shop");
}

rebirthShopExit.onclick = function(){
    menuMechanics.closeMenu("Rebirth Shop");
}

rebirthUpgrade1.onclick = function(){
    rebirthShopMechanics.buyUpgrade(game, upgradeMechanics, "Goon Speed", rebirthUpgrade1)
}

rebirthUpgrade2.onclick = function(){
    rebirthShopMechanics.buyUpgrade(game, upgradeMechanics, "Aura", rebirthUpgrade2)
}