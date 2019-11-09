describe('Spies', () => {

    let Calculator = require('../lib/calculator');

    it('records all calls to a method spied upon', () => {
        let calculator = new Calculator();
        spyOn(calculator, 'add');
        calculator.add(2, 3);
        expect(calculator.add).toHaveBeenCalled();
        calculator.add(2, 3);
        expect(calculator.add).toHaveBeenCalledTimes(2);
    });

    it('records all arguments used when calling spy methods', () => {
        let calculator = new Calculator();
        spyOn(calculator, 'add');
        calculator.add(2, 3);
        expect(calculator.add).toHaveBeenCalledWith(2, 3);
    });

    it('does not call the originals function by default', () => {
        let calledUrl = '';
        let restClient = {
            get: (url) => { calledUrl = url }
        }
        restClient.get('http://test')
        expect(calledUrl).toEqual('http://test');

        spyOn(restClient, 'get');
        restClient.get('http://spy')
        expect(calledUrl).toEqual('http://test');

    });

    it('can create return values', () => {
        let calculator = new Calculator();
        spyOn(calculator, 'add');
        calculator.add.and.returnValue(10);
        expect(calculator.add(2, 3)).toBe(10);
    });

    it('can call the original function', () => {
        let calculator = new Calculator();
        spyOn(calculator, 'add');
        calculator.add.and.callThrough();
        expect(calculator.add(2, 3)).toBe(5);
    });

    it('can call fake functions', () => {
        let calculator = new Calculator();
        spyOn(calculator, 'add');
        calculator.add.and.callFake((a, b) => a * 4 + b * 4);
        expect(calculator.add(2, 3)).toBe(20);
    });

    it('can create function only spies', () => {
        let addSpy = jasmine.createSpy('add');
        addSpy.and.returnValue(10);
        expect(addSpy(2, 3)).toBe(10);
    });

    it('can create spy objects', () => {
        let calculator = jasmine.createSpyObj(Calculator, ['add']);
        calculator.add.and.callFake((a, b) => a * 4 + b * 4);
        expect(calculator.add(2, 3)).toBe(20);
    });

});