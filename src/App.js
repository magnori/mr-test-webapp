import React from 'react';
import logo from './logo.svg';
//import './App.css';
import {
	Grid,
	GridColumn,
	GridToolbar,
	GridColumnMenuSort,
	GridColumnMenuFilter,
	GridHeaderCell
} from '@progress/kendo-react-grid';
import { filterBy, orderBy, process } from '@progress/kendo-data-query';

class App extends React.Component {
	// When grid loads, the "desc" column fills width as expected
	// If you click the button to turn off the "desc" column, and turn it back on, it does not show up
	// Also, other strange things happen when you turn other columns on/off when you have one column with no width attribute

	// This behavior doesn't hapen if you give the "desc" column a width, but then you lose the ability for it to fill the remaining space

	constructor(props) {
		super(props);

		this.gridProps = {
			reorderable: false,
			sortable: false,
			resizable: false,
			groupable: false,
			pageable: false,
			filterable: false
		};

		this.data = [
			{
				id: 1,
				name: 'Name1',
				desc: 'Name1 Desc'
			},
			{
				id: 2,
				name: 'Name2',
				desc: 'Name2 Desc'
			}
		];

		this.columnProps = [
			{
				field: 'id',
				width: 100
			},
			{
				field: 'name',
				width: 100
			},
			{
				field: 'desc'
			}
		];

		// Visibility by index in the columnProps array
		this.state = {
			columnVisibility: {
				0: true,
				1: true,
				2: true
			}
		};
	}

	render() {
		return (
			<div>
				<div>
					{this.columnProps.map((columnProps, i) => {
						// Generate buttons to toggle column visibility
						return (
							<button
								onClick={() => {
									let newColumnVisibility = { ...this.state.columnVisibility };
									newColumnVisibility[i] = !newColumnVisibility[i];
									this.setState({
										columnVisibility: newColumnVisibility
									});
								}}
							>
								Column "{columnProps.field}"{' '}
								{this.state.columnVisibility[i] ? 'On' : 'Off'}
							</button>
						);
					})}
				</div>

				<Grid {...this.gridProps} data={this.data}>
					{this.columnProps
						.filter((columnProps, i) => {
							// Filter so that only columns with visibility "true" are in the grid
							return this.state.columnVisibility[i];
						})
						.map(columnProps => {
							return <GridColumn {...columnProps} key={columnProps.field} />;
						})}
				</Grid>
			</div>
		);
	}
}

App.defaultProps = {};

export default App;
