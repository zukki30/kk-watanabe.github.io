import User from './components/user/User'
import UserStart from './components/user/UserStart'
import UserDetail from './components/user/UserDetail'
import UserEdit from './components/user/UserEdit'
import Home from './components/Home'
import Header from './components/Header'

export const routes = [
  {
    path: '',
    name: 'home',
    components: {
      default: Home,
      'header-top': Header
    }
  },
  {
    path: '/user',
    components: {
      default: User,
      'header-bottom': Header
    },
    children: [
      { path: '', component: UserStart },
      { path: ':id', component: UserDetail, beforeEneter: (to, form, next) => {
        console.log('inside rute setup')
        next()
      } },
      { path: ':id/edit', component: UserEdit, name: 'userEdit' }
    ]
  },
  { path: '/redirect-me', redirect: { name: 'home' } },
  { path: '*', redirect: '/' }
]