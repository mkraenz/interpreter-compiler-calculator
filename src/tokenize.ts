export const tokenize = (s: string) => {
    const literals = s.split(" ");
    return literals.map(Token.of);
};
