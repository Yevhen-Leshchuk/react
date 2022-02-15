import React, { Component } from 'react';
import Controls from './Controls';
import Value from './Value';
import './Counter.css';

class Counter extends Component {
  static defaultProps = {
    initialValue: 0,
  };

  static propTypes = {
    //
  };

  // constructor() {
  //   super();

  //   this.state = {
  //     value: 5,
  //   };
  // }

  // state = {
  //   value: 5,
  //   a: 1,
  //   b: 2,
  // };

  // начальное состояние от props
  state = {
    value: this.props.initialValue,
  };

  // handleIncrement = event => {
  //   console.log('Кликнули в увеличить');
  //   // console.log(this);
  //   console.log(event.target);

  //   const { target } = event;

  //   setTimeout(() => {
  //     console.log(target);
  //   }, 1000);
  // };

  handleIncrement = () => {
    // this.state.value = 6; нельзя обновлять состояние state по ссылке!!!

    // this.setState({
    //   value: 10,
    // });

    // обновление от предыдущего значения
    this.setState(prevState => {
      return {
        value: prevState.value + 1,
      };
    });
  };

  handleDecrement = () => {
    this.setState(prevState => {
      return {
        value: prevState.value - 1,
      };
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="Counter">
        {/* <span className="Counter__value">{this.state.value}</span> */}
        <Value value={value} />

        <Controls
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
        />
        {/* <div className="Counter__controls">
          <button type="button" onClick={this.handleIncrement}>
            Increment by 1
          </button>
          <button type="button" onClick={this.handleDecrement}>
            Decrement by 1
          </button>
        </div> */}
      </div>
    );
  }
}

export default Counter;
