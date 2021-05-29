addLayer("a1", {
    name: "overcharge achievements",
    symbol: "GC1",
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
    achievements: {
        11: {
            name: "Starting Anew",
            tooltip: "Have 25 of each 1st row upgrade. Reward: Base Point resets no longer reset your position",
            done() {
                return player.c1.buyables[11].gte(25) && player.c1.buyables[12].gte(25) && player.c1.buyables[13].gte(25);
            },
            onComplete() { if (!player.a1.bestAchs.includes(11)) player.a1.bestAchs.push(11) },
        },
        12: {
            name: "Desynergize! Desynergize! Desynergize!",
            tooltip: "Have 5 or each 2nd row upgrade. Reward: Desynergizers no longer make each other scale",
            done() { 
                return player.c1.buyables[21].gte(5) && player.c1.buyables[22].gte(5) && player.c1.buyables[23].gte(5) && hasAchievement("a1", 11);
            },
            onComplete() { if (!player.a1.bestAchs.includes(12)) player.a1.bestAchs.push(12) },
        },
        13: {
            name: "Devil's Blessing^2",
            tooltip: "Reach 6 Overcharge Points. Reward: Unlocks Shrink Factor, and every challenge that has at least 1 point reduces the base cost of Prestige Points by 2 (capped at 3 challenges)",
            done() {
                return player.c1.points.gte(6) && hasAchievement("a1", 12);
            },
            onComplete() { if (!player.a1.bestAchs.includes(13)) player.a1.bestAchs.push(13) },
        },
        14: {
            name: "Peter's Blessing^2",
            tooltip: "Reach 7 Overcharge Points. Reward: Peter's Blessing's first effect is boosted based on your Overcharge Points",
            done() {
                return player.c1.points.gte(7) && hasAchievement("a1", 13);
            },
            onComplete() { if (!player.a1.bestAchs.includes(14)) player.a1.bestAchs.push(14) },
        },
        15: {
            name: "Stanley's Blessing",
            tooltip: "Reach 8 Overcharge Points. Reward: Add a new Overcharge effect",
            done() {
                return player.c1.points.gte(8) && hasAchievement("a1", 14);
            },
            onComplete() { if (!player.a1.bestAchs.includes(15)) player.a1.bestAchs.push(15) },
        },
    }
})
addLayer("a", {
    name: "achievements",
    symbol: "G",
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
            title: "IMPORTANT!",
            body() { return "Each goal requires the goal that came before it!" },
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
                return player.points.lte(0.25);
            },
            onComplete() { if (!player.a.bestAchs.includes(11)) player.a.bestAchs.push(11) },
        },
        12: {
            name: "That shouldn't be happening...",
            tooltip: "Reach 25 Anti-Velocity. Reward: Unlocks Anti-Acceleration",
            done() {
                return player.b.totalBuyables[11].gte(25) && hasAchievement("a", 11);
            },
            onComplete() { if (!player.a.bestAchs.includes(12)) player.a.bestAchs.push(12) },
        },
        13: {
            name: "Speeding up to slow down",
            tooltip: "Reach 15 Anti-Acceleration. Reward: Unlocks Angles",
            done() {
                return player.b.totalBuyables[12].gte(15) && hasAchievement("a", 12);
            },
            onComplete() { if (!player.a.bestAchs.includes(13)) player.a.bestAchs.push(13) },
        },
        14: {
            name: "But Enough Grinding, Have a Puzzle!",
            tooltip: "Reach 10 Angles. Reward: Your Achievement Number divides the requirements for the first 3 buyables, and you unlock Power Disablers",
            done() {
                return player.b.totalBuyables[13].gte(10) && hasAchievement("a", 13);
            },
            onComplete() { if (!player.a.bestAchs.includes(14)) player.a.bestAchs.push(14) },
        },
        15: {
            name: "You Got your nickel back!",
            tooltip: "Reach 5 Base Points. Reward: Unlocks Desynergizers",
            done() {
                return player.b.points.gte(5) && hasAchievement("a", 14);
            },
            onComplete() { if (!player.a.bestAchs.includes(15)) player.a.bestAchs.push(15) },
        },
        16: {
            name: "Desynergizers weak 4/10!",
            tooltip: "Reach 5e-5 position. Reward: Desynergizers now reduce the cost scaling effect of row 1 buyables on each other",
            done() {
                return player.points.lte(5e-5) && hasAchievement("a", 15);
            },
            onComplete() { if (!player.a.bestAchs.includes(16)) player.a.bestAchs.push(16) },
        },
        17: {
            name: "Devil's Blessing",
            tooltip: "Reach 6 Base Points. Reward: Unlocks Direct Attack",
            done() {
                return player.b.points.gte(6) && hasAchievement("a", 16);
            },
            onComplete() { if (!player.a.bestAchs.includes(17)) player.a.bestAchs.push(17) },
        },
        18: {
            name: "Peter's Blessing",
            tooltip: "Reach 7 Base Points. Reward: Desynergizer costs are reduced by your position, and you can toggle one more Power Disabler",
            done() {
                return player.b.points.gte(7) && hasAchievement("a", 17);
            },
            onComplete() { if (!player.a.bestAchs.includes(18)) player.a.bestAchs.push(18) },
        },
        21: {
            name: "This feels too soon...",
            tooltip: "Reach 1 Prestige Point. Reward: Unlocks Overcharge",
            done() {
                return player.p.points.gte(1) && hasAchievement("a", 18);
            },
            onComplete() { if (!player.a.bestAchs.includes(21)) player.a.bestAchs.push(21) },
        },
        22: {
            name: "A little out of character",
            tooltip: "Reach 25 of each desynergizer. Reward: When outside challenges, desynergizers boost Direct Attack's second effect at a reduced rate, but you can no longer buy 1st row upgrades if Direct Attack is enabled.",
            done() {
                return player.b.totalBuyables[21].gte(25) && player.b.totalBuyables[22].gte(25) && player.b.totalBuyables[23].gte(25) && hasAchievement("a", 21);
            },
            onComplete() { if (!player.a.bestAchs.includes(22)) player.a.bestAchs.push(22) },
        },
        23: {
            name: "It takes two twos to two",
            tooltip: "Reach 2 Prestige Points and 100 base points. Reward: Direct Attack adds extra levels to the first row of buyables",
            done() {
                return player.p.points.gte(2) && player.b.points.gte(100) && hasAchievement("a", 22);
            },
            onComplete() { if (!player.a.bestAchs.includes(23)) player.a.bestAchs.push(23) },
        },
        24: {
            name: "Growth Pentation",
            tooltip: "Reach 5 Shrink Factor. Reward: Shrink Factor adds extra levels to the second row of buyables, and Shrink Factor's cost is divided by 5",
            done() {
                return player.b.totalBuyables[32].gte(5) && hasAchievement("a", 23);
            },
            onComplete() { if (!player.a.bestAchs.includes(24)) player.a.bestAchs.push(24) },
        },
        25: {
            name: "Rule of Three",
            tooltip: "Reach 150 Base Points. Reward: Adds one more Power Disabler, and each active Power Disabler increases the Prestige Point effect by 1.",
            done() {
                return player.b.points.gte(150) && hasAchievement("a", 24);
            },
            onComplete() { if (!player.a.bestAchs.includes(25)) player.a.bestAchs.push(25) },
        }
    },
})
