

import Header from '@/views/Header'
import Home from '@/views/Home'
import About from '@/views/About'
import Blog from '@/views/Blog'
import Tags from '@/views/Tags'
import Admin from '@/views/Admin'
import Blogmanage from '@/views/Admin/Blogmanage'
import BlogWrite from '@/views/Admin/BlogWrite'
// import BlogDraft from '@/views/Admin/BlogDraft'

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
            }
        ]
    },

];

export default routes