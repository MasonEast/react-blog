

import Header from '@/views/Header'
import Home from '@/views/Home'
import About from '@/views/About'
import Aritcle from '@/views/Article'


const routes = [
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/",
        component: Header,
        routes: [
            {
                path: "/home",
                component: Home,
                routes: [
                    {
                        path: "/article",
                        component: Aritcle,
                    },
                ]
            },
            {
                path: "/about",
                component: About,
            }
        ]
    },

];

export default routes