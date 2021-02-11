export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

export const allKeys = Array.prototype.concat(...files.map(c => ranks.map(r => c + r)));

export const allKeysFenOrder = Array.prototype.concat(...ranks
                                                      .slice(0)
                                                      .reverse()
                                                      .map(r => 
                                                        files.map(c => c + r)));

export const pos2key = pos => allKeys[8 * pos[0] + pos[1]];

export const key2pos = k => [k.charCodeAt(0) - 97, k.charCodeAt(1) - 49];

export const black = 'black',
      white = 'white';

export function asWhite(color) {
  return color === white;
}

export function flip(color) {
  return color === white ? black : white;
}

let colors = {
  'w': white,
  'b': black
};

let roles = {
  'k': 'king',
  'q': 'queen',
  'r': 'rook',
  'b': 'bishop',
  'n': 'knight',
  'p': 'pawn'
};

export function isFen(fen) {
  return fen.includes('/');
}

export function readFen(fen) {
  let [sPieces, sTurn, sCastles, sExtra] = fen.split(' ');

  let color = colors[sTurn];

  let pieces = {};

  sPieces.split('/').forEach((sRow, row) => {
    row = 7 - row;

    let col = 0;
    for (let char of sRow) {
      let role,
          color;
      if ((role = roles[char])) {
        color = 'black';
      } else if ((role = roles[char.toLowerCase()])) {
        color = 'white';
      }
      if (color) {
        pieces[pos2key([col, row])] = {
          role,
          color
        };
        col++;
      } else {
        col += parseInt(char);
      }
    }
  });

  return {
    pieces,
    color,
  };
}
