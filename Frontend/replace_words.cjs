const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  // Bag -> Cart (with word boundaries or specific phrases)
  { regex: /Add to Bag/g, replacement: 'Add to Cart' },
  { regex: /add to bag/gi, replacement: 'add to cart' },
  { regex: /Shopping Bag/g, replacement: 'Shopping Cart' },
  { regex: /shopping bag/gi, replacement: 'shopping cart' },
  { regex: /Gift Bag/g, replacement: 'Cart' },
  { regex: /Collection Bag/g, replacement: 'Cart' },
  { regex: /Review Bag/g, replacement: 'Review Cart' },
  { regex: /Secure Bag/g, replacement: 'Secure Cart' },
  { regex: /View Bag/g, replacement: 'View Cart' },
  { regex: /Return to Gift Bag/g, replacement: 'Return to Cart' },
  { regex: /Move to Bag/g, replacement: 'Move to Cart' },
  { regex: /Transfer All to Bag/g, replacement: 'Transfer All to Cart' },
  { regex: /\bbag\b/g, replacement: 'cart' },
  { regex: /\bBag\b/g, replacement: 'Cart' },
  { regex: /\bBAG\b/g, replacement: 'CART' },
  
  // Transit -> Delivery
  { regex: /\bTransit\b/g, replacement: 'Delivery' },
  { regex: /\btransit\b/g, replacement: 'delivery' },
  { regex: /\bTRANSIT\b/g, replacement: 'DELIVERY' },
  
  // Dispatch -> Shipping
  { regex: /\bDispatch\b/g, replacement: 'Shipping' },
  { regex: /\bdispatch\b/g, replacement: 'shipping' },
  { regex: /\bDISPATCH\b/g, replacement: 'SHIPPING' },
  
  // Dispatched -> Shipped
  { regex: /\bDispatched\b/g, replacement: 'Shipped' },
  { regex: /\bdispatched\b/g, replacement: 'shipped' },
  { regex: /\bDISPATCHED\b/g, replacement: 'SHIPPED' },
  
  // material icons
  { regex: /shopping_bag/g, replacement: 'shopping_cart' },
  
  // lucide-react icons
  { regex: /\bShoppingBag\b/g, replacement: 'ShoppingCart' },
];

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && /\.(ts|tsx|js|jsx|json)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      replacements.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

processDirectory(directoryPath);
console.log('Replacement complete.');
