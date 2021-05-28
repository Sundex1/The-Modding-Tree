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
            embedLayer: "b"
        }
    }
})