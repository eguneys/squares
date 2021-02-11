export default function Flow() {

  let directions = [];

  let spaces = [
    [],
    [],
    [],
    []
  ];

  function source(source) {

    spaces[0] = spaces[0]
      .concat(source.spaces[0]);

    spaces[1] = source.spaces[1];
    
    spaces[2] = source.spaces[2];

    spaces[3] = source.spaces[3];
  }

  function direction(direction) {
    directions.push(direction);
  }

  function flow() {
    spaces[1] = spaces[1].filter(to =>
      spaces[0].find(from =>
        directions.every(direction =>
          direction(from, to)
        )
      )
    );
  }

  this.flow = flow;
  this.source = source;
  this.direction = direction;

  this.space = n => spaces[n];
}
