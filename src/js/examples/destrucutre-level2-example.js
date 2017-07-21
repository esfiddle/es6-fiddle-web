window.es6Example.destructureLevel2 = {};

window.es6Example.destructureLevel2.code = `
    const obj = {};

    const original = { prop1: 42, prop2: 'luke', prop3: 'dog' };

    ({ prop1: obj.number, prop2: obj.name, prop3: obj.pet } = original);

    console.log(obj.number, obj.name, obj.pet);
`;

window.es6Example.destructureLevel2.onStart =
`
console.log('Destructed Objects - Level 2');
console.log('More examples for Destruction Assignments.');
`;

window.es6Example.destructureLevel2.display = 'Destructured Objects - Level 2';
