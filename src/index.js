const assert = require("assert");
const urlJoin = require("url-join");
const superagent = require("superagent");
const isNil = require("lodash/isNil");
const isString = require("lodash/isString");

const authConfigHelper = `
# in your verdaccio config file YAML

auth:
  gitea-auth:
    url: https://url-to-your-gitea-server
`;

/**
 * Verdaccio Gitea Auth plugin
 *
 * Authenticate using your personal Gitea server. The configuration comes
 * from your usual verdaccio config YAML.
 * @param {object} config
 * @param {object} options
 * @returns {object}
 */
function verdaccioGiteaAuth(authConfig /*, appConfig */) {
  // without an org login doesn't really work
  const defaultOrg = authConfig || "gitea";

  // required gitea url
  assert.equal(isString(authConfig.url), true, authConfigHelper);

  /**
   * Get the organizations that the user is assigned
   * @param {string} username
   * @param {string} password
   * @param {function} done
   */
  function getUserOrgs({ username, password }, done) {
    superagent
      .get(urlJoin(authConfig.url, `/api/v1/user/orgs`))
      .accept("json")
      .auth(username, password)
      .end(function(err, res) {
        if (isNil(err) === false) {
          const { message, stack, status } = err;
          console.log("error getting user teams", message, stack, status);
          return done(err);
        }
        const op = res.body.map(item => item.username);
        if (op.length === 0) {
          op.push(defaultOrg);
        }
        return done(null, op);
      });
  }

  /**
   * Authenticate over with Gitea detecting http or https
   * @param {string} username
   * @param {string} password
   * @param {function} done
   */
  function authenticate(username, password, done) {
    getUserOrgs({ username, password }, function(err, orgs) {
      if (isNil(err) === false) {
        const msg = "error authenticating";
        const { message, stack, status } = err;
        console.log(msg, message, stack, status);
        return done(new Error(msg));
      }
      done(null, orgs);
    });
  }

  return { authenticate };
}

module.exports = verdaccioGiteaAuth;
