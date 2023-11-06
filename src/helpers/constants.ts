import { check, home, todo, list } from './icons'

const navlinks = [
  {
    id: 1,
    title: 'All Tasks',
    icon: home,
    link: '/',
  },
  {
    id: 2,
    title: 'Important',
    icon: list,
    link: '/important',
  },
  {
    id: 3,
    title: 'Completed',
    icon: check,
    link: '/completed',
  },
  {
    id: 4,
    title: 'Do It Now',
    icon: todo,
    link: '/incompleted',
  },
]

export { navlinks }
