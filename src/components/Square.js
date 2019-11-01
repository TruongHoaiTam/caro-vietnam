import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Square extends React.Component {
    render() {
        const { isDetermined, isChoose, onClick, value } = this.props;
        if (value === 'X' && isDetermined === true) {
            return (
                <button type="button" className="square x isDetermined" onClick={onClick}>
                    {value}
                </button>
            );
        }
        if (value === 'X' && isDetermined === false && isChoose === false) {
            return (
                <button type="button" className="square x" onClick={onClick}>
                    {value}
                </button>
            );
        }
        if (value === 'X' && isDetermined === false && isChoose === true) {
            return (
                <button type="button" className="square x isChoose" onClick={onClick}>
                    {value}
                </button>
            );
        }

        if (value === 'O' && isDetermined === true) {
            return (
                <button type="button" className="square o isDetermined" onClick={onClick}>
                    {value}
                </button>
            );
        }
        if (value === 'O' && isDetermined === false && isChoose === false) {
            return (
                <button type="button" className="square o" onClick={onClick}>
                    {value}
                </button>
            );
        }
        if (value === 'O' && isDetermined === false && isChoose === true) {
            return (
                <button type="button" className="square o isChoose" onClick={onClick}>
                    {value}
                </button>
            );
        }
        return (
            <button type="button" className="square" onClick={onClick}>
                {value}
            </button>
        );
    }
}

export default Square;
