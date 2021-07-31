var layoutInfo = {
    startTab: "none",
	showTree: true,

    treeLayout: ""

    
}

const D = Decimal

//hi im unpinga

// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: {
        "Main": {
            embedLayer() { return player.c.activeChallenge ? ("c"+(player.c.activeChallenge-10)):"b"},
        },
        "Prestige": {
            embedLayer: "p",
            unlocked() { return player.b.points.gte(9) || player.p.points.gte(1) }
        },
        "Challenges": {
            embedLayer: "c",
            unlocked() { return hasAchievement("a", 21) || player.c1.points.gte(1) || inChallenge("c", 11 || 12) || player.c2.points.gte(1) },
        },
    }, 
})