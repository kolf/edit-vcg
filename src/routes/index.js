const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'topics' */ './topics'),
    },
    {
      path: '/topics',
      load: () => import(/* webpackChunkName: 'topics' */ './topics'),
    },
    {
      path: '/auto-groups',
      load: () => import(/* webpackChunkName: 'auto-groups' */ './auto-groups'),
    },
    {
      path: '/topic/update/:id',
      load: () =>
        import(/* webpackChunkName: 'topic-update' */ './topic-update'),
    },
    {
      path: '/topic/:id',
      load: () => import(/* webpackChunkName: 'topic' */ './topic'),
    },
    {
      path: '/search-group',
      load: () =>
        import(/* webpackChunkName: 'search-group' */ './search-group'),
    },
    {
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || ''} - 视觉中国`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
