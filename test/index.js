const verdaccioGiteaAuth = require("../src/index.js");

describe("verdaccio-gitea-auth", function() {
  it("initializes", function() {
    verdaccioGiteaAuth.should.be.a.Function();
    should.throws(() => verdaccioGiteaAuth());
    verdaccioGiteaAuth({
      url: "url-to-gitea"
    }).authenticate.should.be.a.Function();
  });
});
