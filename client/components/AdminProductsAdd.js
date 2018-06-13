import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class AdminsProductsAdd extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      price: 0,
      imageUrl:
        'https://pre00.deviantart.net/8859/th/pre/f/2010/279/d/5/generic_space_wallpaper_1_by_zoken-d3087rr.png',
      class: 'Space Station',
      firepower: 0,
      crew: 0,
      topSpeed: 0,
      acceleration: 0,
      weight: 0,
      length: 0,
      width: 0,
      depth: 0,
      diameter: 0,
      description: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectClass = this.selectClass.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      await axios.post('/api/products/', this.state);
      this.props.history.push('/success');
    } catch (err) {
      console.log(err);
    }
  }

  selectClass(event) {
    this.setState({ class: event.target.value });
  }

  render() {
    return (
      <div id="formcontainer">
        <h3 id="formlabel">Add a New Starship</h3>
        <h5>Omit any fields that do not apply</h5>
        <form id="submissionform" onSubmit={this.handleSubmit}>
          <p>
            Name: <br />
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </p>
          <p>
            Price: <br />
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Image URL -Use valid img url<br />(Or leave default for now):<br />
            <input
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            />
          </p>
          <p>
            {' '}
            Choose Class:
            <select onChange={this.selectClass}>
              <option name="class" value="Space Station">
                Space Station
              </option>
              <option name="class" value="Starship">
                Starship
              </option>
              <option name="class" value="Freighter">
                Freighter
              </option>
              <option name="class" value="Fighter">
                Fighter
              </option>
            </select>
          </p>
          <p>
            Firepower: <br />
            <input
              type="text"
              name="firepower"
              value={this.state.firepower}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Crew: <br />
            <input
              type="text"
              name="crew"
              value={this.state.crew}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Top Speed: <br />
            <input
              type="text"
              name="topSpeed"
              value={this.state.topSpeed}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Acceleration: <br />
            <input
              type="text"
              name="acceleration"
              value={this.state.acceleration}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Weight: <br />
            <input
              type="text"
              name="weight"
              value={this.state.weight}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Length: <br />
            <input
              type="text"
              name="length"
              value={this.state.length}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Width: <br />
            <input
              type="text"
              name="width"
              value={this.state.width}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Height: <br />
            <input
              type="text"
              name="depth"
              value={this.state.depth}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Diameter: <br />
            <input
              type="text"
              name="diameter"
              value={this.state.diameter}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Description: <br />
            <textarea
              type="text"
              name="description"
              form="form"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Click to Submit:<br />
            <button id="submitform" type="submit">
              Submit
            </button>
          </p>
        </form>
      </div>
    );
  }
}
