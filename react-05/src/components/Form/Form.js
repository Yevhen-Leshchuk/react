import React, { Component } from 'react';
import shortid from 'shortid';

class Form extends Component {
  state = {
    name: '',
    tag: '',
    experience: 'junior',
    license: false,
  };

  nameInputId = shortid.generate();
  tagInputId = shortid.generate();

  handleChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  handleLicenseChange = event => {
    console.log(event.currentTarget.checked);

    this.setState({ license: event.currentTarget.checked });
  };

  reset = () => {
    this.setState({ name: '', tag: '' });
  };

  render() {
    const { name, tag, experience, license } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameInputId}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            id={this.nameInputId}
          />
        </label>
        <label htmlFor={this.tagInputId}>
          Second Name
          <input
            type="text"
            name="tag"
            value={tag}
            onChange={this.handleChange}
            id={this.tagInputId}
          />
        </label>

        <p>What is your level:</p>
        <label>
          Junior
          <input
            type="radio"
            name="experience"
            value="junior"
            onChange={this.handleChange}
            checked={experience === 'junior'}
          />
        </label>
        <label>
          Middle
          <input
            type="radio"
            name="experience"
            value="middle"
            onChange={this.handleChange}
            checked={experience === 'middle'}
          />
        </label>
        <label>
          Senior
          <input
            type="radio"
            name="experience"
            value="senior"
            onChange={this.handleChange}
            checked={experience === 'senior'}
          />
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="license"
            checked={license}
            onChange={this.handleLicenseChange}
          />
          Agree with condition
        </label>

        <br />

        <button type="submit" disabled={!license}>
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
