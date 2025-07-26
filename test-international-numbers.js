// Test international phone number formatting
function formatPhoneNumber(number) {
  // First, remove ALL non-digit characters including +, spaces, dashes, parentheses, etc.
  let cleanNumber = number.replace(/[^0-9]/g, '');
  
  // Double check: remove any remaining + signs (shouldn't be any, but just to be sure)
  cleanNumber = cleanNumber.replace(/\+/g, '');
  
  // Remove any leading zeros (except if the whole number is just zeros)
  cleanNumber = cleanNumber.replace(/^0+/, '') || '0';
  
  // Return the clean number as-is for any country
  return cleanNumber;
}

// Test international numbers
const internationalNumbers = [
  '+1 234 567 8900',      // US
  '+44 20 7123 4567',     // UK
  '+91 98765 43210',      // India
  '+49 30 12345678',      // Germany
  '+33 1 23 45 67 89',    // France
  '+86 138 0013 8000',    // China
  '+81 3 1234 5678',      // Japan
  '+55 11 98765 4321',    // Brazil
  '+971 50 123 4567',     // UAE
  '+234 803 123 4567',    // Nigeria
  '1234567890',           // No country code
  '441234567890'          // Already formatted
];

console.log('International phone number formatting test:');
console.log('========================================');
internationalNumbers.forEach(num => {
  const formatted = formatPhoneNumber(num);
  const isValid = formatted.length >= 7 && formatted !== '0';
  console.log(`Input: "${num}"`);
  console.log(`Output: "${formatted}" (Valid: ${isValid})`);
  console.log(`WhatsApp URL: whatsapp://send?phone=${formatted}`);
  console.log('---');
});
