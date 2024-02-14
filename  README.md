# API Task

## Initializing the project

```bash
npm install 
```

## Running

To quickly update on modified source files, [Nodemon](https://nodemon.io/) and [TSNode](https://typestrong.org/ts-node)
is used to acomplish that.

```bash
npm start 
```

## Testing

`Jest` package is used for testing

```bash
# Run all tests once
npm test 

# Develop tests in watch mode
npm run test:dev
```

## Docker

```bash
#build docker image
docker build -t [account]/[name] .

#run docker image
docker run [account]/[name]
```

## API endpoints

### In-memory stack (LIFO)

#### Add to stack

An endpoint to add an item to the stack

Request:

- method: `POST`
- endpoint: `/api/stack`

Body:

- `item` - the item field is required

Example:

```
curl --location --request POST 'localhost:3000/api/stack' \
--header 'Content-Type: application/json' \
--data-raw '{
    "item": "hello"
}'
```

#### Get from stack

An endpoint to return the top item of the stack.

Request:

- method: `GET`
- endpoint: `/api/stack`

Example:

```
curl --location --request GET 'localhost:3000/api/stack'
```

### In-memory key-value store with TTL

#### Add to key-value store

An endpoint to add a key-value to the store

Request:

- method: `POST`
- endpoint: `/api/store`

Body:

- `key` - the key field is required and have to be string
- `value` - the value field is required
- `ttl` - the ttl field is *optional* should be `integer` and represent  `ms`

Example:

```
curl --location --request POST 'localhost:3000/api/store' \
--header 'Content-Type: application/json' \
--data-raw '{
    "key": "name",
    "value": "John",
    "ttl": 30000
}'
```

#### Get from key-value store

An endpoint to get a value from the store based on key

Request:

- method: `GET`
- endpoint: `/api/store/:key`

Params:

- `key`

Example:

```
curl --location --request GET 'localhost:3000/api/store/name'
```

#### Delete from key-value store

An endpoint to delete a value for a given key

Request:

- method: `DELETE`
- endpoint: `/api/store/:key`

Params:

- `key`

Example:

```
curl --location --request DELETE 'localhost:3000/api/store/name'
```