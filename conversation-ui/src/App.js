import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Category from './Category';
import Question from './Question';
import Topic from './Topic';
class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <h2>Admin Panel</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link">Category</Link></li>
            <li><Link to={'/topics'} className="nav-link">Topics</Link></li>
            <li><Link to={'/questions'} className="nav-link">Questions</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Category} />
              <Route path='/topics' component={Topic} />
              <Route path='/questions' component={Question} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;