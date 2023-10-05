const isSameFirstLastCharacter = require("./isSameFirstLastCharacter");

// Base Cases

/* A test case for a string that does have the same first and last 
   character and is 4+ characters long
*/
test("it should return true when the first and last character are the same", () => {
   expect(isSameFirstLastCharacter("abbbbba")).toBe(true);
});

/* A test case for a string that does NOT have the same first and last 
   character and is 4+ characters long
*/
test("it should return false when the first and last character are NOT the same", () => {
   expect(isSameFirstLastCharacter("abbbbbb")).toBe(false);
});

// Edge Cases
// A test case for a string with only 2 characters that are different
test("it should return false for a string with only 2 characters that are different", () => {
   expect(isSameFirstLastCharacter("ab")).toBe(false);
});

// A test case for a string with only 2 characters that are the same
test("it should return true with only 2 characters that are the same", () => {
   expect(isSameFirstLastCharacter("aa")).toBe(true);
});

// A test case for a string with only 1 character
test("it should return true with only 1 character", () => {
   expect(isSameFirstLastCharacter("a")).toBe(true);
});

// A test case for an empty string
test("it should return true with an empty string", () => {
   expect(isSameFirstLastCharacter("")).toBe(true)
});
