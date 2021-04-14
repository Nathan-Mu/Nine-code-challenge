# Nine-code-challenge

This is a solution to Nine's code challenge

## Solution Url

```
POST https://solution-nine-cc.herokuapp.com/api/filter
```

- Only accept valid json objects

## Technologies / Libraries

| Name      | Description                                                                    | Website/Repo                             |
| --------- | ------------------------------------------------------------------------------ | ---------------------------------------- |
| Express   | Fast, unopinionated, minimalist web framework for node.                        | https://github.com/expressjs/express     |
| Jest      | Delightful JavaScript testing library                                          | https://github.com/facebook/jest         |
| Supertest | Super-agent driven library for testing node.js HTTP servers using a fluent API | https://github.com/visionmedia/supertest |

## File Structure

```
├── config
    └── app.js
├── routes
	├── filter.js
	└── index.js
├── test
    ├── routes
    └── filter.test.js
        ├── testSampleData
            └── routes
                └── filter.sample.js
└── index.js
```

## Testing Cases

This solution has been tested into 6 cases

When request is invalid, it should send bad request `code: 400, body: {error}`

1. if parsing json object failed
2. if there's no payload attribute
3. if payload is not an array

When request is valid, it should send good request `code: 200, body: {response}`

4. if payload is an empty array (with an empty array is response)
5. if none of items fulfill the criterion
6. if res.image attribute is missing (use `undefine` to fill the value)
7. if none of the above case happens

## Running on Your Local Machine

Please install the dependencies first

```
$ npm install
```

Then, to run the project, use the command

```
$ npm start
```

To test the project, use the command

```
$ npm test
```
