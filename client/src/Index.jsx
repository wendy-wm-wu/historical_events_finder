/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search.jsx';
import ReactPaginate from 'react-paginate';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      term: '',
      pageCount: 0,
    }
    this.search = this.search.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.search(this.state.term);
  }

  // eslint-disable-next-line class-methods-use-this
  search(term) {
    axios.get('/events', {
      params: {
        _limit: 10,
        q: term,
      }
    })
      .then((response) => {
        this.setState({
          data: response.data,
          term: term,
          pageCount: response.headers['x-total-count'],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePageClick(event){
    let selected = event.selected;
    console.log(selected); 
    axios.get('/events', {
      params: {
        _limit: 10,
        _page: selected,
      }
    })
    .then((response) => {
      console.log(response);
      this.setState({
        data: response.data,
        page: selected,
        pageCount: response.headers['x-total-count'],
      })
    })
    .catch((error) => {
      console.log(error);
    })
  };

  render() {
    console.log(this.state.term);
    let eventNodes = this.state.data.map(function(event, index) {
          return <div key={index}>{event.date}{event.description}{event.lang}{event.category1}{event.category2}{event.granularity}</div>;
    });
    return (
      <div>
        <Search onSearch={this.search.bind(this)}/>
        <ul>{eventNodes}</ul>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

ReactDOM.render(<App perPage={10} />, document.getElementById('app'));
