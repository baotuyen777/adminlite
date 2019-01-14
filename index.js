import { render } from 'react-dom';
import Layout from './core/Layout';
import auth from './modules/auth';
import product from './modules/product';
import order from './modules/order';
import user from './modules/user';
//import Youtube from './components/Youtube'
// import Examples from './modules/Examples'
import store from './redux/store/config'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)
render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */}
    <Router history={history}>

      <Route path="/" component={Layout}>
        <IndexRoute component={order.List} />
        <Route >
          <Route path="product">
            <IndexRoute component={product.List} />
            <Route path="page/:page" component={product.List}></Route>
            <Route path="sku/:sku" component={product.Add}></Route>
            <Route path="list" component={product.List}></Route>
            <Route path="add" component={product.Add}></Route>
          </Route>
          <Route path="user">
            <IndexRoute component={user.List} />
            <Route path="list" component={user.List}></Route>
            <Route path="add" component={user.Add}></Route>
          </Route>
        </Route>

        <Route path="order" >
          <IndexRoute component={order.List} />
          <Route path="list" component={order.List}></Route>
          <Route path="page/:page" component={order.List}></Route>
          <Route path="add" component={order.Add}></Route>
        </Route>
      </Route>
      <Route path="/" >
        <Route path="login" component={auth.Login} />
        <Route path="logout" component={auth.Logout} />
        <Route path="auth">
          <IndexRoute component={auth.Login} />
          <Route path="login" component={auth.Login} />
          <Route path="register" component={auth.Register}></Route>
          <Route path="reset-password-step1" component={auth.ResetPass1}></Route>
          <Route path="reset-password-step2/:email/:key" component={auth.ResetPass2}></Route>
        </Route>
      </Route>

    </Router>
  </Provider>,
  document.getElementById('root')
)