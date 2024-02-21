import {download, get} from "@app/utils/network";

export const UPLOAD_URL: string = `${process.env.REACT_APP_WEB_URL}/user/import`;

export interface GroupUser {
    id: number;
    title: string;
}

export interface UserDto {
    id: number;
    groupUser: GroupUser;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}

export const getUser = async (): Promise<UserDto[]> => {
    return await get<UserDto, UserDto[]>("/user/3", undefined);
}

export const exportUser = async (): Promise<void> => {
    return await download("/user/3/export");
}
