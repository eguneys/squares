export default function Selection() {

  
}

function intersect(a, b) {
  return a.filter(_ => b.includes(_));
}

function union(a, b) {
  return a.concat(b);
}

Selection.select = (all, meta) => {

  let sel2 = all.filter(_ => 
    _.space.role === 'king' &&
      _.space.color === 'black' &&
      _.space.be === 'is' &&
      _.be === 'is');

  let sel1 = all.filter(_ => 
    _.space.role === 'king' &&
      _.space.color === 'white' &&
      _.space.be === 'is' &&
      _.be === 'is');

  let allsel = [];
  for (let key in meta.pieces) {
    let sel = all.filter(_ =>
      _.space.locationKey === key &&
      _.space.role === meta.pieces[key].role &&
        _.space.color === meta.pieces[key].color &&
        _.space.be === 'is');
    allsel = union(allsel, sel);
  }


  return intersect(allsel.flat(), union(sel1, sel2));
};
