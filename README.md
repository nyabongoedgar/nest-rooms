# QueryHelperService Documentation

## Running the Project

To run this project, follow these steps:

1. **Clone the Repository**:  
   Clone the project repository from GitHub to your local machine. You can do this by executing the following command in your terminal or command prompt:

   ```
   git clone https://github.com/nyabongoedgar/nest-rooms.git
   ```

2. **Navigate to the Project Directory**:  
   Once the cloning process is complete, navigate to the project directory using the `cd` command:

   ```
   cd nest-rooms
   ```

3. **Install Dependencies**:  
   Install project dependencies by running the following command:

   ```
   npm install
   ```

   This command will install all the required packages listed in the `package.json` file.

4. **Start the Server**:  
   Start the server by executing one of the following commands:

   - For production mode:
     ```
     npm run start
     ```

   - For development mode (with hot reloading):
     ```
     npm run start:dev
     ```

   Choose the appropriate command based on your needs.

5. **Access the API**:  
   Once the server is running, you can access the API through your web browser or a tool like Postman by visiting the following URL:

   ```
   http://localhost:3000/api
   ```

   This URL will lead you to the interactive Swagger documentation for the API, where you can explore and interact with the available endpoints.

By following these steps, you should be able to successfully run the project and access its API endpoints.

## Overview

The `QueryHelperService` is a utility service designed to assist with constructing database queries using TypeORM's `SelectQueryBuilder`. It provides methods for applying filters, sorting, and pagination to a query builder. This service is particularly useful in NestJS applications for dynamically building complex queries based on user input or other dynamic parameters.

## Methods

### 1. `applyFilters(queryBuilder: SelectQueryBuilder<any>, filters: Filter[]): SelectQueryBuilder<any>`

This method applies various filter conditions to the provided query builder.

#### Parameters:
- `queryBuilder`: The `SelectQueryBuilder` instance to which the filters will be applied.
- `filters`: An array of `Filter` objects. Each `Filter` object should have the following properties:
  - `field`: The field on which the filter is applied.
  - `value`: The value to be used in the filter condition.
  - `operator`: The operator for the filter condition. Supported operators are:
    - `'equals'`: Checks if the field equals the value.
    - `'not'`: Checks if the field does not equal the value.
    - `'gt'`: Checks if the field is greater than the value.
    - `'gte'`: Checks if the field is greater than or equal to the value.
    - `'lt'`: Checks if the field is less than the value.
    - `'lte'`: Checks if the field is less than or equal to the value.
    - `'like'`: Checks if the field contains the value (similar to SQL `LIKE`).
    - `'in'`: Checks if the field is in the provided array of values.
    - `'notIn'`: Checks if the field is not in the provided array of values.
    - `'isNull'`: Checks if the field is null.
    - `'isNotNull'`: Checks if the field is not null.

#### Returns:
- The modified `SelectQueryBuilder` instance with the applied filters.

#### Example:
```typescript
const queryBuilder = this.repository.createQueryBuilder('entity');
const filters: Filter[] = [
  { field: 'name', value: 'conference room A', operator: 'equals' },
  { field: 'capacity', value: 25, operator: 'gt' },
];
const modifiedQueryBuilder = queryHelperService.applyFilters(queryBuilder, filters);
```

### 2. `applySorting(queryBuilder: SelectQueryBuilder<any>, sort: Sort[]): SelectQueryBuilder<any>`

This method applies sorting conditions to the provided query builder.

#### Parameters:
- `queryBuilder`: The `SelectQueryBuilder` instance to which the sorting will be applied.
- `sort`: An array of `Sort` objects. Each `Sort` object should have the following properties:
  - `field`: The field by which to sort.
  - `order`: The order of sorting, either `'ASC'` (ascending) or `'DESC'` (descending).

#### Returns:
- The modified `SelectQueryBuilder` instance with the applied sorting.

#### Example:
```typescript
const queryBuilder = this.repository.createQueryBuilder('entity');
const sort: Sort[] = [
  { field: 'name', order: 'ASC' },
  { field: 'capacity', order: 'DESC' },
];
const modifiedQueryBuilder = queryHelperService.applySorting(queryBuilder, sort);
```

### 3. `applyPagination(queryBuilder: SelectQueryBuilder<any>, page: number, limit: number): SelectQueryBuilder<any>`

This method applies pagination to the provided query builder.

#### Parameters:
- `queryBuilder`: The `SelectQueryBuilder` instance to which pagination will be applied.
- `page`: The current page number (1-based index).
- `limit`: The number of records to return per page.

#### Returns:
- The modified `SelectQueryBuilder` instance with the applied pagination.

#### Example:
```typescript
const queryBuilder = this.repository.createQueryBuilder('entity');
const page = 2;
const limit = 10;
const modifiedQueryBuilder = queryHelperService.applyPagination(queryBuilder, page, limit);
```

## Usage Example

Below is a comprehensive example demonstrating how to use the `QueryHelperService` to build a query with filters, sorting, and pagination:

```typescript
import { QueryHelperService } from './query-helper.service';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SomeService {
  constructor(
    private readonly queryHelperService: QueryHelperService,
    private readonly repository: Repository<SomeEntity>,
  ) {}

  async getFilteredSortedPaginatedData(
    filters: Filter[],
    sort: Sort[],
    page: number,
    limit: number,
  ) {
    let queryBuilder = this.repository.createQueryBuilder('room');

    queryBuilder = this.queryHelperService.applyFilters(queryBuilder, filters);
    queryBuilder = this.queryHelperService.applySorting(queryBuilder, sort);
    queryBuilder = this.queryHelperService.applyPagination(queryBuilder, page, limit);

    return queryBuilder.getMany();
  }
}
```

In this example, the `getFilteredSortedPaginatedData` method demonstrates how to sequentially apply filters, sorting, and pagination to a query builder and then retrieve the results.