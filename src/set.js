let identity = ([x, y]) => [[x, y]];
let reverse = ([x, y]) => [[x, y], [y, x]];
let diagonal = identity([1, 1]);
let straight = reverse([0, 1]);

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

let knight = reverse([1, 2])
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

// materialize
// all the routes a rook can go.
// all the routes a rook can go with all the routes a king can go.
// all the routes for all the pieces can go with all other pieces.

materialize(queen);

function materialize(routes) {

  let res = [];

  let subspace = [0, 1, 2, 3, 4, 5, 6, 7];
  let space = [subspace, subspace];

  let [files, ranks] = space;

  for (let file of files) {
    for (let rank of ranks) {
      for (let route of routes) {
        res.push([route, file, rank]);
      }
    }
  }
  return res;
}
