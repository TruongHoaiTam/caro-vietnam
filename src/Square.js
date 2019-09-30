import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Square extends React.Component {
    render() {
        const { isDetermined, isChoose, onClick, value } = this.props
        if (isDetermined === false) {
            if (isChoose) {
                return (
                    <button type="button" className="square choose" onClick={onClick}>
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
        return (
            <button type="button" className="determinedSquare" onClick={onClick}>
                {value}
            </button>
        );
    }
}

export default Square;
