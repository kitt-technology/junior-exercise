# In person exercise

We have access logs for our office. Each log entry tells us the time of the
event, what type the event was (entry or exit), and the team that the user
belongs to.

There is a chance that the data has been corrupted. We want to check if it's
valid. There can be multiple users per team.

It is valid if:

- There is no one left in the office at the end of the day
- 'Impossible' exits do not happen (i.e. an exit that happens before an entry)

Write a function that checks whether the access logs are valid.

Use the test cases in the main_test.ts file to ensure your implementation is
correct. The cases have descriptions to help identify any bugs.

The project is using deno as a runtime for this TypeScript code. You can run the
tests within VSCode or from the command line.

```sh
deno test
# Or
deno test --watch
```
