import { MessagingHelper } from "../helpers/MessagingHelper";
import { PaginatedList } from "../helpers/PaginatedList";
import { BookCreateDTO } from "../models/books/BookCreateDTO";
import { BookDTO } from "../models/books/BookDTO";
import { BookEditDTO } from "../models/books/BookEditDTO";
import { BookListDTO } from "../models/books/BookListDTO";
import { APIService } from "./APIService";

export class BookService {
    async GetAll(
        currentPage: number,
        pageSize: number,
        searching: string,
        sorting: string,
    ): Promise<PaginatedList<BookListDTO>> {
        try {
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Books/getAll`,
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
            return new PaginatedList<BookListDTO>(
                false,
                "Book data not found",
                "",
                [],
                0,
            );
        }
    }

    async Create(task: BookCreateDTO): Promise<MessagingHelper<null>> {
        try {
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Books/create`,
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

    async GetById(id: number): Promise<MessagingHelper<BookDTO | null>> {
        try {
            var response = await APIService.Axios().get(`${APIService.GetURL()}/Books/${id}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            return new MessagingHelper(
                false,
                "Server connection Error. Book data not found!",
                null,
            );
        }
    }

    async Edit(task: BookEditDTO): Promise<MessagingHelper<BookDTO | null>> {
        try {
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Books/update`,
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
            return new MessagingHelper<BookDTO | null>(
                false,
                "Server connection Error. Author:EDIT failed!",
                null,
            );
        }
    }

    async DeleteBook(id: number): Promise<MessagingHelper<null>> {
        try {
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Books/delete`,
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
