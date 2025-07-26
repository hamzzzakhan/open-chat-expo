// Test phone number formatting
function formatPhoneNumber(number) {
  // Remove all non-digit characters including + sign, spaces, dashes, etc.
  const cleanNumber = number.replace(/\D/g, '');
  
  // If the number doesn't start with a country code, assume it's a local number
  if (
    cleanNumber.length > 0 &&
    !cleanNumber.startsWith('1') &&
    cleanNumber.length <= 10
  ) {
    return `1${cleanNumber}`; // Add US country code as default
  }
  
  return cleanNumber;
}

// Test cases
const testNumbers = [
  '+1234567890',
  '1234567890', 
  '+44 123 456 7890',
  '(123) 456-7890',
  '+91 98765 43210'
];

console.log('Testing phone number formatting:');
testNumbers.forEach(num => {
  const formatted = formatPhoneNumber(num);
  console.log(`Input: "${num}" -> Output: "${formatted}"`);
});
