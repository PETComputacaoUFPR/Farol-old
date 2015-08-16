farol.factory('Arquivo', function($resource, API, TokenHandler) {
    var resource = $resource(API.URL + '/v1/arquivos/:id/:status',
        {id: '@_id', status: '@_status'}, {
        update: {
            method: 'PUT'
        },
        status: {
            method: 'GET',
            params: {
                id: 'status'
            }
        },
        changeStatus: {
            method: 'PUT',
            params: {
                status: 'status'
            }
        }
    });

    resource = TokenHandler.wrapActions(resource, ['query', 'update', 'save', 'delete', 'status', 'changeStatus']);
    return resource;
})
