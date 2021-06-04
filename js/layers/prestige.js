addLayer("p", {
	name: "prestige points",
	symbol: "P",
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new D(0),
        }
    },
    color: "#999999",
    resource: "Prestige Points", // Name of prestige currency
    baseResource: "Point Sum", // Name of resource prestige is based on
    effectDescription() {
        return "<br>which are raising the base point effect ^" + format(tmp.p.effect)
    },
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "p", description: "P: Reset for prestige points", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true },
    getResetGain() {
        return decimalOne;
    },
    base() { 
        let b = 9;
        if (hasAchievement("a1", 13)) {
            if (player.c1.points.gte(1)) b -= 2;
            if (player.c2.points.gte(1)) b -= 2;
        }
        if (hasAchievement("a", 28)) b -= 1;
        return b;
    },
    totalBaseAndChallengePoints() { return player.b.points.plus(player.c1.points).plus(player.c2.points) },
    prestigeButtonText() {
        return formatWhole(tmp[this.layer].totalBaseAndChallengePoints)+" / " + formatWhole(tmp[this.layer].getNextAt) + "<br> Total Base & Challenge Points";
    },
    getNextAtDiv() {
        let s = D(1);
        if (hasAchievement("a", 27)) s = s.times(player.b.buyables[21].plus(player.b.buyables[22]).plus(player.b.buyables[23]).plus(player.c1.buyables[21]).plus(player.c1.buyables[22]).plus(player.c1.buyables[23]).plus(1).log10().plus(1).root(1.25));
        s = s.times(tmp[this.layer].buyables[31].effect);
        return s;
    },
    getNextAt() {
        return D.pow(tmp.p.base, player.p.points.plus(1)).div(layers[this.layer].getNextAtDiv());
    },
    canReset() {
        return layers[this.layer].totalBaseAndChallengePoints().gte(tmp[this.layer].getNextAt);
    },
    effect() { 
        if (inChallenge("c", 12)) return D(1);
        let e = player.p.points.plus(1);
        if (hasAchievement("a", 25)) {
            if (hasAchievement("a", 26)) e = e.times(D(tmp[this.layer].buyables[13].effect)).times(Object.values(player.b.toggles).filter(x => !x).length + 1);
            else e = e.plus(Object.values(player.b.toggles).filter(x => !x).length);
        }
        return e;
    },
    doReset() {
        return (hasAchievement("a", 28)) ? layerDataReset() : null;
    },
    buyables: {
        rows: 4,
        cols: 3,
        11: {
            title() { return "Point Polisher<br>[" + formatWhole(player[this.layer].buyables[this.id]) + "]" },
            unlocked() { return hasAchievement("a2", 11) },
            display() {
                return "Roots the base point and challenge point requirement based on prestige points<br><br>Req: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Prestige Points<br><br>Currently: " + formatWhole(tmp[this.layer].buyables[this.id].effect)+"th root";
            },
            cost(x) {
                let cost = Decimal.pow(x.plus(1), x.plus(1));
                if (hasAchievement("a", 34)) cost = cost.plus(1).log(player.a.achievements.length);
                return cost;
            },
            effect(x) {
                return Math.max(player.p.points.times(x), 1);
            },
            canAfford() { return player.p.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
        },
        12: {
            title() { return "Resynergizer<br>[" + formatWhole(player[this.layer].buyables[this.id]) + "]" },
            unlocked() { return hasAchievement("a", 33) },
            display() {
                return "Adds the cube root of each row 1 buyable times this upgrade's level to their respective desynergizer.<br><br>Req: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            cost(x) {
                let cost = Decimal.pow(x.plus(1).pow(2), x.plus(1).pow(2));
                if (hasAchievement("a", 34)) cost = cost.plus(1).log(player.a.achievements.length);
                return cost;
            },
            effect(x) { return x; },
            canAfford() { return player.p.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
        },
        13: {
            title() { return "Cloned Powers<br>[" + formatWhole(player[this.layer].buyables[this.id]) + "]" },
            unlocked() { return hasAchievement("a1", 25) },
            display() {
                return "Multiplies power disabler's goal effects<br><br>Req: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Prestige Points<br><br>Currently: x" + formatWhole(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let cost = Decimal.pow(x.plus(1).pow(3), x.plus(1).pow(3));
                if (hasAchievement("a", 34)) cost = cost.plus(1).log(player.a.achievements.length);
                return cost;
            },
            effect(x) {
                return D(x).plus(1);
            },
            canAfford() { return player.p.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
        },
        21: {
            title() { return "Head Start<br>[" + formatWhole(player[this.layer].buyables[this.id]) + "]" },
            unlocked() { return hasAchievement("a2", 13) },
            display() {
                return "Retain a portion of your Base Goals starting from the beginning<br><br>Retained goals bypass honour's hindrance<br><br>Req: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Prestige Points<br><br>Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let cost = Decimal.pow(x.plus(1).pow(4), x.plus(1).pow(4));
                if (hasAchievement("a", 34)) cost = cost.plus(1).log(player.a.achievements.length);
                return cost;
            },
            effect(x) {
                return D(x);
            },
            canAfford() { return player.p.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
        },
        22: {
            title() { return "Jolt Start<br>[" + formatWhole(player[this.layer].buyables[this.id]) + "]" },
            unlocked() { return hasAchievement("a2", 13) },
            display() {
                return "Retain a portion of your Overcharge Goals starting from the beginning<br><br>Retained goals bypass honour's hindrance<br><br>Req: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Prestige Points<br><br>Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let cost = Decimal.pow(x.plus(1).pow(5), x.plus(1).pow(5));
                if (hasAchievement("a", 34)) cost = cost.plus(1).log(player.a.achievements.length);
                return cost;
            },
            effect(x) {
                return D(x);
            },
            canAfford() { return player.p.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
        },
        23: {
            title() { return "Divine Start<br>[" + formatWhole(player[this.layer].buyables[this.id]) + "]" },
            unlocked() { return hasAchievement("a2", 18) },
            display() {
                return "Retain a portion of your Honor Goals starting from the beginning<br><br>Retained goals bypass honour's hindrance<br><br>Req: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Prestige Points<br><br>Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let cost = Decimal.pow(x.plus(1).pow(6), x.plus(1).pow(6));
                if (hasAchievement("a", 34)) cost = cost.plus(1).log(player.a.achievements.length);
                return cost;
            },
            effect(x) {
                return D(x);
            },
            canAfford() { return player.p.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
        },
        31: {
            title() { return "Pristine Prestige<br>[" + formatWhole(player[this.layer].buyables[this.id]) + "]" },
            unlocked() { return hasAchievement("a", 35) },
            display() {
                return "Divides the requirement for prestige points<br><br>Req: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Prestige Points<br><br>Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let cost = Decimal.pow(x.plus(1).pow(7), x.plus(1).pow(7));
                if (hasAchievement("a", 34)) cost = cost.plus(1).log(player.a.achievements.length);
                return cost;
            },
            effect(x) {
                return D.pow(2,x);
            },
            canAfford() { return player.p.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
        },
        32: {
            title() { return "Resynergizer 2.0<br>[" + formatWhole(player[this.layer].buyables[this.id]) + "]" },
            unlocked() { return hasAchievement("a", 36) },
            display() {
                return "Raises the effective levels gained from bought desynergizers<br><br>Req: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Prestige Points<br><br>Currently: ^" + formatWhole(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let cost = Decimal.pow(x.plus(1).pow(8), x.plus(1).pow(8));
                if (hasAchievement("a", 34)) cost = cost.plus(1).log(player.a.achievements.length);
                return cost;
            },
            effect(x) {
                return D(1).plus(x.times(0.01));
            },
            canAfford() { return player.p.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
        },
        33: {
            title() { return "Space Warper<br>[" + formatWhole(player[this.layer].buyables[this.id]) + "]" },
            unlocked() { return hasAchievement("a", 37) },
            display() {
                return "Reduces the starting position in all modes<br><br>Req: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Prestige Points<br><br>Currently: x" + formatWhole(tmp[this.layer].buyables[this.id].effect);
            },
            cost(x) {
                let cost = Decimal.pow(x.plus(1).pow(9), x.plus(1).pow(9));
                if (hasAchievement("a", 34)) cost = cost.plus(1).log(player.a.achievements.length);
                return cost;
            },
            effect(x) {
                return D.pow(10,x.times(-1));
            },
            canAfford() { return player.p.points.gte(layers[this.layer].buyables[this.id].cost(player[this.layer].buyables[this.id])) },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
        },
    },
})