import Game from './game';

export function app(element, options) {


  let fen = '7k/8/6QK/8/8/8/8/8 w - - 0 1';

  let space = Game.fromFen(fen);

  console.log(space.filter(_ => _.be === 'is').map(_ => _.key));
}
