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
				value = {this.props.list_square[i]}
				onClick = {() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		return ( 
			<div >
				<div className = "board-row" > 
					{this.renderSquare(0)}
					{this.renderSquare(1)} 
					{this.renderSquare(2)} 
				</div> 
				<div className = "board-row" > 
					{this.renderSquare(3)} 
					{this.renderSquare(4)} 
					{this.renderSquare(5)} 
				</div> 
				<div className = "board-row" > 
					{this.renderSquare(6)} 
					{this.renderSquare(7)} 
					{this.renderSquare(8)} 
				</div> 
			</div>
		);
	}
}




// GAME
class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				list_square: Array(9).fill(null),
			}],
			step_num: 0,
			which_one: true,
		}
	}

	handle_click(i) {
		const history = this.state.history.slice(0, this.state.step_num + 1);
		const current = history[history.length - 1];
		const temp_list = current.list_square.slice();
		if (winner_is(temp_list) || temp_list[i]) {
			return;
		}
		temp_list[i] = this.state.which_one ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				list_square: temp_list,
			}]),
			step_num: history.length,
			which_one: !this.state.which_one,
		});
	}

	jump_to(step) {
		this.setState({
			step_num: step,
			which_one: (step % 2) === 0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.step_num];
		const winner = winner_is(current.list_square);

		const list_move = history.map((step, move) => {
			const desc = move ?
				'Revenir au tour ' + move :
				'Nouvelle partie';
			return ( <li key = {move} >
				<button onClick = {() => this.jump_to(move)} > 
				{desc} 
				</button> 
				</li>
			);
		});

		let status;
		if (winner) {
			status = winner + ' a gagné';
		} else {
			status = 'Prochain joueur : ' + (this.state.which_one ? 'X' : 'O');
		}
		return ( 
			<div className = "game" >
				<div className = "game-board" >
					<Board 
						list_square = {current.list_square} 
						onClick = {(i) => this.handle_click(i)}
					/> 
				</div> 
				<div className = "game-info" >
					<div> {status} </div> 
					<ol > {list_move} </ol> 
				</div> 
			</div>
		);
	}
}

function winner_is(squares) {
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
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

// ========================================

ReactDOM.render( <
	Game / > ,
	document.getElementById('root')
);