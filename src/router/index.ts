import {
    createRouter as _createRouter,
    createWebHistory,
    createMemoryHistory
} from 'vue-router';
import routes from './router';

export function createRouter(isSSR: boolean) {
    return _createRouter({
        history: isSSR
            ? createMemoryHistory(process.env.BASE_URL)
            : createWebHistory(process.env.BASE_URL),
        routes
    });
}
