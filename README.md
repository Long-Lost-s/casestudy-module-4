## Dummies: How to run the project?

### 1. User Registration

Run following SQL insert statements:
```sql
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_SELLER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```

Use Postman or whatever you like to test the API.
### 2. **Register a new account:**
```json
{
    "username": "seller123",
    "email": "seller123@casestudy.com",
    "password": "12345678",
    "role": ["user", "seller"]
}
```
Response should be:
```json
{
    "message": "User was registered successfully!"
}
```

### 3. **Access public resource:**
- GET: `http://localhost:8080/api/test/all`
### **Access protected resource without Login (Should be 401):**
- GET: `http://localhost:8080/api/test/user`

### 4. **Login an account:**
- POST : `http://localhost:8080/api/auth/signin`
```json
{
    "username": "seller123",
    "password": "12345678"
}
```
### 5. **Access ROLE_USER and ROLE_SELLER resource:**
- GET: `http://localhost:8080/api/test/user` (Should be 200)
- GET: `http://localhost:8080/api/test/seller` (Should be 200)
- GET: `http://localhost:8080/api/test/admin` (Should be 403)

### 6. **Logout:**
- POST: `http://localhost:8080/api/auth/signout`



