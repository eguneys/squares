export default function Dimension(name, sub, allIndexes) {
  
  function DimensionKlass(index, sub) {
    
    this.d = index;
    this.sub = sub;

    this.key = `[${this.name} ${this.d}] ` + this.sub.key;

  }

  const Dimension = {
    at(t) {
      return Dimension.all[t];
    }
  };

  Dimension.all = allIndexes.flatMap(_ =>
    new DimensionKlass(_, space)
  );

  this.all = Dimension.all;  
}


Dimension.group = (space, fgroup) => {

  let indexes = [];

  space.all.forEach(_ => {
    let index = fgroup(_);

  });
  
};
