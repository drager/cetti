import * as React from 'react';

export class Hello extends React.Component<{}, {}> {
  private message:string;

  constructor() {
    super();
    this.message = 'Hello World!';
  }

  render() {
    return (
      <h1>{this.message}</h1>
    );
  }
}
