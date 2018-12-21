import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { User_t } from 'shared/types/user';
import { CDBAccess } from './dbaccess';

const app = express();
const port = process.env.PORT || 3000;

// TODO: Figure out login stuff.
const k_nLocalUserID = 1;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.get( '/api/user/:id', ( req, res ) => {
    const strID: string = req.param( 'id', null );
    const unID = ( strID === 'local' ) ? k_nLocalUserID : parseInt( strID );
    
    let user: User_t = {
        id: unID,
        name: 'Bob Ross',
    };
    res.send( user );
} );

if ( process.env.NODE_ENV === 'production' )
{
    app.use( express.static( path.join( __dirname, '..', '..', 'client', 'dist' ) ) );

    app.get( '*', ( req, res ) => {
        res.sendFile( path.join( __dirname, '..', '..', 'client', 'dist', 'index.html' ) );
    } );
}

app.listen( port, () => console.log( `Listening on port ${port}` ) );