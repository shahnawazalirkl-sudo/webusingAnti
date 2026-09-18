// orderStorage.js - Centralized helper for managing dynamic orders and tracking synchronization
import { safeStorage } from './safeStorage';

const STORAGE_KEY_LAST = 'asra_last_order';
const STORAGE_KEY_ALL = 'asra_orders_history';

/**
 * Generates a realistic Sovereign Commission docket ID, e.g. ASRA-2026-4921K
 */
export function generateOrderId() {
  const currentYear = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `ASRA-${currentYear}-${randomDigits}${randomChar}`;
}

/**
 * Persist an order to safe storage (both as last order and in cumulative order list)
 */
export function saveOrder(order) {
  if (!order || typeof order !== 'object' || !order.orderId) return;

  try {
    // 1. Save as the latest order
    safeStorage.setItem(STORAGE_KEY_LAST, order);

    // 2. Save into order dictionary / history
    const existing = getAllOrders();
    existing[order.orderId] = {
      ...order,
      createdAt: order.createdAt || new Date().toISOString()
    };
    safeStorage.setItem(STORAGE_KEY_ALL, existing);
  } catch (err) {
    console.warn('Error saving order to safeStorage', err);
  }
}

/**
 * Get the most recently placed order
 */
export function getLastOrder() {
  return safeStorage.getItem(STORAGE_KEY_LAST, null);
}

/**
 * Retrieve all user-placed orders
 */
export function getAllOrders() {
  return safeStorage.getItem(STORAGE_KEY_ALL, {});
}

/**
 * Get a specific order by ID
 */
export function getOrderById(orderId) {
  if (!orderId || typeof orderId !== 'string') return null;
  const cleanId = orderId.trim().toUpperCase();

  const all = getAllOrders();
  if (all && all[cleanId]) {
    return all[cleanId];
  }

  const last = getLastOrder();
  if (last && typeof last.orderId === 'string' && last.orderId.toUpperCase() === cleanId) {
    return last;
  }

  return null;
}

/**
 * Formats a raw stored order into the rich telemetry structure expected by TrackOrderPage
 */
export function formatOrderForTracking(order) {
  if (!order || typeof order !== 'object') return null;

  const orderId = order.orderId || 'ASRA-2026-0000X';
  const grandTotal = order.grandTotal ? `₹${Number(order.grandTotal).toLocaleString('en-IN')}` : '₹8,459';
  const phone = order.phone || '+91 96926 68263';
  const recipientName = order.recipientName || 'Asra Ansari & Sk Shahnawaz Ali';
  const venueName = order.venueName || 'The Oberoi Udaivilas, Luxury Kohinoor Suite';
  const venueAddress = `${order.streetAddress || 'Badi-Gorela Canal Road'}, ${order.city || 'Udaipur'}, ${order.state || 'Rajasthan'} ${order.pincode || '313001'}`;

  // Extract initials from recipient name
  const initialsMatch = typeof recipientName === 'string' ? recipientName.match(/\b([A-Z])/g) : null;
  const initials = initialsMatch && initialsMatch.length >= 2
    ? `"${initialsMatch[0]} & ${initialsMatch[1]}" • Personalized Crest`
    : '"A & S" • Classic Floral Crest';

  const items = Array.isArray(order.items) && order.items.length > 0
    ? order.items.map((item, idx) => ({
        id: item.cartId || `item-${idx}`,
        title: item.title || 'Commissioned Bridal Piece',
        price: item.price ? `₹${Number(item.price).toLocaleString('en-IN')}` : '₹7,499',
        image: item.image || '/assets/cdn/img_8222cd4f9dd5.png',
        palette: item.edition || 'Classic Blush & Champagne Gold',
        monogramText: item.monogramDie || initials,
        ink: item.calligraphy || 'Royal Copperplate',
        aroma: item.scent || 'Kashmiri Rose & Amber'
      }))
    : [
        {
          id: 'custom-suite',
          title: 'The Sovereign Bridal & Wedding Essentials Suite',
          price: grandTotal,
          image: '/assets/cdn/img_8222cd4f9dd5.png',
          palette: 'Classic Blush & Champagne Gold',
          monogramText: initials,
          ink: 'Royal Copperplate',
          aroma: 'Kashmiri Rose & Amber'
        }
      ];

  return {
    orderId: orderId,
    clientTitle: `${typeof recipientName === 'string' ? recipientName.split('&')[0]?.trim() : 'Royal'}'s Sovereign Commission`,
    clientName: recipientName,
    phone: phone,
    initials: initials,
    status: 'WHITE-GLOVE DISPATCH QUEUED • TRANSIT PREPARATION',
    statusCategory: 'production',
    expectedArrival: `${order.arrivalDate || 'Nov 14, 2026'} • ${order.timingSlot || 'Twilight Royal Arrival (04:00 PM – 08:00 PM)'}`,
    slotNotice: '(Twilight Royal Slot Guaranteed)',
    venueName: venueName,
    venueDetail: order.landmark || 'VIP Entrance Suite Delivery',
    venueAddress: venueAddress,
    plannerName: order.weddingPlanner || 'Designated Wedding Architect',
    plannerPhone: phone,
    confidentialProtocol: order.chauffeurNotes || 'Handover strictly to designated recipient with proof verification.',
    driverName: 'Marshal Jawed Ali',
    driverBadge: 'ASRA-EXEC-19',
    driverPhone: phone,
    vehicleReg: 'Mercedes-Benz Sprinter Chilled Fleet (Reg: MH-04-AR-2026)',
    otp: typeof orderId === 'string' ? orderId.slice(-4) : '2026',
    baseTemp: 18.2,
    gForce: '< 0.18 G',
    remainingKm: 85,
    lat: 25.1782,
    lng: 73.8423,
    cruisingSpeed: 'Scheduled for Dispatched Segment',
    items: items,
    settledAmount: grandTotal,
    settlementMethod: order.paymentMethod === 'upi' ? `UPI Verified (${order.upiId || 'Direct UPI'})` : 'Card Payment Authenticated',
    royalCredits: `${order.loyaltyPoints || Math.round((order.grandTotal || 8459) * 0.1)} ASRA Royal Credits Logged`,
    stylistName: 'Shagufta Naaz'
  };
}
