addLayer("b", {
    name: "base points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        toggles: {11: true, 12: true, 13: true, 21: true, 22: true, 23: true, 31: true, 32: true, 33: true},
        totalBuyables: {11: D(0), 12: D(0), 13: D(0), 21: D(0), 22: D(0), 23: D(0), 31: D(0), 32: D(0), 33: D(0)},
    }},
    color: "#4BDC13",
    requires: new Decimal(.1), // Can be a function that takes requirement increases into account
    effectDescription() {
        return "which are giving a " + format(player.b.points.pow(tmp.p.effect)) + "x boost to gamespeed."
    },
    resource: "base points", // Name of prestige currency
    baseResource: "position", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base() { return D.sub(1, D.div(.9, tmp.c.challenges[11].effect)) },
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetResetTime() { return !hasAchievement("a1", 11) },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for base points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    getResetGain() {
        if (hasAchievement("a1", 16)) return player.points.log(tmp.b.base).floor().sub(player.b.points.sub(1)).max(0);
        return decimalOne;
    },
    prestigeButtonText() {
        let txt = "Req "+format(tmp[this.layer].getNextAt)+" position";
        let gain = tmp[this.layer].getResetGain;
        if (gain.gt(1)) txt += "<br><br>+"+formatWhole(gain)+" "+tmp[this.layer].resource
        return txt;
    },
    getNextAt() {
        return Decimal.pow(tmp.b.base, player.b.points);
    },
    canReset() {
        return (player.points.lte(tmp[this.layer].getNextAt));
    },
    update(diff) {
        if (Object.values(player.b.toggles).filter(x => !x).length>tmp.b.toggleAmount) {
            player.b.toggles = layers.b.startData().toggles;
            for (let r=1;r<=3;r++) for (let c=1;c<=3;c++) if (player.b.totalBuyables[r*10+c]) player.b.buyables[r*10+c] = player.b.totalBuyables[r*10+c];
        }
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "respec-button",
        ["row", [["column", [["buyable", 11], ["clickable", 11]]], ["column", [["buyable", 12], ["clickable", 12]]], ["column", [["buyable", 13], ["clickable", 13]]]]],
        ["row", [["column", [["buyable", 21], ["clickable", 21]]], ["column", [["buyable", 22], ["clickable", 22]]], ["column", [["buyable", 23], ["clickable", 23]]]]],
        ["row", [["column", [["buyable", 31], ["clickable", 31]]], ["column", [["buyable", 32], ["clickable", 32]]]]],
    ],
    buyables: {
        respec() {
            resetBuyables(this.layer);
            player.b.totalBuyables = { 11: D(0), 12: D(0), 13: D(0), 21: D(0), 22: D(0), 23: D(0), 31: D(0), 32: D(0) };
            player.b.toggles = {11: true, 12: true, 13: true, 21: true, 22: true, 23: true, 31: true, 32: true, 33: true};
        }, //Bug: respeccing while togglables are off could softlock your game
        showRespec() { return hasAchievement("a", 11) },    
        respecText: "Respec buyables",
        rows: 3,
        cols: 3,
        11: {
            title() { return "Anti-Velocity<br>["+formatWhole(player[this.layer].buyables[this.id])+(tmp.b.buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp.b.buyables[this.id].extraLevels)):"")+"]" },
            unlocked() { return hasAchievement("a", 11) },
            display() { 
                return "Divides the position<br><br>Req: "+format(tmp[this.layer].buyables[this.id].cost)+" Base Points<br><br>Currently: /"+format(tmp[this.layer].buyables[this.id].effect)
            },
            cost(x) { 
                let total = x.plus(player[this.layer].buyables[12].times(tmp[this.layer].buyables[22].costScalingReduction).plus(player[this.layer].buyables[13].times(tmp[this.layer].buyables[23].costScalingReduction)));
                if (hasAchievement("a", 15)) total = total.sub(player[this.layer].buyables[21]);
                let cost = Decimal.pow(1.1, total).div(10.5);
                if (hasAchievement("a", 14)) cost = cost.div(Math.max(player.a.achievements.length, 1)); 
                return cost;
            }, 
            effect(x) { return x.plus(tmp.b.buyables[this.id].extraLevels).times(tmp.b.buyables[13] ? tmp.b.buyables[13].effect : 1).div(250).plus(1).times(tmp.b.buyables[31] ? tmp.b.buyables[31].effect2 : 1)}, 
            canAfford() { return player.b.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) && player.b.toggles[this.id] && (!hasAchievement("a", 22)||!player.b.toggles[31])},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
                player.b.totalBuyables[this.id] = player.b.totalBuyables[this.id].max(player[this.layer].buyables[this.id]);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 23)) e = e.plus(player[this.layer].buyables[31])
                return e;
            },
        },
        12: {
            title() { return "Anti-Acceleration<br>["+formatWhole(player[this.layer].buyables[this.id])+(tmp.b.buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp.b.buyables[this.id].extraLevels)):"")+"]" },
            unlocked() { return hasAchievement("a", 12) },
            display() {
                return "Exponentiates the position<br><br>Req: "+format(tmp[this.layer].buyables[this.id].cost)+" Base Points<br><br>Currently: ^"+format(tmp[this.layer].buyables[this.id].effect)
            },
            cost(x) {
                let total = x.plus(player[this.layer].buyables[11].times(tmp[this.layer].buyables[21].costScalingReduction).plus(player[this.layer].buyables[13].times(tmp[this.layer].buyables[23].costScalingReduction)));
                if (hasAchievement("a", 15)) total = total.sub(player[this.layer].buyables[22]);
                let cost = Decimal.pow(1.1, total).div(21);
                if (hasAchievement("a", 14)) cost = cost.div(Math.max(player.a.achievements.length, 1));
                return cost;
            }, 
            effect(x) {return x.plus(tmp.b.buyables[this.id].extraLevels).plus(1).log(10).div(2).plus(1)},
            canAfford() { return player.b.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) && player.b.toggles[this.id] && (!hasAchievement("a", 22)||!player.b.toggles[31])},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
                player.b.totalBuyables[this.id] = player.b.totalBuyables[this.id].max(player[this.layer].buyables[this.id]);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 23)) e = e.plus(player[this.layer].buyables[31])
                return e;
            },
        },
        13: {
            title() { return "Angles<br>["+formatWhole(player[this.layer].buyables[this.id])+(tmp.b.buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp.b.buyables[this.id].extraLevels)):"")+"]" },
            unlocked() { return hasAchievement("a", 13) },
            display() {
                return "Multiplies the effective level of Anti-Velocity<br><br>Req: "+format(tmp[this.layer].buyables[this.id].cost)+" Base Points<br><br>Currently: "+format(tmp[this.layer].buyables[this.id].effect)+"x";
            },
            cost(x) {
                let total = x.plus(player[this.layer].buyables[11].times(tmp[this.layer].buyables[21].costScalingReduction).plus(player[this.layer].buyables[12].times(tmp[this.layer].buyables[22].costScalingReduction)));
                if (hasAchievement("a", 15)) total = total.sub(player[this.layer].buyables[23]);
                let cost = Decimal.pow(1.1, total).div(31.5);
                if (hasAchievement("a", 14)) cost = cost.div(Math.max(player.a.achievements.length, 1));
                return cost;
            }, 
            effect(x) { return x.plus(tmp.b.buyables[this.id].extraLevels).plus(1).log10().div(4).plus(1).times(tmp.b.buyables[31] ? tmp.b.buyables[31].effect2 : 1)},
            canAfford() { return player.b.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) && player.b.toggles[this.id] && (!hasAchievement("a", 22)||!player.b.toggles[31])},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
                player.b.totalBuyables[this.id] = player.b.totalBuyables[this.id].max(player[this.layer].buyables[this.id]);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 23)) e = e.plus(player[this.layer].buyables[31])
                return e;
            },
        },
        21: {
            title() { return "Desynergizer V<br>[" + formatWhole(player[this.layer].buyables[this.id])+(tmp.b.buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp.b.buyables[this.id].extraLevels)):"") + "]" },
            unlocked() { return hasAchievement("a", 15) },
            display() {
                return "Reduces the cost of Anti-Velocity<br><br>Req: "+format(tmp[this.layer].buyables[this.id].cost)+" Base Points<br><br>Currently: -"+format(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let total = x.plus(hasAchievement("a1", 12)?0:(player[this.layer].buyables[22].plus(player[this.layer].buyables[23])));
                let cost = D.pow(1.25, total);
                if (hasAchievement("a", 18)) cost = cost.div(player.points.log10().times(hasAchievement("a1", 14)?player.c1.points.plus(1):1).times(-1).plus(1));
                if (hasAchievement("a1", 18)) cost = cost.div(player.b.buyables[11].plus(1).log10().plus(1));
                return cost;
            },  
            effect(x) { return x.plus(tmp[this.layer].buyables[this.id].extraLevels) },
            costScalingReduction() {
                if (!hasAchievement("a", 16)) return D(1);
                else return D.div(1, player[this.layer].buyables[21].plus(1));
            },
            canAfford() { return player.b.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) && player.b.toggles[this.id]},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
                player.b.totalBuyables[this.id] = player.b.totalBuyables[this.id].max(player[this.layer].buyables[this.id]);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 24)) e = e.plus(player[this.layer].buyables[32])
                if (hasAchievement("a1", 17)) e = e.plus(player.c1.buyables[21])
                return e;
            },
        },
        22: {
            title() { return "Desynergizer AC<br>[" + formatWhole(player[this.layer].buyables[this.id])+(tmp.b.buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp.b.buyables[this.id].extraLevels)):"") + "]" },
            unlocked() { return hasAchievement("a", 15) },
            display() {
                return "Reduces the cost of Anti-Acceleration<br><br>Req: " + format(tmp[this.layer].buyables[this.id].cost) + " Base Points<br><br>Currently: -" + format(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let total = x.plus(hasAchievement("a1", 12)?0:player[this.layer].buyables[21].plus(player[this.layer].buyables[23]));
                let cost = D.pow(1.25, total);
                if (hasAchievement("a", 18)) cost = cost.div(player.points.log10().times(hasAchievement("a1", 14)?player.c1.points.plus(1):1).times(-1).plus(1));
                if (hasAchievement("a1", 18)) cost = cost.div(player.b.buyables[12].plus(1).log10().plus(1));
                return cost;
            },
            effect(x) { return x.plus(tmp[this.layer].buyables[this.id].extraLevels) },
            costScalingReduction() {
                if (!hasAchievement("a", 16)) return D(1);
                else return D.div(1, player[this.layer].buyables[22].plus(1));
            },
            canAfford() { return player.b.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) && player.b.toggles[this.id]},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
                player.b.totalBuyables[this.id] = player.b.totalBuyables[this.id].max(player[this.layer].buyables[this.id]);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 24)) e = e.plus(player[this.layer].buyables[32])
                if (hasAchievement("a1", 17)) e = e.plus(player.c1.buyables[22])
                return e;
            },
        },
        23: {
            title() { return "Desynergizer AN<br>[" + formatWhole(player[this.layer].buyables[this.id])+(tmp.b.buyables[this.id].extraLevels.gt(0)?(" + "+formatWhole(tmp.b.buyables[this.id].extraLevels)):"") + "]" },
            unlocked() { return hasAchievement("a", 15) },
            display() {
                return "Reduces the cost of Angles<br><br>Req: " + format(tmp[this.layer].buyables[this.id].cost) + " Base Points<br><br>Currently: -" + format(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let total = x.plus(hasAchievement("a1", 12)?0:player[this.layer].buyables[22].plus(player[this.layer].buyables[21]));
                let cost = D.pow(1.25, total);
                if (hasAchievement("a", 18)) cost = cost.div(player.points.log10().times(hasAchievement("a1", 14)?player.c1.points.plus(1):1).times(-1).plus(1));
                if (hasAchievement("a1", 18)) cost = cost.div(player.b.buyables[13].plus(1).log10().plus(1));
                return cost;
            },
            effect(x) { return x.plus(tmp[this.layer].buyables[this.id].extraLevels) },
            costScalingReduction() {
                if (!hasAchievement("a", 16)) return D(1);
                else return D.div(1, player[this.layer].buyables[23].plus(1));
            },
            canAfford() { return player.b.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) && player.b.toggles[this.id]},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
                player.b.totalBuyables[this.id] = player.b.totalBuyables[this.id].max(player[this.layer].buyables[this.id]);
            },
            extraLevels() {
                let e = D(0);
                if (hasAchievement("a", 24)) e = e.plus(player[this.layer].buyables[32])
                if (hasAchievement("a1", 17)) e = e.plus(player.c1.buyables[23])
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
                let power = D(1);
                if (hasAchievement("a", 22)) power = power.times(player[this.layer].buyables[21].plus(player[this.layer].buyables[22]).plus(player[this.layer].buyables[23]).max(1).log(100).plus(1));
                return x.plus(1).log2().times(power).plus(1);
            },
            canAfford() { return player.b.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) && player.b.toggles[this.id]},
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
                player.b.totalBuyables[this.id] = player.b.totalBuyables[this.id].max(player[this.layer].buyables[this.id]);
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
                return player.points.log10().times(-1).plus(1).pow(x.div(3));
            },
            canAfford() { return player.b.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) && player.b.toggles[this.id] },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
                player.b.totalBuyables[this.id] = player.b.totalBuyables[this.id].max(player[this.layer].buyables[this.id]);
            },
        },
    },
    toggleAmount() { return hasAchievement("a", 25)?3:(hasAchievement("a", 18)?2:1) },
    clickables: { //clickables need to have some sort of a color indicator to which ones are on and off.
        rows: 3,
        cols: 3,
        11: {
            display() { return "Toggles Anti-Velocity but changes costs of other buyables <br><br>"+(player.b.toggles[11]?"ON":"OFF") },
            unlocked() { return hasAchievement("a", 14) },
            canClick() { return hasAchievement("a", 14) && Object.keys(player.b.toggles).filter(x => !player.b.toggles[x] || x==11).length<=tmp.b.toggleAmount},
            onClick() { 
                player.b.toggles[11] = !player.b.toggles[11]
                if (player.b.toggles[11]) player.b.buyables[11] = player.b.totalBuyables[11]
                else player.b.buyables[11] = D(0);
            },
            style() {
                if (player.b.toggles[11]) return { "height": "50px", "width": "150px", "background-color": "#4BDC13" };
                if (!player.b.toggles[11]) return { "height": "50px", "width": "150px", "background-color": "green" };
            },
        }, 
        12: {
            display() { return "Toggles Anti-Acceleration but changes costs of other buyables<br><br>"+(player.b.toggles[12]?"ON":"OFF") },
            unlocked() { return hasAchievement("a", 14) },
            canClick() { return hasAchievement("a", 14) && Object.keys(player.b.toggles).filter(x => !player.b.toggles[x] || x==12).length<=tmp.b.toggleAmount },
            onClick() {
                player.b.toggles[12] = !player.b.toggles[12]
                if (player.b.toggles[12]) player.b.buyables[12] = player.b.totalBuyables[12]
                else player.b.buyables[12] = D(0) 
            },
            style() {
                if (player.b.toggles[12]) return { "height": "50px", "width": "150px", "background-color": "#4BDC13" };
                if (!player.b.toggles[12]) return { "height": "50px", "width": "150px", "background-color": "green" };
            },
        }, 
        13: {
            display() { return "Toggles Angles <br> but changes costs of other buyables<br><br>"+(player.b.toggles[13]?"ON":"OFF") },
            unlocked() { return hasAchievement("a", 14) },
            canClick() { return hasAchievement("a", 14) && Object.keys(player.b.toggles).filter(x => !player.b.toggles[x] || x==13).length<=tmp.b.toggleAmount },
            onClick() { 
                player.b.toggles[13] = !player.b.toggles[13]
                if (player.b.toggles[13]) player.b.buyables[13] = player.b.totalBuyables[13]
                else player.b.buyables[13] = D(0)
            },
            style() {
                if (player.b.toggles[13]) return { "height": "50px", "width": "150px", "background-color": "#4BDC13" };
                if (!player.b.toggles[13]) return { "height": "50px", "width": "150px", "background-color": "green" };
            },
        }, 
        21: {
            display() { return "Toggles Desynergizer V <br> but changes costs of other buyables<br><br>"+(player.b.toggles[21]?"ON":"OFF") },
            unlocked() { return hasAchievement("a", 15) },
            canClick() { return hasAchievement("a", 15) && Object.keys(player.b.toggles).filter(x => !player.b.toggles[x] || x==21).length<=tmp.b.toggleAmount},
            onClick() { 
                player.b.toggles[21] = !player.b.toggles[21]
                if (player.b.toggles[21]) player.b.buyables[21] = player.b.totalBuyables[21]
                else player.b.buyables[21] = D(0)
            },
            style() {
                if (player.b.toggles[21]) return { "height": "50px", "width": "150px", "background-color": "#4BDC13" };
                if (!player.b.toggles[21]) return { "height": "50px", "width": "150px", "background-color": "green" };
            },
        }, 
        22: {
            display() { return "Toggles Desynergizer AC <br> but changes costs of other buyables<br><br>"+(player.b.toggles[22]?"ON":"OFF") },
            unlocked() { return hasAchievement("a", 15) },
            canClick() { return hasAchievement("a", 15) && Object.keys(player.b.toggles).filter(x => !player.b.toggles[x] || x==22).length<=tmp.b.toggleAmount},
            onClick() { 
                player.b.toggles[22] = !player.b.toggles[22]
                if (player.b.toggles[22]) player.b.buyables[22] = player.b.totalBuyables[22]
                else player.b.buyables[22] = D(0)
            },
            style() {
                if (player.b.toggles[22]) return { "height": "50px", "width": "150px", "background-color": "#4BDC13" };
                if (!player.b.toggles[22]) return { "height": "50px", "width": "150px", "background-color": "green" };
            },
        }, 
        23: {
            display() { return "Toggles Desynergizer AN <br> but changes costs of other buyables<br><br>"+(player.b.toggles[23]?"ON":"OFF") },
            unlocked() { return hasAchievement("a", 15) },
            canClick() { return hasAchievement("a", 15) && Object.keys(player.b.toggles).filter(x => !player.b.toggles[x] || x==23).length<=tmp.b.toggleAmount},
            onClick() { 
                player.b.toggles[23] = !player.b.toggles[23]
                if (player.b.toggles[23]) player.b.buyables[23] = player.b.totalBuyables[23]
                else player.b.buyables[23] = D(0)
            },
            style() {
                if (player.b.toggles[23]) return { "height": "50px", "width": "150px", "background-color": "#4BDC13" };
                if (!player.b.toggles[23]) return { "height": "50px", "width": "150px", "background-color": "green" };
            },
        }, 
        31: {
            display() { return "Toggles Direct Attack <br> but changes costs of other buyables<br><br>"+(player.b.toggles[31]?"ON":"OFF") },
            unlocked() { return hasAchievement("a", 17) },
            canClick() { return hasAchievement("a", 17) && Object.keys(player.b.toggles).filter(x => !player.b.toggles[x] || x==31).length<=tmp.b.toggleAmount},
            onClick() { 
                player.b.toggles[31] = !player.b.toggles[31]
                if (player.b.toggles[31]) player.b.buyables[31] = player.b.totalBuyables[31]
                else player.b.buyables[31] = D(0)
            },
            style() {
                if (player.b.toggles[31]) return { "height": "50px", "width": "150px", "background-color": "#4BDC13" };
                if (!player.b.toggles[31]) return { "height": "50px", "width": "150px", "background-color": "green" };
            },
        }, 
        32: {
            display() { return "Toggles Shrink Factor <br> but changes costs of other buyables<br><br>"+(player.b.toggles[32]?"ON":"OFF") },
            unlocked() { return hasAchievement("a1", 13) },
            canClick() { return hasAchievement("a1", 13) && Object.keys(player.b.toggles).filter(x => !player.b.toggles[x] || x==32).length<=tmp.b.toggleAmount},
            onClick() { 
                player.b.toggles[32] = !player.b.toggles[32]
                if (player.b.toggles[32]) player.b.buyables[32] = player.b.totalBuyables[32]
                else player.b.buyables[32] = D(0)
            },
            style() {
                if (player.b.toggles[32]) return { "height": "50px", "width": "150px", "background-color": "#4BDC13" };
                if (!player.b.toggles[32]) return { "height": "50px", "width": "150px", "background-color": "green" };
            },
        }, 
    },
})


