import React from 'react'; 

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    return (
      <div className="search">
        <label>
        Search Historical Events:
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button onClick={()=> this.props.onSearch(this.state.value)} >Submit</button>
      </div>
    );
  }
}

export default Search;
