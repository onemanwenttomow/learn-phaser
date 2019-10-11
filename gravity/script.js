var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                scale: 0
            },
            plugins: {
                attractors: true
            }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);
var mass;

function preload () {
    this.load.image('planet', 'assets/planet.png');
    this.load.image('star', 'assets/star.png');
}

function create () {
    //  You can enable the Attractors plugin either via the game config (see above), or explicitly in code:
    // this.matter.system.enableAttractorPlugin();

    this.matter.world.setBounds();

    for (var i = 0; i < 5; i++) {
        mass = generateRandomNum(5);
        this.matter.add.image(generateRandomNum(800), generateRandomNum(600), 'planet', null, {
            shape: {
                type: 'circle',
                radius: 64
            },
            mass: mass * 100000,
            plugin: {
                attractors: [
                    function (bodyA, bodyB) {
                        return {
                            x: (bodyA.position.x - bodyB.position.x) * 0.0000001,
                            y: (bodyA.position.y - bodyB.position.y) * 0.0000001
                        };
                    }
                ]
            }
        }).setScale(mass/10);
    }

    this.matter.add.imageStack('star', null, 0, 0, 1, 1, 0, 0, {
        mass: 1,
        ignorePointer: false
    });




    this.matter.add.mouseSpring();
}

function generateRandomNum(num) {
    return Math.floor(Math.random() * num + 1);
}
