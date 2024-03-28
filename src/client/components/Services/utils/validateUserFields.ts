export function validateUserFields(
  name: string,
  phone: string,
  carNumber: string
) {
  if (!name && !phone) {
    return "Необходимо ввести имя и телефон.";
  } else if (!name) {
    return "Необходимо ввести имя.";
  } else if (!phone) {
    return "Необходимо ввести телефон.";
  } else if (!carNumber) {
    return "Необходимо ввести номер машины.";
  } else if (phone.length > 12 || phone.length < 11) {
    return "Проверте правильность ввода номера телефона.";
  } else if (carNumber.length !== 6) {
    return "Проверьте правильность ввода номера машины";
  } else if (name.length > 100) {
    return "Имя дожно содержать менее 100 символов.";
  }
}
