let modInfo = {
	name: "The Puzzle Tree",
	id: "h",
	author: "Sundex, Jacorb, and Unpingabot",
	pointsName: "position",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	allowSmall: true,
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "Content amount has been (softcapped)",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h3>v0.1</h3><br>
		- 1st row of achievements.<br>
		- 7 Upgrades.<br><br>
	<h3>v0.2</h3><br>
		-Changed Achievements to Goals.<br>
		-Added Overcharge<br>
		-10 New Goals (5 for Base Game, 5 for Overcharge)<br>
		-Added Upgrade 8: Shrink Factor<br>
		-Added Prestige Points<br><br>
	<h3>v0.3</h3><br>
		-Made it easier to know which togglables are "ON" or "OFF"<br>
		-Added guides for Goals and Challenges (found in their respective tabs)<br>
		-Fixed challenge goals not notifying upon first completion<br>
		-Shifted down challenge goals so their description can actually be seen<br>
		-Minor typo fixes<br>
		-Fixed a softlock issue where toggling Anti-Velocity off then respeccing wouldn't reset togglables<br>
		-Added 6 Goals (3 for Base Game, 3 for Overcharge)<br>`

let winText = `Congratulations! We hope you enjoyed this insanity. Consider giving feedback for the next update because we still have a long ways to go!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
    return new Decimal(modInfo.initialStartPoints)
}
//hi hemlo
// Determines if it should show points/sec
function canGenPoints(){
	return true
}
// Calculate # of points!
function getPointGen() {
	let gain = D(1).add(D(player.b.resetTime).times(player.b.points).pow(tmp.p.effect).times(tmp.b.buyables[11].effect).pow(tmp.b.buyables[12].effect));
	gain = gain.times(D.sub(1, tmp.b.buyables[31].effect1));
	gain = gain.times(tmp.b.buyables[32].effect);
	return gain.pow(-1);
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false//player.p.points.gte(3)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
