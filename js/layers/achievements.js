addLayer("a3", {
    name: "Direct achievements",
    symbol: "DG",
    row: "side",
    startData() {
        return {
            unlocked: true,
            bestAchs: [],
        }
    },
    color: challengeColors[3],
    resource: "Direct Goals",
    layerShown() { return hasAchievement("a", 38) || player.c3.points.gte(1) || inChallenge("c", 13); },
    tabFormat: [
        "blank",
        "achievements",
    ],
    achievements: {
        11: {
            name: "You can't rush perfection.",
            tooltip: "Reach 0.5 position. Reward: Unlocks Jump Start, and buyable levels reduce Direct Points effect on position.",
            done() {
                let n2 = tmp.p.buyables[41].effect;
                if (player.c3.position.lte(0.5) && player.c3.points.gte(1)) return true;
                else if (!player[this.layer].bestAchs.includes(11)) return false;
                else if (D(player[this.layer].bestAchs[0]).lt(player[this.layer].bestAchs[n2])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(11)) player[this.layer].bestAchs.push(11) },
        },
        //past this point, jump start does not affect honour hindrance
        12: {
            name: "Perfection will rush you.",
            tooltip: "Reach 100 Direct Points. Reward: Unlocks a new Direct Miss reward",
            done() {
                let n2 = tmp.p.buyables[41].effect;
                if (player.c3.points.gte(100) && hasAchievement("a3", 11)) return true;
                else if (!player[this.layer].bestAchs.includes(12)) return false;
                else if (D(player[this.layer].bestAchs[1]).lt(player[this.layer].bestAchs[n2])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(12)) player[this.layer].bestAchs.push(12) },
        },
        13: {
            name: "You used your enter key did you?",
            tooltip: "Reach 200 Direct Points. Reward: Row 1 Buyables now scale independently",
            done() {
                let n2 = tmp.p.buyables[41].effect;
                if (player.c3.points.gte(200) && hasAchievement("a3", 12)) return true;
                else if (!player[this.layer].bestAchs.includes(13)) return false;
                else if (D(player[this.layer].bestAchs[2]).lt(player[this.layer].bestAchs[n2])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(13)) player[this.layer].bestAchs.push(13) },
        },
        14: {
            name: "I need an MVP",
            tooltip: "Reach 25 of each Desynergizer. Reward: Overcharge Goals multiply Base Goals in their reduction effects",
            done() {
                let n2 = tmp.p.buyables[41].effect;
                if (player.c3.buyables[21].gte(25) && player.c3.buyables[22].gte(25) && player.c3.buyables[23].gte(25) && hasAchievement("a3", 13)) return true;
                else if (!player[this.layer].bestAchs.includes(14)) return false;
                else if (D(player[this.layer].bestAchs[3]).lt(player[this.layer].bestAchs[n2])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(14)) player[this.layer].bestAchs.push(14) },
        },
        15: {
            name: "Grand Aim",
            tooltip: "Reach 1000 Direct Points. Reward: Direct Points now multiply your sum of base and challenge points when determining Prestige Points",
            done() {
                let n2 = tmp.p.buyables[41].effect;
                if (player.c3.points.gte(1000) && hasAchievement("a3", 14)) return true;
                else if (!player[this.layer].bestAchs.includes(15)) return false;
                else if (D(player[this.layer].bestAchs[4]).lt(player[this.layer].bestAchs[n2])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(15)) player[this.layer].bestAchs.push(15) },
        },
        16: {
            name: "Double Grand?",
            tooltip: "Reach 2000 Direct Points. Reward: Direct Miss's rewards is squared, but remove the respec button",
            done() {
                let n2 = tmp.p.buyables[41].effect;
                if (player.c3.points.gte(2000) && hasAchievement("a3", 15)) return true;
                else if (!player[this.layer].bestAchs.includes(16)) return false;
                else if (D(player[this.layer].bestAchs[5]).lt(player[this.layer].bestAchs[n2])) return true;
                else return false;
            }
        },
        17: {
            name: "Double Double Grand??",
            tooltip: "Reach 2000 of each row 1 buyable.",
            done() {
                let n2 = tmp.p.buyables[41].effect;
                if (player.c3.buyables[11].gte(2000) && player.c3.buyables[12].gte(2000) && player.c3.buyables[13].gte(2000) && hasAchievement("a3", 16)) return true;
                else if (!player[this.layer].bestAchs.includes(17)) return false;
                else if (D(player[this.layer].bestAchs[6]).lt(player[this.layer].bestAchs[n2])) return true;
                else return false;
            }
        },
        18: {
            name: "The Big Not Grand!",
            tooltip: "Reach 100 of each row 2 buyable.",
            done() {
                let n2 = tmp.p.buyables[41].effect;
                if (player.c3.buyables[21].gte(100) && player.c3.buyables[22].gte(100) && player.c3.buyables[23].gte(100) && hasAchievement("a3", 17)) return true;
                else if (!player[this.layer].bestAchs.includes(18)) return false;
                else if (D(player[this.layer].bestAchs[7]).lt(player[this.layer].bestAchs[n2])) return true;
                else return false;
            }
        },
    },
}),
addLayer("a2", {
    name: "Honor achievements",
    symbol: "HG",
    row: "side",
    startData() {
        return {
            unlocked: true,
            bestAchs: [],
        }
    },
    color: "#DD00EE",
    resource: "Honor Goals",
    layerShown() { return hasAchievement("a", 31) || player.c2.points.gte(1) || inChallenge("c", 12); },
    infoboxes: {
        achievementGuide: {
            title: "Goal(?) Guide^3",
            body() {
                return "This layer has a lot to unpack.<br><br>1) This layer introduces a very unique feature: goal retention. There will be three buttons that show up above the challenges, and in the beginning, you will be able to toggle one of them on. The one that is toggled on will have the latest unlocked goals (amount based on Honour Points) retained. unlocking a new goal because of this feature will still give you that goal, but as it becomes part of your best goals, you may lose a reward in the process. Keep that in mind while grinding.<br><br>2) From herein, the game will become less linear and more open ended. Less of a puzzle and more of a 'problem solving' game. the game has multiple ways of reaching its version's designated endgame, and it's up to you to figure out how you will trod that path!<br><br>As such, this will be the last guide and, therefore, the end of the tutorial. Best of wishes on your journey to 0!";
            },
        },
    },
    tabFormat: [
        ["infobox", "achievementGuide"],
        "blank",
        "achievements",
    ],
    achievements: {
        11: {
            name: "The real game begins now...",
            tooltip: "Have 5 Honor Points. Reward: Unlocks Point Polisher, and you can bulk buy Honour points.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.points.gte(5)) return true;
                else if (!player[this.layer].bestAchs.includes(11)) return false;
                else if (D(player[this.layer].bestAchs[0]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[0]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(11)) player[this.layer].bestAchs.push(11) },
        },
        12: {
            name: "...prove yourself worthy...",
            tooltip: "Have 1 Power Play. Reward: Unlocks Power Play",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.buyables[33].gte(1) && hasAchievement("a2", 11)) return true;
                else if (!player[this.layer].bestAchs.includes(12)) return false;
                else if (D(player[this.layer].bestAchs[1]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[1]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(12)) player[this.layer].bestAchs.push(12) },
        },
        13: {
            name: "...to run a kingdom...",
            tooltip: "Have 100 Honour Points. Reward: Unlocks Head Start",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.points.gte(100) && hasAchievement("a2", 12)) return true;
                else if (!player[this.layer].bestAchs.includes(13)) return false;
                else if (D(player[this.layer].bestAchs[2]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[2]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(13)) player[this.layer].bestAchs.push(13) },
        },
        14: {
            name: "...diverse and plentiful...",
            tooltip: "Have 2 of every buyable. Reward: Unlocks Jolt Start",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.buyables[11].gte(2) && player.c2.buyables[12].gte(2) && player.c2.buyables[13].gte(2) && player.c2.buyables[21].gte(2) && player.c2.buyables[22].gte(2) && player.c2.buyables[23].gte(2) && player.c2.buyables[31].gte(2) && player.c2.buyables[32].gte(2) && player.c2.buyables[33].gte(2) && hasAchievement("a2", 13)) return true;
                else if (!player[this.layer].bestAchs.includes(14)) return false;
                else if (D(player[this.layer].bestAchs[3]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[3]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(14)) player[this.layer].bestAchs.push(14) },
        },
        15: {
            name: "...yet weak and fragile...",
            tooltip: "Have 250 Honour Points. Reward: You can now enable 2 Goal Tabs for Honour effect 1.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.points.gte(250) && hasAchievement("a2", 14)) return true;
                else if (!player[this.layer].bestAchs.includes(15)) return false;
                else if (D(player[this.layer].bestAchs[4]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[4]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(15)) player[this.layer].bestAchs.push(15) },
        },
        //past this point, divine start does not affect honour hindrance
        16: {
            name: "...waiting for the day...",
            tooltip: "Have 5 of every buyable. Reward: Honour Effect 2 affects the prestige effect hardcap in Honour as well.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.buyables[11].gte(5) && player.c2.buyables[12].gte(5) && player.c2.buyables[13].gte(5) && player.c2.buyables[21].gte(5) && player.c2.buyables[22].gte(5) && player.c2.buyables[23].gte(5) && player.c2.buyables[31].gte(5) && player.c2.buyables[32].gte(5) && player.c2.buyables[33].gte(5) && hasAchievement("a2", 15)) return true;
                else if (!player[this.layer].bestAchs.includes(16)) return false;
                else if (D(player[this.layer].bestAchs[5]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[5]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(16)) player[this.layer].bestAchs.push(16) },
        },
        17: {
            name: "...where it can be...",
            tooltip: "Have 500 Honour Points. Reward: You can now enable all Goal Tabs for Honour effect 1.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.points.gte(500) && hasAchievement("a2", 16)) return true;
                else if (!player[this.layer].bestAchs.includes(17)) return false;
                else if (D(player[this.layer].bestAchs[6]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[6]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(17)) player[this.layer].bestAchs.push(17) },
        },
        18: {
            name: "...born again!",
            tooltip: "Have 1000 Honour Points. Reward: Unlocks Divine Start",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.points.gte(1000) && hasAchievement("a2", 17)) return true;
                else if (!player[this.layer].bestAchs.includes(18)) return false;
                else if (D(player[this.layer].bestAchs[7]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[7]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(18)) player[this.layer].bestAchs.push(18) },
        },
        21: {
            name: "On one's journey...",
            tooltip: "Have 1250 Power Play. Reward: Power Play gives free levels to all row 3 buyables except itself",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.buyables[33].gte(1250) && hasAchievement("a2", 18)) return true;
                else if (!player[this.layer].bestAchs.includes(21)) return false;
                else if (D(player[this.layer].bestAchs[8]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[8]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(21)) player[this.layer].bestAchs.push(21) },
        },
        22: {
            name: "...paths may converge...",
            tooltip: "Have 250 of every buyable. Reward: Disabled goal retentions add to the maximum power disabling amount",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.buyables[11].gte(250) && player.c2.buyables[12].gte(250) && player.c2.buyables[13].gte(250) && player.c2.buyables[21].gte(250) && player.c2.buyables[22].gte(250) && player.c2.buyables[23].gte(250) && player.c2.buyables[31].gte(250) && player.c2.buyables[32].gte(250) && player.c2.buyables[33].gte(250) && hasAchievement("a2", 21)) return true;
                else if (!player[this.layer].bestAchs.includes(22)) return false;
                else if (D(player[this.layer].bestAchs[9]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[9]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(22)) player[this.layer].bestAchs.push(22) },
        },
        23: {
            name: "...cherish these moments...",
            tooltip: "Have more Honour points than Overcharge points. Reward: log(Overcharge Points) adds to Honour's 1st effect.<br>This is the last achievement is this challenge with rewards",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.points.gte(player.c1.points) && hasAchievement("a2", 21)) return true;
                else if (!player[this.layer].bestAchs.includes(23)) return false;
                else if (D(player[this.layer].bestAchs[10]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[10]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(23)) player[this.layer].bestAchs.push(23) },
        },
        24: {
            name: "...but don't rely on them...",
            tooltip: "Have 1ee-30 position.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[23].effect;
                if (player.c2.position.lte(Math.pow(10, D(1e30).times(-1))) && hasAchievement("a2", 22)) return true;
                else if (!player[this.layer].bestAchs.includes(23)) return false;
                else if (D(player[this.layer].bestAchs[10]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[13]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[10]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(23)) player[this.layer].bestAchs.push(23) },
        },
    },
}),

addLayer("a1", {
    name: "Overcharge achievements",
    symbol: "OG",
    row: "side",
    startData() {
        return {
            unlocked: true,
            bestAchs: [],
        }
    },
    color: "#FF8800",
    resource: "Overcharge Goals",
    layerShown() { return hasAchievement("a", 21) || player.c1.points.gte(1) || inChallenge("c", 11); },
    infoboxes: {
        achievementGuide: {
            title: "Goal Guide^2",
            body() {
                return "Every challenge will have its own set of goals. The goal effects are universal, meaning that they affect all challenges (current and future) and the base game. Like base game goals, challenge goal require the previous to unlock.";
            },
        },
    },
    tabFormat: [
        ["infobox", "achievementGuide"],
        "blank",
        "achievements",
    ],
    achievements: {
        11: {
            name: "Starting Anew",
            tooltip: "Have 25 of each 1st row upgrade. Reward: Base Point resets no longer reset your position",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.buyables[11].gte(25) && player.c1.buyables[12].gte(25) && player.c1.buyables[13].gte(25)) return true;
                else if (!player[this.layer].bestAchs.includes(11)) return false;
                else if (D(player[this.layer].bestAchs[0]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[0]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(11)) player[this.layer].bestAchs.push(11) },
        },
        12: {
            name: "Desynergize! Desynergize! Desynergize!",
            tooltip: "Have 5 or each 2nd row upgrade. Reward: Desynergizers no longer make each other scale",
            done() { 
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.buyables[21].gte(5) && player.c1.buyables[22].gte(5) && player.c1.buyables[23].gte(5) && hasAchievement("a1", 11)) return true;
                else if (!player[this.layer].bestAchs.includes(12)) return false;
                else if (D(player[this.layer].bestAchs[1]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[1]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(12)) player[this.layer].bestAchs.push(12) },
        },
        13: {
            name: "Devil's Blessing^2",
            tooltip: "Reach 6 Overcharge Points. Reward: Unlocks Shrink Factor, and every challenge that has at least 1 point reduces the base cost of Prestige Points by 2 (capped at 3 challenges)",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.points.gte(6) && hasAchievement("a1", 12)) return true;
                else if (!player[this.layer].bestAchs.includes(13)) return false;
                else if (D(player[this.layer].bestAchs[2]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[2]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(13)) player[this.layer].bestAchs.push(13) },
        },
        //beyond this point, jolt start does not affect honour
        14: {
            name: "Peter's Blessing^2",
            tooltip: "Reach 7 Overcharge Points. Reward: Peter's Blessing's first effect is boosted based on your Overcharge Points",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.points.gte(7) && hasAchievement("a1", 13)) return true;
                else if (!player[this.layer].bestAchs.includes(14)) return false;
                else if (D(player[this.layer].bestAchs[3]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[3]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(14)) player[this.layer].bestAchs.push(14) },
        },
        15: {
            name: "Stanley's Blessing",
            tooltip: "Reach 8 Overcharge Points. Reward: Add a new Overcharge effect",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.points.gte(8) && hasAchievement("a1", 14)) return true;
                else if (!player[this.layer].bestAchs.includes(15)) return false;
                else if (D(player[this.layer].bestAchs[4]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[4]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(15)) player[this.layer].bestAchs.push(15) },
        },
        16: {
            name: "Egg's Blessing",
            tooltip: "Reach 9 Overcharge points. Reward: You can bulk reset for base points.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.points.gte(9) && hasAchievement("a1", 15)) return true;
                else if (!player[this.layer].bestAchs.includes(16)) return false;
                else if (D(player[this.layer].bestAchs[5]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[5]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(16)) player[this.layer].bestAchs.push(16) },
        },
        17: {
            name: "WE WANT MORE SYNERGY!!!",
            tooltip: "Reach 30 of each Desynergizer. Reward: Bought Overcharge Desynergizers add levels to their respective Base game desynergizer and vice versa",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.buyables[21].gte(30) && player.c1.buyables[22].gte(30) && player.c1.buyables[23].gte(30) && hasAchievement("a1", 16)) return true;
                else if (!player[this.layer].bestAchs.includes(17)) return false;
                else if (D(player[this.layer].bestAchs[6]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[6]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(17)) player[this.layer].bestAchs.push(17) },
        },
        18: {
            name: "Double Digits!",
            tooltip: "Reach 10 Overcharge Points. Reward: Row 1 Buyables reduce the cost of their respective Desynergizer",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.points.gte(10) && hasAchievement("a1", 17)) return true;
                else if (!player[this.layer].bestAchs.includes(18)) return false;
                else if (D(player[this.layer].bestAchs[7]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[7]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(18)) player[this.layer].bestAchs.push(18) },
        },
        21: {
            name: "TRIPLE DIGITS!!!",
            tooltip: "Reach 100 of each row 1 buyable. Reward: First row Overcharge buyables add to their Base Game counterparts and vice versa.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.buyables[11].gte(100) && player.c1.buyables[12].gte(100) && player.c1.buyables[13].gte(100) && hasAchievement("a1", 18)) return true;
                else if (!player[this.layer].bestAchs.includes(21)) return false;
                else if (D(player[this.layer].bestAchs[8]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[8]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(21)) player[this.layer].bestAchs.push(21) },
        },
        22: {
            name: "Easy to earn. Hard to keep.",
            tooltip: "Have 1 Shrink Factor without the 'Growth Pentation' Goal. Reward: Resetting for Overcharge Points resets nothing",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.buyables[32].gte(1) && hasAchievement("a1", 21) && !hasAchievement("a", 24)) return true;
                else if (!player[this.layer].bestAchs.includes(22)) return false;
                else if (D(player[this.layer].bestAchs[9]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[9]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(22)) player[this.layer].bestAchs.push(22) },
        },
        23: {
            name: "Took long enough",
            tooltip: "Reach 100 Overcharge Points. Reward: You can now bulk buy overcharge points.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.points.gte(100) && hasAchievement("a1", 22)) return true;
                else if (!player[this.layer].bestAchs.includes(23)) return false;
                else if (D(player[this.layer].bestAchs[10]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[10]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(23)) player[this.layer].bestAchs.push(23) },
        },
        24: {
            name: "Deja Vu",
            tooltip: "Have 10 Shrink Factor. Reward: Shrink Factor is further boosted based on the sum of your base points and challenge points.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.buyables[32].gte(10) && hasAchievement("a1", 23)) return true;
                else if (!player[this.layer].bestAchs.includes(24)) return false;
                else if (D(player[this.layer].bestAchs[11]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[11]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(24)) player[this.layer].bestAchs.push(24) },
        },
        25: {
            name: "Not Deja Vu(?)",
            tooltip: "Have 5 Power Play. Reward: Unlocks Cloned Powers.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.buyables[33].gte(5) && hasAchievement("a1", 24)) return true;
                else if (!player[this.layer].bestAchs.includes(25)) return false;
                else if (D(player[this.layer].bestAchs[12]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[12]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(25)) player[this.layer].bestAchs.push(25) },
        },
        26: {
            name: "Why didn't we think of this before?",
            tooltip: "Have 100 of each Desynergizer. Reward: B.E.G.H.a.P's 1st effect now affects Desynergizers.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.buyables[21].gte(100) && player.c1.buyables[22].gte(100) && player.c1.buyables[23].gte(100) && hasAchievement("a1", 25)) return true;
                else if (!player[this.layer].bestAchs.includes(26)) return false;
                else if (D(player[this.layer].bestAchs[13]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[13]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            }, 
            onComplete() { if (!player[this.layer].bestAchs.includes(26)) player[this.layer].bestAchs.push(26) },
        },
        27: {
            name: "WHY DIDN'T WE THINK OF THIS BEFORE?!?!",
            tooltip: "Have 3 of each row 3 buyable. Reward: B.E.G.H.a.P's 1st effect now affects Row 3 buyables.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.buyables[31].gte(3) && player.c1.buyables[32].gte(3) && player.c1.buyables[33].gte(3) && hasAchievement("a1", 26)) return true;
                else if (!player[this.layer].bestAchs.includes(27)) return false;
                else if (D(player[this.layer].bestAchs[14]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[14]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(27)) player[this.layer].bestAchs.push(27) },
        },
        28: {
            name: "Should have had this earlier...",
            tooltip: "Have 10000 Overcharge Points. Reward: Overcharge has a 3rd reward!<br>This is the last achievement with a reward in this challenge",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[22].effect;
                if (player.c1.points.gte(10000) && hasAchievement("a1", 27)) return true;
                else if (!player[this.layer].bestAchs.includes(28)) return false;
                else if (D(player[this.layer].bestAchs[15]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[12]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[15]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(28)) player[this.layer].bestAchs.push(28) },
        },
    }
}),
addLayer("a", {
    name: "achievements",
    symbol: "BG",
    row: "side",
    startData() {
        return {
            unlocked: true,
            bestAchs: [],
        }
    },
    color: "#4BDC13",
    resource: "Goals",
    infoboxes: {
        achievementGuide: {
            title: "Goal Guide",
            body() {
                return "Here is where you can find the goals for the base game. Every goal has a reward, so be sure you are focusing on completing them alongside your general progression. Each achievement requires that you have the previous one, so keep that in mind when making decisions about your gameplay."},
        },
    },
    tabFormat: [
        ["infobox", "achievementGuide"],
        "achievements",
    ],
    achievements: {
        11: {
            name: "You actually waited!",
            tooltip: "Reach 0.25 position. Reward: Unlocks Anti-Velocity",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.points.lte(0.25)) return true;
                else if (!player[this.layer].bestAchs.includes(11)) return false;
                else if (D(player[this.layer].bestAchs[0]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[0]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(11)) player[this.layer].bestAchs.push(11) },
        },
        12: {
            name: "That shouldn't be happening...",
            tooltip: "Reach 25 Anti-Velocity. Reward: Unlocks Anti-Acceleration",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.totalBuyables[11].gte(25) && hasAchievement("a", 11)) return true;
                else if (!player[this.layer].bestAchs.includes(12)) return false;
                else if (D(player[this.layer].bestAchs[1]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[1]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(12)) player[this.layer].bestAchs.push(12) },
        },
        13: {
            name: "Speeding up to slow down",
            tooltip: "Reach 15 Anti-Acceleration. Reward: Unlocks Angles",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.totalBuyables[12].gte(15) && hasAchievement("a", 12)) return true;
                else if (!player[this.layer].bestAchs.includes(13)) return false;
                else if (D(player[this.layer].bestAchs[2]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[2]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(13)) player[this.layer].bestAchs.push(13) },
        },
        //past this point, head start does not affect honour.
        14: {
            name: "But Enough Grinding, Have a Puzzle!",
            tooltip: "Reach 10 Angles. Reward: Your Achievement Number divides the requirements for the first 3 buyables, and you unlock Power Disablers",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.totalBuyables[13].gte(10) && hasAchievement("a", 13)) return true;
                else if (!player[this.layer].bestAchs.includes(14)) return false;
                else if (D(player[this.layer].bestAchs[3]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[3]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(14)) player[this.layer].bestAchs.push(14) },
        },
        15: {
            name: "You Got your nickel back!",
            tooltip: "Reach 5 Base Points. Reward: Unlocks Desynergizers",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.points.gte(5) && hasAchievement("a", 14)) return true;
                else if (!player[this.layer].bestAchs.includes(15)) return false;
                else if (D(player[this.layer].bestAchs[4]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[4]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(15)) player[this.layer].bestAchs.push(15) },
        },
        16: {
            name: "Desynergizers weak 4/10!",
            tooltip: "Reach 5e-5 position. Reward: Desynergizers now reduce the cost scaling effect of row 1 buyables on each other",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.points.lte(5e-5) && hasAchievement("a", 15)) return true;
                else if (!player[this.layer].bestAchs.includes(16)) return false;
                else if (D(player[this.layer].bestAchs[5]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[5]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(16)) player[this.layer].bestAchs.push(16) },
        },
        17: {
            name: "Devil's Blessing",
            tooltip: "Reach 6 Base Points. Reward: Unlocks Direct Attack",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.points.gte(6) && hasAchievement("a", 16)) return true;
                else if (!player[this.layer].bestAchs.includes(17)) return false;
                else if (D(player[this.layer].bestAchs[6]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[6]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(17)) player[this.layer].bestAchs.push(17) },
        },
        18: {
            name: "Peter's Blessing",
            tooltip: "Reach 7 Base Points. Reward: Desynergizer costs are reduced by your position, and you can toggle one more Power Disabler",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.points.gte(7) && hasAchievement("a", 17)) return true;
                else if (!player[this.layer].bestAchs.includes(18)) return false;
                else if (D(player[this.layer].bestAchs[7]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[7]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(18)) player[this.layer].bestAchs.push(18) },
        },
        21: {
            name: "This feels too soon...",
            tooltip: "Reach 1 Prestige Point. Reward: Unlocks Overcharge",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.points.gte(1) && hasAchievement("a", 18)) return true;
                else if (!player[this.layer].bestAchs.includes(21)) return false;
                else if (D(player[this.layer].bestAchs[8]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[8]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(21)) player[this.layer].bestAchs.push(21) },
        },
        22: {
            name: "A little out of character",
            tooltip: "Reach 25 of each desynergizer. Reward: When outside challenges, desynergizers boost Direct Attack's second effect at a reduced rate, but you can no longer buy 1st row upgrades if Direct Attack is enabled.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.totalBuyables[21].gte(25) && player.b.totalBuyables[22].gte(25) && player.b.totalBuyables[23].gte(25) && hasAchievement("a", 21)) return true;
                else if (!player[this.layer].bestAchs.includes(22)) return false;
                else if (D(player[this.layer].bestAchs[9]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[9]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(22)) player[this.layer].bestAchs.push(22) },
        },
        23: {
            name: "It takes two twos to two",
            tooltip: "Reach 2 Prestige Points and 100 base points. Reward: Direct Attack adds extra levels to the first row of buyables",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.points.gte(2) && player.b.points.gte(100) && hasAchievement("a", 22)) return true;
                else if (!player[this.layer].bestAchs.includes(23)) return false;
                else if (D(player[this.layer].bestAchs[10]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[10]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(23)) player[this.layer].bestAchs.push(23) },
        },
        24: {
            name: "Growth Pentation",
            tooltip: "Reach 5 Shrink Factor. Reward: Shrink Factor adds extra levels to the second row of buyables, and Shrink Factor's cost is divided by 5",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.totalBuyables[32].gte(5) && hasAchievement("a", 23)) return true;
                else if (!player[this.layer].bestAchs.includes(24)) return false;
                else if (D(player[this.layer].bestAchs[11]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[11]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(24)) player[this.layer].bestAchs.push(24) },
        },
        25: {
            name: "Rule of Three",
            tooltip: "Reach 150 Base Points. Reward: Adds one more Power Disabler, and each active Power Disabler increases the Prestige Point effect by 1.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.points.gte(150) && hasAchievement("a", 24)) return true;
                else if (!player[this.layer].bestAchs.includes(25)) return false;
                else if (D(player[this.layer].bestAchs[12]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[12]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(25)) player[this.layer].bestAchs.push(25) },
        },
        26: {
            name: "More Threes? Have at three!",
            tooltip: "Have 3 Prestige Points, 333 Base Points, and 3.3e-33 position. Reward: The previous achievement now multiplies the prestige point effect instead of adding to it.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.points.gte(3) && player.points.lte(3.3e-33) && player.b.points.gte(333) && hasAchievement("a", 25)) return true;
                else if (!player[this.layer].bestAchs.includes(26)) return false;
                else if (D(player[this.layer].bestAchs[13]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[13]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(26)) player[this.layer].bestAchs.push(26) },
        },
        27: {
            name: "You knew it was coming...",
            tooltip: "Have 69 bought levels of each Desynergizer. Reward: Purchased Overcharge Desynergizers and Base Game Desynergizers reduce the Prestige Requirement.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.totalBuyables[21].gte(69) && player.b.totalBuyables[22].gte(69) && player.b.totalBuyables[23].gte(69) && hasAchievement("a", 26)) return true;
                else if (!player[this.layer].bestAchs.includes(27)) return false;
                else if (D(player[this.layer].bestAchs[14]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[14]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(27)) player[this.layer].bestAchs.push(27) },
        },
        28: {
            name: "I refuse.",
            tooltip: "Have 4 Prestige Points. Reward: Reduces the base of the prestige requirement by 1, and prestige resets no longer reset buyable amounts.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.points.gte(4) && hasAchievement("a", 27)) return true;
                else if (!player[this.layer].bestAchs.includes(28)) return false;
                else if (D(player[this.layer].bestAchs[15]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[15]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(28)) player[this.layer].bestAchs.push(28) },
        },
        31: {
            name: "Break Infinitesimal",
            tooltip: "Have 1.8e-308 position. Reward: Unlocks Without Honor.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.points.lte(1.8e-308) && hasAchievement("a", 28)) return true;
                else if (!player[this.layer].bestAchs.includes(31)) return false;
                else if (D(player[this.layer].bestAchs[16]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[16]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(31)) player[this.layer].bestAchs.push(31) },
        },
        32: {
            name: "Feels like Pentated scaling over here.",
            tooltip: "Have 11 Prestige Points, 11,111,111 Base Points, and 1.1e-111111 position. Reward: Without Honor has a 2nd effect",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.points.gte(11) && player.b.points.gte(11111111) && player.points.lte("1.1e-111111") && hasAchievement("a", 31)) return true;
                else if (!player[this.layer].bestAchs.includes(32)) return false;
                else if (D(player[this.layer].bestAchs[17]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[17]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(32)) player[this.layer].bestAchs.push(32) },
        },
        33: {
            name: "Unchained Googology",
            tooltip: "Reach 1e-100000 position without any power disablers. Reward: Unlocks Resynergizer",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.points.lte("1e-100000") && player.b.toggles[11] && player.b.toggles[12] && player.b.toggles[13] && player.b.toggles[21] && player.b.toggles[22] && player.b.toggles[23] && player.b.toggles[31] && player.b.toggles[32] && player.b.toggles[33] && hasAchievement("a", 32)) return true;
                else if (!player[this.layer].bestAchs.includes(33)) return false;
                else if (D(player[this.layer].bestAchs[18]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[18]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(33)) player[this.layer].bestAchs.push(33) },
        },
        34: {
            name: "What the heck is this scaling?",
            tooltip: "Reach 6 total Prestige Buyable Levels. Reward: Further reduces Prestige Upgrade scaling based on achievements",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (D(player.p.buyables[11]).plus(player.p.buyables[12]).plus(player.p.buyables[32]).plus(player.p.buyables[31]).plus(player.p.buyables[33]).plus(player.p.buyables[13]).plus(player.p.buyables[21]).plus(player.p.buyables[22]).plus(player.p.buyables[23]).gte(6) && hasAchievement("a", 33)) return true;
                else if (!player[this.layer].bestAchs.includes(34)) return false;
                else if (D(player[this.layer].bestAchs[19]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[19]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(34)) player[this.layer].bestAchs.push(34) },
        },
        35: {
            name: "No no no not that scaling, THIS scaling",
            tooltip: "Reach 15 Prestige Points. Reward: Unlocks Pristine Prestige",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.points.gte(15) && hasAchievement("a", 34)) return true;
                else if (!player[this.layer].bestAchs.includes(35)) return false;
                else if (D(player[this.layer].bestAchs[20]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[20]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(35)) player[this.layer].bestAchs.push(35) },
        },
        36: {
            name: "Thanks for listening, now MORE SYNERGY!!!",
            tooltip: "Reach 275 of each Desynergizer. Reward: Unlocks Resynergizer 2.0",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.buyables[21].gte(275) && player.b.buyables[22].gte(275) && player.b.buyables[23].gte(275) && hasAchievement("a", 35)) return true;
                else if (!player[this.layer].bestAchs.includes(36)) return false;
                else if (D(player[this.layer].bestAchs[21]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[21]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(36)) player[this.layer].bestAchs.push(36) },
        },
        37: {
            name: "What else do you guys want from me?",
            tooltip: "Reach 20 Prestige Points. Reward: Unlocks Space Warper",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.points.gte(20) && hasAchievement("a", 36)) return true;
                else if (!player[this.layer].bestAchs.includes(37)) return false;
                else if (D(player[this.layer].bestAchs[22]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[22]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(37)) player[this.layer].bestAchs.push(37) },
        },
        38: {
            name: "A new challenge? Don't say I didn't warn you!",
            tooltip: "Reach 200 total row 3 buyables. Reward: Unlocks Direct Miss",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.buyables[31].plus(player.b.buyables[32]).plus(player.b.buyables[33]).gte(200) && hasAchievement("a", 37)) return true;
                else if (!player[this.layer].bestAchs.includes(38)) return false;
                else if (D(player[this.layer].bestAchs[23]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[23]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(38)) player[this.layer].bestAchs.push(38) },
        },
        41: {
            name: "(Not) halfway there...",
            tooltip: "Reach 50 Prestige Points. Reward: Adds a 4th power disabler to your arsenal, and the effect now exponentiates instead of multiply",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.points.gte(50) && hasAchievement("a", 38)) return true;
                else if (!player[this.layer].bestAchs.includes(41)) return false;
                else if (D(player[this.layer].bestAchs[24]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[24]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(41)) player[this.layer].bestAchs.push(41) },
        },
        42: {
            name: "(NOT) finished...",
            tooltip: "Reach 100 Prestige Points. Reward: Prestige Points add to the first reward of Direct Miss",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.points.gte(100) && hasAchievement("a", 41)) return true;
                else if (!player[this.layer].bestAchs.includes(42)) return false;
                else if (D(player[this.layer].bestAchs[25]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[25]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(42)) player[this.layer].bestAchs.push(42) },
        },
        43: {
            name: "(DEFINITELY NOT) Beyond Finished",
            tooltip: "Reach 3500 of each row 1 buyable. Reward: 'Double Digits' reward is improved greatly.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.buyables[11].gte(3500) && player.b.buyables[12].gte(3500) && player.b.buyables[13].gte(3500) && hasAchievement("a", 42)) return true;
                else if (!player[this.layer].bestAchs.includes(43)) return false;
                else if (D(player[this.layer].bestAchs[26]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[26]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(43)) player[this.layer].bestAchs.push(43) },
        },
        44: {
            name: "(Probably) finished playing (for today)",
            tooltip: "Reach 1000 of each row 2 buyable. Reward: Resynergizer is now a square root, and its level is applied to the effect after the root.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.buyables[21].gte(1000) && player.b.buyables[22].gte(1000) && player.b.buyables[23].gte(1000) && hasAchievement("a", 43)) return true;
                else if (!player[this.layer].bestAchs.includes(44)) return false;
                else if (D(player[this.layer].bestAchs[27]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[27]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(44)) player[this.layer].bestAchs.push(44) },
        },
        45: {
            name: "Prestige Goals Tab When?",
            tooltip: "Have 1000 Point Polisher. Reward: Point Polisher affects row 3 buyables, but row 3 buyables are synchronized.",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.buyables[11].gte(1000) && hasAchievement("a", 44)) return true;
                else if (!player[this.layer].bestAchs.includes(45)) return false;
                else if (D(player[this.layer].bestAchs[28]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[28]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(45)) player[this.layer].bestAchs.push(45) },
        },
        46: {
            name: "Synergism <s>not sponsored</s>",
            tooltip: "Reach 100 Resynergizers: Reward. Resynergizers additively boost their 2.0 counterpart by 1% per level",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.buyables[12].gte(100) && hasAchievement("a", 45)) return true;
                else if (!player[this.layer].bestAchs.includes(46)) return false;
                else if (D(player[this.layer].bestAchs[29]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[29]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(46)) player[this.layer].bestAchs.push(46) },
        },
        47: {
            name: "Synergism^2 <s>still not sponsored</s>",
            tooltip: "Reach 10 Resynergizer 2.0s: Reward. Resynergizer 2.0s additively boost their 1.0 counterpart by 100% per level",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.p.buyables[32].gte(10) && hasAchievement("a", 46)) return true;
                else if (!player[this.layer].bestAchs.includes(47)) return false;
                else if (D(player[this.layer].bestAchs[30]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[30]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(47)) player[this.layer].bestAchs.push(47) },
        },
        48: {
            name: "this will stop ya. >:(",
            tooltip: "Reach 1e55 base points, 1e-(1e55) position, and 5555 of every buyable. Reward: Unlocks Sadistic Synergy (when 0.7 drops)",
            done() {
                let n = tmp.c.challenges[12].effect;
                let n2 = tmp.p.buyables[21].effect;
                if (player.b.points.gte(1e55) && player.points.lte(Math.pow(10, D(1e55).times(-1))) && player.b.buyables[11].gte(5555) && player.b.buyables[12].gte(5555) && player.b.buyables[13].gte(5555) && player.b.buyables[21].gte(5555) && player.b.buyables[22].gte(5555) && player.b.buyables[23].gte(5555) && player.b.buyables[31].gte(5555) && player.b.buyables[32].gte(5555) && player.b.buyables[33].gte(5555) && hasAchievement("a", 47)) return true;
                else if (!player[this.layer].bestAchs.includes(47)) return false;
                else if (D(player[this.layer].bestAchs[30]).lt(player[this.layer].bestAchs[n2])) return true;
                else if (!player.c.clickables[11]) return false;
                else if (n == 0) return false;
                else if (D(player[this.layer].bestAchs[30]).gte(player[this.layer].bestAchs[player[this.layer].bestAchs.length - n])) return true;
                else return false;
            },
            onComplete() { if (!player[this.layer].bestAchs.includes(47)) player[this.layer].bestAchs.push(47) },
        }
    }
})
