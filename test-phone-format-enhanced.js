// Enhanced test for phone number formatting
function formatPhoneNumber(number) {
  // First, remove ALL non-digit characters including +, spaces, dashes, parentheses, etc.
  let cleanNumber = number.replace(/[^0-9]/g, '');
  
  // Double check: remove any remaining + signs (shouldn't be any, but just to be sure)
  cleanNumber = cleanNumber.replace(/\+/g, '');
  
  // Remove any leading zeros (except if the whole number is just zeros)
  cleanNumber = cleanNumber.replace(/^0+/, '') || '0';
  
  // If the number doesn't start with a country code, assume it's a local number
  if (
    cleanNumber.length > 0 &&
    !cleanNumber.startsWith('1') &&
    cleanNumber.length <= 10 &&
    cleanNumber !== '0'
  ) {
    return `1${cleanNumber}`; // Add US country code as default
  }

  return cleanNumber;
}

// Test cases including tricky ones
const testNumbers = [
  '+1234567890',
  '++1234567890',
  '+44 123 456 7890',
  '(123) 456-7890',
  '+91 98765 43210',
  '1234567890',
  '001234567890',
  '++++1234567890'
];

console.log('Enhanced phone number formatting test:');
testNumbers.forEach(num => {
  const formatted = formatPhoneNumber(num);
  const hasPlus = formatted.includes('+');
  console.log(`Input: "${num}" -> Output: "${formatted}" (Has +: ${hasPlus})`);
});
