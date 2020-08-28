// Special thanks to https://medium.com/@jdeflaux/graphql-integration-tests-with-apollo-server-testing-jest-mongodb-and-nock-af5a82e95954 for inspiration
import { apolloServer } from "../../pages/api/graphql"
import { createTestClient } from "apollo-server-testing"

// Types
import { HelloQuery, HelloResponse } from "../../apollo/queries/hello"

describe("Our Apollo Server", () => {
  it("should be defined", () => {
    expect(apolloServer).toBeDefined()
  })
  describe("Query", () => {
    describe("Hello", () => {
      it("should return an expected greeting", async () => {
        // Setup a test client against our Apollo Server
        // @ts-ignore
        const { query } = createTestClient(apolloServer)

        // Execute our query
        const { data } = await query({
          query: HelloQuery,
        })
        const { hello } = <HelloResponse>data
        const expectedGreeting = "Hello. The current timestamp is"

        // Validate
        expect(hello).toContain(expectedGreeting)
      })
    })
  })
})
