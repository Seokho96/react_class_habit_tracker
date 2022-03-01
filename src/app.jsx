import { Component, Fragment } from "react";
import "./app.css";
import Habits from "./components/habits";
import Navbar from "./components/navbar";

class App extends Component {
  state = {
    habits: [],
    totalCount: 0,
  };

  componentDidMount = () => {
    const sessionHabits = sessionStorage.getItem("habits"); //this.state.habits;

    if (sessionHabits) {
      const habits = JSON.parse(sessionHabits);
      let totalCount = 0;
      habits.forEach((habit) => {
        totalCount += habit.count;
      });

      this.setState({ habits, totalCount });
    }
  };

  handelIncrement = (habit) => {
    if (habit.count === 100) return;

    const totalCount = this.state.totalCount + 1;

    const habits = this.state.habits.map((item) => {
      if (item.id === habit.id) return { ...item, count: item.count + 1 };
      return item;
    });

    this.setState({ ...this.state, habits, totalCount });
  };

  handelDecrement = (habit) => {
    if (habit.count === 0) return;

    const totalCount = this.state.totalCount - 1;

    const habits = this.state.habits.map((item) => {
      if (item.id === habit.id) return { ...item, count: item.count - 1 };
      return item;
    });

    this.setState({ ...this.state, habits, totalCount });
  };

  handleDelete = (habit) => {
    const totalCount = this.state.totalCount - habit.count;
    const habits = this.state.habits.filter((item) => item.id !== habit.id);
    this.setState({ ...this.state, habits, totalCount });
  };

  handleHabitNameInput = (event) => {
    const value = event.target.value.trim();

    this.setState({ ...this.state, habitNameInput: value });
  };

  handleAdd = (name) => {
    const habits = [
      ...this.state.habits,
      { id: Date.now(), name: name, count: 0 },
    ];

    this.setState({
      ...this.state,
      habits,
    });
  };

  handleReset = () => {
    const habits = this.state.habits.map((habit) => {
      habit.count = 0;
      return habit;
    });

    this.setState({ habits, totalCount: 0 });
    //this.setState({ ...this.state, habits: [], totalCount: 0 });
  };

  handleSave = () => {
    const habits = this.state.habits;

    if (habits.length === 0) sessionStorage.removeItem("habits");
    const sessionHabits = JSON.stringify(habits);

    sessionStorage.setItem("habits", sessionHabits);
  };

  render() {
    return (
      <Fragment>
        <Navbar totalCount={this.state.totalCount} />
        <Habits
          habits={this.state.habits}
          onIncrement={this.handelIncrement}
          onDecrement={this.handelDecrement}
          onAdd={this.handleAdd}
          onDelete={this.handleDelete}
          onReset={this.handleReset}
          onSave={this.handleSave}
        />
      </Fragment>
    );
  }
}

export default App;
