describe('Jasmine Basics', function () {

    describe('toBe', function () {

        it('compares values using ===', function () {

            expect(1).toBe(1);
            expect('1').not.toBe(1);
            expect('1' == 1).toBe(true);

        });

    });

    describe('Setup and cleanup', function () {

        beforeAll(function () {
            console.log('\n  * beforeAll');
        });

        beforeEach(function () {
            console.log('  *   beforeEach');
        });

        afterEach(function () {
            console.log('  *   afterEach');
        })

        afterAll(function () {
            console.log('\n  * afterAll');
        })

        it('should execute beforeAll beforeEach afterAll and afterEach', function () {
            console.log('  *     Executing test');
        });

        it('should execute beforeEach before eacht test', function () {
            console.log('  *     Executing another test');
        });

    })

    describe('Shared state using vars', function () {

        var setInBeforeAll = 0;
        var setInBeforeEach = 0;

        beforeAll(function () {
            setInBeforeAll = 1;
        });

        beforeEach(function () {
            setInBeforeEach++ // Attention the "var method" creates strong dependensies between test runs. This has to be avoided
        });

        it('should execute beforeAll beforeEach afterAll and afterEach', function () {
            expect(setInBeforeAll).toBe(1);
            expect(setInBeforeEach).toBe(1);
        });

        it('should execute also execute', function () {
            expect(setInBeforeAll).toBe(1);
            expect(setInBeforeEach).toBe(2);
        });

    })


    describe('Shared state using this', function () {

        beforeAll(function () {
            this.setInBeforeAll = 1;
        });

        beforeEach(function () {
            this.setInBeforeEach = 1; // this is cleaned for each test run
        });

        it('should execute beforeAll beforeEach afterAll and afterEach', function () {
            expect(this.setInBeforeAll).toBe(1);
            expect(this.setInBeforeEach).toBe(1);
        });

        it('should execute also execute', function () {
            expect(this.setInBeforeAll).toBe(1);
            expect(this.setInBeforeEach).toBe(1);
        });

    });

    xdescribe('fail', function () {
        // change to describe to show the failing test

        it('should fail if fail is called', function () {
            fail('This should fail');
        });
    })


    describe('pending', function () {

        xdescribe('xdescribe', function () {

            it('should mark all functions as pending when inside of an xdescribe', function () {
                fail('Failing but marked a pending');
            });

        })

        xit('should mark specs declared with xit as pending', function () {
            fail('Failing but marked a pending');
        });

        it('should mark specs calling pending as pending', function () {
            // fail('Failing but marked a pending'); // this line is still reported as failure
            pending('Unclear. Have to ask PO');
        });

    });

    describe('matchers', function () {

        describe('toEqual', function () {
            it('should compare two objects using deep equal', function () {
                expect({ a: 'a', b: 'b' }).toEqual({ a: 'a', b: 'b' });
            });
        });

        describe('toBeCloseTo', function () {
            it('should compare two float using the given precision', function () {
                expect(3.1415).toBeCloseTo(3.142, 2);
                expect(3.1415).not.toBeCloseTo(3.15, 2);
            });
        });

        describe('toBeFalsy and toBeTruthy', function () {
            it('should compare two vales if they are considered true or false in JS', function () {
                expect(true).toBeTruthy;
                expect({}).toBeTruthy;
                expect([]).toBeTruthy;
                expect(42).toBeTruthy;
                expect("foo").toBeTruthy;
                expect(new Date()).toBeTruthy;
                expect(-42).toBeTruthy;
                expect(3.14).toBeTruthy;
                expect(-3.14).toBeTruthy;
                expect(Infinity).toBeTruthy;
                expect(-Infinity).toBeTruthy;
                expect(false).toBeFalsy;
                expect(null).toBeFalsy;
                expect(undefined).toBeFalsy;
                expect(0).toBeFalsy;
                expect(NaN).toBeFalsy;
                expect('').toBeFalsy;
                expect("").toBeFalsy;
                expect(``).toBeFalsy;
            });
        });
        describe('toContain', function () {
            it('should test if a string contains the given substring', function () {
                expect('abcdef').toContain('bcd');
                expect('abcdef').not.toContain('xyz');
            });

            it('should test if an array contains the given element', function () {
                expect([1, 2, 3, 4, 5]).toContain(2);
                expect([{ a: 'a' }, { b: 'b' }]).toContain({ a: 'a' });
            });

        });

        describe('toThrow', function () {
            it('should test if a given function throws an error', function () {
                expect(function () { throw Error('test') }).toThrowError('test');
                expect(function () { throw Error('test') }).toThrowError(/te.*/);
                expect(function () { throw 'error' }).toThrow('error');
                expect(function () { throw { a: 'error' } }).toThrowMatching(function (thrown) { return thrown.a === 'error' });
            })
        });

        describe('toBeInstanceOf', function () {
            let Calculator = require('../lib/calculator');

            it('should test if a given object is a certain class', function () {
                expect('foo').toBeInstanceOf(String);
                expect(3).toBeInstanceOf(Number);
                expect(new Calculator()).toBeInstanceOf(Calculator);
            })
        });

    });
});