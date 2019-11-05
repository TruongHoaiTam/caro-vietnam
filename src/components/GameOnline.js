import 'antd/dist/antd.css';
import React from 'react';
import socketIOClient from 'socket.io-client'
import { Button, Modal, Spin } from 'antd';
import { Launcher } from 'react-chat-window'
import Board from './Board';


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

class GameOnline extends React.Component {

    socket = socketIOClient(`http://localhost:3000`);

    WFR = false;

    WFRA = false;

    AFU = true;

    U = true;

    NU = true;

    AFS = true;

    S = true;

    NS = true;

    AFD = true;

    D = true;

    ND = true;

    clicked = false;

    usernames = false;

    allowSend = true;

    constructor(props) {
        super(props);
        const { actInitState } = this.props;
        actInitState();
        this.winningLine = null;
        this.winningPos = null;
        this.stepChoose = 0;
        this.state = {
            messageList: []
        };
    }

    _onMessageWasSent(message) {
        this.socket.emit("send-message", message);
        const { messageList } = this.state;
        console.log(messageList)

        this.setState({
            messageList: [...messageList, message]
        })
    }

    _sendMessage(text) {
        if (text.length > 0) {
            const { messageList } = this.state;
            this.setState({
                messageList: [...messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }

    handlePlayAgain() {
        const { actInitState } = this.props;
        actInitState();
        this.winningLine = null;
        this.winningPos = null;
        this.stepChoose = 0;
    }

    handleClick(i) {
        this.clicked = true;
        if (this.WFR === true || this.WFRA === true) return;
        const { allowWin, allowDraw, win, draw } = this.props;
        if (allowWin || allowDraw || win || draw) return;
        const { stepNumber, xIsNext, players } = this.props;
        let whoNext = null;
        if (stepNumber % 2 === 0) {
            // eslint-disable-next-line prefer-destructuring
            whoNext = players[0];
        } else {
            // eslint-disable-next-line prefer-destructuring
            whoNext = players[1];
        }
        if (whoNext !== this.socket.id) {
            return;
        }

        let { _history } = this.props;
        _history = _history.slice(0, stepNumber + 1);
        const current = _history[_history.length - 1];
        const squares = current.squares.slice();
        const winning = this.calculateWinner(squares, current.pos);
        if ((winning && winning[0]) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        const { actHandleClick } = this.props;
        actHandleClick({
            squares, i, xIsNext, stepNumber, _history
        });
        this.stepChoose = _history.length;
        this.socket.emit('client-click', i);
    }


    jumpTo(step) {
        const { allowWin, allowDraw, win, draw } = this.props;
        if (!allowWin && !allowDraw && !win && !draw) {
            this.waitingForResponse();
            this.WFR = true;
            this.socket.emit("ask-for-undo", step);
        }
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
        const { reverse, actHandleSort } = this.props;
        actHandleSort(reverse);
    }

    disconnect(socket) {
        socket.disconnect();
        const { history } = this.props;
        history.push("/");
    }

    handleUpdateInterface(i) {
        this.clicked = false;
        const { stepNumber, xIsNext } = this.props;
        let { _history } = this.props;
        _history = _history.slice(0, stepNumber + 1);
        const current = _history[_history.length - 1];
        const squares = current.squares.slice();
        const winning = this.calculateWinner(squares, current.pos);
        if ((winning && winning[0]) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        const { actHandleClick } = this.props;
        actHandleClick({
            squares, i, xIsNext, stepNumber, _history
        });
        this.stepChoose = _history.length;
    }

    waitingForResponse() {
        const { confirm } = Modal;
        confirm({
            title: 'Đề nghị',
            content: `Chờ bạn cùng chơi phản hồi`
        })
    }

    handleAskForUndo(step) {
        const { confirm } = Modal;
        const modal = confirm({
            title: 'Đề nghị',
            content: `Bạn cùng chơi muốn undo về bước ${step}`,
            okText: 'Đồng ý',
            cancelText: 'Từ chối',
            onOk: () => {
                const { actJumpTo } = this.props;
                actJumpTo(step);
                this.winningLine = null;
                this.winningPos = null;
                this.stepChoose = step;
                this.socket.emit("undo", step);
                this.AFU = true;
                this.waitingForResponse();
                this.WFRA = true;
                modal.destroy();
            },
            onCancel: () => {
                this.socket.emit("not-undo", step);
                this.AFU = true;
                this.waitingForResponse();
                this.WFRA = true;
                modal.destroy();
            }
        })
    }

    handleAskForSurrender() {
        const { confirm } = Modal;
        const modal = confirm({
            title: 'Đề nghị',
            content: `Bạn cùng chơi muốn xin đầu hàng`,
            okText: 'Đồng ý',
            cancelText: 'Từ chối',
            onOk: () => {
                this.socket.emit("allow-surrender");
                this.AFS = true;
                this.waitingForResponse();
                this.WFRA = true;
                modal.destroy();
            },
            onCancel: () => {
                this.socket.emit("not-allow-surrender");
                this.AFS = true;
                this.waitingForResponse();
                this.WFRA = true;
                modal.destroy();
            }
        })
    }

    handleAskForDraw() {
        const { confirm } = Modal;
        const modal = confirm({
            title: 'Đề nghị',
            content: `Bạn cùng chơi muốn xin hòa`,
            okText: 'Đồng ý',
            cancelText: 'Từ chối',
            onOk: () => {
                this.socket.emit("allow-draw");
                this.AFS = true;
                this.waitingForResponse();
                this.WFRA = true;
                modal.destroy();
            },
            onCancel: () => {
                this.socket.emit("not-allow-draw");
                this.AFS = true;
                this.waitingForResponse();
                this.WFRA = true;
                modal.destroy();
            }
        })
    }

    handleUndo(step) {
        this.WFR = false;
        const { confirm } = Modal;
        const modal = confirm({
            title: 'Phản hồi',
            content: `Bạn cùng chơi đã đồng ý undo về bước ${step}`,
            okText: 'Undo',
            onOk: () => {
                const { actJumpTo } = this.props;
                actJumpTo(step);
                this.winningLine = null;
                this.winningPos = null;
                this.stepChoose = step;
                this.U = true;
                this.socket.emit("continue-play");
                modal.destroy();
            },
            onCancel: () => {
                const { actJumpTo } = this.props;
                actJumpTo(step);
                this.winningLine = null;
                this.winningPos = null;
                this.stepChoose = step;
                this.U = true;
                this.socket.emit("continue-play");
                modal.destroy();
            }
        })
    }

    handleNotUndo(step) {
        this.WFR = false;
        const { confirm } = Modal;
        const modal = confirm({
            title: 'Phản hồi',
            content: `Bạn cùng chơi đã từ chối undo về bước ${step}`,
            okText: 'Quay lại',
            onOk: () => {
                this.NU = true;
                this.socket.emit("continue-play");
                modal.destroy();
            },
            onCancel: () => {
                this.NU = true;
                this.socket.emit("continue-play");
                modal.destroy();
            }
        })
    }

    handleSurrender() {
        this.waitingForResponse();
        this.WFR = true;
        this.socket.emit("ask-for-surrender");
    }

    handleDraw() {
        this.waitingForResponse();
        this.WFR = true;
        this.socket.emit("ask-for-draw");
    }

    handleAllowSurrender() {
        this.WFR = false;
        const { confirm } = Modal;
        const modal = confirm({
            title: 'Phản hồi',
            content: `Bạn cùng chơi đã đồng ý cho bạn đầu hàng`,
            okText: 'Đầu hàng',
            onOk: () => {
                const { actSetAllowWin } = this.props;
                actSetAllowWin();
                this.S = true;
                this.socket.emit("stop-play", "surrender");
                modal.destroy();
            },
            onCancel: () => {
                const { actSetAllowWin } = this.props;
                actSetAllowWin();
                this.S = true;
                this.socket.emit("stop-play", "surrender");
                modal.destroy();
            }
        })
    }

    handleNotAllowSurrender() {
        this.WFR = false;
        const { confirm } = Modal;
        const modal = confirm({
            title: 'Phản hồi',
            content: `Bạn cùng chơi đã từ chối cho bạn đầu hàng`,
            okText: 'Quay lại',
            onOk: () => {
                this.NS = true;
                this.socket.emit("continue-play");
                modal.destroy();
            },
            onCancel: () => {
                this.NS = true;
                this.socket.emit("continue-play");
                modal.destroy();
            }
        })
    }

    handleAllowDraw() {
        this.WFR = false;
        const { confirm } = Modal;
        const modal = confirm({
            title: 'Phản hồi',
            content: `Bạn cùng chơi đã đồng ý hòa`,
            okText: 'Hòa',
            onOk: () => {
                const { actSetAllowDraw } = this.props;
                actSetAllowDraw();
                this.D = true;
                this.socket.emit("stop-play", "draw");
                modal.destroy();
            },
            onCancel: () => {
                const { actSetAllowDraw } = this.props;
                actSetAllowDraw();
                this.D = true;
                this.socket.emit("stop-play", "draw");
                modal.destroy();
            }
        })
    }

    handleNotAllowDraw() {
        this.WFR = false;
        const { confirm } = Modal;
        const modal = confirm({
            title: 'Phản hồi',
            content: `Bạn cùng chơi đã từ chối hòa`,
            okText: 'Quay lại',
            onOk: () => {
                this.ND = true;
                this.socket.emit("continue-play");
                modal.destroy();
            },
            onCancel: () => {
                this.ND = true;
                this.socket.emit("continue-play");
                modal.destroy();
            }
        })
    }

    render() {
        const { username } = this.props;
        if (this.usernames === false) {
            this.usernames = true;
            this.socket.emit("send-username", username);
        }
        this.socket.on('broadcast-pos', (pos) => {
            this.handleUpdateInterface(pos)
        });
        this.socket.on('players', (arr, usernames) => {
            const { actPlayers } = this.props;
            actPlayers(arr, usernames);
        });
        this.socket.on('ask-for-undo', (step) => {
            if (this.AFU) {
                this.handleAskForUndo(step);
                this.AFU = false;
            }
        })
        this.socket.on('undo', (step) => {
            if (this.U) {
                this.handleUndo(step);
                this.U = false;
            }
        })
        this.socket.on('not-undo', (step) => {
            if (this.NU) {
                this.handleNotUndo(step);
                this.NU = false;
            }
        })
        this.socket.on("continue-play", () => {
            this.WFRA = false;
        })

        this.socket.on('ask-for-surrender', () => {
            if (this.AFS) {
                this.handleAskForSurrender();
                this.AFS = false;
            }
        })

        this.socket.on('ask-for-draw', () => {
            if (this.AFD) {
                this.handleAskForDraw();
                this.AFD = false;
            }
        })

        this.socket.on('allow-surrender', () => {
            if (this.S) {
                this.handleAllowSurrender();
                this.S = false;
            }
        })
        this.socket.on('not-allow-surrender', () => {
            if (this.NS) {
                this.handleNotAllowSurrender();
                this.NS = false;
            }
        })

        this.socket.on('allow-draw', () => {
            if (this.D) {
                this.handleAllowDraw();
                this.D = false;
            }
        })
        this.socket.on('not-allow-draw', () => {
            if (this.ND) {
                this.handleNotAllowDraw();
                this.ND = false;
            }
        })

        this.socket.on("stop-play", (str) => {
            if (str === "surrender") {
                const { actSetWin } = this.props;
                actSetWin();
            } else if (str === "draw") {
                const { actSetDraw } = this.props;
                actSetDraw();
            }
        })

        this.socket.on('send-message', (message) => {
            if (this.allowSend === false) {
                const { messageList } = this.state;
                if (messageList[messageList.length - 1].data !== message.data) {
                    this.allowSend = true;
                }
            }
            if (this.allowSend) {
                this.allowSend = false;
                message.author = "them";
                const { messageList } = this.state;
                console.log(messageList)
                this.setState({
                    messageList: [...messageList, message]
                })
            }

        })

        const { _history, stepNumber, reverse, xIsNext, players } = this.props;
        if (players === null) {
            return (
                <Modal
                    title="Đang chờ người cùng chơi"
                    visible
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Spin size="large" />
                </Modal>
            )
        }
        const current = _history[stepNumber];

        const winner = this.calculateWinner(current.squares, current.pos);

        let move = _history.map((step, _move) => {
            const desc = _move
                ? `ask for undo ${step.xIsNext ? 'O ' : 'X '}${step.coordinates}`
                : 'ask for undo to game start';
            if (this.stepChoose === _move) {
                return (
                    <li key={_move.toString()}>
                        <Button
                            size="large" shape="round"
                            className="btnHistory"
                            onClick={() => this.jumpTo(step)}
                        >
                            <b className="fa fa-bold" aria-hidden="true">
                                {desc}
                            </b>
                        </Button>
                    </li>
                );
            }
            return (
                <li key={_move.toString()}>
                    <Button
                        size="large" shape="round"
                        className="btnHistory"
                        onClick={() => this.jumpTo(_move)}>{desc}
                    </Button>
                </li>
            );
        });
        if (reverse === true) move = move.reverse();

        let status;
        const { allowWin, allowDraw, usernames, win, draw } = this.props;
        if (allowDraw || draw) {
            status = `Draw`;
        } else if (allowWin) {
            const _win = (this.socket.id === players[0]) ? usernames[1] : usernames[0];
            status = `Winner: ${_win}`;
        } else if (win) {
            status = `Winner: ${username}`;
        } else if (winner) {
            const _win = (winner[0] === "X") ? usernames[0] : usernames[1];
            status = `Winner: ${_win}`;
        } else {
            status = `Next player: ${xIsNext ? usernames[0] : usernames[1]}`;
        }


        let allow = <div />
        if (this.clicked === false) {
            allow = <div>
                <Button
                    type="danger" size="large" shape="round"
                    onClick={() => this.handleSurrender()}
                >
                    Xin đầu hàng
                        </Button>
                <Button
                    type="danger" size="large" shape="round"
                    onClick={() => this.handleDraw()}
                >
                    Xin hòa
                        </Button>
            </div>
        }

        const { messageList } = this.state;

        return (
            <div
                className="container-login100"
                style={{ backgroundColor: '#282c34' }}
            >
                <div className="game-info">
                    <p className="title">Game Caro Online</p>
                    <p>{status}</p>
                    <Button
                        type="primary" size="large" shape="round"
                        onClick={() => this.disconnect(this.socket)}
                    >
                        Home
                    </Button>
                    {allow}
                </div>
                <div className="game">
                    <Board
                        squares={current.squares}
                        isChoose={current.pos}
                        winningLine={this.winningLine}
                        winningPos={this.winningPos}
                        onClick={i => this.handleClick(i)}
                    />
                </div>

                <div className="divhistory">
                    <div className="divhistory1">
                        <p>&nbsp;&nbsp;History</p>
                        <Button
                            className="btnSort"
                            type="primary"
                            size="large"
                            onClick={() => this.handleSort()}
                        >
                            Sort
                            </Button>
                    </div>
                    <div className="history">
                        <ol>{move}</ol>
                    </div>
                </div>
                <Launcher
                    agentProfile={{
                        teamName: 'TRÒ CHUYỆN KHI ĐANG CHƠI',
                        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                    }}
                    // eslint-disable-next-line react/jsx-no-bind
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={messageList}
                    showEmoji
                />
            </div >
        );
    }
}

export default GameOnline;






