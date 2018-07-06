import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routerOptions = [
  { path: '/',
    component: 'Landing',
    meta: {
      title: 'Landing - Dungeon Tracker',
      metaTags: [
        {
          name: 'description',
          content: 'A companion app for Dungeons & Dragons'
        },
      ]
    },
  },
  { path: '/login',
    component: 'Login',
    meta: {
      title: 'Login - Dungeon Tracker',
    },
  },
  { path: '/profile', component: 'Home', meta: { requiresAuth: true, title: 'Profile - Dungeon Tracker' } },
  { path: '/stories', component: 'Stories', meta: { requiresAuth: true, title: 'Stories - Dungeon Tracker' } },
  { path: '/quests', component: 'Quests', meta: { requiresAuth: true, title: 'Quests - Dungeon Tracker' } },
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

// TODO: Change this out with vue-meta?
// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag))

  next()
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (isAuthenticated && to.path === '/login') {
    next('/profile')
  } else {
    next()
  }
})

export default router
