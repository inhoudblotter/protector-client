export function formatPhone(phone: string) {
  let result = "+7 ";

  if (phone.startsWith("+7")) {
    phone = phone.slice(2, phone.length);
  } else if (phone.startsWith("8")) {
    phone = phone.slice(1, phone.length);
  }
  result += `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(
    6,
    8
  )}-${phone.slice(8, 10)}`;
  return result;
}
