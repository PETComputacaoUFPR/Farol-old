farol.factory('Usuario', function($resource, API, TokenHandler) {
    var resource = $resource(API.URL + '/v1/u/:id/:action',
        {id: '@_id', action: '@_action'}, {
        update: {
            method: 'PUT'
        },
        editMe: {
            method: 'PUT',
            params: {
                id: 'me',
                action: 'edit'
            }
        },
        block: {
            method: 'POST',
            params: {
                action: 'block'
            }
        }
    });

    resource = TokenHandler.wrapActions(resource, ['query', 'update', 'delete', 'editMe', 'block']);
    return resource;
})
