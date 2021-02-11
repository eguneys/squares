import * as util from './util';
import Pos from './pos';
import Flow from './flow';


export default function Game() {
}


Game.fromFen = fen => {

  let meta = util.readFen(fen);

  let board = new Pos();
  let flow = new Flow();

  // let res = board.pos('a2whiteking').queena();

  // console.log(res.map(_ => _ && _.key));

  // return [];

  for (let key in meta.pieces) {
    key = key + meta.pieces[key].color + meta.pieces[key].role;
    flow.source(board.pos(key));
  }

  flow.direction((from, to) => from.color === to.color);

  flow.direction((from, to) => from.role === to.role);

  flow.direction((from, to) => {
    let res;
    switch(from.role) {
    case 'queen':
      res = from.queena();
      break;
    case 'king':
      res = from.kinga();
      break;
    case 'rook':
      res = from.rooka();
      break;
    case 'bishop':
      res = from.bishopa();
      break;
    case 'knight':
      res = from.knighta();
      break;
    case 'pawn':
      res = from.uppawna();
      break;
    }
    return res.includes(to);
  });

  // flow.direction(meta.pieces[key].color);

  //flow.direction(meta.color);


  flow.flow();

  return flow.space(1);
};
