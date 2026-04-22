namespace SpriteKind {
    export const SpecialFood = SpriteKind.create()
    export const EvilMachine = SpriteKind.create()
    export const RayGun = SpriteKind.create()
    export const Hint = SpriteKind.create()
    export const Burger = SpriteKind.create()
    export const Fries = SpriteKind.create()
    export const SpecialKey = SpriteKind.create()
    export const Door = SpriteKind.create()
    export const SpecialStar = SpriteKind.create()
    export const TreasureChest = SpriteKind.create()
}

// Level 1
let barrier1 = false
let barrier2 = false
let milkShakeEmoji: Sprite = null
let friesEmoji: Sprite = null
let choice: Sprite = null
let burgerEmoji: Sprite = null
let roll = 0
let specialIceCream: Sprite = null
let hasKey = false
let evilMachineDestroyed = false
let rayGun: Sprite = null
let vx = 0
let magicKey: Sprite = null
let possibleFood: Sprite = null
let possibleEnemy: Sprite = null
let roll2 = 0
let door: Sprite = null
let mehEmoji: Sprite = null
let choice2: Sprite = null
let angryEmoji: Sprite = null
let roll3 = 0

let facing = 0
let inDangerZone = false
let evilMachineStatusBar: StatusBarSprite = null
let evilMachine: Sprite = null
let foodEmoji = null
let poopEmoji = null
let enemyStatusBar: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let barrier3 = false
let emoji: Sprite = null


// Level 2

let star: Sprite = null
let treasureChest: Sprite = null
let attempts = 0
let starsCollected = 0

// Setting the Current Level
function setLevel (level: number) {
    if (level == 1) {
        game.showLongText("Level 1", DialogLayout.Center)
        tiles.setCurrentTilemap(tilemap`level1`)
    } else if (level == 2) {
        game.showLongText("Level 2", DialogLayout.Center)
        tiles.setCurrentTilemap(tilemap`level2`)
        scene.setBackgroundColor(10)
        for (let value of tiles.getTilesByType(assets.tile`placeholder`)) {
            star = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . b . . . . . . . 
                . . . . . . . b d b . . . . . . 
                . . . . . . b 5 5 5 b . . . . . 
                . . . . . b b 5 5 5 b b . . . . 
                . . b b b b 5 5 5 1 1 b b b b . 
                . . b 5 5 5 5 5 5 1 1 5 5 5 b . 
                . . b d d 5 5 5 5 5 5 5 d d b . 
                . . . b d d 5 5 5 5 5 d d b . . 
                . . . c b 5 5 5 5 5 5 5 b c . . 
                . . . c b 5 5 5 5 5 5 5 b c . . 
                . . . c 5 5 d d b d d 5 5 c . . 
                . . . c 5 d d c c c d d 5 c . . 
                . . . c c c c . . . c c c c . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.SpecialStar)
            tiles.placeOnTile(star, value)
            tiles.setTileAt(value, assets.tile`transparency16`)
        }
        CreateTreasureChest(14, 69)
    }
}

// Function to randomly spawn enemy in block (Level 1)
function CreateEnemyFromBlock () {
    roll = randint(0, 1)
    if (roll == 0) {
        angryEmoji = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . f f 2 2 2 f f . . . . 
            . . . . f 2 2 2 2 2 2 2 f . . . 
            . . . f 2 f f 2 2 2 f f 2 f . . 
            . . . f 2 2 2 f 2 f 2 2 2 f . . 
            . . f 2 2 2 2 2 2 2 2 2 2 2 f . 
            . . f 2 2 2 f 2 2 2 f 2 2 2 f . 
            . . f 2 2 2 2 2 2 2 2 2 2 2 f . 
            . . . f 2 2 f f f f f 2 2 f . . 
            . . . f 2 2 f f f f f 2 2 f . . 
            . . . . f 2 2 2 2 2 2 2 f . . . 
            . . . . . f f 2 2 2 f f . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        choice2 = angryEmoji
    } else if (roll == 1) {
        mehEmoji = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . f f 5 5 5 f f . . . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 5 5 5 5 5 5 5 f . . 
            . . . f 5 5 f 5 5 5 f 5 5 f . . 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 5 f f f f f f f 5 5 f . 
            . . . f 5 5 5 5 5 5 5 5 5 f . . 
            . . . f 5 5 5 5 5 5 5 5 5 f . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . . . f f 5 5 5 f f . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        choice2 = mehEmoji
    }
    return choice2
}

// Function to place a door sprite (Level 1)
function PlaceDoor (row: number, column: number) {
    door = sprites.create(assets.image`door`, SpriteKind.Door)
    tiles.placeOnTile(door, tiles.getTileLocation(row, column))
}

function CreateSpecialIceCream(row: number, column: number) {
    specialIceCream = sprites.create(img`
        ................
        ......fff.......
        ....ff666ff.....
        ...f6666666f....
        ..f666666666f...
        ..f61f6661f6f...
        .f69ff666ff96f..
        .f69966666996f..
        .f6666fff6666f..
        .f66666666666f..
        ..ff66fff66ff...
        ..f5ff555ff5f...
        ..f555555555f...
        ...fffffffff....
        ...f5555555f....
        ....f55555f.....
        ....f55555f.....
        .....f555f......
        .....f555f......
        ......fff.......
        ................
        ................
        `, SpriteKind.SpecialFood)
    tiles.placeOnTile(specialIceCream, tiles.getTileLocation(row, column))
}

function CreateFood() {
    roll3 = randint(1, 100)
    if (roll3 <= 50) {
        burgerEmoji = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f . . . . 
            . . . f 5 5 5 5 5 5 5 5 f . . . 
            . . f 5 f 1 5 5 5 5 f 1 5 f . . 
            . f 5 5 f f 5 5 5 5 f f 5 5 f . 
            . f 5 5 5 5 5 f f 5 5 5 5 5 f . 
            . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
            f f f f f f f f f f f f f f f f 
            f e e e e e e e e e e e e e e f 
            . f f f f f f f f f f f f f f . 
            f 7 7 7 7 7 7 7 7 7 7 7 7 7 7 f 
            . f 7 f 7 7 f 7 7 7 f 7 7 f f . 
            . f f 5 f f 5 f f f 5 f f 5 f . 
            . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f f f f f f f f f f f f . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Burger)
        choice = burgerEmoji
    } else if (roll3 <= 85) {
        friesEmoji = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . f . . . f . f . . . . . . 
            . . f 5 f . f 5 f 5 f . f f f . 
            . f 5 f 5 f f 5 f 5 5 f 5 5 f . 
            f 5 5 5 f 5 f 5 5 5 5 f 5 5 f . 
            . f f 5 f 5 5 f 5 5 f 5 5 f . . 
            . . f f 5 5 5 5 f 5 f 5 f f . . 
            . . f 2 f f f f f f f f 2 f . . 
            . . f 2 2 2 2 2 2 2 2 2 2 f . . 
            . . f 2 f 1 2 2 2 2 f 1 2 f . . 
            . . f 2 f f 2 2 2 2 f f 2 f . . 
            . . f 2 2 2 2 2 2 2 2 2 2 f . . 
            . . f 2 2 2 f f f f 2 2 2 f . . 
            . . f 2 2 2 2 2 2 2 2 2 2 f . . 
            . . f f 2 2 2 2 2 2 2 2 f f . . 
            . . . f f f f f f f f f f . . . 
            `, SpriteKind.Fries)
        choice = friesEmoji
    } else {
        milkShakeEmoji = sprites.create(img`
            . . . . . . b b b b a a . . . . 
            . . . . b b d d d 3 3 3 a a . . 
            . . . b d d d 3 3 3 3 3 3 a a . 
            . . b d d 3 3 3 3 3 3 3 3 3 a . 
            . b 3 d 3 3 3 3 3 b 3 3 3 3 a b 
            . b 3 3 3 3 3 a a 3 3 3 3 3 a b 
            b 3 3 3 3 3 a a 3 3 3 3 d a 4 b 
            b 3 3 3 3 b a 3 3 3 3 3 d a 4 b 
            b 3 3 3 3 3 3 3 3 3 3 d a 4 4 e 
            a 3 3 3 3 3 3 3 3 3 d a 4 4 4 e 
            a 3 3 3 3 3 3 3 d d a 4 4 4 e . 
            a a 3 3 3 d d d a a 4 4 4 e e . 
            . e a a a a a a 4 4 4 4 e e . . 
            . . e e b b 4 4 4 4 b e e . . . 
            . . . e e e e e e e e . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        choice = milkShakeEmoji
    }
    return choice
}
function CreatePlayerEmoji(row: number, column: number) {
    emoji = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        .........fffff..........
        .......ff55555ff........
        ......f555555555f.......
        .....f55ff555ff55f......
        .....f5f55f5f55f5f......
        ....f5555555555555f.....
        ....f5fffffffffff5f.....
        ....f5f11f111f11f5f.....
        ....f5f11f111f11f5f.....
        ....f5f11f111f11f5f.....
        .....f5f1f111f1f5f......
        .....f55ff111ff55f......
        ......f55fffff55f.......
        .......ff55555ff........
        .........fffff..........
        ........................
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Player)
    controller.moveSprite(emoji, 100, 0)
    emoji.ay = 500
    scene.cameraFollowSprite(emoji)
    tiles.placeOnTile(emoji, tiles.getTileLocation(row, column))
}

// Hitting a block to get an enemy or food (Level 1)
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (emoji.tileKindAt(TileDirection.Top, assets.tile`myTile`) && tiles.tileAtLocationEquals(location, assets.tile`myTile`)) {
        tiles.setTileAt(location, assets.tile`myTile1`)
        roll2 = randint(1, 100)
        if (roll2 <= 30) {
            possibleEnemy = CreateEnemyFromBlock()
            tiles.placeOnTile(possibleEnemy, location)
            possibleEnemy.y += -20
            possibleEnemy.follow(emoji, 25)
            enemyStatusBar = statusbars.create(20, 4, SpriteKind.Enemy)
            enemyStatusBar.attachToSprite(possibleEnemy)
        } else {
            possibleFood = CreateFood()
            tiles.placeOnTile(possibleFood, location)
            possibleFood.y += -20
        }
    }
    // Special Block to get a key (Level 1)
    if (emoji.tileKindAt(TileDirection.Top, assets.tile`specialBlock`) && tiles.tileAtLocationEquals(location, assets.tile`specialBlock`)) {
        tiles.setTileAt(location, assets.tile`myTile1`)
        magicKey = sprites.create(img`
            ......................
            ..fff.................
            .f656f................
            f66566f...............
            f556565fffffffffffffff
            f5fff5656656565656565f
            f6fff6566565656565656f
            f6fff6656656565656565f
            f6fff6566565656565656f
            f5fff5656656565656565f
            f5fff65fffffffff6f65f.
            f66566f........f5f56f.
            .f656f.........fffff..
            ..fff.................
            ......................
            ......................
            `, SpriteKind.SpecialKey)
        tiles.placeOnTile(magicKey, location)
        magicKey.y += -20
    }
})

// Movement function for shooting projectiles to face the way the sprite is going
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    vx = 100 * facing
    if (controller.left.isPressed()) {
        vx = -100
    } else if (controller.right.isPressed()) {
        vx = 100
    }
    rayGun = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . . 2 2 1 1 1 1 2 . . 
        . . . . 2 2 3 3 1 1 1 1 1 1 . . 
        . . 3 3 3 3 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 3 3 2 2 3 1 1 1 1 1 1 1 . . 
        . . . . . . 2 2 3 1 1 1 1 2 . . 
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, emoji, vx, 0)
    rayGun.setKind(SpriteKind.RayGun)
})

// Overlap function for Stars (Level 2)
sprites.onOverlap(SpriteKind.Player, SpriteKind.SpecialStar, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    starsCollected += 1
})

// Ending Sprite (Level 2)
sprites.onOverlap(SpriteKind.Player, SpriteKind.TreasureChest, function (sprite, otherSprite) {
    game.showLongText("Attempts: "+ attempts +"\nStars Collected: " + starsCollected, DialogLayout.Bottom)
    game.gameOver(true)
})

// Sprite Projectile vs Enemy Emojis
sprites.onOverlap(SpriteKind.RayGun, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    enemyStatusBar.value -=10
if (enemyStatusBar.value == 0) {
        sprites.destroy(otherSprite)
    }
})

// Sprite Projectile vs Enemy Evil Machine
sprites.onOverlap(SpriteKind.RayGun, SpriteKind.EvilMachine, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    evilMachineStatusBar.value -= 10
if (evilMachineStatusBar.value == 0) {
        sprites.destroy(otherSprite)
        evilMachineDestroyed = true
    }
})

// Sprite Key to go to Level 2
sprites.onOverlap(SpriteKind.Player, SpriteKind.SpecialKey, function (sprite, otherSprite) {
    otherSprite.follow(sprite)
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    hasKey = true
})


controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (emoji.isHittingTile(CollisionDirection.Bottom)) {
        emoji.vy = -350
    }
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    facing = -1
})

// Sprite overlap door -> Level 2
sprites.onOverlap(SpriteKind.Player, SpriteKind.Door, function (sprite, otherSprite) {
    if (hasKey && info.score() >= 35) {
        for (let value2 of sprites.allOfKind(SpriteKind.Player)) {
            sprites.destroy(value2)
        }
        for (let value22 of sprites.allOfKind(SpriteKind.SpecialKey)) {
            sprites.destroy(value22)
        }
        for (let value3 of sprites.allOfKind(SpriteKind.Door)) {
            sprites.destroy(value3)
        }
        for (let value4 of sprites.allOfKind(SpriteKind.Enemy)) {
            sprites.destroy(value4)
        }
        setLevel(2)
        CreatePlayerEmoji(0, 2)
    } else {
        game.showLongText("Must Have Key and have a higher score!", DialogLayout.Bottom)
    }
})

// Sprite overlap burger
sprites.onOverlap(SpriteKind.Player, SpriteKind.Burger, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(5)
    statusbar.value += 10
})
function CreateEvilMachine (row: number, column: number) {
    evilMachine = sprites.create(img`
        ...................................
        ........ffffffffffffffff...........
        ........f1111111111111f1f..........
        ........f1111111111111f11f.........
        ........f1111111111111fffff........
        ........f1111111111111ddddf........
        ........f11111111111111111f........
        ........f11111111111111111f........
        .......ff11111111111111111ff.......
        ......f9f11111111111111111f9f......
        ......f9fdddddddddddddddddf9f......
        ...fffffffffffffffffffffffffffff...
        ..f11111111111111111111111111111f..
        .f111111111111111111111fff1111f11f.
        .f11111111111111111111f777f11f2f1f.
        .f111111111111111111111fff1111f11f.
        .f1111111111111111111111111111111f.
        .f1111111111111111111111111111111f.
        .f1111fffffffffffffffffffffff1111f.
        .fdddf99999999999999999999999fdddf.
        .fdddf9fffffffffffffffffffff9fdddf.
        .fffff9fdddddddddddddddddddf9fffff.
        .f999f9fdddddddddddddddddddf9f999f.
        .f999f9f1111111111111111111f9f999f.
        .f999f9f1111111111111111111f9f999f.
        ..ffffff1111111111111111111ffffff..
        .......f1111111111111111111f.......
        .......f1111111111111111111f.......
        .......f1111111111111111111f.......
        .......fffffffffffffffffffff.......
        `, SpriteKind.EvilMachine)
    tiles.placeOnTile(evilMachine, tiles.getTileLocation(row, column))
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    facing = 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    statusbar.value -= 15
})
sprites.onOverlap(SpriteKind.RayGun, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fries, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(2)
    statusbar.value += 5
})
function CreateTreasureChest (row: number, column: number) {
    treasureChest = sprites.create(img`
        ................................
        .ffffffffffffffffffffffffffffff.
        .f5feeeeeeeeeef55feeeeeeeeeef5f.
        .f5feeeeeeeeeef55feeeeeeeeeef5f.
        .f5feeeeeeeeeef55feeeeeeeeeef5f.
        .f5feeeeeeeeeef55feeeeeeeeeef5f.
        .f5feeeeeeeeeef55feeeeeeeeeef5f.
        .f5feeeeeeeeeef55feeeeeeeeeef5f.
        .f5feeeeeeeeeef55feeeeeeeeeef5f.
        .f5feeeeeeeeeff55ffeeeeeeeeef5f.
        .f5fffffffffff5555fffffffffff5f.
        .f555555555555ffff555555555555f.
        .ffffffffffffffeeffffffffffffff.
        .f555555555555feef555555555555f.
        .f5ffffffffff5ffff5ffffffffff5f.
        .f5feeeeeeeef555555feeeeeeeef5f.
        .f5feeeeeeeef555555feeeeeeeef5f.
        .f5feeeeeeeeeffffffeeeeeeeeef5f.
        .f5feeeeeeeeeeeeeeeeeeeeeeeef5f.
        .f5feeeeeeeeeeeeeeeeeeeeeeeef5f.
        .f5feeeeeeeeeeeeeeeeeeeeeeeef5f.
        .f5feeeeeeeeeeeeeeeeeeeeeeeef5f.
        .f5feeeeeeeeeeeeeeeeeeeeeeeef5f.
        .f5feeeeeeeeeeeeeeeeeeeeeeeef5f.
        .f5feeeeeeeeeeeeeeeeeeeeeeeef5f.
        .f5feeeeeeeeeeeeeeeeeeeeeeeef5f.
        .f5feeeeeeeeeeeeeeeeeeeeeeeef5f.
        .f5ffffffffffffffffffffffffff5f.
        .f5555555555555555555555555555f.
        .f55555fffffffffffffffffff5555f.
        .fffffff.................ffffff.
        ................................
    `, SpriteKind.TreasureChest)
    tiles.placeOnTile(treasureChest, tiles.getTileLocation(row, column))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
function CreateEnemy (row: number, column: number) {
    if (Math.percentChance(50)) {
        angryEmoji = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . f f 2 2 2 f f . . . . 
            . . . . f 2 2 2 2 2 2 2 f . . . 
            . . . f 2 f f 2 2 2 f f 2 f . . 
            . . . f 2 2 2 f 2 f 2 2 2 f . . 
            . . f 2 2 2 2 2 2 2 2 2 2 2 f . 
            . . f 2 2 2 f 2 2 2 f 2 2 2 f . 
            . . f 2 2 2 2 2 2 2 2 2 2 2 f . 
            . . . f 2 2 f f f f f 2 2 f . . 
            . . . f 2 2 f f f f f 2 2 f . . 
            . . . . f 2 2 2 2 2 2 2 f . . . 
            . . . . . f f 2 2 2 f f . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(angryEmoji, tiles.getTileLocation(row, column))
    } else if (Math.percentChance(50)) {
        mehEmoji = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . f f 5 5 5 f f . . . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 5 5 5 5 5 5 5 f . . 
            . . . f 5 5 f 5 5 5 f 5 5 f . . 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 5 f f f f f f f 5 5 f . 
            . . . f 5 5 5 5 5 5 5 5 5 f . . 
            . . . f 5 5 5 5 5 5 5 5 5 f . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . . . f f 5 5 5 f f . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(mehEmoji, tiles.getTileLocation(row, column))
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    statusbar.value -= 15
})


let dangerZone = [assets.tile`water`]
let tileToOverlap = [
assets.tile`LogLeft`,
assets.tile`LogRight`,
assets.tile`LogUp`,
assets.tile`LogDown`
]

for (let tile of tileToOverlap) {
    scene.onOverlapTile(SpriteKind.Player, tile, function(sprite, location){
        scene.cameraShake(4, 200) 
        tiles.placeOnTile(emoji, tiles.getTileLocation(0, 2))
        attempts += 1
    })
}
for (let tile2 of dangerZone) {
    scene.onOverlapTile(SpriteKind.Player, tile2, function(sprite, location){
        inDangerZone = true
    })
}
facing = 1
setLevel(1)
scene.setBackgroundColor(3)
info.setScore(0)
CreatePlayerEmoji(3, 56)
CreateEvilMachine(3, 22)
PlaceDoor(0, 4)
statusbar = statusbars.create(50, 4, StatusBarKind.Health)
statusbar.attachToSprite(emoji)
evilMachineStatusBar = statusbars.create(75, 4, StatusBarKind.Health)
evilMachineStatusBar.attachToSprite(evilMachine)
game.onUpdate(function () {
    if (info.score() >= 6 && !(barrier1)) {
        barrier1 = true
        for (let tile22 of tiles.getTilesByType(assets.tile`fire`)) {
            tiles.setTileAt(tile22, assets.tile`transparency16`)
            tiles.setWallAt(tile22, false)
        }
    }
    if (info.score() >= 20 && !(barrier2)) {
        barrier2 = true
        for (let tile222 of tiles.getTilesByType(assets.tile`ice`)) {
            tiles.setTileAt(tile222, assets.tile`transparency16`)
            tiles.setWallAt(tile222, false)
        }
    }
    if (evilMachineDestroyed) {
        for (let tile3 of tiles.getTilesByType(assets.tile`toilet`)) {
            tiles.setTileAt(tile3, assets.tile`transparency16`)
            tiles.setWallAt(tile3, false)
        }
    }
})
forever(function () {
    if (statusbar.value <= 20) {
        emoji.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f f . . . . . 
            . . . . f f 5 5 5 5 5 f f . . . 
            . . . f 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 f 5 5 5 5 5 f 5 5 f . 
            . . f 5 f 5 5 5 5 5 5 5 f 5 f . 
            . f 5 5 5 f f 5 5 5 f f 5 5 5 f 
            . f 5 5 f 9 5 f 5 f 5 9 f 5 5 f 
            . f 5 5 9 9 5 5 5 5 5 9 9 5 5 f 
            . f 5 5 9 9 5 5 5 5 5 9 9 5 5 f 
            . f 5 5 9 9 5 1 1 1 5 9 9 5 5 f 
            . . f 5 9 9 5 1 1 1 5 9 9 5 f . 
            . . f 5 9 9 5 f f f 5 9 9 5 f . 
            . . . f 9 9 5 f f f 5 9 9 f . . 
            . . . . 9 9 5 5 5 5 5 9 9 . . . 
            . . . . 9 9 f f f f f 9 9 . . . 
            `)
    } else if (statusbar.value <= 30) {
        emoji.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f f . . . . . 
            . . . . f f 5 5 5 5 5 f f . . . 
            . . . f 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 5 f 5 5 5 5 5 f 5 5 f . 
            . f 5 5 5 f 5 5 5 5 5 f 5 5 5 f 
            . f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            . f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            . f 5 5 5 5 f f f f f 5 5 5 5 f 
            . f 5 5 5 f 5 5 5 5 5 f 5 5 5 f 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . . f 5 5 5 5 5 5 5 5 5 f . . 
            . . . . f f 5 5 5 5 5 f f . . . 
            . . . . . . f f f f f . . . . . 
            `)
    } else if (statusbar.value >= 30) {
        emoji.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f f . . . . . 
            . . . . f f 5 5 5 5 5 f f . . . 
            . . . f 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 f f 5 5 5 f f 5 5 f . 
            . . f 5 f 5 5 f 5 f 5 5 f 5 f . 
            . f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            . f 5 f f f f f f f f f f f 5 f 
            . f 5 f 1 1 f 1 1 1 f 1 1 f 5 f 
            . f 5 f 1 1 f 1 1 1 f 1 1 f 5 f 
            . f 5 f 1 1 f 1 1 1 f 1 1 f 5 f 
            . . f 5 f 1 f 1 1 1 f 1 f 5 f . 
            . . f 5 5 f f 1 1 1 f f 5 5 f . 
            . . . f 5 5 f f f f f 5 5 f . . 
            . . . . f f 5 5 5 5 5 f f . . . 
            . . . . . . f f f f f . . . . . 
            `)
    }
})
game.onUpdateInterval(500, function () {
    if (!(evilMachineDestroyed)) {
        sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . 2 2 2 2 . . .
        . . . . . . . 2 2 1 1 1 1 2 . .
        . . . . 2 2 3 3 1 1 1 1 1 1 . .
        . . 3 3 3 3 1 1 1 1 1 1 1 1 . .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
        . . 3 3 2 2 3 1 1 1 1 1 1 1 . .
        . . . . . . 2 2 3 1 1 1 1 2 . .
        . . . . . . . . . 2 2 2 2 . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, evilMachine, 50, 0)
    }
    if (inDangerZone) {
        statusbar.value -= 5
inDangerZone = false
    }
})
