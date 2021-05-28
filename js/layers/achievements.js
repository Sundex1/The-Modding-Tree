

addLayer("a", {
    name: "achievements",
    symbol: "A",
    row: "side",
    startData() {
        return {
            unlocked: true,
            bestAchs: [],
        }
    },
    color: "#FFFFFF",
    resource: "Achievements",
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
        }
    },
})
