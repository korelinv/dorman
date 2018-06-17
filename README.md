# example


    set up
    ```javascript
        
        const apiMock = require('./index.js');

        const mock = new apiMock();

        mock.define({
            url: '/api/example',
            params: {
                page: 1
            },
            response: {
                statusCode: 200,
                data: {
                    items: [1, 2, 3, 4, 5] 
                } 
            }
        });

    ```

    usage
    ```javascript
    
        const response = await mock.post('/api/example', {page: 1});

    ```

# todo
    * configurable resolve timing
    * configurable default reject objects
