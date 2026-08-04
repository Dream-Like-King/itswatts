# API testing cheat sheet

## The request

- **Method**: what action is requested (GET, POST, PUT, PATCH, DELETE)
- **Route**: the service path being called
- **Headers**: context such as content type or authorization
- **Parameters/body**: identifiers and submitted data

## The response

- **Status**: did the server report the expected result?
- **Body**: does it have the right fields, types, and values?
- **Headers**: does it return the expected metadata or location?
- **Behavior**: did the user-visible or downstream result occur safely?

## Useful checks

1. Valid input succeeds with the expected data.
2. Missing, invalid, duplicate, and boundary input fail clearly and safely.
3. Unauthorized and unauthorized-role requests are denied.
4. Slow, unavailable, and retry conditions do not create unsafe results.
5. Error details do not expose sensitive internal information.
