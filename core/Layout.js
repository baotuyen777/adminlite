import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router';
const user = JSON.parse(localStorage.getItem("authZ")) || null;

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }
  renderContent() {
    const user = JSON.parse(localStorage.getItem("authZ")) || null;
    if (user === null) {
      return (<div style={{ marginTop: '1.5em' }}>This function required <Link to='/login'>login</Link></div>);
    } else {
      return (
        <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
      );
    }
  }
  renderMenu() {


  }
  render() {
    let items = [
      { k: 'order', v: 'Order' },
      { k: 'user', v: 'User' },
      { k: 'product', v: 'Product' },
    ]
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
                  <li><Link to="/">Home</Link></li>
                  {
                    items.map((item, index) =>
                      <li key={index} className={"/" + item.k == this.props.location.pathname ? 'active' : ''}><Link to={"/" + item.k}>{item.v}</Link></li>
                    )
                  }
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                      Xin chào: Admin <span className="caret"></span>
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
            {this.renderContent()}
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