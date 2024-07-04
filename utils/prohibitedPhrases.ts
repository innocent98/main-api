export const prohibitedPhrases = [
  /contact\s*(me)?/i,
  /text\s*(me)?/i,
  /call\s*(me)?/i,
  /reach\s*(me)?/i,
  /tel\s*(me)?/i,
  /telephone\s*(me)?/i,
  /whatsApp\s*(me)?/i,
  /whatsapp\s*(me)?/i,
  /facebook\s*(me)?/i,
  /telegram\s*(me)?/i,
  /twitter\s*(me)?/i,
  /email\s*(:)?/i,
  /phone\s*(:)?/i,
  /call\s*(:)?/i,
  /@/i, // matches email addresses
  /\b\d{10}\b/, // matches a 10-digit phone number
  /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/, // matches phone numbers with formats like 123-456-7890 or 123 456 7890
  /\d{1,4}\s?\(?\d{2,3}\)?[-.\s]?\d{2,3}[-.\s]?\d{4,6}/, // matches phone numbers with various country codes and separators
];
