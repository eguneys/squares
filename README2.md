# Rules

Pawn moves straight captures diagonally in a direction.
Rook captures straight.





change

a a 0
b b 0
c c 0
d d 0
e e 0
f f 0
g g 0
h h 0
a b 1
b c 1
c d 1
d f 1
f g 1
g h 1
a c 2
b d 2
c e 2
d f 2
e g 2
f h 2
a d 3
b e 3
c f 3
d g 3
e h 3
a e 4
b f 4
c g 4
d h 4
a f 5
b g 5
c h 5
a g 6
b h 6
a h 7

file

rank

Rook

0 0
0 1
0 2
0 3
0 4
0 5
0 6
0 7

a2 b7

a2 b2 b7
a2 a7 b7

Bishop

0 0
1 1
2 2
3 3
4 4
5 5
6 6 
7 7

f3 g8

f3 d5 g8
f3 h5 e7 g8

King

0 0
1 0
1 1

a3 b4 c5 b6 a7

Knight

0 0
2 1

# Question


    pins
    hanging piece
    trapped piece
    advanced pawn
    bishop pair
    rook
    endgame
    bishop endgame
    opening
    double attack
    fork
    attack
    defense
    position [piece]
    move [position]

    [piece] position
    [[piece]] move
    best move


    piece piece | piece piece | piece piece piece
    move move | move move
    sevenmoves sevenmoves sevenmoves
    zugzwang zugzwang zugzwang
    perfect play

    best move [move]
    zugzwang [move]
    king move [move]
    white move [move]
    mate [move]
    equality [move]
    win
    draw
    puzzle
    sacrifice
    deflection
    promote

    piece
    rook
    up down left right

    piece coord coord | coord
    position piece piece | piece piece


    direction
        from
        to

    up 
        direction.from.files === direction.to.files
        direction.from.ranks === direction.to.ranks
    down 

    a5 a4 a3

    a3 a4 a5
        a4 a5
    a2 a3 a4 a5

# Chess


    wka3bka5wba2 wka3bka5wba2 wka3bka4wba2 space

    wkbkwb a3a5a2 wkbkwb a3a5a2 wkbkwb a3a4a2

    a3a3a3 a5a5a4 a2a2a2 wkbkwb wkbkwb wkbkwb

    wka3bka5wba2 position

    a3a6 route
    a3a4a5a6 route
    a3a6 route
    a3a2a3a6 route
    a3a3a3a6 route

    wka3 a3a4

    wka3 a4a5

    a3a4coordcoord
    aa34filerank
    samefileleftrank

    aasame
    34left



    1...999 space

    1 one
    1...9 digits

    1...999 sort

    1...9 digits sort

    digits digits digits space

    digits sort digits sort digits sort space sort

    % 2 space digits digits %2 digits
    % 2 digits 1...8

    one a
        a 1

    digits a
        a 1...9

    threedigits a b c
        a digits b digits c digits

    twodigits a b
        a digits b digits

     increasing a
         a twodigits
             ab aa 
         a threedigits
             ab aa increasing
             ac ab increasing





    
    abcd1234
    a3
    3a
    aaa
    c

    tactics tactics

    fen san san san

    fen fen fen fen

    <->
    <-> <-> <->
    fen <-> fen
    fen <-> move <-> fen


    fen -> pieces -> piece -> pins -> pin -> moves -> move

    pinned piece cannot move

    fen pin skewer capture moves best move bad move tactics valid moves


    fen -> move -> fen
    fen -> move -> fen


    picture

    pgn

    8/8/8/8/8

    White king at a3 goes to a4

    w k a 3 w k a 4

    w k a 3 a 4

    00110101010010101

    White king at a3 goes to a4 goes to a3

    White king captures Black king
