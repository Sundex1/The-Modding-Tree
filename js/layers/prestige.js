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
        return "which are raising the base point effect ^" + format(tmp.p.effect)
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
        }
        if (hasAchievement("a", 28)) b -= 1;
        return b;
    },
    totalBaseAndChallengePoints() { return player.b.points.plus(player.c1.points) },
    prestigeButtonText() {
        return formatWhole(tmp[this.layer].totalBaseAndChallengePoints)+" / " + formatWhole(tmp[this.layer].getNextAt) + "<br> Total Base & Challenge Points";
    },
    getNextAtDiv() {
        let s = D(1);
        if (hasAchievement("a", 27)) s = s.times(player.b.buyables[21].plus(player.b.buyables[22]).plus(player.b.buyables[23]).plus(player.c1.buyables[21]).plus(player.c1.buyables[22]).plus(player.c1.buyables[23]).plus(1).log10().plus(1).root(1.25));
        return s;
    },
    getNextAt() {
        return D.pow(tmp.p.base, player.p.points.plus(1)).div(layers[this.layer].getNextAtDiv());
    },
    canReset() {
        return layers[this.layer].totalBaseAndChallengePoints().gte(tmp[this.layer].getNextAt);
    },
    effect() { 
        if (inChallenge("c", 11)) return D(1);
        let e = player.p.points.plus(1);
        if (hasAchievement("a", 25)) {
            if (hasAchievement("a", 26)) e = e.times(Object.values(player.b.toggles).filter(x => !x).length + 1);
            else e = e.plus(Object.values(player.b.toggles).filter(x => !x).length);
        }
        return e;
    },
})