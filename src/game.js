import * as util from './util';
import Pos from './pos';
import Be from './time';
import Selection from './selection';


export default function Game() {
}


Game.fromFen = fen => {

  let board = new Pos();
  let be = new Be(board);

  let meta = util.readFen(fen);

  return Selection.select(be.all, meta);
};
