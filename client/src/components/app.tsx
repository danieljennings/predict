import * as React from 'react';
import { unstable_createResource } from 'react-cache';
import axios from 'axios';
import { ClientUserID_t, User_t } from 'shared/types/user'

//import "./../assets/scss/App.scss";

const sleep = ms => new Promise( r => setTimeout( () => r(), ms ) );

const UsersResource = unstable_createResource( async ( id: ClientUserID_t ) => {
    const result = await axios.get<User_t>( `/api/user/${id}` );
    return result.data;
} );

interface UserProps
{
    id: ClientUserID_t;
}

const User: React.FunctionComponent<UserProps> = ( props ) => {
    const user = UsersResource.read( props.id );
    console.log( user );
    return <p>{ user.name }</p>;
};

export default class App extends React.Component<{}, {}>
{
    render() {
        return (
            <div>
                <h1>Hello World!</h1>
                <p>Foo to the barz</p>                
                <React.Suspense /* maxDuration={ 1000 } */ fallback={<div>RIP</div>}>
                    <User id={ 0 } />
                </React.Suspense>
                <React.Suspense /* maxDuration={ 1000 } */ fallback={<div>RIP2</div>}>
                    <User id={ 'local' } />
                </React.Suspense>
            </div>
        );
    }
}
