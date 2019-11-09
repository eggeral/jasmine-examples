# Install Node.js
Downlode Node from: https://nodejs.org/en/download/ and run the installer.

Make sure ```npm``` is installed as well

Verify your Node installation by running 
```node -v``` and ```npm -v```

# Install Visual Studio Code
Download VS-Code from: https://code.visualstudio.com/#alt-downloads and run the installer.

# Setup a basic Jasmine project

See ```package.json``` for dependencies and script defintions

Run

```npm install```

and

```node node_modules/jasmine/bin/jasmine init```

for the basic setup. 

Change ```random``` to ```false``` in ```spec/support/jasmine.json``` in order to fix the order of test executions.

Create 
```spec/helpers/consoleReporter.js```
with the following content

```
const JasmineConsoleReporter = require('jasmine-console-reporter');

let consoleReporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4
    listStyle: 'indent', // "flat"|"indent"
    activity: false
});

jasmine.getEnv().addReporter(consoleReporter);
```

Create 
```spec/00_hello.spec.js```
with the following content

```
describe("Hello", function () {
    it("should show that Jasmine is setup and works", function () {
        expect(true).toBe(true);
    });
});
```

Execute tests using
```npm install --save-dev jasmine```

