export interface ICheckUserAuthResult {
    status: string,
    data: {
        userId: number,
        fullname: string,
        address?: string,
        email?: string,
        phone?: string,
        IsAdmin?: boolean,
    }
}