import React, { Component } from "react";
import Habit from "./habit";
import HabitAddForm from "./habitAddForm";
class Habits extends Component {
  handelIncrement = (habit) => {
    this.props.onIncrement(habit);
  };

  handelDecrement = (habit) => {
    this.props.onDecement(habit);
  };

  handleDelete = (habit) => {
    this.props.onDelete(habit);
  };

  handleHabitNameInput = (event) => {
    const value = event.target.value.trim();

    this.setState({ ...this.state, habitNameInput: value });
  };

  handleAdd = (name) => {
    this.props.onAdd(name);
  };

  handleEnterAdd = (event) => {
    if (event.key === "Enter") this.handleAdd();
  };

  handleSave = () => {
    this.props.onSave();
  };

  handleReset = () => {
    this.props.onReset();
  };

  render() {
    return (
      <>
        <HabitAddForm onAdd={this.handleAdd} />
        <ul>
          {this.props?.habits &&
            this.props.habits.length > 0 &&
            this.props.habits.map((habit) => (
              <Habit
                key={habit.id}
                habit={habit}
                onIncrement={this.handelIncrement}
                onDecrement={this.handelDecrement}
                onDelete={this.handleDelete}
              />
            ))}
          <button className="habits-save" onClick={this.handleSave}>
            save
          </button>
          &nbsp;
          {this.props.habits && this.props.habits.length > 0 && (
            <button className="habits-reset" onClick={this.handleReset}>
              reset
            </button>
          )}
        </ul>
      </>
    );
  }
}

export default Habits;
