import { User } from "../../../src/models";

describe("test", () => {
    it("test one", () => {
        cy.task("db:seed");

        // cy.database("filter", "users").then((users: User[]) => {
        //     ctx.allUsers = users;
        //     ctx.user = users[0];
        //     ctx.contact = users[1];
      
        //     return cy.loginByXstate(ctx.user.username);
        //   });
        cy.visit(`http://localhost:3000/`, {failOnStatusCode: false});  
        cy.get("input[name=username]").eq(0).first().clear().type("Heath93", {log: false});
        cy.get("input[name=password]").eq(0).first().clear().type("s3cret", {log: false});
        cy.get('[data-test="signin-submit"]').click()
        //cy.getBySelLike("new-transaction").click();
    })
})