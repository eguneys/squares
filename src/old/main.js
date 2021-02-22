import Game from './game';

export function app(element, options) {


  let fen = '7k/8/6QK/8/8/8/8/8 w - - 0 1';

  let res = Game.fromFen(fen);

  //console.log(res);
  console.log(res.map(_ => _.key));

}
