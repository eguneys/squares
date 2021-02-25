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

export let routesByRole = {
  'k': king, 
  'q': queen, 
  'r': rook,
  'b': bishop, 
  'n': knight
};

let position = [
  [new Piece('k', new Coord(4, 0)),
   new Piece('b', new Coord(5, 0)),
   new Piece('n', new Coord(6, 0))],
  [new Piece('k', new Coord(4, 7))]
];

function experiment() {

  for (let i = 0; i < 10; i++) {
    console.log(debugPos(position));
    position = play(position);
  }

}

function play(position) {
  
  let m = findMove(position);
  return applyMove(position, m);
}

function applyMove(position, move) {
  let [actives, passives] = position;
  let king = actives.find(_ => _.king);

  let pieceMoved = king.withOrigin(move);

  let activesMoved = [pieceMoved, ...actives.filter(_ => _ !== king)];

  return [passives, activesMoved];  
}

function findMove(position) {
  let [actives, passives] = position;

  let activeKing = actives.find(_ => _.king);
  let passiveKing = passives.find(_ => _.king);

  let djMap = makeDijkstraMap(new Coord(4, 3));

  let djMapCombined = {};

  for (let key in djMap) {

    djMapCombined[key] = djMap[key];

    let coord = Coord.allByKey[key];

    king.forEach(_ => {
      let [destination] = _.map(passiveKing.origin.route);

      if (destination.same(coord)) {
        djMapCombined[key] += 30;
      }
    });

    
  }

  let route = decideDjMap(activeKing.origin, djMapCombined);

  return route.filter(_ => !_.same(activeKing.origin))[0];
}

function decideDjMap(from, djMap) {
  let neighbors0 = [];

  king.forEach(_ => {
    let all = _.map(from.route);
    if (all.every(_ => _.valid())) {
      let [destination, ...path] = all;
      neighbors0.push(destination);
    }
  });

  return neighbors0.sort((a, b) => djMap[a.key] - djMap[b.key]);
}


// http://www.roguebasin.com/index.php?title=The_Incredible_Power_of_Dijkstra_Maps
function makeDijkstraMap(origin) {
  let djMap = {};
  for (let coord of Coord.all) {
    djMap[coord.key] = 30;
  }
  djMap[origin.key] = 0;

  let anyChanged = true;

  while (anyChanged) {
    anyChanged = false;

    for (let originKey in djMap) {
      let origin = Coord.allByKey[originKey];
      let lowestNeighbor = 30;
      king.forEach(_ => {
        let all = _.map(origin.route);
        if (all.every(_ => _.valid())) {
          let [destination, ...path] = all;
          lowestNeighbor = Math.min(djMap[destination.key], lowestNeighbor);
        }
      });
      let lowestCost = lowestNeighbor + 1;

      if (djMap[originKey] > lowestCost) {
        djMap[originKey] = lowestCost;
        anyChanged = true;
      }
    }
  }

  return djMap;
}



// let aPosition = [
//   [
//     new Piece('b', new Coord(0, 1)),
//     new Piece('q', new Coord(3, 1)),
//   ],
//   [
//     new Piece('b', new Coord(1, 2)),
//   ]];

// let ePosition = [
//   [
//     new Piece('b', new Coord(3, 2)),
//   ],
//   [
//     new Piece('r', new Coord(1, 4)),
//     new Piece('r', new Coord(5, 6))
//   ]];

// //console.log(exercise(ePosition));

// function exercise(position) {

//   let [actives, passives] = position;

//   let active = actives[0];

//   let { origin, role } = active;

//   let passive = passives[0];

//   let res = [origin, ...route(role, origin, passive.origin)];

//   return sortRoutes(res);
// }

// function sortRoutes(routes) {

//   if (!routes.length || routes.length === 1) {
//     return routes;
//   }
//   return routes.sort((a, b) => a.length - b.length).map(sortRoutes);
// };

// function route(role, origin, destination, depth = 0) {
//   let res = [];
//   if (depth > 3) {
//     return res;
//   }

//   routesByRole[role].forEach(_ => {
//     let subres = [];
//     let all = _.map(origin.route);
//     let [subdestination, ...path] = all;

//     if (all.every(_ => _.valid())) {
//       if (subdestination.same(destination)) {
//         subres.push(destination);
//       } else {
//         subres.push(subdestination);
//         subres.push(...route(role, subdestination, destination, depth + 1));
//         if (subres.length === 1) {
//           subres = [];
//         }
//       }
//     }
//     if (subres.length > 0) {
//       res.push(subres);
//     }
//   });
//   return res;
// }



// // select an active piece, move it, consequences
// // position -> [position] -> [[position]]

// function routeCombinations3(position) {
//   let [actives, passives] = position;

//   let res = [];

//   for (let i = 0; i < actives.length; i++) {
//     let movedPiece = actives[i];
//     let rest = [...actives.slice(0, i), ...actives.slice(i+1)];

//     let { origin, role } = movedPiece;

//     routesByRole[role].forEach(_ => {
//       let all = _.map(origin.route);
//       let [destination, ...path] = all;    

//       if (all.every(_ => _.valid())) {
        
//         let stayStill = origin.same(destination);
//         let activeBlocking = rest.filter(piece => 
//           all.some(piece.origin.same));
//         let passiveBlocking = passives.filter(passive => 
//           path.some(passive.origin.same));

//         let capturedPiece,
//             restPassives,
//             captureByMove = false;

//         for (let j = 0; j < passives.length; j++) {

//           capturedPiece = passives[j];
//           restPassives = [...passives.slice(0, j), ...passives.slice(j+1)];

//           captureByMove = capturedPiece.origin.same(destination);

//           if (captureByMove) {
//             break;
//           } else {
//             capturedPiece = undefined;
//             restPassives = undefined;
//           }
//         }
        
//         let movedRelocated = movedPiece.withOrigin(destination);

//         let movedActives = [...rest, movedRelocated];


//         res.push({
//           actives,
//           passives,
//           stayStill,
//           activeBlocking,
//           passiveBlocking,
//           captureByMove,
//           capturedPiece,
//           restPassives,
//           movedPiece,
//           movedRelocated,
//           movedActives
//         });
//       }

//     });
//   }
//   return res;
// }

// let res2 = routeCombinations2(aPosition);

// function routeCombinations2(position) {

//   let [actives, passives] = position;

//   let res = [];

//   for (let i = 0; i < actives.length; i++) {
//     let movedPiece = actives[i];
//     let rest = [...actives.slice(0, i), ...actives.slice(i+1)];

//     let { origin, role } = movedPiece;

//     routesByRole[role].forEach(_ => {
//       let all = _.map(origin.route);
//       let [destination, ...path] = all;
//       if (!origin.same(destination)) {
//         if (all.every(_ => _.valid())) {
//           if(!rest.some(piece => all.some(piece.origin.same))) {
//             if (!passives.some(passive => path.some(passive.origin.same))) {
//               let capturedGone = passives.filter(passive => 
//                 !passive.origin.same(destination));

//               let movedRelocated = [movedPiece.withOrigin(destination),
//                                  ...rest];
//               res.push([capturedGone, movedRelocated]);
//             }
//           }
//         }
//       }
//     });
//   }
//   return res;  
// }

// function captureCombinations1(attacking, attacked) {

//   let [activeAttacking, passiveAttacking] = attacking;
//   let [activeAttacked, passiveAttacked] = attacked;

//   return passiveAttacking.find(captured => 
//     !activeAttacked.some(resisted => 
//       resisted.same(captured)));
// }

// function classifyMoves(position) {
//   return routeCombinations2(position).map(position2 => [
//     position,
//     position2,
//     captureCombinations1(position, position2)
//   ]);  
// };

export function Piece(role, origin) {
  this.role = role;
  this.origin = origin;

  this.key = this.role + this.origin;

  this.king = this.role === 'k';
  this.bishop = this.role === 'b';
  this.knight = this.role === 'n';

  this.withOrigin = (origin) => new Piece(role, origin);

  this.same = (piece) => piece.role === role && piece.origin.same(origin);

  this.toString = () => {
    return this.role + this.origin;
  };
}

export function Coord(file, rank) {

  const fileEnum = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const rankEnum = ['1', '2', '3', '4', '5', '6', '7', '8'];

  this.file = file;
  this.rank = rank;

  this.key = fileEnum[this.file] + rankEnum[this.rank];

  this.valid = () =>
    this.file >= 0 && this.file <= 7 &&
      this.rank >= 0 && this.rank <= 7;

  this.same = (coord) => coord.file === this.file && coord.rank === this.rank;

  this.route = (route) =>
  new Coord(this.file + route[0],
            this.rank + route[1]);

  this.toString = () => fileEnum[this.file] + rankEnum[this.rank];
}

Coord.all = [];

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    Coord.all.push(new Coord(i, j));
  }
}

Coord.allByKey = {};
Coord.all.forEach(coord => Coord.allByKey[coord.key] = coord);

// function chess() {

//   let role = ['k', 'q', 'r', 'b', 'n', 'p'];
//   let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
//   let ranks = ['1', '2', '3', '4', '5', '6', '7'];;

//   let coord = [files, ranks];

//   let piece = [coord, role];

//   let army = [];

//   for (let i = 0; i < 8 * 2; i++) {
//     army.push(piece);
//   }

//   let position = [army, army];

//   let battle = [];

//   for (let j = 0; j < 8; j++) {
//     battle.push(position);
//   }

//   return battle;

// }


// let x = 0;

// console.log(exercise(ePosition));


// function exercise(position) {
//   let [depth0, depth1] = routeCombinations4(position);

//   let d0 = regroupDepth(depth0).flat(),
//       d1 = regroupDepth(depth1).flat();

//   let d2 = d0.flatMap(d0Combinations => {
//     let depth2 = d0Combinations.map(_ => _.children);

//     let d2 = regroupDepth(depth2).flat();

//     return d2;
//   });

//   let d3 = d1.flatMap(d1Combinations => {
//     let depth3 = d1Combinations.map(_ => _.children);

//     let d3 = regroupDepth(depth3).flat();

//     return d3;
//   });

//   console.log(d0);

//   let res = d0.map(d0Combination => {
//     let position1 = actp(d0Combination, position);
//     return d1.map(d1Combination => {
//       let position2 = actp(d1Combination, position1);
//       return d2.map(d2Combination => {
//         let position3 = actp(d2Combination, position2);
//         return d3.map(d3Combination => {
//           let position4 = actp(d3Combination, position3);
//           return position4;
//         });
//       });
//     });
//   });
//   console.log(x);
//   return res;
// }

// function actp(combination, position) {
//   x++;
//   return position;
// }

// function regroupDepth(depth0) {
//   return depth0.map(combinationsForAPiece => {
//     let commitRest = depth0.filter(_ => _ !== combinationsForAPiece)
//         .map(_ => _.filter(_ =>
//           _.origin.same(_.destination))[0]
//         );

//     let commitCombinations = combinationsForAPiece.filter(_ => !_.origin.same(_.destination));

//     return commitCombinations.map(combination => [
//       combination,
//       ...commitRest
//     ]);
//   });
// }

// function routeCombinations4(position) {
//   let [actives, passives] = position;

//   let resDepth0 = [];

//   for (let i = 0; i < actives.length; i++) {
//     let movedPiece = actives[i];
//     let { origin, role } = movedPiece;

//     resDepth0.push(routeDepth(origin, role, 0));

//   }

//   let resDepth1 = [];

//   for (let j = 0; j < passives.length; j++) {
//     let movedPiece = passives[j];
//     let { origin, role } = movedPiece;

//     resDepth1.push(routeDepth(origin, role, 1));
//   }

//   return [resDepth0, resDepth1];
// }

// function routeDepth(origin, role, depth) {
//   let res = [];
//   routesByRole[role].forEach(_ => {
//     let all = _.map(origin.route);
//     let [destination, ...path] = all;    

//     if (all.every(_ => _.valid())) {

//       let children;

//       if (depth < 4) {
//         children = routeDepth(destination, role, depth + 2);
//       }

//       res.push({
//         origin,
//         destination,
//         path,
//         depth,
//         children
//       });
//     }

//   });
//   return res;  
// }


function debugPos(position) {

  let [actives, passives] = position;

  let res = [];

  for (let i = 7; i >= 0; i--) {
    let row = [];
    for (let j = 7; j >= 0; j--) {
      let coord = new Coord(j, i);
      let p = actives.find(_ => _.origin.same(coord));

      if (p) {
        row[j] = p.role.toUpperCase();
      } else {
        p = passives.find(_ => _.origin.same(coord));
        if (p) {
          row[j] = p.role;
        } else {
          row[j] = '.';
        }
      }
    }
    res.push(row);
  }

  return res.map(_ => _.join('')).join('\n');  
}

experiment();
