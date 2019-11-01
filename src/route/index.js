

import Header from '@/views/Header'
import Home from '@/views/Home'
import About from '@/views/About'
import Blog from '@/views/Blog'


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
                path: "/about",
                component: About,
            },
            {
                path: "/blog/:id",
                component: Blog,
            },
        ]
    },

];

export default routes