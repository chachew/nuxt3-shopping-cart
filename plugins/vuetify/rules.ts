/**
 * Validation rule for any input. Input cannot be blank/empty
 * @param name field name text that will display as part of the error message
 */
export const requiredValidator = (name = 'Field') => {
  return (v: string) => !!v || `${name} required`;
};

/**
 * Validation rule for checking correct email format
 * @param value field value to validate
 */
export const emailValidator = (value: string) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || 'Email format incorrect';
};
