import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
const user = JSON.parse(localStorage.getItem("authZ")) || null;

export default class Layout extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("authZ")) || null;
    if (user == null) {
      this.state = { name: '' }
      setTimeout(() => {
        browserHistory.push('/login')
      }, 100)
    } else {
      this.state = { name: user.name || '' }
    }
  }
  renderHiddenModule() {
    if (user.role == 2) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className=""><Link to="/user">User</Link></li>
          <li className=""><Link to="/product">Product</Link></li>
        </ul>

      );
    }
  }
  render() {
    if (user === null) {
      return (<div></div>);
    }

    return (
      <div>
        <header>
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
                  aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Zaiko</a>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li className="active"><Link to="/">Home</Link></li>
                  <li className=""><Link to="/order">Order</Link></li>
                  <li className=""><Link to="/user">User</Link></li>
                  <li className=""><Link to="/product">Product</Link></li>
                  
                </ul>
                <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                      Xin chào: {this.state.name} <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                      <li><a href="/logout">Logout</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <hr />
        <main>
          <div className="container">
            <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
          </div>
        </main>
        <footer className="footer">
          <div className="container">
            <p className="text-muted">@copy right david.</p>
          </div>
        </footer>
      </div>
    )
  }

}