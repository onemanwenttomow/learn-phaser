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

function preload ()
{
    this.load.image('planet', 'assets/planet.png');
    this.load.image('alien', 'assets/sprites/space-baddie.png');
}

function create ()
{
    //  You can enable the Attractors plugin either via the game config (see above), or explicitly in code:
    // this.matter.system.enableAttractorPlugin();

    this.matter.world.setBounds();

    this.matter.add.imageStack('alien', null, 0, 500, 1, 1, 0, 0, {
        mass: 0.5,
        ignorePointer: true
    });

    var planet = this.matter.add.image(400, 200, 'planet', null, {
        shape: {
            type: 'circle',
            radius: 64
        },
        plugin: {
            attractors: [
                function (bodyA, bodyB) {
                    return {
                        x: (bodyA.position.x - bodyB.position.x) * 0.000001,
                        y: (bodyA.position.y - bodyB.position.y) * 0.000001
                    };
                }
            ]
        }
    });
    // var circle = new Phaser.Geom.Circle(0, 0, 50);

    var r1 = this.add.circle(200, 200, 80, 0x6666ff);


    this.matter.add.mouseSpring();
}
