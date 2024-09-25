const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient();

async function main() {
    try {
        await database.subCategory.createMany({
            data:[
                { name: "Fruits",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Vegetables",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Dairy Products",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Meat and Poultry",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Fish",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Sea Food",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Grains & Bread",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Canned and Jarred Goods",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Frozen Foods",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Condiments and spices",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Snacks and sweets",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Beverages",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Baking Ingreadints",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Personel Care Products",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Household and Cleaning Supplies",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
                { name: "Pet Care Products",categoryId:"a7bb1b00-d6bb-4fd9-b23c-2e8283189e95"},                
            ]
        })
        console.log("Successfully data generated")

    } catch (error) {
        console.log("Error druing seed data generated",error)
    }finally{
        await database.$disconnect();
    }
}

main()