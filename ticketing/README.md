# Auth service
## Route handlers
The auth service has a root controller for handling Signup, Signin, Signout, current-user requests.
### Topics to learn:
* use `express.Router()` object to make a custom router for different API endpoint.
* use `export { router as routerA }` to rename the export object in order to diffrentiate individual routers when importing from other files.
* Custom Router object as an Express middleware:
  * use `app.use(routerA)` to use the custom RouterA from the previous step as an Express middleware.
* Data validation - use express-validator to check the data
  * `import {body} from 'express-validator` --- body method is used as a middleware before Express calls the callback function
  * `validationResult` is used in the request handler to catch any errors.
```javascript
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // set the error status to 400, and send an array of errors back to client as JSON data
      return res.status(400).send(errors.array());
    }
```
  * With microservice setup which may use different language/frameworks, the error message generated from each microservice might have a very different structure --- it's a HUGE issue.
    * solution: each microservice should send a standard structure of the response to the front end app.
* Error handling
  * consistently structured response from all services is required -> Use Middleware to handle errors
  * Each of the error type should be handled consistently  -> Express's error handling mechanism (call the 'next' function) to capture all possible errors
  * Express custom error handlers have 4 function arguments: (err, req, res, next)
    > Epress will automatically count the number of arguments and it knows the handlers will handle the errors
* Async Error handling
  * use `express-async-errors` package with log errors from async/await request handlers
* One database per microservice: use Mongoose and MongoDB
  * DB is hosted and managed by a K8s Pod


* TS knowledge:
  * `private` keyword in contructor argument
  ```javascript
  class TestClass {
    constructor(name: string, private address: string, public city) { }

    testMethod() {
      console.log(this.name) // Compiler error: Property 'name' does not exist on type 'TestClass'.
      console.log(this.address);
      console.log(this.city);
    }
  }

  const testClass = new TestClass('Jane Doe', '123 Main St.', 'Cityville');

  testClass.testMethod();

  console.log(testClass.name);    // Compiler error: Property 'name' does not exist on type 'TestClass'.
  console.log(testClass.address); // Compiler error: 'address' is private and only accessible within class 'TestClass'.
  console.log(testClass.city);
  ```
  * `interface` and abstract classes to ensure code reusability
    * TS interface describes the structure of an object or a group of values, and enforce the "contract" to implement correctly
      * loose coupling
      * set up a contract between different classes
      * Best when we have very different objects that we want to work together
    * TS abstract classes 
      * Strong coupling
      * Best when we are trying to build up the definition of an object -- set up requirements for subclasses
      * It CANNOT be instantiated
    * Difference: TS interface does not exist at runtime, TS abstract class exists at runtime, yet it's an imcomplete implementation
      * Can use `instanceof` checks: TS abstract class will create a class object when translated to JS
    * Summary: Always reach out for interfaces first, and use abstract classes when we want to "inject" functionality to a similar class
