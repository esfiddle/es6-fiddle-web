import * as React from 'react';
import * as CodeMirror from 'react-codemirror';

// Styles
import 'node_modules/codemirror/lib/codemirror.css';

export default class Editor extends React.Component<{}, IEditorState> {
	public constructor(props = {}) {
		super(props);
		this.state = {
			code: '',
		};
	}

	public render() {
		const { code } = this.state;
		const options = {
			lineNumbers: true,
		};

		console.log(this.state); // tslint:disable-line

		return (
			<CodeMirror value={ code } onChange={ this.updateCode } options={ options } />
		);
	}

	public updateCode = (code: string) => {
		this.setState({
			code
		});
	};
}

interface IEditorState {
	code: string
}
