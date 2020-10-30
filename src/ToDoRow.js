import React, {Component} from 'react';

export class ToDoRow extends Component {
    //  Features 3 & 4 (also Feature 5 & 6)
    render = () =>
        <tr>
            <td>
                {this.props.myTodoItem.action}
            </td>
            <td>
                <input type="checkbox" 
                    checked={this.props.myTodoItem.done} 
                    onChange={() => this.props.callback(this.props.myTodoItem)}
                />
            </td>
        </tr>
};