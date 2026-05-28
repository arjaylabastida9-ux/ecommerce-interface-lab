// Main UI script for pages

document.addEventListener('DOMContentLoaded', () => {
  // Update footer year placeholders
  const year = new Date().getFullYear();
  document.querySelectorAll('[id^="year"]').forEach(el => el.textContent = year);

  // Cart subtotal calculation
  const cartList = document.getElementById('cart-list');
  const subtotalEl = document.getElementById('subtotal');
  const statusEl = document.getElementById('cart-status');

  function formatCurrency(value) {
    return '$' + value.toFixed(2);
  }

  function updateSubtotal() {
    if (!cartList) return;
    const items = Array.from(cartList.querySelectorAll('li'));
    let total = 0;
    items.forEach(li => {
      const price = parseFloat(li.dataset.price || '0');
      const qtyInput = li.querySelector('.qty');
      const qty = qtyInput ? Number(qtyInput.value) : 1;
      total += price * qty;
    });
    if (subtotalEl) subtotalEl.textContent = 'Subtotal: ' + formatCurrency(total);
    if (statusEl) statusEl.textContent = items.length === 0 ? 'Your cart is currently empty' : `${items.length} item(s) in cart`;
  }

  if (cartList) {
    cartList.addEventListener('input', (e) => {
      if (e.target && e.target.classList.contains('qty')) updateSubtotal();
    });
    // initialize
    updateSubtotal();
  }

  // Accessibility: enable keyboard focus styles on first tab press
  function handleFirstTab(e) {
    if (e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing');
  }
  window.addEventListener('keydown', handleFirstTab, { once: true });

  // Optional: hook simple product actions if available
  const addToCartForms = document.querySelectorAll('form[action="Cart.html"]');
  addToCartForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Product added to cart (demo).');
      // For a real app, you'd add product details to localStorage or call an API.
    });
  });
});
