'use strict';

exports.plugin = {  
    pkg: require('../../../../package.json'),
    name : 'jwtauth_routes_v1',
    register: async (server, options) => {
        const Controllers = {
            auth: {
                login: require('app/controllers/mobile/jwtlogin')
            }
        };
        const basePath = '/api/v1/';
        server.route([
            {
                method: 'POST',
                path: basePath + 'login',
                config: Controllers.auth.login.postCredentials
            }
        ]);
    }
};
