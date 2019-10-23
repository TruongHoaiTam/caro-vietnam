import React from 'react';
import { Button } from 'antd/lib/radio';
import './App.css';
import Board from './components/Board';

const getLine = (pos, index) => {
    const lines = [
        [pos - 4, pos - 3, pos - 2, pos - 1, pos],
        [pos - 3, pos - 2, pos - 1, pos, pos + 1],
        [pos - 2, pos - 1, pos, pos + 1, pos + 2],
        [pos - 1, pos, pos + 1, pos + 2, pos + 3],
        [pos, pos + 1, pos + 2, pos + 3, pos + 4],
        [pos - 80, pos - 60, pos - 40, pos - 20, pos],
        [pos - 60, pos - 40, pos - 20, pos, pos + 20],
        [pos - 40, pos - 20, pos, pos + 20, pos + 40],
        [pos - 20, pos, pos + 20, pos + 40, pos + 60],
        [pos, pos + 20, pos + 40, pos + 60, pos + 80],
        [pos - 76, pos - 57, pos - 38, pos - 19, pos],
        [pos - 57, pos - 38, pos - 19, pos, pos + 19],
        [pos - 38, pos - 19, pos, pos + 19, pos + 38],
        [pos - 19, pos, pos + 19, pos + 38, pos + 57],
        [pos, pos + 19, pos + 38, pos + 57, pos + 76],
        [pos - 84, pos - 63, pos - 42, pos - 21, pos],
        [pos - 63, pos - 42, pos - 21, pos, pos + 21],
        [pos - 42, pos - 21, pos, pos + 21, pos + 42],
        [pos - 21, pos, pos + 21, pos + 42, pos + 63],
        [pos, pos + 21, pos + 42, pos + 63, pos + 84]
    ];
    return lines[index];
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        const { actDefaultHistory, actDefaultStepNumber, actXIsNext, actDefaultReverse } = this.props;
        actDefaultHistory();
        actDefaultStepNumber();
        actXIsNext();
        actDefaultReverse();
        this.winningLine = null;
        this.winningPos = null;
        this.stepChoose = 0;
    }

    handlePlayAgain() {
        const { actDefaultHistory, actDefaultStepNumber, actXIsNext, actDefaultReverse } = this.props;
        actDefaultHistory();
        actDefaultStepNumber();
        actXIsNext();
        actDefaultReverse();
        this.winningLine = null;
        this.winningPos = null;
        this.stepChoose = 0;
    }

    handleClick(i) {
        const { stepNumber, xIsNext, actConcatHistory, actChangeStepNumber, actChangeNext } = this.props;
        let { history } = this.props;
        history = history.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winning = this.calculateWinner(squares, current.pos);
        if ((winning && winning[0]) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        actConcatHistory(squares, i, xIsNext, stepNumber);
        actChangeStepNumber(history.length);
        actChangeNext(!xIsNext);
        this.stepChoose = history.length;
    }

    jumpTo(step) {
        const { actChangeStepNumber, actChangeNext } = this.props;
        actChangeStepNumber(step);
        actChangeNext(step % 2 === 0);
        this.winningLine = null;
        this.winningPos = null;
        this.stepChoose = step;
    }

    calculateWinner(squares, pos) {
        const lines = [
            [pos - 4, pos - 3, pos - 2, pos - 1, pos],
            [pos - 3, pos - 2, pos - 1, pos, pos + 1],
            [pos - 2, pos - 1, pos, pos + 1, pos + 2],
            [pos - 1, pos, pos + 1, pos + 2, pos + 3],
            [pos, pos + 1, pos + 2, pos + 3, pos + 4],
            [pos - 80, pos - 60, pos - 40, pos - 20, pos],
            [pos - 60, pos - 40, pos - 20, pos, pos + 20],
            [pos - 40, pos - 20, pos, pos + 20, pos + 40],
            [pos - 20, pos, pos + 20, pos + 40, pos + 60],
            [pos, pos + 20, pos + 40, pos + 60, pos + 80],
            [pos - 76, pos - 57, pos - 38, pos - 19, pos],
            [pos - 57, pos - 38, pos - 19, pos, pos + 19],
            [pos - 38, pos - 19, pos, pos + 19, pos + 38],
            [pos - 19, pos, pos + 19, pos + 38, pos + 57],
            [pos, pos + 19, pos + 38, pos + 57, pos + 76],
            [pos - 84, pos - 63, pos - 42, pos - 21, pos],
            [pos - 63, pos - 42, pos - 21, pos, pos + 21],
            [pos - 42, pos - 21, pos, pos + 21, pos + 42],
            [pos - 21, pos, pos + 21, pos + 42, pos + 63],
            [pos, pos + 21, pos + 42, pos + 63, pos + 84]
        ];
        for (let i = 0; i < lines.length; i += 1) {
            const [a, b, c, d, e] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c] &&
                squares[a] === squares[d] &&
                squares[a] === squares[e]
            ) {
                if (i < 5) {
                    let j = lines[i][0] - 1;
                    let check = 0;
                    while (j >= pos - (pos % 20)) {
                        if (squares[j] && squares[j] !== squares[a]) {
                            check = 1;
                            break;
                        }
                        j -= 1;
                    }
                    if (check === 1) {
                        let k = lines[i][4] + 1;
                        while (k < pos + 20 - (pos % 20)) {
                            if (squares[k] && squares[k] !== squares[a]) {
                                return null;
                            }
                            k += 1;
                        }
                    }
                } else if (i >= 5 && i < 10) {
                    let j = lines[i][0] - 20;
                    let check = 0;
                    while (j >= 0) {
                        if (squares[j] && squares[j] !== squares[a]) {
                            check = 1;
                            break;
                        }
                        j -= 20;
                    }
                    if (check === 1) {
                        let k = lines[i][4] + 20;
                        while (k < 400) {
                            if (squares[k] && squares[k] !== squares[a]) {
                                return null;
                            }
                            k += 20;
                        }
                    }
                } else if (i >= 10 && i < 15) {
                    let j = lines[i][0] - 19;
                    let check = 0;
                    while (j >= 0) {
                        if (squares[j] && squares[j] !== squares[a]) {
                            check = 1;
                            break;
                        }
                        j -= 19;
                    }
                    if (check === 1) {
                        let k = lines[i][4] + 19;
                        while (k < 400) {
                            if (squares[k] && squares[k] !== squares[a]) {
                                return null;
                            }
                            k += 19;
                        }
                    }
                } else if (i < 20) {
                    let j = lines[i][0] - 21;
                    let check = 0;
                    while (j >= 0) {
                        if (squares[j] && squares[j] !== squares[a]) {
                            check = 1;
                            break;
                        }
                        j -= 21;
                    }
                    if (check === 1) {
                        let k = lines[i][4] + 21;
                        while (k < 400) {
                            if (squares[k] && squares[k] !== squares[a]) {
                                return null;
                            }
                            k += 21;
                        }
                    }
                }
                this.winningLine = i;
                this.winningPos = getLine(pos, i);
                return [squares[a], i];
            }
        }
        return null;
    }

    handleSort() {
        const { reverse, actChangeReverse } = this.props;
        actChangeReverse(!reverse);
    }

    render() {
        const { history, stepNumber, reverse, xIsNext } = this.props;
        const current = history[stepNumber];
        const winner = this.calculateWinner(current.squares, current.pos);
        let move = history.map((step, _move) => {
            const desc = _move
                ? (step.xIsNext ? 'O ' : 'X ') + step.coordinates
                : 'Go to game start';
            if (this.stepChoose === _move) {
                return (
                    <li key={_move.toString()}>
                        <Button onClick={() => this.jumpTo(_move)}>
                            <b className="fa fa-bold" aria-hidden="true">
                                {desc}
                            </b>
                        </Button>
                    </li>
                );
            }
            return (
                <li key={_move.toString()}>
                    <Button onClick={() => this.jumpTo(_move)}>{desc}</Button>
                </li>
            );
        });
        if (reverse === true) move = move.reverse();

        let status;
        if (winner) {
            status = `Winner: ${winner[0]}`;
        } else {
            status = `Next player: ${xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <header className="App-header">
                    <p className="App-link">Game Caro</p>
                    <div>
                        <div className="game-board">
                            <div className="status">{status}</div>
                            <Button onClick={() => this.handleSort()}>
                                Sort
                            </Button>
                            <ol>{move}</ol>
                        </div>
                        <div className="game-info">
                            <Board
                                squares={current.squares}
                                isChoose={current.pos}
                                winningLine={this.winningLine}
                                winningPos={this.winningPos}
                                onClick={i => this.handleClick(i)}
                            />
                            <Button
                                className="play-again"
                                onClick={() => this.handlePlayAgain()}
                            >
                                Play again
                            </Button>
                        </div>

                    </div>
                </header>
            </div>
        );
    }
}

export default Game;






