const expect = require("chai").expect,
  Users = require("../server/db/users");

describe("Users model", () => {
  const user = new Users({
    githubId: 3333333,
    login: "octocat",
    name: "monalisa octocat",
    email: "octocat@github.com",
    avatar_url: "https://github.com/images/error/octocat_happy.gif",
    url: "https://api.github.com/users/octocat",
    html_url: "https://github.com/octocat",
    location: "San Francisco",
    public_repos: 2,
    public_gists: 4,
    accessToken: "randomAccessToken",
    totalFiddles: 2
  });

  it("saves appropriate fields", done => {
    user
      .save()
      .then(savedUser => {
        expect(savedUser.githubId).to.equal(3333333);
        expect(savedUser.login).to.equal("octocat");
        expect(savedUser.name).to.equal("monalisa octocat");
        expect(savedUser.email).to.equal("octocat@github.com");
        expect(savedUser.avatar_url).to.equal(
          "https://github.com/images/error/octocat_happy.gif"
        );
        expect(savedUser.url).to.equal("https://api.github.com/users/octocat");
        expect(savedUser.html_url).to.equal("https://github.com/octocat");
        expect(savedUser.location).to.equal("San Francisco");
        expect(savedUser.public_repos).to.equal(2);
        expect(savedUser.public_gists).to.equal(4);
        expect(savedUser.accessToken).to.equal("randomAccessToken");
        expect(savedUser.totalFiddles).to.equal(2);
        done();
      })
      .then(null, done);
  });

  it("findOrCreate updates accessTokens", done => {
    const profile = { id: user.githubId };
    Users.findOrCreate(profile, "newToken")
      .then(savedUser => {
        expect(savedUser.login).to.equal("octocat");
        expect(savedUser.accessToken).to.equal("newToken");
        done();
      })
      .then(null, done);
  });
});
