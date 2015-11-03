import React from 'react';
import { Component } from 'react';

export default class Hello extends Component {
  constructor() {
    super();
    this.message = 'Hello World';
  }

  render() {
    return (
      <h1>{this.message}</h1>
    );
  }
}
