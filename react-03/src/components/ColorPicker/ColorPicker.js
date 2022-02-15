import React, { Component } from 'react';
import './ColorPicker.css';

class ColorPicker extends Component {
  state = {
    activeOptionIdx: 0,
  };

  setActiveIdx(index) {
    this.setState({
      activeOptionIdx: index,
    });
  }

  makeOptionClassName = index => {
    const optionClasses = ['option'];

    if (index === this.state.activeOptionIdx) {
      optionClasses.push('option--active');
    }

    return optionClasses.join(' ');
  };

  render() {
    const { activeOptionIdx } = this.state;
    const { options } = this.props;
    const { label } = options[activeOptionIdx];

    return (
      <div className="container">
        <h2 className="title">Color Picker</h2>
        <p>Selected color: {label}</p>
        <div className="box">
          {options.map(({ label, color }, index) => (
            <button
              key={label}
              className={this.makeOptionClassName(index)}
              // Пример инлайн стилей, используеться для динамической вставки стилей.
              style={{ background: color }}
              onClick={() => this.setActiveIdx(index)}
            ></button>
          ))}
        </div>
      </div>
    );
  }
}

export default ColorPicker;
