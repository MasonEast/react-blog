

import Header from '@/views/Header'
import Home from '@/views/Home'
import About from '@/views/About'
import Blog from '@/views/Blog'
import Tags from '@/views/Tags'
import Admin from '@/views/Admin'
import Blogmanage from '@/views/Admin/Blogmanage'
import BlogWrite from '@/views/Admin/BlogWrite'
import MailBox from '@/views/Admin/MailBox'
import TodoList from '@/views/Admin/TodoList'

const routes = [
    {
        path: "/",
        component: Header,
        routes: [
            {
                path: "/home",
                component: Home,
            },
            {
                path: "/admin",
                component: Admin,
                routes: [
                    {
                        path: "/admin/blogmanage",
                        component: Blogmanage
                    },
                    {
                        path: "/admin/blogwrite",
                        component: BlogWrite
                    },
                    {
                        path: "/admin/mailbox",
                        component: MailBox
                    },
                    {
                        path: "/admin/todolist",
                        component: TodoList
                    },
                ]
            },
            {
                path: "/about",
                component: About,
            },
            {
                path: "/blog/:id",
                component: Blog,
            },
            {
                path: "/tags/:id",
                component: Tags
            }
        ]
    },

];

export default routes