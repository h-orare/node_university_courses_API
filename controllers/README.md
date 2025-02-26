# Node Institute of Technology Courses Resourse API

---

This API allows prospective students, who want to join a hypothetical Node Institute of Technology, to browse for courses and get details such as Cousrse Description, Course Duration, Cost Per Credit Hour, Career Path, Admission Term, Admission Requirements, Success Rate etc

The API is available at https://node-university-courses-api.onrender.com

# EndPoints

---

## Get All Courses

**`GET /api/courses`**
Retrieves a list of all available courses currently offered at Node Institute of Technology.

Example response:

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
}

```

**Parameters**
The following optional parameters can be added to the URL to achieve desired filtering

| Name                       | Type    | In    | Required | Description                                                                                                                                                                                                                           |
| -------------------------- | ------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `duration`                 | string  | query | No       | Specifies the duration of the course. Typical values will be like "3 years", "4 years" etc                                                                                                                                            |
| `fields`                   | string  | query | No       | Specifies which field(s) of the query you want returned. eg name, duration, fees_per_credit_hour                                                                                                                                      |
| `success_rate`             | integer | query | No       | Specifies the observed success rate for each course as percentage                                                                                                                                                                     |
| `career_path`              | string  | query | No       | A student can query for a course depending on their career choice. eg Data Engineer                                                                                                                                                   |
| `fees_per_credit_hour[lt]` | integer | query | No       | [lt](which means less than),can be replaced with [lte]-less than or equal to, [gt] -greater than, [gte]-greater than or equal to. Any integer value passed will filter courses having cost per credit hour as per operator specified. |

**Status codes**
| Status code | Description |
|-----------------|-----------------------------------------------------|
| 200 OK | Indicates a successful response. |
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
The request body must be in JSON format.

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

## Update/Delete a Course

Updating or deleting a course is disabled at this point. The application is still in development.

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

## Create an Admmission Requirement

**`POST /api/admin-requirements`**
The request body must be in JSON format.

**Parameters**
| Name | Type | In | Required | Description |
| --------------- | ------- | ----- | -------- | ------------------------------------------------ |
| `name` | string | body | Yes | Name of the course |
| `admission_requirements` | string | body | Yes | A brief description of admission requirements (100 characters max) |
| `term` |[string] | body | Yes | A string array of admission terms (Spring, Fall , Summer) |

**Status Codes**
| Status code | Description |
| ------------- | --------------------------------------------------------- |
| 201 OK | Indicates an admission requirement has been successifully created |
| 400 Bad Request | Indicates body parameters are invalid/incomplete |

## Get an Admmission Requirement

**`GET /api/admin-requirements/:course_name`**
Returns a single admission requirement for a given course.

**Parameters**
| Name | Type | In | Required | Description |
| --------------| ------- | ----- | -------- | ------------------------------------------------ |
| `course_name` | string | path | Yes | Returns the admission requirements for a course you have searched for. Eg Mechanical Engineering |

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
