{{{
"title": "ES2016 (ES7) Final Feature Set",
"tags": ["ES6", "ESFiddle", "releases"],
"category": "javascript",
"date": "2017-02-22"
}}}

## ES2016 Feature Set finalized

ES2016, also known as ES7, is the newest specification that follows the yearly ECMAScript release cycle they annouced along with ES2015.
Many anticipated that it would be a smaller set of features due to the short time from the last release.

It turned out we were getting just 2 new methods.

### Array.prototype.includes
This is a brand new array method that returns a boolean based on whether the specified element is found in the array.

You can use it like so:
```js
[1, 2, 3].includes(3)
// => true
```

Now how is this different to using .indexOf?
The primary difference is that .includes can find NaN whereas .indexOf cannot.

```js
const arr = [NaN, 'a', 'b', 'c']

arr.includes(NaN);
// => true

arr.indexOf(NaN);
// => -1
```

### Exponentiation operator
The second change is the introduction of an exponentiation operator.

It is a short hand for `Math.pow`

```js
console.log(8 ** 2);
// => 64

console.log(Math.pow(8, 2));
// => 64
```

And there you have it. Just a couple new methods in this release but useful nonetheless.

You can try these features out in your browser now! Click [here](https://esfiddle.net) to try them out.