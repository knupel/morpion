import React from 'react';
import ReactDOM from 'react-dom';
import './morpion.css';
import { queryAllByAttribute } from '@testing-library/react';

// step 6 > have changed class square to function Square
// by this way wen can remove this at front of props, plus we simplify the code writing
function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
		);
}

class Board extends React.Component {	
  renderSquare(i) {
		// step 0 //  return <Square />;
		/* // step 1
		return <Square value = {i}/>;  
		*/
		// step 5 > pass all info by the board, not by the square
		return (
			// <Square
			// 	value={this.state.list_square[i]}
			// 	onClick={() => this.handle_click(i)}
			// />
			// step 8
			<Square
				value={this.props.list_square[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
		
  }

	render() {
		// step 6 > change the status to know who play
		// const status = 'Next player: ' + (this.state.which_one ?  'X' : 'O') ;
		// step 7
		// const winner = calculate_winner(this.state.list_square);
		// let status;
		// if(winner) {
		// 	status = winner + ' a gagné';
		// } else {
		// 	status = 'prochain joueur : ' + (this.state.which_one ? 'X' : 'O');
		// }


		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	// step 8
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				list_square: Array(9).fill(null),
			}],
			which_one: true,
		};
	}

		// step 9
	handle_click(i) {
		const history = this.state.history;
		const current = history[history.length - 1];
		const temp_list = current.list_square.slice();
		// step 7 > ignore the clic if there is winner or if the cell is full
		if (calculate_winner(temp_list) || temp_list[i]) {
			return;
		}
		temp_list[i] = this.state.which_one ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				list_square: temp_list,
			}]),
			which_one: !this.state.which_one,
		});
	}

	render() {
		// step 9
		const history = this.state.history;
		const current = history[history.length -1];
		const winner = calculate_winner(current.list_square);

		let status;
		if(winner) {
			status = winner + ' a gagné';
		} else {
			status = 'prochain joueur : ' + (this.state.which_one ? 'X' : 'O');
		}


		return (
			<div className="game">
				<div className="game-board">
					<Board 
						list_squares={current.list_square}
						onClick = {(i) => this.handle_click(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}



// step 7
function calculate_winner(list_square) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (list_square[a] && list_square[a] === list_square[b] && list_square[a] === list_square[c]) {
			return list_square[a];
		}
	}
	return null;
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);