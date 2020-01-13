import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history';
const app = dva({
    history: createHistory()
});


app.model(require('./models/app').default);

app.router(require('./App').default);

app.start('#root');
