# nucleus-challenge
# Code Review
I’ve identified the following issues with your code. Please address them and submit another pull request.

On line 10, you set WEBHOOK_SECRET from an env variable and fall back to dev-secret as a default. This is fine for testing, but the default fallback value should not be included in production code, and instead, we should throw an exception when WEBHOOK_SECRET is not set. If WEBHOOK_SECRET is not set in production, we never want to fall back to dev-secret as it will make it much easier to bypass our authentication system.

In the get_db() function, you are connecting to the db. However, you never close that connection. You have two options, either use flask.g and teardown to manage connections or add db.close(). However, wrap your db operations in a try/finally block to ensure the connection is closed even if there is an exception.

This next issue appears in multiple areas of your code, you are not catching any exceptions. For example, if we cannot decode raw into payload, we should catch that exception and return 400 as the user’s input was not json, rather than letting it fail and return 500. Also handle exceptions with db operations like execute,commit, and connect and make sure to rollback the transaction if an exception is thrown.

On lines 41 and 46, you are putting user input into f strings and running db queries. This is dangerous and allows malicious actors to perform SQL injections. The correct approach would be to use parameterized queries. You are also defaulting to an empty string if email is missing on line 34, but you never check if email == “” and return 400 if the email was missing or empty. Also check if sig is an empty string, meaning that the X-Signature header is empty and return 400. 

On line 20, you use == to compare expected and sig. Instead, you must use hmac.compare_digest(expected, sig). This prevents timing attacks where a malicious actor can use the time it takes == to return to find a signature that works character by character. 

On line 42, you are not upserting the data. You must use ON CONFLICT(email) to update the existing record if a user with that email already exists. 

After line 35, you must verify that role is valid. Make sure that it is either, user, admin, or another valid role and return 400 otherwise.
