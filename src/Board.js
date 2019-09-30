import React from 'react';
import Square from './Square';

class Board extends React.Component {
    renderSquare(i) {
        const { winningLine, winningPos, squares, onClick, isChoose } = this.props
        if (winningLine !== null) {
            const line = winningLine;
            if (line < 5) {
                for (let j = winningPos[0]; j <= winningPos[4]; j += 1) {
                    if (i === j) {
                        return (
                            <Square
                                key={i}
                                isDetermined
                                value={squares[i]}
                                onClick={() => onClick(i)}
                            />
                        );
                    }
                }
            } else if (line >= 5 && line < 10) {
                for (let j = winningPos[0]; j <= winningPos[4]; j += 20) {
                    if (i === j) {
                        return (
                            <Square
                                key={i}
                                isDetermined
                                value={squares[i]}
                                onClick={() => onClick(i)}
                            />
                        );
                    }
                }
            } else if (line >= 10 && line < 15) {
                for (let j = winningPos[0]; j <= winningPos[4]; j += 19) {
                    if (i === j) {
                        return (
                            <Square
                                key={i}
                                isDetermined
                                value={squares[i]}
                                onClick={() => onClick(i)}
                            />
                        );
                    }
                }
            } else if (line >= 15 && line < 20) {
                for (let j = winningPos[0]; j <= winningPos[4]; j += 21) {
                    if (i === j) {
                        return (
                            <Square
                                key={i}
                                isDetermined
                                value={squares[i]}
                                onClick={() => onClick(i)}
                            />
                        );
                    }
                }
            }
        }
        return (
            <Square
                key={i}
                isDetermined={false}
                isChoose={isChoose === i}
                value={squares[i]}
                onClick={() => onClick(i)}
            />
        );
    }

    renderRow(i) {
        const val = [];
        for (let j = 20 * i; j < 20 * i + 20; j += 1) {
            val.push(j);
        }
        const row = val.map(item => this.renderSquare(item));
        return (
            <div className="board-row" key={i}>
                {row}
            </div>
        );
    }

    render() {
        const val = [];
        for (let j = 0; j < 20; j += 1) {
            val.push(j);
        }
        const board = val.map(item => this.renderRow(item));
        return <div>{board}</div>;
    }
}

export default Board;
