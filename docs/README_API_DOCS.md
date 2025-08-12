# Game Journal API Documentation

This directory contains the comprehensive OpenAPI 3.0 documentation for the Game Journal backend API.

## Files

- **`api-documentation.yaml`** - Complete OpenAPI 3.0 specification for the Game Journal API
- **`BACKEND_REPORT.md`** - Development report (existing)

## Using the API Documentation

### Online Viewers

You can view the API documentation using any OpenAPI-compatible viewer:

1. **Swagger UI**: Upload the YAML file to [Swagger Editor](https://editor.swagger.io/)
2. **Redoc**: Use [Redoc Demo](https://redocly.github.io/redoc/) with the raw file URL
3. **Insomnia**: Import the OpenAPI spec directly into Insomnia
4. **Postman**: Import the collection from the OpenAPI specification

### Local Setup

#### Using Swagger UI (Docker)
```bash
docker run -p 8080:8080 -e SWAGGER_JSON=/docs/api-documentation.yaml -v $(pwd):/docs swaggerapi/swagger-ui
```

#### Using Redoc CLI
```bash
npm install -g redoc-cli
redoc build api-documentation.yaml --output api-docs.html
```

#### Using OpenAPI Generator
```bash
# Generate client SDKs
openapi-generator-cli generate -i api-documentation.yaml -g typescript-fetch -o ./client-sdk
```

## API Overview

The Game Journal API provides comprehensive functionality for managing gaming experiences:

### Authentication
- JWT-based authentication
- User registration and login
- Token-based authorization

### Core Features
- **User Management**: Register, login, logout, delete account
- **Journal Entries**: Full CRUD operations for game entries
- **Statistics**: Lifetime and yearly gaming statistics
- **Pagination**: Cursor-based pagination for large datasets

### Security Features
- Rate limiting
- CORS protection
- XSS sanitization
- Helmet security headers
- Input validation with Zod schemas

## API Endpoints

### Users (`/api/v1/users`)
- `POST /register` - Create new user account
- `POST /login` - Authenticate user
- `POST /logout` - Logout user
- `DELETE /delete` - Delete user account (authenticated)

### Journal Entries (`/api/v1/journal-entries`)
- `GET /` - List journal entries (paginated)
- `POST /` - Create new journal entry
- `GET /statistics` - Get gaming statistics
- `GET /{id}` - Get specific journal entry
- `PATCH /{id}` - Update journal entry
- `DELETE /{id}` - Delete journal entry

All journal entry endpoints require authentication.

## Data Models

### Journal Entry
- **Title**: Game title (max 100 characters)
- **Platform**: Gaming platform (PC, PlayStation, Xbox, etc.)
- **Status**: Current status (started, completed, paused, dropped, revisited)
- **Rating**: User rating (0-10 scale)
- **Timestamps**: Creation and update times

### User
- **Email**: User's email address
- **Password**: Hashed password (min 6 characters)

## Response Format

All API responses follow a consistent format:

```json
{
  "status": "success|error",
  "data": {
    // Response data varies by endpoint
  }
}
```

## Error Handling

The API uses standard HTTP status codes and provides detailed error messages:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (resource already exists)
- `500` - Internal Server Error

## Pagination

List endpoints support cursor-based pagination:

```
GET /journal-entries?limit=20&cursor=507f1f77bcf86cd799439011
```

Response includes `nextCursor` for subsequent pages.

## Development

### Validation
The OpenAPI specification is validated using swagger-cli:

```bash
swagger-cli validate api-documentation.yaml
```

### Updates
When updating the API, ensure the OpenAPI specification is updated accordingly:

1. Update the YAML file
2. Validate the specification
3. Test with API documentation tools
4. Update client SDKs if necessary

## Contact

For API questions or issues, contact the development team or refer to the main project repository.