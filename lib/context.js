'use strict';

const Hoek = require('hoek');

exports.plugin = {
    register: (plugin, options) => {
        console.log('in context lib - options',options);
        plugin.ext('onPreResponse', (request, h) => {
            try {
                var internals = {
                    devEnv: (process.env.NODE_ENV === 'development'),
                    meta: options.meta,
                    credentials: request.auth.isAuthenticated ? request.auth.credentials : null
                };

                var response = request.response;
                if (response.variety && response.variety === 'view') {
                    response.source.context = Hoek.merge(internals, request.response.source.context);
                }
                //console.log('in context lib - h',response);
                return h.continue;
            } catch (error) {
                throw error;
            }
        });
    },
    pkg: require('../package.json'),
    name: 'context'
};