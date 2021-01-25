import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect: { path: '/readme' },
    component: () => import('../views/index.vue'),
    children: [
      {
        path: 'readme/:key?',
        name: 'readme',
        component: () => import('../views/Readme.vue'),
      },
      {
        path: 'module',
        name: 'module',
        component: () => import('../views/module.vue'),
      },
      {
        path: 'database',
        name: 'database',
        component: () => import('../views/database.vue'),
      },
      {
        path: 'php',
        name: 'php',
        component: () => import('../views/php.vue'),
      },
      {
        path: 'js',
        name: 'js',
        component: () => import('../views/js.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
