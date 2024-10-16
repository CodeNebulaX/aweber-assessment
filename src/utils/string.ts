export const containsUppercase = (str: string) => /[A-Z]/.test(str);
export const containsLowercase = (str: string) => /[a-z]/.test(str);
export const containsNumber = (str: string) => /\d/.test(str);
export const containsSpecialCharacter = (str: string) =>
  /[!@#$%^&*()_\-+={[}\]|:;"'<,>.?]/.test(str);
