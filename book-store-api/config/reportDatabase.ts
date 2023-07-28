import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
//     define: {
//         timestamps: false,
//         underscored: true
//     }
// })

const sequelize = new Sequelize(`postgres://admin:admin@localhost:5432/postgres`, {
    define: {
        timestamps: false,
        underscored: true
    }
})

export { sequelize };