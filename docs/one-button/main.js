title = "Cannon";

description = `
Don't let the 
blocks cross 
the line!
`;

characters = [];

options = {};


/**
 * @typedef {{
 *  pos: Vector,
 *  angle: number,
 *  cannonRadius: number,
 *  barrelLength: number
 * }} Cannon
 */

/**
 * @type {Cannon}
 */
let cannon


/**
 * @typedef {{
 *  pos: Vector,
 *  initialV: Vector,
 *  start: number;
 * }} Ball
 */

/**
 * @type {Array<Ball>}
 */
let balls;

/**
 * @typedef {{
 *  pos: Vector,
 *  size: Vector,
 *  speed: Vector
 * }} Block
 */

/**
 * @type {Array<Block>}
 */

let blocks;

/**
 * @type {number}
 */
let change = PI/64;

/**
 * @type {number}
 */
let power = 0;

/**
 * @type {number}
 */
let maxPower = 20;

function update() {
  if (!ticks) {
    cannon = {
      pos: vec(5, 95),
      angle: 2*PI/3,
      cannonRadius: 10,
      barrelLength: 20,
    }

    balls = [];
    blocks = [];
  }

  if (ticks % 4 == 0) {
    cannon.angle += change
    if (cannon.angle >= PI) {
      cannon.angle = PI;
      change = -change
    } else if (cannon.angle <= PI/2) {
      cannon.angle = PI/2;
      change = -change;
    }
  }

  if (ticks % 900/difficulty == 0) {
    /** 
     * @type {Block}
     */
    let newBlock = {
      pos: vec(100, rndi(10, 80)),
      size: vec(5, 5),
      speed: vec(1, 0)
    }
    blocks.push(newBlock);
  } 
  
  blocks.forEach(block => {
    if (block.pos.x < 0 || block.pos.y > 100) {
      end();
    }
    updateBlock(block, ticks);
    renderBlock(block);
  })

  remove(balls, (ball) => {
    return ball.pos.y > 100 || ball.pos.x > 100;
  });

  balls.forEach(ball => {
    updateBall(ball, ticks);
    renderBall(ball);
    remove(blocks, block => {
      if (ball.pos.isInRect(block.pos.x - block.size.x, block.pos.y - block.size.y, block.size.x, block.size.y)) {
        addScore(1 * difficulty);
        return true;
      }
      return false;
    })
  });



  if (input.isPressed) {
    if (ticks % 10 == 0)
    power++;
    if (power > maxPower) power = maxPower;
    console.log(power);
  }

  color("black")
  bar(95, 100, (power/maxPower) * 15, 5, PI/2);

  if (input.isJustReleased) {
    shootCannon(cannon, power/10, balls, ticks);
    power = 0;
  }
  //cannon.angle = cannon.pos.angleTo(input.pos);
  renderCannon(cannon);
}

/**
 * 
 * @param {Cannon} cannon 
 */

function renderCannon(cannon) {
  let cannonEnd = getPoint(cannon.barrelLength, cannon.angle);
  color("black");
  line(cannon.pos.x, cannon.pos.y, cannon.pos.x + cannonEnd.x, cannon.pos.y + cannonEnd.y, 4);

  color("black")
  arc(cannon.pos.x, cannon.pos.y, cannon.cannonRadius, 1);
}

/**
 * 
 * @param {Cannon} cannon 
 * @param {number} power 
 * @param {Array<Ball>} balls 
 * @param {number} ticks 
 */
function shootCannon(cannon, power, balls, ticks) {
  console.log(power);
  
  
  /**
   * @type {Ball}
   */


  let newBall = {
    pos: getPoint(cannon.barrelLength, cannon.angle).add(cannon.pos),
    initialV: getPoint(power, cannon.angle),
    start: ticks
  }
  balls.push(newBall);
  console.log(newBall);
}

/**
 * 
 * @param {Ball} ball 
 * @param {*} ticks 
 */
function updateBall(ball, ticks) {
  /**
   * @type {number}
   */

  let dT = (ticks - ball.start);

  /**
   * @type {number}
   */

  let g = 0.01;

  ball.pos = ball.pos.add(ball.initialV).add(0, (dT * g));

}

/**
 * 
 * @param {Block} block 
 * @param {number} ticks 
 */
function updateBlock(block, ticks) {
  /**
   * @type {number}
   */
  if (ticks % 30 == 0) {
    block.pos = block.pos.sub(block.speed);
  }
  
}

function renderBall(ball) {
  color("black")
  arc(ball.pos.x, ball.pos.y, 2, 1);
}

function renderBlock(block) {
  color("red");
  box(block.pos.x, block.pos.y, block.size.x, block.size.y);
}


/**
 * 
 * @param {number} radius 
 * @param {number} angle 
 * @returns {Vector}
 */
function getPoint(radius, angle) {
  /**
   * @type {number}
   **/
  let x;
  /**
   * @type {number}
   **/
  let y;

  x = radius * sin(angle);
  y = radius * cos(angle);

  return vec(x, y);
}
