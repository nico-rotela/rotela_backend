import {faker} from '@faker-js/faker'

export const genrateProducts = () => {
    return{
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.random.numeric(1),
        id: faker.database.mongodbObjectId()
    }
}