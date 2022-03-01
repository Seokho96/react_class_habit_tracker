import React, { Component } from "react";

class HabitAddForm extends Component {
  formRef = React.createRef();
  inputRef = React.createRef();

  onSubmit = (event) => {
    event.preventDefault();
    const name = this.inputRef.current.value;
    name && this.props.onAdd(name);
    //this.inputRef.current.value = "";
    this.formRef.current.reset();
  };

  handleEnterAdd = (event) => {
    event.key === "Enter" && this.onSubmit(event);
  };

  render() {
    return (
      <form ref={this.formRef} className="add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="add-input"
          ref={this.inputRef}
          placeholder="Habit"
          onKeyPress={this.handleEnterAdd}
        />
        <button className="add-button">ADD</button>
      </form>
    );
  }
}

export default HabitAddForm;
