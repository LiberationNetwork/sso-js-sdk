const axios = require('axios')

exports.LiberalizeSSO = class {
    constructor(clientId, environment="prod") {
        switch (environment) {
            case "prod":
                this.ssoURI = "https://sso.liberalize.io/"
                break;
            case "staging":
                this.ssoURI = "https://sso.staging.liberalize.io/"
                break;
            case "dev":
                this.ssoURI = "https://sso.dev.liberalize.io/"
                break;
            case "local":
                this.ssoURI = "http://localhost:3000"
            default:
                break;
        }
        this.clientId = clientId
        var tempArr = window.location.href.split("?")
        if (tempArr[1]) {
            tempArr = tempArr[1].split("&")
            tempArr = tempArr.map(async (query) => {
                var queryArr = query.split("=")
                if (queryArr[0] === "code") {
                    try {
                        var tokenRes = await axios.get(
                            `${this.ssoURI}/token?code=${queryArr[1]}&clientId=${clientId}&grantType=authorization_code`
                        )
                        window.localStorage.setItem('libJwt', tokenRes.data.idToken)
                        window.localStorage.setItem('libJwtExp', tokenRes.data.expiresAt)
                        window.localStorage.setItem('libJwtAccess', tokenRes.data.accessToken)
                    } catch (err) {
                        console.info(err)
                    }
                }
            })
        }
    }

    async getUser() {
        var liberalizeJWT = window.localStorage.getItem('libJwt');
        try {
            var authRes = await axios.post(
                `${this.ssoURI}/authenticate`,
                {
                    "clientId": this.clientId
                },
                {
                    headers: { "Authorization": `Bearer ${liberalizeJWT}`}
                }
            )
            return authRes.data
        } catch (err) {
            return err
        }
    }

    signIn(redirectURL="") {
        var redirectTo = redirectURL || window.location.href
        if (this.clientId) return new Error("No ClientId Found")
        window.location.href = this.ssoURI + "?redirect=" + redirectTo + "&clientId=" + this.clientId

    }
}