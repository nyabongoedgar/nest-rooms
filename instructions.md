## Final Take-Home Challenge

### Take-Home Challenge: Query Utility for Pagination, Filtering, and Sorting

#### Overview

Your task is to create a utility module for a Nest.js TypeORM-based application that supports pagination, filtering, and sorting of database queries. This utility should be reusable across different entities in an application.PLEASE DO NOT USE LLMS

#### Requirements

* **Utility Module:** Create a utility module in TypeScript that includes functions for applying pagination, filtering, and sorting to TypeORM query builders.
* **Entity and Repository:** Define a sample entity and repository to demonstrate the utility functions.
* **Service:** Implement a base service that uses the utility module.
* **Documentation:** Provide documentation explaining how to use the utility functions and a brief description of your implementation.
    * Filter Operators
        * equals
        * not
        * gt (greater than)
        * gte (greater than or equal)
        * lt (less than)
        * lte (less than or equal)
        * like
        * in
        * notIn
        * isNull
        * isNotNull
    * Sort Operators
        * ASC - Ascending
        * DESC - Descending
* **Query Tests**
    * GET /api/rooms?page=0&limit=10&filters=[]&sort=[{"field":"name","order":"ASC"}]
    * GET /api/rooms?page=0&limit=5&filters=[{"field":"capacity","value":10,"operator":"gte"}]&sort=[{"field":"name","order":"ASC"}]
    * GET /api/rooms?page=1&limit=2&filters=[{"field":"userId","value":1,"operator":"equals"}]&sort=[{"field":"capacity","order":"DESC"}]
    * GET /api/rooms?page=0&limit=5&filters=[{"field":"name","value":"Room","operator":"like"}]&sort=[{"field":"userId","order":"ASC"}]
    
* **Sample Data**

```json
[
  {
    "id": 1,
    "name": "Conference Room A",
    "capacity": 10,
    "userId": 1
  },
  {
    "id": 2,
    "name": "Meeting Room B",
    "capacity": 8,
    "userId": 2
  },
  {
    "id": 3,
    "name": "Workshop Room C",
    "capacity": 20,
    "userId": 1
  },
  {
    "id": 4,
    "name": "Training Room D",
    "capacity": 15,
    "userId": 3
  },
  {
    "id": 5,
    "name": "Seminar Room E",
    "capacity": 25,
    "userId": 2
  },
  {
    "id": 6,
    "name": "Discussion Room F",
    "capacity": 5,
    "userId": 4
  },
  {
    "id": 7,
    "name": "Board Room G",
    "capacity": 12,
    "userId": 1
  },
  {
    "id": 8,
    "name": "Conference Room H",
    "capacity": 10,
    "userId": 3
  },
  {
    "id": 9,
    "name": "Small Meeting Room I",
    "capacity": 4,
    "userId": 2
  },
  {
    "id": 10,
    "name": "Large Conference Room J",
    "capacity": 30,
    "userId": 4
  },
  {
    "id": 11,
    "name": "Project Room K",
    "capacity": 6,
    "userId": 1
  },
  {
    "id": 12,
    "name": "Collaboration Room L",
    "capacity": 10,
    "userId": 3
  },
  {
    "id": 13,
    "name": "Focus Room M",
    "capacity": 2,
    "userId": 2
  },
  {
    "id": 14,
    "name": "Presentation Room N",
    "capacity": 18,
    "userId": 1
  },
  {
    "id": 15,
    "name": "Lecture Room O",
    "capacity": 22,
    "userId": 3
  },
  {
    "id": 16,
    "name": "Briefing Room P",
    "capacity": 14,
    "userId": 4
  },
  {
    "id": 17,
    "name": "Strategy Room Q",
    "capacity": 10,
    "userId": 1
  },
  {
    "id": 18,
    "name": "Consultation Room R",
    "capacity": 5,
    "userId": 3
  },
  {
    "id": 19,
    "name": "Interview Room S",
    "capacity": 3,
    "userId": 2
  },
  {
    "id": 20,
    "name": "Brainstorming Room T",
    "capacity": 12,
    "userId": 4
  }
]
```

* **Deployment**
    * Server: Render
    * Database: Postgres

#### Submission Guidelines

Candidates should submit a GitHub repository or a ZIP file containing their project, including the implemented utility functions, services, API route, and documentation. The project should be runnable with instructions provided in a README file.

#### Evaluation Criteria (Optional)

* Code Quality: Clean, well-documented, and maintainable code.
* Functionality: Correct implementation of pagination, filtering, and sorting.
* Documentation: Clear and concise documentation explaining the utility functions and usage.
* Testing: Adequate test coverage to ensure functionality and reliability.






