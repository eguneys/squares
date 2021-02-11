import * as util from './util';
import Pos from './pos';
import Flow from './flow';


export default function Game() {
}


Game.fromFen = fen => {

  let meta = util.readFen(fen);

  let board = new Pos();
  let flow = new Flow(board.all);

  flow.source(from => {
    if (from.be === 'is') {

      let be = meta.pieces[from.locationKey];

      if (be) {
        let { color, role } = be;

        return from.color === color &&
          from.role === role;
      } else {
        return false;
      }

    } else {

      for (let key in meta.pieces) {
        let be = meta.pieces[key];

        if (be) {
          let { color, role } = be;
          if (from.color === color && from.role === role) {
            return false;
          }
        }
      }
      return true;
    }
  });


  // flow.direction((from, to) => from.color === to.color);
  // flow.direction((from, to) => from.role === to.role);
  // flow.direction((from, to) => {
  //   let res;
  //   switch(from.role) {
  //   case 'queen':
  //     res = from.queena();
  //     break;
  //   case 'king':
  //     res = from.kinga();
  //     break;
  //   case 'rook':
  //     res = from.rooka();
  //     break;
  //   case 'bishop':
  //     res = from.bishopa();
  //     break;
  //   case 'knight':
  //     res = from.knighta();
  //     break;
  //   case 'pawn':
  //     res = from.uppawna();
  //     break;
  //   }
  //   return res.includes(to);
  // });

  // flow.direction((from, to, turn) =>
  //   (from.color === meta.color) === (turn % 2 === 0)
  // );

  flow.flow();

  return flow.space(0);
};
