import * as Redis from 'redis';
import { promisify } from 'util';

interface IAsyncRedisClient extends Redis.RedisClient
{
    async_get: ( key: string ) => Promise<string>;
    async_set: ( key: string, value: string ) => Promise<'OK'>;
}

export class CDBAccess
{
    private m_Client: IAsyncRedisClient;
    
    public async BInit(): Promise<boolean>
    {
        const client = Redis.createClient( {} ) as IAsyncRedisClient;
        this.m_Client = client;

        // Convert the callback methods we need into native promises
        client.async_get = promisify( client.get );
        client.async_set = promisify( client.set );
        
        return true;
    }

    // Returns false if error, null if not found, object if found
    public async BGet<T>( key: string ): Promise<T | false>
    {
        try {
            const strValue = await this.m_Client.async_get( key );
            const typedValue = JSON.parse( strValue ) as T;
            return typedValue;
        }
        catch ( err )
        {
            console.warn( 'CDBAccess.BGet', err );
            return false;
        }
    }

    // Returns true on success, false on failure
    public async BSet<T>( key: string, value: T ): Promise<boolean>
    {
        try {
            const strValue = JSON.stringify( value );
            await this.m_Client.async_set( key, strValue );
            return true;
        }
        catch ( err )
        {
            console.warn( 'CDBAccess.BSet', err );
            return false;
        }
    }
}
