export default function Flow(space) {

  let sources = [],
      directions = [];

  let spaces = [
    space,
    space,
    space,
    space
  ];

  function source(source) {
    sources.push(source);
  }

  function direction(direction) {
    directions.push(direction);
  }

  function flow() {

    spaces[0] = spaces[0].filter(from =>
      sources.every(source => source(from))
    );

    spaces[1] = spaces[1].filter(to =>
      spaces[0].find(from =>
        directions.every(direction =>
          direction(from, to, 0)
        )
      )
    );
  }

  this.flow = flow;
  this.source = source;
  this.direction = direction;

  this.space = n => spaces[n];
}
