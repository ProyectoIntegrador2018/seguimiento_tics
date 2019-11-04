import React from "react";
import { Form, Button } from "react-bootstrap";

class QuestionItem extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeQuestionTxt = this.onChangeQuestionTxt.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this);
    }

    render() {
        return(
            <div>
                <Form.Control   type="text"
                                onChange={this.onChangeQuestionTxt}/>
                <Button onClick={this.onClickRemove}>-</Button>
            </div>
        );
    }

    onChangeQuestionTxt(event) {
        this.props.questionChange(event.target.value, this.props.idx);
    }

    onClickRemove() {
        this.props.removeItem(this.props.idx);
    }
}
export default QuestionItem;