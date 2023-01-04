const breedControllers = require("../breedControllers")
// @ponicode
describe("breedControllers.getBreeds", () => {
    test("0", async () => {
        await breedControllers.getBreeds()
    })
})

// @ponicode
describe("breedControllers.createDog", () => {
    test("0", async () => {
        expect.assertions(1)
        try {
            await breedControllers.createDog({ 'name': "lslakd", 'temperament': ['Aloof'], 'weight': '23-30', 'height': '15-22', 'life_span': '12-14' })
        } catch (e) {
            expect(e.message).toBe("Cannot read properties of undefined (reading '0')")
        }
    })

    test("1", async () => {
        let result = await breedControllers.createDog({ 'temperament': 'Aloof', 'weight': '23-30', 'height': '15-22', 'life_span': '12-14' })
        expect(result).toMatchObject({ message: "raza.name cannot be null", type: "notNull Violation", path: "name", value: null, origin: "CORE", instance: { dataValues: { id: "16feb99f-5322-4ebc-8149-4ec65b5956c7", name: undefined, height: "15-22", weight: "23-30", life_span: "12-14" }, _previousDataValues: { height: undefined, weight: undefined, life_span: undefined }, uniqno: 1, _changed: {}, _options: { isNewRecord: true, _schema: null, _schemaDelimiter: "", attributes: undefined, include: undefined, raw: undefined, silent: undefined }, isNewRecord: true }, validatorKey: "is_null", validatorName: null, validatorArgs: [] })
    })

    test("2", async () => {
        expect.assertions(1)
        try {
            await breedControllers.createDog(undefined)
        } catch (e) {
            expect(e.message).toBe("Cannot read properties of undefined (reading '0')")
        }
    })
})
