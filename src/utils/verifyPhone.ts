export const verifyPhone = (phone: string) =>
  // eslint-disable-next-line
  /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone.trim());
