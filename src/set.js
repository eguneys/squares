let identity = ([x, y]) => [[x, y]];
let reverse = ([x, y]) => [[x, y], [y, x]];
let diagonal = identity([1, 1]);
let straight = reverse([0, 1]);
let l = reverse([1, 2]);

let makeDirection = directions => ([x, y]) => directions.map(([dirX, dirY]) =>
  [x * dirX, y * dirY]
);

let makeProjection = space => ([x, y]) => space.map(_ => {
  let res = [];
  while (_ > 0) {
    res.push([x * _, y * _]);
    _--;
  }
  return res;
});

let uniDirection = makeDirection([[0, 0], [-1, 1], [1, -1], [-1, -1], [1, 1]]);
let whiteDirection = makeDirection([[0, 0], [1, 1], [1, -1]]);
let blackDirection = makeDirection([[0, 0], [-1, 1], [-1, -1]]);

let shortProjection = makeProjection([1]);
let longProjection = makeProjection([1, 2, 3, 4, 5, 6, 7]);

let knight = l
    .flatMap(uniDirection)
    .flatMap(shortProjection);

let king = [...straight, ...diagonal]
    .flatMap(uniDirection)
    .flatMap(shortProjection);

let rook = straight
    .flatMap(uniDirection)
    .flatMap(longProjection);

let bishop = diagonal
    .flatMap(uniDirection)
    .flatMap(longProjection);

let queen = [...straight, ...diagonal]
    .flatMap(uniDirection)
    .flatMap(longProjection);

// all the routes a rook can go.
// all the routes a rook can go with all the routes a king can go.
// all the routes for all the pieces can go with all other pieces.

let routesByRole = {
  'k': king, 
  'q': queen, 
  'r': rook,
  'b': bishop, 
  'n': knight
};


let aPosition = [
  [
    new Piece('b', new Coord(0, 1)),
    new Piece('q', new Coord(3, 1)),
  ],
  [
    new Piece('b', new Coord(1, 2)),
  ]];

let res2 = routeCombinations2(aPosition);

// select an active piece, move it, consequences
// position -> [position] -> [[position]]

function routeCombinations2(position) {

  let [actives, passives] = position;

  let res = [];

  for (let i = 0; i < actives.length; i++) {
    let movedPiece = actives[i];
    let rest = [...actives.slice(0, i), ...actives.slice(i+1)];

    let { origin, role } = movedPiece;

    routesByRole[role].forEach(_ => {
      let all = _.map(origin.route);
      let [destination, ...path] = all;
      if (!origin.same(destination)) {
        if (all.every(_ => _.valid())) {
          if(!rest.some(piece => all.some(piece.origin.same))) {
            if (!passives.some(passive => path.some(passive.origin.same))) {
              let capturedGone = passives.filter(passive => 
                !passive.origin.same(destination));

              let movedRelocated = [movedPiece.withOrigin(destination),
                                 ...rest];
              res.push([capturedGone, movedRelocated]);
            }
          }
        }
      }
    });
  }
  return res;  
}

function captureCombinations1(attacking, attacked) {

  let [activeAttacking, passiveAttacking] = attacking;
  let [activeAttacked, passiveAttacked] = attacked;

  return passiveAttacking.find(captured => 
    !activeAttacked.some(resisted => 
      resisted.same(captured)));
}

function classifyMoves(position) {
  return routeCombinations2(position).map(position2 => [
    position,
    position2,
    captureCombinations1(position, position2)
  ]);  
};

console.log(routeCombinations3(aPosition));

function routeCombinations3(position) {
  let [actives, passives] = position;

  let res = [];

  for (let i = 0; i < actives.length; i++) {
    let movedPiece = actives[i];
    let rest = [...actives.slice(0, i), ...actives.slice(i+1)];

    let { origin, role } = movedPiece;

    routesByRole[role].forEach(_ => {
      let all = _.map(origin.route);
      let [destination, ...path] = all;    

      if (all.every(_ => _.valid())) {
        
        let stayStill = origin.same(destination);
        let activeBlocking = rest.filter(piece => 
          all.some(piece.origin.same));
        let passiveBlocking = passives.filter(passive => 
          path.some(passive.origin.same));

        let capturedPiece,
            restPassive,
            captureByMove = false;

        for (let j = 0; j < passives.length; j++) {

          capturedPiece = passives[j];
          restPassive = [...passives.slice(0, j), ...passives.slice(j+1)];

          captureByMove = capturedPiece.origin.same(destination);

          if (captureByMove) {
            break;
          } else {
            capturedPiece = undefined;
            restPassive = undefined;
          }
        }
        
        let movedRelocated = movedPiece.withOrigin(destination);


        res.push({
          actives,
          passives,
          stayStill,
          activeBlocking,
          passiveBlocking,
          captureByMove,
          capturedPiece,
          restPassive,
          movedPiece,
          movedRelocated
        });
      }

    });
  }
  return res;
}


function Piece(role, origin) {
  this.role = role;
  this.origin = origin;

  this.key = this.role + this.origin;

  this.withOrigin = (origin) => new Piece(role, origin);

  this.same = (piece) => piece.role === role && piece.origin.same(origin);

  this.toString = () => {
    return this.role + this.origin;
  };
}

function Coord(file, rank) {

  const fileEnum = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const rankEnum = ['1', '2', '3', '4', '5', '6', '7', '8'];

  this.file = file;
  this.rank = rank;

  this.valid = () =>
    this.file >= 0 && this.file <= 7 &&
      this.rank >= 0 && this.rank <= 7;

  this.same = (coord) => coord.file === this.file && coord.rank === this.rank;

  this.route = (route) =>
  new Coord(this.file + route[0],
            this.rank + route[1]);

  this.toString = () => fileEnum[this.file] + rankEnum[this.rank];
}

function move(battle, turn) {

  let isWhite = turn % 2 === 0;

  let pre = battle[turn];
  let now = battle[turn + 1];

  let [preWhiteArmy, preBlackArmy] = pre;
  let [nowWhiteArmy, nowBlackArmy] = now;

}

function solve(battle) {
  for (let turn = 0; turn < battle.length - 1; turn++) {
    move(battle, turn);
  }
}


function chess() {

  let role = ['k', 'q', 'r', 'b', 'n', 'p'];
  let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  let ranks = ['1', '2', '3', '4', '5', '6', '7'];;

  let coord = [files, ranks];

  let piece = [coord, role];

  let army = [];

  for (let i = 0; i < 8 * 2; i++) {
    army.push(piece);
  }

  let position = [army, army];

  let battle = [];

  for (let j = 0; j < 8; j++) {
    battle.push(position);
  }

  return battle;

}
