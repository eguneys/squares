export default function Selection() {

  
}

function intersect(a, b) {
  return a.filter(_ => b.includes(_));
}

function union(a, b) {
  return a.concat(b);
}

Selection.select = (all, meta) => {

  let allsel = [];
  for (let key in meta.pieces) {
    let sel = all.filter(_ =>
      _.space.locationKey === key &&
      _.space.role === meta.pieces[key].role &&
        _.space.color === meta.pieces[key].color &&
        _.space.be === 'is');
    allsel = union(allsel, sel);
  }


  let acc = allsel.flat();

  return acc;
};
