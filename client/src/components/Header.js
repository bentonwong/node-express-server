import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <li><a href="/auth/google">Login With Google</a></li>
            <li> | </li>
            <li><a href="/auth/facebook">Login With Facebook</a></li>
          </div>
        )
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="3" style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render() {
    return(
      <nav>
        <div className="nav-wrapper red" style={{ padding: '0 10px'}}>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo">
            SurveyPal
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
