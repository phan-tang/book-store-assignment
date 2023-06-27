export default interface IBook {
    name: string;
    manufacturer_name: string;
    category_name: string;
    summary: string;
    price: number;
    final_price?: number;
    image: string;
    quantity: number;
}