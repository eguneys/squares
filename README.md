# Rules

    match fn fn

    letter
        

    coord
        [letter] [letter]

    contains
        [path] [piece]
        [match path.coord piece.origin]


    block
        [piece] [piece]
        [contains piece.route.path piece]

    attack
        [piece] [piece]
        [contains piece.route.to piece]

    pin 
        [piece] [piece] [piece]
        [block piece piece]
        [attack piece piece]

    board
        [piece] [piece] [piece]

    move
        [board] [board]

    game
        [move] [move] [move]
        [match move.board move.board]

    game -> ? -> ?

    piece
    piece
    piece

    board
    board

    move
    move

    game


    set [a, b, 1, 2]

    letter [set]
        set is a

    digit [set]
        set is b

    coord [[letter] [digit]]

    is [[idea] [idea]]

    [combine]
        [coord is [a 2]]
        [coord.letter is a]
        [coord.digit is 2]

    
        

# Sets

    forming sets

    set [a, b, c, d, e, f, g, 1, 2, 3, 4, 5, 6, 7, 8]
    set [a, b, c, d, e, f, g, 1, 2, 3, 4, 5, 6, 7, 8]
    set [a, b, c, d, e, f, g, 1, 2, 3, 4, 5, 6, 7, 8]
    set [a, b, c, d, e, f, g, 1, 2, 3, 4, 5, 6, 7, 8]

    set [is, not]

    uniform

    a {}
    b {}
    1 {}

    all (a|b|1){8}
    letter (a|b){8}
    digit (1){8}
    coord 
        [all]
        [letter] [digit]
    left [letter] [letter]
        letter==a letter==b
    route { coord, coord }
        coord same file
        coord neighbor up

    king route { route, route, route, route }
        left (route.coord.letter, route.coord.letter)
    move { route }
    game { move, move }

    board
        [route] [route] [route]

    board kings
        [kingroute] [kingroute]

    move
        [board] [board]
        [board===board kings]

    game
        [move] [move]
          [move.board === move.board]

    letter uniform
        a b c d uniform

    left letter ~ letter
        a ~ b

    letter set 1 | a 0.2

    left set 2 | letter 1 ~ letter 1

    coordinate set 2 | letter 1 digit 1

    route0 set 4 | coordinate 1 coordinate 1

    king route | route0 route0 route0 route0

    a1-a2-h3-h5
    a1-a3-h3-h5

    coordinate [letter|digit] [a1, a2, a3]
    
    route0 [coordinate|coordinate] [a1-a2]

    kingroute route0 filter [a1-a2]

    king [color,kingroute]

    turn [color]

    piece [king,bishop,queen,pawn,rook]

    board [turn,piece*]

    move [board,board]

    game [move,move]
    


# Selection


    set rules set


    * [Know] There is a `_ white king _ _ is`
    * [Know] There is a `_ black king _ _ is`
    * [See] There is a `h8 black king is _ _ _`
    * [See] There is a `g6 white king is _ _ _`
    * [Move] There is a `-1 black -1 is is _ _`
        There is a `1 black 1 is not _ _`
        There is a `1 black 1 not is _ _`
        There is a `-1 white -1 is is _ _`
        There is a `1 white 1 is _ _ _`
    * [Location] There is a `a 6`
    * [Route]
      * [From] There is a `Location`
      * [To] There is a `Location`
      * [Path] There is * `Location`
    * [File] There is a `Route [From[Location[a]]]`
      There is a `Route [To[Location[a]]]`
# 

    Single Color King
    Single File Rank Is
    If Is1 White King File Rank Is White King File Rank


    a6wk is1
    a5wk is

    a6wkis
    a3bkis
    a2wknot
    a2bknot

    a6wknot0is
    a3bkis

    a5wknot0is
    a3bkis


    a 6 white king is is1 is2
    a 6 white king not not1 not2

    is1 is a6 white king
    not1 not a6 white king
    is1 is a5 white queen

    Separation
    single white king

    white king is a6
    white king is a5
    black king is a5
    white king not a6

    white king is a6
    black king is a5

    white king is a5
    black king is a5

    white king is a6
    white king not a6

    a 1
    a 2
    b 1
    b 2

    single a

    a 1
    a 2
