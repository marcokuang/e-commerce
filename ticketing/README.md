# Auth service
## Route handlers
The auth service has a root controller for handling Signup, Signin, Signout, current-user requests.
### Topics to learn:
* use `express.Router()` object to make a custom router for different API endpoint.
* use `export { router as routerA }` to rename the export object in order to diffrentiate individual routers when importing from other files.
* Custom Router object as an Express middleware:
  * use `app.use(routerA)` to use the custom RouterA from the previous step as an Express middleware.
* Data validation - use express-validator to check the data
  * 