const beIndexes = [
  'is',
  'not'
];

export default function Be(board) {

  function TimeKlass(index, space) {

    let tIndex = Math.floor(index / 2),
        beIndex = index % 2;

    this.space = space;

    this.t = tIndex;
    this.be = beIndexes[beIndex];

    this.key = this.t + this.be + space.key;
    
  }

  const Time = {
    at(t) {
      return Time.all[t];
    }
  };

  const allIndexes = [];
  for (let i = 0; i < 3 * 2; i++) {
    allIndexes.push(i);
  }

  Time.all = allIndexes.flatMap(_ =>
    board.all.map(space =>
      new TimeKlass(_, space)
    )
  );

  Time.allKeys = {};

  Time.all.forEach(time => Time.allKeys[time.key] = time);
  Time.fromKey = _ => Time.allKeys[_];

  this.all = Time.all;
  this.time = key => Time.fromKey(key);
  
}
