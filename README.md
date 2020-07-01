# LiberationNetwork/liberalize-sso-js-sdk
This is the clientside SDK to implement Single Sign On with Liberalize

The `liberalize-sso-js-sdk` package contains only the functionality necessary to signin via liberalize. It is typically used to easily implement login components with liberalize and are heavily used in liberalize services as well as open source projects.

**Note:** By default, LiberalizeSSO will be in production mode. The staging version are for you to integrate with other staging environments of Liberalize services. Don't forget to build the correct environment when deploying your applications.

## Installation
    npm install liberalize-sso-js-sdk 
or
    
    yarn add liberalize-sso-js-sdk

## Import

    import { LiberalizeSSO } from 'liberalize-sso-js-sdk'
or

    var LiberalizeSSO = require('liberalize-sso-js-sdk')

## Initializing LiberalizeSSO
You will have to initialize LiberalizeSSO by providing the sample code below at the very beginning of your app. Both the environment and clientId are string values. the result return will be the user profile that comes from an authenticated user.

    const libsso = new LiberalizeSSO(<your-client-id>, <environment>)

    libsso.getUser().then((result)=> {
        console.log("result => ", result);
    })

## Redirect to LiberalizeSSO for Sign In
The redirected url is a string value and it has to be the application where sso is initialized. The url has to be a https scheme.

    libsso.signIn(<your-redirected-url>)

#### Example Usage
    const handleClick = () => {
        try {
            libsso.signIn("https://google.com")
        } catch (err) {
            console.log("Error: ", err);
        }
    }

## Get User via LiberalizeSSO
Once successfully authenticated and redirected back to the application. The user profile can be retrieved by calling get user.
***Note:*** The access to the user profile is only limited to 24hrs upon authenticating the user. After which the user has to resign in.

    libsso.getUser().then((result)=> {
        console.log("result => ", result);
    })

## Log Off via LiberalizeSSO
When a user logs off the account, it is advised to run the following code in order to achieve higher user experience.

    libsso.signOut()

#### Example Usage
    const handleClick = () => {
        libsso.signOut()
    }