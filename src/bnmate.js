import { routesByRole,
         Piece,
         Coord } from './set';


let position = [
  [new Piece('k', new Coord(4, 0)),
   new Piece('b', new Coord(5, 0)),
   new Piece('n', new Coord(6, 0))],
  [new Piece('k', new Coord(4, 7))]
];


function move(position) {
  let [actives] = position;

  let king = actives.find(_ => _.king);

  
}
