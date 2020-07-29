import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import Layout from 'layouts'

const routes = [
  // Dashboards
  {
    path: '/users',
    Component: lazy(() => import('pages/users')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/auth/404')),
    exact: true,
  },
 
];

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Route
          render={state => {
            const { location } = state
            return (
            
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Redirect to="/users" />} />
                    {routes.map(({ path, Component, exact }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                              <Suspense fallback={null}>
                                <Component />
                              </Suspense>
                          )
                        }}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
            )
          }}
        />
      </Layout>
    </BrowserRouter>
  )
}

export default Router
