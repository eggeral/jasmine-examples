describe('Custom Matchers', () => {

  describe('Asymetric Matchers', () => {

    // Eg.: Our system uses objects with a string id. This string looks like: TYPE.SUBSYSTEM.X.Y.Z....
    // We want to write: expect('STRING.K23B.abc.def').toEqual(hasSubSystem('K23B'));
    const hasSubSystem = function (subsystem) {
      return {
        asymmetricMatch: function (compareTo) {
          return subsystem === compareTo.split('.')[1];
        },

        jasmineToString: function () {
          return '<subsystem: ' + subsystem + '>';
        }
      };
    }
    it('is possible to define asymetric matchers which can be used like jasmine.any() or jasmine.objectContaining()', () => {
      expect('STRING.K23B.abc.def').toEqual(hasSubSystem('K23B'));
      // uncomment to see the output of jasmineToString()
      // expect('STRING.K23B.abc.def').toEqual(hasSubSystem('K23C'));
    })

    it('is possible to to use asymetric matchers inside of jasmine.objectContaining()', () => {

      expect({ name: 'a', id: 'STRING.K23B.abc.def' }).toEqual(jasmine.objectContaining({ id: hasSubSystem('K23B') }));

    });
  });

  describe('Equality Matchers', () => {
    it('is possible to define matchers which are used by isEqual', () => {
      let Person = require('../lib/person');
      // returns true or false or undefined if the matcher can not decide
      function personTester(first, second) {
        if (first instanceof Person && second instanceof Person) {
          // only match by firstName and surname. Ignore phoneNumber
          return first.firstName === second.firstName && first.surname === second.surname;
        }
      }

      // toEqual without custom matcher
      expect(new Person('Max', 'Muster', 1234)).toEqual(new Person('Max', 'Muster', 1234));
      expect(new Person('Max', 'Muster', 1234)).not.toEqual(new Person('Max', 'Muster', 5678));

      jasmine.addCustomEqualityTester(personTester);
      expect(new Person('Max', 'Muster', 1234)).toEqual(new Person('Max', 'Muster', 1234));
      expect(new Person('Max', 'Muster', 1234)).toEqual(new Person('Max', 'Muster', 5678));

      expect({ firstName: 'Max', surname: 'Muster', phoneNumer: 1234 }).not.toEqual(new Person('Max', 'Muster', 5678));

    });
  });

  it('should be possible to define matchers like toEqual, etc', () => {

    var customMatchers = {
      toEqualPerson: function (util, customEqualityTesters) {
        return {
          compare: function (actual, expected) {

            var result = {};
            result.pass = actual.firstName === expected.firstName && actual.surname === expected.surname;

            if (result.pass) {
              // to be used together with .not.
              result.message = "Expected { firstName: " + actual.firstName + ", surname: " + actual.surname + " } " +
                "not to be the same person as firstName: " + expected.firstName + ", surname: " + expected.surname + " }";
            }
            else {
              result.message = "Expected { firstName: " + actual.firstName + ", surname: " + actual.surname + " } " +
                "to be the same person as firstName: " + expected.firstName + ", surname: " + expected.surname + " }";
            }
            return result;
          }
        };
      }
    };
    jasmine.addMatchers(customMatchers);
    expect({ firstName: 'Max', surname: 'Muster', phoneNumber: 1234 }).toEqualPerson({ firstName: 'Max', surname: 'Muster', phoneNumber: 5678 });
    expect({ firstName: 'Max', surname: 'Muster', phoneNumber: 1234 }).not.toEqualPerson({ firstName: 'Tom', surname: 'Muster', phoneNumber: 5678 });

    // uncomment to see the custom messages
    // expect({ firstName: 'Max', surname: 'Muster', phoneNumber: 1234 }).toEqualPerson({ firstName: 'Tom', surname: 'Muster', phoneNumber: 5678 });
    // expect({ firstName: 'Max', surname: 'Muster', phoneNumber: 1234 }).not.toEqualPerson({ firstName: 'Max', surname: 'Muster', phoneNumber: 5678 });

  });

})