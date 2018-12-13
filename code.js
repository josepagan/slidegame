const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);


class Board {
    constructor() {
        this.gameOver = false;
        this.rows = 4;
        this.columns = 4;
        this.pieces = this.createPieces();
        this.spaces = this.createSpaces();


    }

    //creates a 16 length array of Spaces objects, with two coordinates and a "piece object"
    createSpaces() {
        const spaces = [];
        for (let x = 0; x < this.columns; x++) {
            for (let y = 0; y < this.rows; y++) {
                const space = new Space(y, x);
                if (this.pieces.length > 0) {
                    space.piece = this.pieces.pop();
                }
                spaces.push(space);
            }

        }
        return spaces
    }





    //creates an array of pieces and it shuffles them
    createPieces() {


        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }


        const pieces = [];
        for (let x = 1; x < 16; x++) {
            let piece = new Piece(x)
            pieces.push(piece);

        }
        return shuffle(pieces);

    }

    winScreen() {
        document.getElementsByTagName('body')[0].innerHTML = "congratulations, you won";

    }


    draw() {
        if (this.gameOver == true) {
            document.getElementsByTagName('body')[0].innerHTML = "congratulations, you won";

        } else {
            this.spaces.forEach(space => {
                const spaceDiv = document.createElement('div');
                if (space.piece == null) {
                    // spaceDiv.innerHTML = "nullDiv"
                } else {
                    spaceDiv.classList.add('card');
                    if (space.piece.value % 2 == 0) {
                        spaceDiv.style.backgroundColor = "brown";
                    }

                    spaceDiv.dataset.piece = space.piece.value;
                    const innerDiv = document.createElement('div');
                    innerDiv.classList.add('innerDiv')


                    innerDiv.innerHTML = space.piece.value;
                    spaceDiv.appendChild(innerDiv);
                }
                spaceDiv.dataset.x = space.x;
                spaceDiv.dataset.y = space.y;
                grid.appendChild(spaceDiv)
            })
        }
    }


    //finds the object that has been clicked, number will be the data-value returned by event handler
    findPiece(number) {
        const found = this.spaces.find((element) => element.piece.value == number);

        found.lookAround;
    }

    findByCoordinates(obj) {
        const found = this.spaces.find((space) => space.x == obj.x && space.y == obj.y)
        return found;
    }

    winCheck() {
        let withPiece = this.spaces.filter((space) => space.piece);
        let rightPosition = withPiece.filter((space) => space.x == space.piece.goalPositionX &&
            space.y == space.piece.goalPositionY);
        console.log(rightPosition.length);
        if (rightPosition.length > 5) {
            this.gameOver = true;
            this.winScreen();
        }



    }


}


class Space {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.piece = null;

    }
    get spaceRight() {
        if (this.x < board.columns - 1) {
            return board.findByCoordinates(this.right).piece == null;
        } else return
    }

    get right() {
        return (board.findByCoordinates({
            x: this.x + 1,
            y: this.y
        }))
    }
    get left() {
        return (board.findByCoordinates({
            x: this.x - 1,
            y: this.y
        }))
    }
    get up() {
        return (board.findByCoordinates({
            x: this.x,
            y: this.y - 1
        }))
    }
    get down() {
        return (board.findByCoordinates({
            x: this.x,
            y: this.y + 1
        }))
    }

    get exists() {
        if (this) return true
    }




    get lookAround() { // no se porque no va, tryLookArround Va, y Spaceright va!!!
        if (this.up && this.up.piece === null) {
            this.slideUp();
        } else if (this.down && this.down.piece === null) {
            this.slideDown();
        } else if (this.left && this.left.piece === null) {
            this.slideLeft();
        } else if (this.right && this.right.piece === null) {
            this.slideRight();
        }
        grid.innerHTML = "";
        board.draw();

    }

    slideRight() {
        const value = this.piece.value;
        this.right.piece = new Piece(value);
        this.piece = null;

    }

    slideLeft() {
        const value = this.piece.value;
        this.left.piece = new Piece(value);
        this.piece = null;

    }

    slideUp() {
        const value = this.piece.value;
        this.up.piece = new Piece(value);
        this.piece = null;

    }

    slideDown() {
        const value = this.piece.value;
        this.down.piece = new Piece(value);
        this.piece = null;

    }



}


class Piece {
    constructor(n) {
        this.value = n;


    }
    get goalPositionX() {
        if (this.value % 4) {
            return (this.value % 4) - 1
        } else return 3;
    }
    get goalPositionY() {
        return (this.value - 1) / 4 << 0
    }
}

let board = new Board;

// Add event listener to grid
grid.addEventListener('click', function (event) {
    // The event target is our clicked item
    let clicked = event.target;
    if (clicked.className == "innerDiv") {
        clicked = clicked.parentNode;
    }

    // Do not allow the grid section itself to be selected; only select divs inside the grid
    if (clicked.nodeName === 'SECTION') {
        return;
    }


    const foo = {};
    foo.x = parseInt(clicked.dataset.x);
    foo.y = parseInt(clicked.dataset.y);


    board.findByCoordinates(foo).lookAround;
    board.winCheck();



});

board.draw();