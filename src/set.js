let identity = ([x, y]) => [[x, y]];
let reverse = ([x, y]) => [[x, y], [y, x]];
let same = identity([0, 0]);
let diagonal = identity([1, 1]);
let straight = reverse([0, 1]);

let makeProjection = space => ([x, y]) => space.map(_ => {
  let res = [];
  while (_ >= 0) {
    res.push([x * _, y * _]);
    _--;
  }
  return res;
});

let shortProjection = makeProjection([0, 1]);
let longProjection = makeProjection([0, 1, 2, 3, 4, 5, 6, 7]);

let knight = reverse([1, 2]).flatMap(shortProjection);
let king = [...straight, ...diagonal].flatMap(shortProjection);

let rook = straight.flatMap(longProjection);
let bishop = diagonal.flatMap(longProjection);
let queen = [...straight, ...diagonal].flatMap(longProjection);

