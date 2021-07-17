// 导入Vue框架
import Vue from 'vue'
// 导入router组件
import VueRouter from 'vue-router'

// 将组件进行懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
// 安装插件
Vue.use(VueRouter)

const routes = [
  {
    //进行重定向页面
    path: '',
    redirect: '/home',
  },
  // 设置首页路由
  {
    path: '/home',
    component: Home,
  },
  // 设置分类路由
  {
    path: '/category',
    component: Category,
  },
  // 设置购物车路由
  {
    path: '/cart',
    component: Cart,
  },
  // 设置我的路由
  {
    path: '/profile',
    component: Profile,
  },
]
// 创建router实例
const router = new VueRouter({
  // 配置routes映射关系
  routes,
  // 改变模式
  mode: 'history',
})

// 导出router
export default router
