import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history';
// import 'normalize.css/normalize.css' // a modern alternative to CSS resets
// import '../public/init.css'
const app = dva({
    history: createHistory()
});


app.model(require('./models/app').default);

app.router(require('./App').default);

app.start('#root');
