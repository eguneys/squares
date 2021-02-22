export default function Reason(be) {

  const sameLocation = fGroup(_ => _.space.locationKey);
  const sameTime = fGroup(_ => _.space.be + _.t);

  this.apply = be => {

    return be.all;

  };
  
}

function fGroup(fgroup) {

  return all => {

    let res = [];

    all.forEach(_ => {
      let key = fgroup(_);

      let g = res.find(_ => _.key === key);

      if (!g) {
        g = { key,value: [] };
        res.push(g);
      }
      g.value.push(_);
    });
    return res;
  };

}
