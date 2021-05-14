// give all items


function GiveAll() {
const gameData = _.instance.game.state.states.get('Boot')._gameData
const ids = ['boots', 'follow', 'fossil', 'hat', 'item', 'key', 'mathTownFrame', 'mathTownInterior', 'mount', 'outfit','spellRelic', 'weapon', 'currency']

const itemify = (item, amount) =>
	item.map(x => ({
		ID: x.ID,
		N: amount,
	})).filter(v => v !== undefined);

ids.forEach(id => {
    _.player.backpack.data[id] = itemify(gameData[id], 9e9)
});
gameData.dorm.forEach(x =>
    _.player.house.data.items[x.ID] = {A: [], N: 999}
)

let bountyIndex = _ => _.player.backpack.data.item.findIndex(v => v.ID === 84 || v.ID === 85 || v.ID === 86)
while (bountyIndex() > -1) _.player.backpack.data.item.splice(bountyIndex(), 1)
}

// level set
function SetLevel(lvl) {
 _.player.data.level = lvl 
}

// set nickname
function SetNick(id) {
 _.player.name.data.nickname = id;  
}


function ForceSave() {
 let playerdata = {}
	playerdata.equipment = _.player.equipment
	playerdata.tutorial = _.player.tutorial
	playerdata.pets = _.player.kennel._petData
	playerdata.data = _.player.data
	playerdata.encounters = _.player.encounters._data
	playerdata.house = _.player.house.data
	playerdata.inventory = _.player.backpack.data
	playerdata.quests = _.player.quests.data
	playerdata.state = _.player.state.data
	playerdata.appearance = _.player.appearance
	playerdata.tutorial = _.player.tutorial.data
	fetch(`https://proxy.prodigyhacking.com/https://api.prodigygame.com/game-api/v3/characters/${_.player.userID}`, {
		"headers": {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9,az;q=0.8,cs;q=0.7",
			"authorization": localStorage.JWT_TOKEN,
			"content-type": "application/json",
			"sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
			"sec-ch-ua-mobile": "?0",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site"
		},
		"referrer": "https://play.prodigygame.com/",
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": JSON.stringify(playerdata),
		"method": "POST",
		"mode": "cors",
		"credentials": "include"
	}); 
}


// Text
function Flash(txt) {
 _.instance.prodigy.effects.flashText(txt); 
}

function Mod() {
GiveAll();
  SetLevel(100);
   SetLevel("100"); // just in case i'm stupid
 ForceSave();
   ForceSave();
   ForceSave();
   ForceSave();
  
  Flash("AutoMax Operations Completed, refresh to complete process.");
}

Mod();
