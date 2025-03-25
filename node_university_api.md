# Node Institute of Technology Courses Resourse API

---

This API allows prospective students, who want to join a hypothetical Node Institute of Technology, to browse for courses and get details such as Course Description, Course Duration, Cost Per Credit Hour, Career Path, Admission Term, Admission Requirements, Success Rate etc

The API is available at https://node-university-courses-api-2.onrender.com

# EndPoints

---

## Sign Up New User

**`POST /api/signUp`**

A new user(student), will need to sign up first. Without signing up, a student wont be able to make any API request.

| Name              | Type   | In   | Required | Description                           |
| ----------------- | ------ | ---- | -------- | ------------------------------------- |
| `name`            | string | body | Yes      | Name of the student                   |
| `email`           | string | body | Yes      | A valid email address                 |
| `password`        | string | body | Yes      | A password of min length 8 characters |
| `passwordconfirm` | string | body | Yes      | A password confirmation               |

The signup above will generate a JSON Web Token for the user valid for 1 hour.

Example Response

```
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTMxYmM4MjUzYWM0MDA0NjkzMDVhNyIsImlhdCI6MTc0MjkzNzAzNCwiZXhwIjoxNzUwNzEzMDM0fQ.Yge2gyP_rFRuisSSWWiuJI4_CZ0dA12NSK6cpU1fQGA",
    "data": {
        "user": {
            "role": "student",
            "_id": "67e31bc8253ac400469305a7",
            "name": "Tom Harry",
            "email": "tm@example.com",
            "password": "$2b$12$xxL37JRX9vBsFAcRjOlvXO6s7kJ1sFTmFGXKxwW3JvAf0h2sVP1jq",
            "__v": 0
        }
    }
}
```

**Status codes**

| Status code  | Description                                                                     |
| ------------ | ------------------------------------------------------------------------------- |
| 201 OK       | Indicates "Created"                                                             |
| 500 Internal | If you try to create a duplicate signup or miss any required values in the body |

## Login User

**`POST /api/login`**

After 1 hour, the token will expire. User will need to login again using his/her email and password

| Name       | Type   | In   | Required | Description              |
| ---------- | ------ | ---- | -------- | ------------------------ |
| `email`    | string | body | Yes      | A valid email address    |
| `password` | string | body | Yes      | Password used for signup |

NB: The 'Forgot Password" functionality has not been implemented. A user needs to remember their credentials for now

| Status code      | Description                              |
| ---------------- | ---------------------------------------- |
| 200 OK           | Indicates Successiful login              |
| 401 Unauthorized | If you provide invalid login credentials |

Example Response

```
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTJiNzczYzE4ZGEwMzkzYzVjYmE5YyIsImlhdCI6MTc0MjkzODgzNiwiZXhwIjoxNzUwNzE0ODM2fQ.Szba6yaDJ5vncqmubw86DpbKuQgftwc3j6DrGIqZw_c"
}
```

## Get All Courses

**`GET /api/courses`**

Retrieves a list of all available courses currently offered at Node Institute of Technology, for currently logged in users

**Parameters**

The following optional parameters can be added to the URL to achieve desired filtering

| Name                       | Type    | In    | Required | Description                                                                                                                                                                                                                           |
| -------------------------- | ------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `duration`                 | string  | query | No       | Specifies the duration of the course. Typical values will be like "3 years", "4 years" etc                                                                                                                                            |
| `fields`                   | string  | query | No       | Specifies which field(s) of the query you want returned. eg name, duration, fees_per_credit_hour                                                                                                                                      |
| `success_rate`             | integer | query | No       | Specifies the observed success rate for each course as a percentage                                                                                                                                                                   |
| `career_path`              | string  | query | No       | A student can query for a course depending on their career choice. eg Data Engineer                                                                                                                                                   |
| `fees_per_credit_hour[lt]` | integer | query | No       | [lt](which means less than),can be replaced with [lte]-less than or equal to, [gt] -greater than, [gte]-greater than or equal to. Any integer value passed will filter courses having cost per credit hour as per operator specified. |

**Status codes**

| Status code     | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| 200 OK          | Indicates a successful response.                                 |
| 400 Bad Request | Indicates that the parameters provided are invalid or undefined. |

Example response:

For a career_path of "Data Scientist" & a success_rate of [gte] 70%

```
{
    "career_path": [
        "Software Engineer",
        "Data Scientist",
        "AI Specialist"
                ],
    "_id": "67bc8af043f3be3d6488aca2",
    "courseID": "C041",
    "name": "Software Engineering",
    "description": "Study of algorithms, data structures, AI, and software development.",
    "duration": "10 years",
    "fees_per_credit_hour": 1100,
    "department": "Engineering",
    "success_rate": 71
},
{
    "career_path": [
        "Data Scientist",
        "Data Analyst",
        "Machine Learning Engineer"
                ],
    "_id": "67bc8af043f3be3d6488aca8",
    "courseID": "C047",
    "name": "Data Science",
    "description": "Study of data analysis, machine learning, and statistical modeling.",
    "duration": "3 years",
    "fees_per_credit_hour": 1300,
    "department": "Computing",
    "success_rate": 73
}

```

### Get A Course

**`GET /api/courses/:course_name`**

Returns a single course from the courses database collection.

**Parameters**
| Name | Type | In | Required | Description |
| --------------| ------- | ----- | -------- | ------------------------------------------------ |
| `course_name` | string | path | Yes | Returns the details of a course you have searched for. Eg Software Engineering |

**Status codes**

| Status code   | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| 200 OK        | Indicates a successful response.                             |
| 404 Not found | Indicates that there is no course with specified course name |

## Create a Course

**`POST /api/courses`**
The request body must be in JSON format. This route is currently only available to an admin(myself). All other logged in users wont be able to create a course

**Parameters**
| Name | Type | In | Required | Description |
| --------------- | ------- | ----- | -------- | ------------------------------------------------ |
| `course_name` | string | body | Yes | Name of the course |
| `courseID` | string | body | Yes | Unique ID for the course |
| `career_path` |[string] | body | Yes | A string array of possible career paths in that course |
| `description` | string | body | Yes | A brief description about the course (not more than 150 characters) |
| `duration` | string | body | Yes | Duration of course eg "4 years" |
| `department` | string | body | Yes | School departmenty in which the course belongs |
| `success_rate` | integer | body | Yes | A figure representing the observed average student success rate in that course|

**Status Codes**
| Status code | Description |
| ------------- | --------------------------------------------------------- |
| 201 OK | Indicates a course has been successifully created |
| 400 Bad Request | Indicates body parameters are invalid/incomplete |

## Update a Course

**`PATCH /api/:course_name`**

This route is currently only available to an admin(myself). All other logged in users wont be able to update a course

**Parameters**
| Name | Type | In | Required | Description |
| --------------| -------| -----| -------- | ------------------------------------------------ |
| `course_name` | string | path | Yes | The name of course you want to update. Eg Software Engineering |
| `JSON body` | json | body | Yes | In the body specify the parameters (career_path, courseID,name, description,duration, fees_per_credit_hour,department, success_rate) and the corresponding values you want to update|

**Status Codes**
| Status code | Description |
| ------------- | --------------------------------------------------------- |
| 200 OK | Indicates a course has been successifully updated|
| 400 Bad Request | Indicates body parameters are invalid/incomplete |

Example Response

```
{
    "status": "success",
    "data": {
        "course": {
            "career_path": [
                "Software Developer",
                "Systems Analyst",
                "IT Consultant"
            ],
            "_id": "67db672cff6a72520c9af3df",
            "courseID": "C042",
            "name": "Computer Science",
            "description": "Fundamentals of computing, programming, and system design.",
            "duration": "4 years",
            "fees_per_credit_hour": 1350,
            "department": "Computing",
            "success_rate": 68,
            "__v": 0
        }
    }
}
```

## Delete a Course

**`DELETE /api/:course_name`**

This route is currently only available to an admin(myself). All other logged in users wont be able to delete a course

**Parameters**
| Name | Type | In | Required | Description |
| --------------| -------| -----| -------- | ------------------------------------------------ |
| `course_name` | string | path | Yes | The name of course you want to delete. Eg Software Engineering |

**Status Codes**
| Status code | Description |
| ------------- | --------------------------------------------------------- |
| 204 OK | Indicates a course has been successifully deleted|
| 404 Not Found | Indicates the course you want to delete is not available |

Nothing in response body

## Get All Admission Requirements

**`GET /api/admin_requirements`**

Returns all the admission requirements, for all courses offered at Node Institute of Technology

Eample Response

```
{
     "term": [
        "Fall",
        "Spring"
            ],
    "_id": "67bc8c405081546f00db1d7d",
    "name": "Software Engineering",
    "admission_requirements": "High school diploma, Mathematics recommended",
    "__v": 0
},
{
    "term": [
        "Fall"
            ],
    "_id": "67bc8c405081546f00db1d7e",
    "name": "Computer Science",
    "admission_requirements": "High school diploma, Mathematics required",
    "__v": 0
},
```

## Create an Admission Requirement

**`POST /api/admin-requirements`**

This route is currently only available to an admin(myself). All other logged in users wont be able to create an admission requirement.
The request body must be in JSON format.

**Parameters**

| Name                     | Type     | In   | Required | Description                                                        |
| ------------------------ | -------- | ---- | -------- | ------------------------------------------------------------------ |
| `name`                   | string   | body | Yes      | Name of the course                                                 |
| `admission_requirements` | string   | body | Yes      | A brief description of admission requirements (100 characters max) |
| `term`                   | [string] | body | Yes      | A string array of admission terms (Spring, Fall , Summer)          |

**Status Codes**

| Status code     | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| 201 OK          | Indicates an admission requirement has been successifully created |
| 400 Bad Request | Indicates body parameters are invalid/incomplete                  |

## Get an Admission Requirement

**`GET /api/admin-requirements/:course_name`**

Returns a single admission requirement for a given course.

**Parameters**

| Name          | Type   | In   | Required | Description                                                                                      |
| ------------- | ------ | ---- | -------- | ------------------------------------------------------------------------------------------------ |
| `course_name` | string | path | Yes      | Returns the admission requirements for a course you have searched for. Eg Mechanical Engineering |

**Status codes**

| Status code   | Description                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| 200 OK        | Indicates a successful response.                                                                      |
| 404 Not found | Indicates that there is no admission details for specified course name(meaning course does not exist) |

Example Response

```
{
    "term": [
        "Summer"
            ],
    "_id": "67bc8c405081546f00db1da3",
    "name": "Journalism",
    "admission_requirements": "High school diploma, English required",
    "__v": 0
}

```

## Update Admission Requirements

**`PATCH /api/admin-requirements/:course_name`**

This route is currently only available to an admin(myself). All other logged in users wont be able to update an admission requirement

**Parameters**
| Name | Type | In | Required | Description |
| --------------| -------| -----| -------- | ------------------------------------------------ |
| `course_name` | string | path | Yes | The name of course you want to update. Eg Software Engineering |
| `JSON body` | json | body | Yes | In the body specify, the parameters (term, name, admission_requirements) and the corresponding values you want to update|

**Status Codes**
| Status code | Description |
| ------------- | --------------------------------------------------------- |
| 200 OK | Indicates a requirement has been successifully updated|
| 400 Bad Request | Indicates body parameters are invalid/incomplete |

Example Response

```
{
    "status": "success",
    "data": {
        "course": {
            "term": [
                "Spring",
                "Fall",
                "Summer"
            ],
            "_id": "67e2c0babc3f003ad8a6b453",
            "name": "African Studies",
            "admission_requirements": "High school diploma, English, Communication Skills,History",
            "__v": 0
        }
    }
}
```

## Get Users

**`GET /api/users`**

This route is currently only available to an admin(myself). All other logged in users wont be able to execute this.

Eample Response

```
{
    "status": "success",
    "data": {
        "users": [
            {
                "role": "student",
                "_id": "67e2b685c18da0393c5cba94",
                "name": "Angela Mummy",
                "email": "am@example.com",
                "__v": 0
            },
            {
                "role": "student",
                "_id": "67e2b6aec18da0393c5cba96",
                "name": "Blake Junior",
                "email": "bj@example.com",
                "__v": 0
            }
        ]
    }
}
```
