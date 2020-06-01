import React from 'react';
import ReactDOM from 'react-dom';
import './morpion.css';
import { queryAllByAttribute } from '@testing-library/react';


class Square extends React.Component {
	// step 4
	constructor(props) {
		super(props);
		this.state = {
			value: null,
		};
	}
	render() {
		return (
			/* // step 1
			<button className="square">
					{
						this.props.value 

					}
			</button>
			*/
      /* // step 2
			<button className="square" onClick={function() { alert('clic'); }}>
				{this.props.value}
			</button>
			*/
			/* // step 3 use arrow syntax instead old one, it's more simple and understandable
			<button className="square" onClick={() => alert('clic clac cloc')}>
				{this.props.value}
			</button>
			*/
			/*// step 4
			< button 
				className = "square" 
				onClick = {() => this.setState({value: 'X'})} 
			> 
				{ this.state.value } 
				</button>
			*/
			// step 5 
			< button
				className="square"
				onClick = {() => this.props.onClick()}
			>
			 {this.props.value}
			 </button>
		);
	}
}

class Board extends React.Component {
	// step 5 > pass all info by the board, not by the square
	constructor(props) {
		super(props);
		this.state = {
			list_square: Array(9).fill(null),
		};
	}

	// step 5
	handle_click(i) {
		const temp_list = this.state.list_square.slice();
		temp_list[i] = 'X';
		this.setState({
			list_square: temp_list
		});
	}


  renderSquare(i) {
		// step 0 //  return <Square />;
		/* // step 1
		return <Square value = {i}/>;  
		*/
		// step 5 > pass all info by the board, not by the square
		return (
			<Square 
				value={this.state.list_square[i]}
				onClick={() => this.handle_click(i)}
			/>
		);
		
  }

	render() {
		const status = 'Next player: X';

		return (
			<div>
				<div className="status">{status}</div>
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
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);