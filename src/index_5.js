import React from 'react';
import ReactDOM from 'react-dom';
import './morpion.css';
import { queryAllByAttribute } from '@testing-library/react';

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {	
  renderSquare(i) {
		return (
			<Square 
				value={this.props.list_square[i]} 
				onClick={() => this.props.onClick(i)} 
			/>
		);
  }

	render() {
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
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				list_square: Array(9).fill(null),
			}],
			step_num: 0,
			which_one: true,
		};
	}

	handle_click(i) {
		const history = this.state.history.slice(0, this.state.step_num + 1);
		const current = history[history.length - 1];
		const list_square = current.list_square.slice();
		if (calculate_winner(list_square) || list_square[i]) {
			return;
		}
		list_square[i] = this.state.which_one ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				list_square: list_square,
			}]),
			step_num: history.length,
			which_one: !this.state.which_one,
		});
	}

	jump_to(step) {
		this.setState({
			step_num: step,
			which_one: (step%2) === 0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.step_num];
		const winner = calculate_winner(current.list_square);

		const list_move = history.map((step,move) => {
			const desc = move ?
				'Revenir au tour n°' + move :
				'Revenir en début de partie';
			return (
				<li key={move}>
					<button onClick={() => this.jump_to(move)}>
						{desc}
					</button>
				</li>
			);
		});

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
					<div>{ status }</div>
					<ol> {list_move} </ol>
				</div>
			</div>
		);
	}
}

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