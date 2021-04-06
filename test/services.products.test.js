const assert = require('assert');
const proxyquire = require('proxyquire')

const {
    MongoLibMock,
    getAllStub,
    createStub
} =  require("../utils/mocks/mongoLib")


const {
    productsMock,
    filteredProductsMock,
    ProductsServiceMock
} =  require("../utils/mocks/products")

describe("Services - products", function () {
    const ProductsService = proxyquire("../services/products", { 
        "../lib/mongo": MongoLibMock
    })
    const productsService = new ProductsService();
    describe("when getProducts method is called", async function () {
        it(" Should call the getAlll MongoLib method", async function () {
            await productsService.getProducts({});
            assert.strictEqual(getAllStub.called, true);
        });

        it("should return an array of products", async function () {
            const result = await productsService.getProducts({});
            const expected = productsMock;
            assert.deepStrictEqual(result, expected);
        });
    });

    describe("when getProducts method is called with tags", async function () {
        it("should all the getAll MongoLib method with tags args", async function () {
            await productsService.getProducts({ tags: ["caro"]});
            const tagQuery = { tags: { $in: ["caro"]}};
            assert.strictEqual(getAllStub.calledWith("products", tagQuery), true);
        });

        it("should return an array of products filtered by the tag", async function () {
            const result = await productsService.getProducts({tags: ["caro"]});
            const expected = filteredProductsMock("caro")
            assert.deepStrictEqual(result, expected);
        })
    })
});

