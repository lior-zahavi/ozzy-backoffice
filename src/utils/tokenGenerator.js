const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!#$%&*+-?';

function getRandomIndex(maximum) {
  const randomValue = new Uint32Array(1);
  crypto.getRandomValues(randomValue);

  return randomValue[0] % maximum;
}

function pickCharacters(characters, amount) {
  return Array.from(
    { length: amount },
    () => characters[getRandomIndex(characters.length)],
  );
}

function shuffleCharacters(characters) {
  const shuffled = [...characters];

  for (
    let index = shuffled.length - 1;
    index > 0;
    index -= 1
  ) {
    const targetIndex = getRandomIndex(index + 1);

    [shuffled[index], shuffled[targetIndex]] = [
      shuffled[targetIndex],
      shuffled[index],
    ];
  }

  return shuffled.join('');
}

function generateRandomPart() {
  return shuffleCharacters([
    ...pickCharacters(LOWERCASE, 5),
    ...pickCharacters(UPPERCASE, 3),
    ...pickCharacters(DIGITS, 2),
    ...pickCharacters(SYMBOLS, 2),
  ]);
}

export function generateOrganizationToken(schoolId) {
  const normalizedSchoolId = schoolId.trim();
  const randomPart = generateRandomPart();

  return normalizedSchoolId
    ? `${normalizedSchoolId}@${randomPart}`
    : randomPart;
}