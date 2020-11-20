import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Yuta',
      surName: 'Mori',
      windowWidth: window.innerWidth,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
  }
  handleNameChange(e) {
    const v = e.target.value;
    const n = e.target.name;
    this.setState({ [n]: v });
  }
  handleWidthChange() {
    this.setState({ windowWidth: window.innerWidth });
  }
  componentDidMount() {
    document.title = `${this.state.name} ${this.state.surName}`;
    window.addEventListener('resize', this.handleWidthChange);
  }
  componentDidUpdate() {
    document.title = `${this.state.name} ${this.state.surName}`;
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWidthChange);
  }
  render() {
    const { name, surName, windowWidth } = this.state;
    return (
      <>
        <p>Window Width is: {windowWidth}</p>
        <p>name: {name}</p>
        <p>surname: {surName}</p>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />{' '}
        <input
          type="text"
          name="surName"
          value={this.state.surName}
          onChange={this.handleNameChange}
        />{' '}
      </>
    );
  }
}

export default Profile;
