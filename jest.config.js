/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
    preset: 'ts-jest',
    testEnvironment: "node",
    coveragePathIgnorePatterns: ["/node_modules/"],
    testMatch: ["**/**/*.test.ts"],
    verbose: true,
    forceExit: true,
    clearMocks: true
}