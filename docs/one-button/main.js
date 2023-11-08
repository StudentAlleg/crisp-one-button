title = "Cannon";

description = `
test
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
 * }}
 */

/**
 * @type {Array<Vector>}
 */
let balls;

/**
 * @type {number}
 */
let change = PI/64;

/**
 * @type {number}
 */
let power = 0;

function update() {
  if (!ticks) {
    cannon = {
      pos: vec(5, 95),
      angle: 2*PI/3,
      cannonRadius: 10,
      barrelLength: 20,
    }
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

  balls.forEach(ball => {
    
  });

  if (input.isPressed) {
    power++;
  }

  if (input.isJustReleased) {
    shootCannon(cannon, power, balls);
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

function shootCannon(cannon, power, balls) {

}

function updateBall(ball) {

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
