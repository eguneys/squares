export default function Board() {

  function FileKlass(index) {

    this.index = index;
    this.char = String.fromCharCode(97 + index);

    this.R = (rank) =>
    Pos.atfr(this, rank);

    this.left = () => File.at(index - 1);
    this.right = () => File.at(index + 1);

    this.toString = () => File.allChars[this.index];
    
  }

  const File = {
    A: new FileKlass(0),
    B: new FileKlass(1),
    C: new FileKlass(2),
    D: new FileKlass(3),
    E: new FileKlass(4),
    F: new FileKlass(5),
    G: new FileKlass(6),
    H: new FileKlass(7),
    at: x => {
      if (0 <= x && x < 8) 
        return File.allFiles[x];
      else return null;    
    }
  };

  File.allChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  File.allFiles = [File.A,File.B,File.C,File.D,File.E,File.F,File.G,File.H];
  File.allByChar = {
    a: File.A,
    b: File.B,
    c: File.C,
    d: File.D,
    e: File.E,
    f: File.F,
    g: File.G,
    h: File.H
  };



  function RankKlass(index) {

    this.index = index;
    this.char = String.fromCharCode(49 + index);

    this.F = (file) =>
    Pos.atfr(file, this);

    this.down = () => Rank.at(index - 1);
    this.up = () => Rank.at(index + 1);

    this.toString = () => Rank.allChars[this.index];

  }

  const Rank = {
    '1': new RankKlass(0),
    '2': new RankKlass(1),
    '3': new RankKlass(2),
    '4': new RankKlass(3),
    '5': new RankKlass(4),
    '6': new RankKlass(5),
    '7': new RankKlass(6),
    '8': new RankKlass(7),
    at: y => {
      if (0 <= y && y < 8)
        return Rank.allRanks[y];
      else
        return null;
    }
  };

  Rank.allChars = ['1','2','3','4','5','6','7','8'];

  Rank.allRanks = [Rank['1'],Rank['2'],Rank['3'],Rank['4'],Rank['5'],Rank['6'],Rank['7'],Rank['8']];

  Rank.allByChar = {
    1: Rank['1'],
    2: Rank['2'],
    3: Rank['3'],
    4: Rank['4'],
    5: Rank['5'],
    6: Rank['6'],
    7: Rank['7'],
    8: Rank['8'],
  };

  const beIndexes = [
    'is',
    'not'
  ];

  const colorIndexes = [
    'white',
    'black'
  ];

  const roleIndexes = [
    'king',
    'queen',
    'knight',
    'bishop',
    'rook',
    'pawn',
    'empty'
  ];

  function PosKlass(index) {
    
    this.index = index;

    let bePosRoleIndex = Math.floor(index / 2),
        beIndex = index % 2,
        posRoleIndex = Math.floor(bePosRoleIndex / 2),
        colorIndex = bePosRoleIndex % 2,
        posIndex = Math.floor(posRoleIndex / 6),
        roleIndex = posRoleIndex % 6;

    this.color = colorIndexes[colorIndex];
    this.role = roleIndexes[roleIndex];
    this.be = beIndexes[beIndex];

    this.file = new FileKlass(Math.floor(posIndex / 8));
    this.rank = new RankKlass(posIndex % 8);

    this.locationKey = this.file.char + this.rank.char;
    this.key = this.locationKey +
      this.color + this.role + this.be;

    this.hore = (stop, dir) => {
      let p = dir(this);
      if (!p) {
        return [];
      }

      return [p, ...stop(p) ? [] : p.hore(stop, dir)];
    };
    this.righte = stop => this.hore(stop, _ => _.right());
    this.lefte = stop => this.hore(stop, _ => _.left());
    this.upe = stop => this.hore(stop, _ => _.up());
    this.downe = stop => this.hore(stop, _ => _.down());
    this.uprighte = stop => this.hore(stop, _ => {
      let up = _.up();
      if (!up) return up;
      return up.right();
    });
    this.downrighte = stop => this.hore(stop, _ => {
      let down = _.down();
      if(!down) return down;
      return down.right();
    });
    this.uplefte = stop => this.hore(stop, _ => {
      let up = _.up();
      if (!up) return up;
      return up.left();
    });
    this.downlefte = stop => this.hore(stop, _ => {
      let down = _.down();
      if (!down) return down;
      return down.left();
    });
    

    this.projection = fe => fe(_ => !_);

    let rooke = [this.lefte, this.righte, this.upe, this.downe],
        bishope = [this.uplefte, this.uprighte, this.downlefte, this.downrighte],
        queene = [...rooke, ...bishope];

    let left = () => this.file.left(),
        right = () => this.file.right(),
        up = () => this.rank.up(),
        down = () => this.rank.down();

    let left2 = () => {
      let left = this.file.left();

      if (!left) return left;

      return left.left();
    };
    let right2 = () => {
      let right = this.file.right();

      if (!right) return right;

      return right.right();
    };
    let up2 = () => {
      let up = this.file.up();

      if (!up) return up;

      return up.up();
    };

    let down2 = () => {
      let down = this.file.down();
      if (!down) return down;
      return down.down();  
    };

    const atfr = (f, r) => {
      if (!f || !r) {
        return null;
      }
      return Pos.atfr(f, r, colorIndex, roleIndex, beIndex);
    };

    this.left = () => atfr(left(), this.rank);
    this.right = () => atfr(right(), this.rank);
    this.up = () => atfr(this.file, up());
    this.down = () => atfr(this.file, down());

    this.upLeft = () => atfr(left(), up());
    this.upRight = () => atfr(right(), up());
    this.downLeft = () => atfr(left(), down());
    this.downRight = () => atfr(right(), down());

    this.up2Left = () => atfr(left(), up2());
    this.up2Right = () => atfr(right(), up2());
    this.down2Left = () => atfr(left(), down2());
    this.down2Right = () => atfr(right(), down2());
    this.upLeft2 = () => atfr(left2(), up());
    this.upRight2 = () => atfr(right2(), up());
    this.downLeft2 = () => atfr(left2(), down());
    this.downRight2 = () => atfr(right2(), down());


    this.rooka = () => rooke.flatMap(this.projection);
    this.bishopa = () => bishope.flatMap(this.projection);
    this.queena = () => queene.flatMap(this.projection);
    this.kinga = () => 
    [this.up(),
     this.down(),
     this.left(),
     this.right(),
     this.upRight(),
     this.upLeft(),
     this.downRight(),
     this.downLeft()];
    this.uppawna = () => [this.up(), this.upLeft(), this.upRight()];
    this.downpawna = () => [this.down(), this.downLeft(), this.downRight()];
    this.knighta = () => [this.up2Left(), 
                    this.up2Right(), 
                    this.down2Left(), 
                    this.down2Right(),
                    this.upLeft2(),
                    this.upRight2(),
                    this.downLeft2(),
                    this.downRight2()];

    this.toString = () => 
    this.file.toString() + this.rank.toString();
    
  }

  const Pos = {
    atfr(file, rank, color, role, be) {
      return Pos.all[be + (color + (role + (rank.index + file.index * 8) * 6) * 2) * 2];
    },
    at: (x, y) => {
      let file, rank;

      file = File.at(x);

      if (!file) {
        return null;
      }

      rank = Rank.at(y);

      if (!rank) {
        return null;
      }

      return Rank.atfr(file, rank);
    }
  };

  const allIndexes = [];
  for (let i = 0; i < 64 * 2 * 6 * 2; i++) {
    allIndexes.push(i);
  }

  Pos.all = allIndexes.map(_ =>
    new PosKlass(_),
  );
  Pos.allKeys = {};

  Pos.all.forEach(pos => Pos.allKeys[pos.key] = pos);
  Pos.fromKey = _ => Pos.allKeys[_];

  Pos.A1 = new PosKlass(0);
  Pos.B1 = new PosKlass(1);


  this.all = Pos.all;

  this.pos = key => Pos.fromKey(key);
  
}
