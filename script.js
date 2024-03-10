document.addEventListener("DOMContentLoaded", function() {
    const board = document.querySelector('.board');

    // Generate the 5x5 grid
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            board.appendChild(cell);
        }
    }

    // Handle click event for each cell
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            // Handle click event for the cell
            // You can implement game logic here
            cell.style.backgroundColor = "red"; // For example, change color on click
        });
    });

    // Place ships with proper spacing
    placeShips(board);
});

function placeShips(board) {
    // Define ships with size and orientation
    const ships = [
        { size: 1, orientation: 'horizontal', position: [0, 0] },
        { size: 2, orientation: 'vertical', position: [2, 2] },
        { size: 3, orientation: 'horizontal', position: [4, 1] }
    ];

    // Loop through each ship
    ships.forEach(ship => {
        let isValid = true;

        // Check if the ship can be placed without overlapping existing ships
        for (let i = 0; i < ship.size; i++) {
            const row = ship.position[0] + (ship.orientation === 'vertical' ? i : 0);
            const col = ship.position[1] + (ship.orientation === 'horizontal' ? i : 0);

            const cell = board.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            if (!cell || cell.classList.contains('ship')) {
                isValid = false;
                break;
            }

            if (ship.orientation === 'horizontal') {
                const leftCell = board.querySelector(`.cell[data-row='${row - 1}'][data-col='${col}']`);
                const rightCell = board.querySelector(`.cell[data-row='${row + 1}'][data-col='${col}']`);
                if ((leftCell && leftCell.classList.contains('ship')) || (rightCell && rightCell.classList.contains('ship'))) {
                    isValid = false;
                    break;
                }
            } else {
                const topCell = board.querySelector(`.cell[data-row='${row}'][data-col='${col - 1}']`);
                const bottomCell = board.querySelector(`.cell[data-row='${row}'][data-col='${col + 1}']`);
                if ((topCell && topCell.classList.contains('ship')) || (bottomCell && bottomCell.classList.contains('ship'))) {
                    isValid = false;
                    break;
                }
            }
        }

        // If the ship can be placed, add it to the board
        if (isValid) {
            for (let i = 0; i < ship.size; i++) {
                const row = ship.position[0] + (ship.orientation === 'vertical' ? i : 0);
                const col = ship.position[1] + (ship.orientation === 'horizontal' ? i : 0);
                const cell = board.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
                cell.classList.add('ship');
            }
        }
    });
}
