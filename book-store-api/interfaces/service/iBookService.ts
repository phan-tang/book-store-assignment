import { IBook, IBookResource } from "../model";

interface IBookService {
    list(query: Object): Promise<IBookResource>;
    find(id: string | number): Promise<IBookResource>;
    create(data: IBook): Promise<IBookResource>;
    update(id: string | number, data: Partial<IBook>): Promise<IBookResource>;
    delete(id: string | number): Promise<IBookResource>;
}

export default IBookService;