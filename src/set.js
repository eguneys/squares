let change = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [1, 0, 1, 2, 3, 4, 5, 6],
  [2, 1, 0, 1, 2, 3, 4, 5],
  [3, 2, 1, 0, 1, 2, 3, 4],
  [4, 3, 2, 1, 0, 1, 2, 3],
  [5, 4, 3, 2, 1, 0, 1, 2],
  [6, 5, 4, 3, 2, 1, 0, 1],
  [7, 6, 5, 4, 3, 2, 1, 0],
];

let identity = ([x, y]) => [[x, y]];
let reverse = ([x, y]) => [[x, y], [y, x]];
let projection = ([x, y]) => [1, 2, 3, 4, 5, 6, 7].map(_ => [x * _, y * _]);
let same = identity([0, 0]);
let diagonal = identity([1, 1]);
let straight = reverse([0, 1]);

let knight = reverse([1, 2]);
let rook = straight.flatMap(projection);
let bishop = diagonal.flatMap(projection);
let king = [...straight, ...diagonal];
let queen = king.flatMap(projection);



function walk(routes) {

  return [0, 1, 2, 3, 4, 5, 6, 7].map(bFile => 
    [0, 1, 2, 3, 4, 5, 6, 7].map(bRank =>
      routes.flatMap(([cFile, cRank]) => {
    
        let tFiles = getAllIndexes(change[bFile], cFile);
        let tRanks = getAllIndexes(change[bRank], cRank);

        return tFiles.flatMap(tFile =>
          tRanks.map(tRank =>
            [tFile, tRank]
          )
        );            
      })
    )
  );
}

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

