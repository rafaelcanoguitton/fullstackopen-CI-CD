describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users/", {
      username: "Rafael",
      password: "Fullstack",
    });
    cy.visit("http://localhost:3000");
  });

  describe("Login", function () {
    it("Login form is shown", function () {
      cy.contains("username");
      cy.contains("password");
    });
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("Rafael");
      cy.get("input:last").type("Fullstack");
      cy.contains("login").click();
      cy.contains("logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("test");
      cy.get("input:last").type("nouser");
      cy.contains("login").click();
      cy.contains("Wrong username or password");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("input:first").type("Rafael");
      cy.get("input:last").type("Fullstack");
      cy.contains("login").click();
    });

    it("A blog can be created", function () {
      cy.contains("New blog").click();
      cy.get("#Title").type("Somepost");
      cy.get("#Author").type("WithSomeAuthor");
      cy.get("#Url").type("AndSomeUrl");
      cy.contains("create").click();
      cy.contains("Somepost");
    });
    it("A blog can be liked", function () {
      cy.contains("New blog").click();
      cy.get("#Title").type("Somepost");
      cy.get("#Author").type("WithSomeAuthor");
      cy.get("#Url").type("AndSomeUrl");
      cy.contains("create").click();
      cy.contains("view").click();
      cy.contains("0");
      cy.contains("like").click();
      cy.contains("1");
    });
    it("A blog can be deleted", function () {
      cy.contains("New blog").click();
      cy.get("#Title").type("Somepost");
      cy.get("#Author").type("WithSomeAuthor");
      cy.get("#Url").type("AndSomeUrl");
      cy.contains("create").click();
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("Somepost").should("not.exist");
    });
    it("Blogs are listed according to likes", function () {
        //likes a post twice and then another once and checks order
        cy.contains("New blog").click();
        cy.get("#Title").type("Somepost");
        cy.get("#Author").type("WithSomeAuthor");
        cy.get("#Url").type("AndSomeUrl");
        cy.contains("create").click();
        cy.get("#Title").type("2ndpost");
        cy.get("#Author").type("WithSomeAuthor");
        cy.get("#Url").type("AndSomeUrl");
        cy.contains("create").click();
        cy.get("#Title").type("3rdpost");
        cy.get("#Author").type("WithSomeAuthor");
        cy.get("#Url").type("AndSomeUrl");
        cy.contains("create").click();
        cy.wait(500)
        cy.get('button').eq(6).click()
        cy.get('button').eq(7).click()
        cy.wait(500)
        cy.get('button').eq(5).click()
        cy.get('button').eq(7).click()
        cy.get('button').eq(8).click()
        cy.get('button').eq(4).click()
        cy.get('button').eq(5).click()
        cy.get('.blog').eq(0).contains("3rdpost")
        cy.get('.blog').eq(1).contains("2ndpost")
      });
  });
});
