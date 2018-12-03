/*
 * Represents the User ID for a specific user, including short-hand for the
 * local user. Compatible with wire-protocol.
 */
export type UserID_t = number;
export type ClientUserID_t = UserID_t | 'local';

export interface User_t
{
    id: UserID_t;
    name: string;
}

