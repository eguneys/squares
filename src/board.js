import * as util from './util';
import Pos from './pos';
import flow from './flow';

export default function Board(squares) {

}

Board.fromFen = (fen) => {
  let meta = util.readFen(fen);

  let squares = Pos.all.slice();

  for (let key of meta.pieces) {
    
    let pos = squares.filter(_ => _.key === key);

    flow(pos, meta.pieces[key].role);
  }

  return new Board(squares, meta.color);
  
};
