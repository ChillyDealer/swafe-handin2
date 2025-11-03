import {ApiBaseUrl} from "@/app/_data/api-base";

const ApiUsersUrl = ApiBaseUrl + "users";

export async function getUsers() {
    const response = await fetch(ApiUsersUrl, {});
}