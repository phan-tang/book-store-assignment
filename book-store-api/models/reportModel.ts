import { sequelize } from "../config/reportDatabase";
import Sequelize from "sequelize";

const Report = sequelize.define('report', {
    report_time: {
        type: Sequelize.DATE,
        primaryKey: true
    },
    books: {
        type: Sequelize.INTEGER
    },
    authors: {
        type: Sequelize.INTEGER
    },
    categories: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.DOUBLE
    },
    average_price: {
        type: Sequelize.DOUBLE
    },
    final_price: {
        type: Sequelize.DOUBLE
    },
    average_final_price: {
        type: Sequelize.DOUBLE
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    cheapest: {
        type: Sequelize.DOUBLE
    },
    most_expensive: {
        type: Sequelize.DOUBLE
    },
});

export const BookReport = sequelize.define('book_report', {
    report_time: {
        type: Sequelize.DATE
    },
    book_id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    author: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE
    },
    final_price: {
        type: Sequelize.DOUBLE
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    created_at: {
        type: Sequelize.DATE
    },
    updated_at: {
        type: Sequelize.DATE
    },
    deleted_at: {
        type: Sequelize.DATE
    },
});

export const AuthorReport = sequelize.define('author_report', {
    report_time: {
        type: Sequelize.DATE,
        primaryKey: true
    },
    author: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    category: {
        type: Sequelize.STRING
    },
    books: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.DOUBLE
    },
    average_price: {
        type: Sequelize.DOUBLE
    },
    final_price: {
        type: Sequelize.DOUBLE
    },
    average_final_price: {
        type: Sequelize.DOUBLE
    },
    quantity: {
        type: Sequelize.INTEGER
    }
});

export const CategoryReport = sequelize.define('category_report', {
    report_time: {
        type: Sequelize.DATE,
        primaryKey: true
    },
    category: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    authors: {
        type: Sequelize.INTEGER
    },
    books: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.DOUBLE
    },
    average_price: {
        type: Sequelize.DOUBLE
    },
    final_price: {
        type: Sequelize.DOUBLE
    },
    average_final_price: {
        type: Sequelize.DOUBLE
    },
    quantity: {
        type: Sequelize.INTEGER
    }
});

export default Report;