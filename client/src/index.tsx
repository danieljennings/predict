import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const rootElement = document.getElementById('root');

render(
    <AppContainer>
        <App/>
    </AppContainer>,
    rootElement
);

declare let module: { hot: any };
if ( module.hot ) {
    module.hot.accept( './components/App', () => {
        const NewApp = require( './components/App' ).default;
        render(
            <AppContainer>
                <NewApp/>
            </AppContainer>,
            rootElement
        );
    } );
}
