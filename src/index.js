
import React from 'react';
import {map, each} from 'lodash';
import PropTypes from 'prop-types';

export default class ToggleSection extends React.Component {
	static propTypes = {
		children: PropTypes.object,
		checkBox: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.state = {
			sections: [],
			showSection: false
		}
	}

	toggleSection = (index) => {
		let sections = this.state.sections;
		each(sections, (section) => {
			section.showSection = false;
		});

		if (sections[index]) {
			sections[index].showSection = !sections[index].showSection ;
		}
		this.setState({
			sections
		})
	}

	componentDidMount() {
		const sections = []
		map(this.props.children, (child) => {
			const [title, section] = child.props.children;
			sections.push({
				sectionTitle: title,
				sectionBody: section,
				showSection: false,
			})
		})
		// open first section by default
		sections[0].showSection = true;
		this.setState({
			sections
		})
	}

	handleChange() {
	}

	render() {
		return (
			<div>
				{
					map(this.state.sections, (child, index) => {
						return <div key={index}>
							<div
								onClick={() => {
									this.toggleSection(index)
								}}
							>
								{
									this.props.checkBox &&
										<input
											type='radio'
											name='method'
											checked={child.showSection}
											onChange={this.handleChange}
										/>
								}
								{child.sectionTitle}
							</div>
							{child.showSection &&
								<div>{child.sectionBody}</div>
							}
						</div>
					})
				}
			</div>
		);
	}
}
