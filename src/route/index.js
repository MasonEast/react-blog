

import Header from '@/views/Header'
import Home from '@/views/Home'
import About from '@/views/About'
import Blog from '@/views/Blog'
import Tags from '@/views/Tags'
import Admin from '@/views/Admin'
import Blogmanage from '@/views/Admin/Blogmanage'
import BlogWrite from '@/views/Admin/BlogWrite'
import Library from '@/views/Library'
import Canvas from '@/views/Library/Canvas'
import Paint from '@/views/Library/Paint'
import Charts from '@/views/Library/Charts'
import TypeWriting from '@/views/Library/TypeWriting'
import Desktop from '@/views/Library/Desktop'
import CustomLayout from '@/views/Library/SelfDefineLayout'

import NotFOUND from '@/views/404'

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
                        path: "/library/paint",
                        component: Paint
                    },
                    {
                        path: "/library/charts",
                        component: Charts
                    },
                    {
                        path: "/library/typewriting",
                        component: TypeWriting
                    },
                    {
                        path: "/library/customLayout",
                        component: CustomLayout
                    },
                    {
                        path: "/library/desktop",
                        component: Desktop
                    },

                ]
            },
            {
                path: "*",
                component: NotFOUND
            },
        ]
    },

];

export default routes