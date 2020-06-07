# Mircos Interpreter / Calculator / LR Parser / Shift-Reduce Parser

Supports

- plus, minus, times, divided
- parentheses
- integers and floats

Follows the [flow diagram](https://en.wikipedia.org/wiki/File:Parser_Flow%D5%B8.gif) described on [wiki:Parsing](https://en.wikipedia.org/wiki/Parsing)

- See `index.test.ts` files for examples.
- Input strings in the form of `( 5 + 3 ) / 4 * 16 + 8`
- Interpreter tokenizes, parses into an AST, then evaluates the AST.

Runs with only functional programming ^\_^

## Resources

- [wiki: Interpreter](<https://en.wikipedia.org/wiki/Interpreter_(computing)>)
- [wiki: Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
