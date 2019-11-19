

import Header from '@/views/Header'
import Home from '@/views/Home'
import About from '@/views/About'
import Blog from '@/views/Blog'
import Tags from '@/views/Tags'
import Admin from '@/views/Admin'
import Blogmanage from '@/views/Admin/Blogmanage'
import BlogWrite from '@/views/Admin/BlogWrite'
import Library from '@/views/Library'
import Canvas from '@/views/Library/canvas'


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
                path: "/tags",
                component: Tags,
            },
            {
                path: "/admin",
                component: Admin,
                redirect: "/admin/blogmanage",
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
                        path: "/admin/blogdraft",
                        component: Blogmanage
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
            },
            {
                path: "/library",
                component: Library,
                routes: [
                    {
                        path: "/library/canvas",
                        component: Canvas
                    },
                    {
                        path: "/library/blogwrite",
                        component: BlogWrite
                    },
                    {
                        path: "/library/blogdraft",
                        component: Blogmanage
                    },

                ]
            }
        ]
    },

];

export default routes