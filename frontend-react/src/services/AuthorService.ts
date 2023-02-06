import { MessagingHelper } from "../helpers/MessagingHelper";
import { PaginatedList } from "../helpers/PaginatedList";
import { AuthorListDTO } from "../models/authors/AuthorListDTO";
import { APIService } from "./APIService";
import { AuthorCreateDTO } from "../models/authors/AuthorCreateDTO";
import { AuthorDTO } from "../models/authors/AuthorDTO";
import { AuthorEditDTO } from "../models/authors/AuthorEditDTO";

export class AuthorService {
    async GetAll(
        currentPage: number,
        pageSize: number,
        searching: string,
        sorting: string,
    ): Promise<PaginatedList<AuthorListDTO>> {
        try {
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Authors/getAuthors`,
                {
                    currentPage,
                    pageSize,
                    searching,
                    sorting,

                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                },
            );
            return response.data;
        } catch (error) {
            return new PaginatedList<AuthorListDTO>(
                false,
                "Server connection Error. Author data not found!",
                "",
                [],
                0,
            );
        }
    }

    async Create(task: AuthorCreateDTO): Promise<MessagingHelper<null>> {
        try {
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Authors/create`,
                { ...task },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                },
            );
            return response.data;
        } catch (error) {
            return new MessagingHelper(
                false,
                "Server connection Error. Author:CREATION failed!",
                null,
            );
        }
    }

    async GetById(id: number): Promise<MessagingHelper<AuthorDTO | null>> {
        try {
            var response = await APIService.Axios().get(`${APIService.GetURL()}/Authors/${id}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            return new MessagingHelper(
                false,
                "Server connection Error. Author data not found!",
                null,
            );
        }
    }

    async Edit(task: AuthorEditDTO): Promise<MessagingHelper<AuthorDTO | null>> {
        try {
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Authors/update`,
                { ...task },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                },
            );
            return response.data;
        } catch (error) {
            return new MessagingHelper<AuthorDTO | null>(
                false,
                "Server connection Error. Author:EDIT failed!",
                null,
            );
        }
    }

    async DeleteAuthor(id: number): Promise<MessagingHelper<null>> {
        try {
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Authors/delete`,
                {
                    id: id
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                },
            );
            return response.data;
        } catch (error) {
            return new MessagingHelper(
                false,
                "Server connection Error. Author:DELETE failed!",
                null,
            );
        }
    }

}