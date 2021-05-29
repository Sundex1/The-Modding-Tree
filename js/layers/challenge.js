var challengeColors = [null, "#FF8800", "#DD00EE", "#000099", "AF0000", "0088FF"];

addLayer("c", {
    name: "Challenges",
    symbol: "C",
    position: 0,
    startData() {
        return {
            unlocked: true,
        }
    },
    tabFormat: ["challenges"],
    activePosition() { return player.c.activeChallenge?player["c"+(player.c.activeChallenge-10)].position:player.points },
    challenges: {
        11: {
            name: "Overcharge",
            unlocked() { return hasAchievement("a", 21) || player.c1.points.gte(1) || inChallenge("c", 11); },
            style: { "background-color": challengeColors[1], width: '350px', height: '350px', },
            onEnter() { 
                player["c"+(this.id-10)].resetTime = 0;
                player.subtabs["tree-tab"].mainTabs = "Main";
            },
            onExit() {
                player.subtabs["tree-tab"].mainTabs = "Main";
            },
            canComplete() { return false },
            fullDisplay() {
                let display = "Challenge: Power Disablers are Disabled, and Base Point effect is set to 1<br><br>";
                display += "Points: "+formatWhole(player.c1.points)+"<br><br>";
                display += "Reward: Reduces the base point gain base<br>";
                display += "Effect: /" + format(tmp[this.layer].challenges[this.id].effect);
                if (hasAchievement("a1", 15)) {
                    display += "<br><br>Reward 2: Reduces the overcharge point gain base<br>";
                    display += "Effect 2: /" + format(tmp[this.layer].challenges[this.id].effect2);
                }
                return display;
            },
            effect() { return player.c1.points.plus(1).log10().plus(1) },
            effect2() { return player.c1.points.plus(1).log10().div(10).plus(1) },
        },
    },
})

addLayer("c1", {
    name: "Overcharge Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        position: new Decimal(1),
		points: new Decimal(0),
    }},
    color: challengeColors[1],
    requires: new Decimal(.1), // Can be a function that takes requirement increases into account
    resource: "Overcharge points", // Name of prestige currency
    baseResource: "position", // Name of resource prestige is based on
    baseAmount() {return player[this.layer].position}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base() { return D.sub(1, D.div(.9, hasAchievement("a1", 15) ? tmp.c.challenges[11].effect2 : 1)) },
    positionAmount() {
        let amt = D(1).add(D(player[this.layer].resetTime).times(tmp[this.layer].buyables[11].effect).pow(tmp[this.layer].buyables[12].effect));
	    amt = amt.times(D.sub(1, tmp[this.layer].buyables[31].effect1));
        amt = amt.times(tmp[this.layer].buyables[32].effect);
	    return amt.pow(-1);
    },
    update(diff) {
        if (inChallenge("c", 11)) player[this.layer].position = layers[this.layer].positionAmount();
    },
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    getResetGain() {
        return decimalOne;
    },
    prestigeButtonText() {
        return "Req "+format(tmp[this.layer].getNextAt)+" position";
    },
    getNextAt() {
        return Decimal.pow(tmp[this.layer].base, player[this.layer].points);
    },
    canReset() {
        return (player[this.layer].position.lte(tmp[this.layer].getNextAt));
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "buyables",
    ],
    buyables: {
        respec() { resetBuyables(this.layer); }, 
        showRespec() { return hasAchievement("a", 11) },    
        respecText: "Respec buyables",
        rows: 3,
        cols: 3,
        11: {
            title() { return "Anti-Velocity<br>["+formatWhole(player[this.layer].buyables[this.id])+(tmp[this.layer].buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp[this.layer].buyables[this.id].extraLevels)):"")+"]" },
            unlocked() { return hasAchievement("a", 11) },
            display() { 
                return "Divides the position<br><br>Req: "+format(tmp[this.layer].buyables[this.id].cost)+" Overcharge Points<br><br>Currently: /"+format(tmp[this.layer].buyables[this.id].effect)
            },
            cost(x) { 
                let total = x.plus(player[this.layer].buyables[12].times(tmp[this.layer].buyables[22].costScalingReduction).plus(player[this.layer].buyables[13].times(tmp[this.layer].buyables[23].costScalingReduction)));
                if (hasAchievement("a", 15)) total = total.sub(player[this.layer].buyables[21]);
                let cost = Decimal.pow(1.1, total).div(10.5);
                if (hasAchievement("a", 14)) cost = cost.div(Math.max(player.a.achievements.length, 1)); 
                return cost;
            }, 
            effect(x) { return x.plus(tmp[this.layer].buyables[this.id].extraLevels).times(tmp.b.buyables[13] ? tmp.b.buyables[13].effect : 1).div(250).plus(1).times(tmp[this.layer].buyables[31] ? tmp[this.layer].buyables[31].effect2 : 1)}, 
            canAfford() { return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id]))},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 23)) e = e.plus(player[this.layer].buyables[31])
                return e;
            },
        },
        12: {
            title() { return "Anti-Acceleration<br>["+formatWhole(player[this.layer].buyables[this.id])+(tmp[this.layer].buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp[this.layer].buyables[this.id].extraLevels)):"")+"]" },
            unlocked() { return hasAchievement("a", 12) },
            display() {
                return "Exponentiates the position<br><br>Req: "+format(tmp[this.layer].buyables[this.id].cost)+" Overcharge Points<br><br>Currently: ^"+format(tmp[this.layer].buyables[this.id].effect)
            },
            cost(x) {
                let total = x.plus(player[this.layer].buyables[11].times(tmp[this.layer].buyables[21].costScalingReduction).plus(player[this.layer].buyables[13].times(tmp[this.layer].buyables[23].costScalingReduction)));
                if (hasAchievement("a", 15)) total = total.sub(player[this.layer].buyables[22]);
                let cost = Decimal.pow(1.1, total).div(21);
                if (hasAchievement("a", 14)) cost = cost.div(Math.max(player.a.achievements.length, 1));
                return cost;
            }, 
            effect(x) {return x.plus(tmp[this.layer].buyables[this.id].extraLevels).plus(1).log(10).div(2).plus(1)},
            canAfford() { return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id]))},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 23)) e = e.plus(player[this.layer].buyables[31])
                return e;
            },
        },
        13: {
            title() { return "Angles<br>["+formatWhole(player[this.layer].buyables[this.id])+(tmp[this.layer].buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp[this.layer].buyables[this.id].extraLevels)):"")+"]" },
            unlocked() { return hasAchievement("a", 13) },
            display() {
                return "Multiplies the effective level of Anti-Velocity<br><br>Req: "+format(tmp[this.layer].buyables[this.id].cost)+" Overcharge Points<br><br>Currently: "+format(tmp[this.layer].buyables[this.id].effect)+"x";
            },
            cost(x) {
                let total = x.plus(player[this.layer].buyables[11].times(tmp[this.layer].buyables[21].costScalingReduction).plus(player[this.layer].buyables[12].times(tmp[this.layer].buyables[22].costScalingReduction)));
                if (hasAchievement("a", 15)) total = total.sub(player[this.layer].buyables[23]);
                let cost = Decimal.pow(1.1, total).div(31.5);
                if (hasAchievement("a", 14)) cost = cost.div(Math.max(player.a.achievements.length, 1));
                return cost;
            }, 
            effect(x) { return x.plus(tmp[this.layer].buyables[this.id].extraLevels).plus(1).log10().div(4).plus(1).times(tmp[this.layer].buyables[31] ? tmp[this.layer].buyables[31].effect2 : 1)},
            canAfford() { return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id]))},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 23)) e = e.plus(player[this.layer].buyables[31])
                return e;
            },
        },
        21: {
            title() { return "Desynergizer V<br>[" + formatWhole(player[this.layer].buyables[this.id])+(tmp[this.layer].buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp[this.layer].buyables[this.id].extraLevels)):"") + "]" },
            unlocked() { return hasAchievement("a", 15) },
            display() {
                return "Reduces the cost of Anti-Velocity<br><br>Req: "+format(tmp[this.layer].buyables[this.id].cost)+" Overcharge Points<br><br>Currently: -"+format(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let total = x.plus(hasAchievement("a1", 12)?0:player[this.layer].buyables[22].plus(player[this.layer].buyables[23]));
                let cost = D.pow(1.25, total);
                if (hasAchievement("a", 18)) cost = cost.div(player[this.layer].position.log10().times(hasAchievement("a1", 14)?player.c1.points.plus(1):1).times(-1).plus(1));
                return cost;
            },  
            effect(x) { return x.plus(tmp[this.layer].buyables[this.id].extraLevels) },
            costScalingReduction() {
                if (!hasAchievement("a", 16)) return D(1);
                else return D.div(1, player[this.layer].buyables[21].plus(1));
            },
            canAfford() { return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id]))},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 24)) e = e.plus(player[this.layer].buyables[32])
                return e;
            },
        },
        22: {
            title() { return "Desynergizer AC<br>[" + formatWhole(player[this.layer].buyables[this.id])+(tmp[this.layer].buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp[this.layer].buyables[this.id].extraLevels)):"") + "]" },
            unlocked() { return hasAchievement("a", 15) },
            display() {
                return "Reduces the cost of Anti-Acceleration<br><br>Req: " + format(tmp[this.layer].buyables[this.id].cost) + " Overcharge Points<br><br>Currently: -" + format(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let total = x.plus(hasAchievement("a1", 12)?0:player[this.layer].buyables[21].plus(player[this.layer].buyables[23]));
                let cost = D.pow(1.25, total);
                if (hasAchievement("a", 18)) cost = cost.div(player[this.layer].position.log10().times(hasAchievement("a1", 14)?player.c1.points.plus(1):1).times(-1).plus(1));
                return cost;
            },
            effect(x) { return x.plus(tmp[this.layer].buyables[this.id].extraLevels) },
            costScalingReduction() {
                if (!hasAchievement("a", 16)) return D(1);
                else return D.div(1, player[this.layer].buyables[22].plus(1));
            },
            canAfford() { return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id]))},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 24)) e = e.plus(player[this.layer].buyables[32])
                return e;
            },
        },
        23: {
            title() { return "Desynergizer AN<br>[" + formatWhole(player[this.layer].buyables[this.id])+(tmp[this.layer].buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp[this.layer].buyables[this.id].extraLevels)):"") + "]" },
            unlocked() { return hasAchievement("a", 15) },
            display() {
                return "Reduces the cost of Angles<br><br>Req: " + format(tmp[this.layer].buyables[this.id].cost) + " Overcharge Points<br><br>Currently: -" + format(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let total = x.plus(hasAchievement("a1", 12)?0:player[this.layer].buyables[22].plus(player[this.layer].buyables[21]));
                let cost = D.pow(1.25, total);
                if (hasAchievement("a", 18)) cost = cost.div(player[this.layer].position.log10().times(hasAchievement("a1", 14)?player.c1.points.plus(1):1).times(-1).plus(1));
                return cost;
            },
            effect(x) { return x.plus(tmp[this.layer].buyables[this.id].extraLevels) },
            costScalingReduction() {
                if (!hasAchievement("a", 16)) return D(1);
                else return D.div(1, player[this.layer].buyables[23].plus(1));
            },
            canAfford() { return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id]))},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 24)) e = e.plus(player[this.layer].buyables[32])
                return e;
            },
        },
        31: {
            title() { return "Direct Attack<br>[" + formatWhole(player[this.layer].buyables[this.id]) + "]" },
            unlocked() { return hasAchievement("a", 17) },
            display() {
                return "Subtracts a percentage of your current position from your position.<br>Also multiplies the effect of the first & third buyables<br><br>Req: " + format(tmp[this.layer].buyables[this.id].cost) + " Base Points <br><br>Currently: -" + format(tmp[this.layer].buyables[this.id].effect1.times(100))+"%, "+format(tmp[this.layer].buyables[this.id].effect2)+"x";
            },
            cost(x) {
                let total = x.times(player[this.layer].buyables[32].max(1))
                return D.pow(1.5, total).times(2);
            },
            effect1(x=player[this.layer].buyables[this.id]) {
                return D.sub(1, D.div(1, x.plus(1).log2().plus(1)));
            },
            effect2(x=player[this.layer].buyables[this.id]) {
                return x.plus(1).log2().plus(1);
            },
            canAfford() { return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id]))},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
        },
        32: {
            title() { return "Shrink Factor<br>[" + formatWhole(player[this.layer].buyables[this.id]) + "]" },
            unlocked() { return hasAchievement("a1", 13) },
            display() {
                return "Divides your position based on your position<br><br>Req: " + format(tmp[this.layer].buyables[this.id].cost) + " Base Points <br><br>Currently: /" + format(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let total = x.times(player[this.layer].buyables[31].max(1))
                return D.pow(1.5, total).times(hasAchievement("a", 24)?4.9:24.5);
            },
            effect(x = player[this.layer].buyables[this.id]) {
                return player.c1.position.log10().times(-1).plus(1).pow(x.div(3));
            },
            canAfford() { return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
        },
    },
})