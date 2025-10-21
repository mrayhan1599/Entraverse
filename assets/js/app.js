const STORAGE_KEYS = {
  users: 'entraverse_users',
  session: 'entraverse_session',
  products: 'entraverse_products'
};

const DEFAULT_PRODUCTS = [
  {
    id: crypto.randomUUID(),
    name: 'Meta Quest 3S 128 GB Virtual Reality Headset',
    category: 'Virtual Reality',
    brand: 'Meta',
    link: 'https://example.com/meta-quest-3s',
    photos: [
      'https://images.unsplash.com/photo-1580894897617-4812950f48cd?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Headset VR canggih untuk pengalaman imersif dalam dunia virtual.',
    tradeIn: true,
    variants: [
      { name: '128 GB', sku: 'MQ3S-128', stock: 12, price: 10299000 },
      { name: '256 GB', sku: 'MQ3S-256', stock: 6, price: 11999000 }
    ],
    createdAt: Date.now()
  },
  {
    id: crypto.randomUUID(),
    name: 'Meta Quest 3S 256 GB Virtual Reality Headset',
    category: 'Virtual Reality',
    brand: 'Meta',
    link: 'https://example.com/meta-quest-3s-256',
    photos: [
      'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Versi penyimpanan besar untuk koleksi aplikasi VR favorit.',
    tradeIn: false,
    variants: [
      { name: '256 GB', sku: 'MQ3S-256B', stock: 8, price: 12999000 }
    ],
    createdAt: Date.now()
  }
];

const toast = createToast();

function clone(value) {
  if (value === null || value === undefined) {
    return value;
  }
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.error('Failed to clone value', error);
    return value;
  }
}

function getData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return clone(fallback);
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to read localStorage', error);
    return clone(fallback);
  }
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureSeeded() {
  const existingProducts = getData(STORAGE_KEYS.products, null);
  if (!existingProducts) {
    setData(STORAGE_KEYS.products, DEFAULT_PRODUCTS);
  }
}

function getCurrentUser() {
  const session = getData(STORAGE_KEYS.session, null);
  if (!session) return null;
  const users = getData(STORAGE_KEYS.users, []);
  return users.find(user => user.id === session.userId) ?? null;
}

function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.session);
    return;
  }
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify({ userId: user.id, loggedInAt: Date.now() }));
}

function createToast() {
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  const append = () => {
    if (!el.isConnected) {
      document.body.appendChild(el);
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', append);
  } else {
    append();
  }
  return {
    show(message) {
      el.textContent = message;
      el.classList.add('show');
      setTimeout(() => el.classList.remove('show'), 3000);
    }
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
}

function setupSidebarToggle() {
  const sidebar = document.querySelector('[data-sidebar]');
  const backdrop = document.querySelector('[data-sidebar-backdrop]');
  const toggleButtons = document.querySelectorAll('[data-sidebar-toggle]');

  if (!sidebar || toggleButtons.length === 0) {
    return;
  }

  const setExpanded = expanded => {
    toggleButtons.forEach(button => button.setAttribute('aria-expanded', String(expanded)));
  };

  const closeSidebar = () => {
    document.body.classList.remove('sidebar-open');
    setExpanded(false);
  };

  const openSidebar = () => {
    document.body.classList.add('sidebar-open');
    setExpanded(true);
  };

  const toggleSidebar = () => {
    if (document.body.classList.contains('sidebar-open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  toggleButtons.forEach(button => {
    button.addEventListener('click', toggleSidebar);
  });

  backdrop?.addEventListener('click', closeSidebar);

  sidebar.addEventListener('click', event => {
    if (event.target.closest('.nav-link')) {
      closeSidebar();
    }
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeSidebar();
    }
  });

  const mediaQuery = window.matchMedia('(min-width: 961px)');
  const handleMediaChange = event => {
    if (event.matches) {
      closeSidebar();
    }
  };

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleMediaChange);
  } else {
    mediaQuery.addListener(handleMediaChange);
  }
}

function handleRegister() {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const company = formData.get('company').trim();
    const email = formData.get('email').trim().toLowerCase();
    const password = formData.get('password').trim();
    const confirm = formData.get('confirm').trim();

    if (password !== confirm) {
      toast.show('Kata sandi dan konfirmasi tidak sama.');
      return;
    }

    const users = getData(STORAGE_KEYS.users, []);
    if (users.some(user => user.email === email)) {
      toast.show('Email sudah terdaftar, silakan masuk.');
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      company,
      email,
      password
    };
    users.push(newUser);
    setData(STORAGE_KEYS.users, users);
    setCurrentUser(newUser);
    toast.show('Pendaftaran berhasil, mengalihkan...');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 800);
  });
}

function handleLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email').trim().toLowerCase();
    const password = formData.get('password').trim();

    const users = getData(STORAGE_KEYS.users, []);
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      toast.show('Email atau kata sandi salah.');
      return;
    }

    setCurrentUser(user);
    toast.show('Selamat datang kembali!');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 700);
  });
}

function ensureAuthenticatedPage() {
  const page = document.body.dataset.page;
  if (['dashboard', 'add-product'].includes(page)) {
    const user = getCurrentUser();
    if (!user) {
      window.location.href = 'index.html';
      return null;
    }
    return user;
  }
  return null;
}

function renderProducts(filterText = '') {
  const tbody = document.getElementById('product-table-body');
  if (!tbody) return;

  const products = getData(STORAGE_KEYS.products, []);
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(filterText) ||
    product.brand.toLowerCase().includes(filterText)
  );

  tbody.innerHTML = '';

  filtered.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <div class="product-cell">
          <strong>${product.name}</strong>
          <span class="product-meta">${product.brand} • ${product.category}</span>
        </div>
      </td>
      <td>
        <div class="photo-preview">
          ${product.photos?.length ? `<img src="${product.photos[0]}" alt="${product.name}">` : 'No Photo'}
        </div>
      </td>
      <td>
        <a class="btn ghost-btn small" target="_blank" rel="noopener" href="${product.link}">View</a>
      </td>
      <td>
        <label class="switch">
          <input type="checkbox" ${product.tradeIn ? 'checked' : ''} data-action="toggle-trade" data-id="${product.id}">
          <span class="slider"></span>
        </label>
      </td>
      <td>
        <div class="table-actions">
          <button class="icon-btn small" type="button" data-action="view-variants" data-id="${product.id}" title="Lihat varian">👁️</button>
          <button class="icon-btn danger small" type="button" data-action="delete" data-id="${product.id}" title="Hapus">🗑️</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });

  const countEl = document.getElementById('product-count');
  const metaEl = document.getElementById('table-meta');
  if (countEl) {
    countEl.textContent = `${filtered.length} produk`;
  }
  if (metaEl) {
    metaEl.textContent = filtered.length
      ? `Menampilkan ${filtered.length} dari ${products.length} produk`
      : 'Tidak ada produk ditemukan';
  }
}

function handleProductActions() {
  const tbody = document.getElementById('product-table-body');
  if (!tbody) return;

  tbody.addEventListener('click', event => {
    const target = event.target.closest('button');
    if (!target) return;

    const id = target.dataset.id;
    const products = getData(STORAGE_KEYS.products, []);
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) return;

    if (target.dataset.action === 'delete') {
      if (confirm('Hapus produk ini?')) {
        products.splice(productIndex, 1);
        setData(STORAGE_KEYS.products, products);
        toast.show('Produk berhasil dihapus.');
        renderProducts(document.getElementById('search-input')?.value.toLowerCase() ?? '');
      }
    }

    if (target.dataset.action === 'view-variants') {
      const product = products[productIndex];
      const variantText = product.variants
        .map(v => `• ${v.name} (${v.sku}) — Stok ${v.stock}, ${formatCurrency(v.price)}`)
        .join('\n');
      alert(`Varian ${product.name}:\n${variantText}`);
    }
  });

  tbody.addEventListener('change', event => {
    const input = event.target.closest('input[data-action="toggle-trade"]');
    if (!input) return;

    const id = input.dataset.id;
    const products = getData(STORAGE_KEYS.products, []);
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) return;

    products[productIndex].tradeIn = input.checked;
    setData(STORAGE_KEYS.products, products);
    toast.show(input.checked ? 'Trade-in diaktifkan.' : 'Trade-in dimatikan.');
  });
}

function handleSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', event => {
    const value = event.target.value.trim().toLowerCase();
    renderProducts(value);
  });
}

function handleSync() {
  const button = document.getElementById('sync-btn');
  if (!button) return;

  button.addEventListener('click', () => {
    button.disabled = true;
    button.textContent = 'Menyinkronkan...';
    setTimeout(() => {
      button.disabled = false;
      button.textContent = 'Sync ke Mubai Journal';
      toast.show('Produk berhasil disinkronkan.');
    }, 1200);
  });
}

function handleLogout() {
  const button = document.getElementById('logout-btn');
  if (!button) return;

  button.addEventListener('click', () => {
    setCurrentUser(null);
    window.location.href = 'index.html';
  });
}

function handleAddProductForm() {
  const form = document.getElementById('add-product-form');
  if (!form) return;

  const variantBody = document.getElementById('variant-body');
  const addVariantBtn = document.getElementById('add-variant-btn');

  addVariantBtn?.addEventListener('click', () => {
    const rowCount = variantBody.querySelectorAll('.variant-row').length;
    const row = document.createElement('tr');
    row.className = 'variant-row';
    row.innerHTML = `
      <td><input type="text" name="variant-name-${rowCount}" placeholder="Nama varian" required></td>
      <td><input type="text" name="variant-sku-${rowCount}" placeholder="SKU" required></td>
      <td><input type="number" name="variant-stock-${rowCount}" placeholder="0" min="0" required></td>
      <td><input type="number" name="variant-price-${rowCount}" placeholder="0" min="0" required></td>
      <td><button type="button" class="icon-btn danger remove-variant" aria-label="Hapus">🗑️</button></td>
    `;
    variantBody.appendChild(row);
  });

  variantBody?.addEventListener('click', event => {
    const button = event.target.closest('.remove-variant');
    if (!button) return;
    const rows = Array.from(variantBody.querySelectorAll('.variant-row'));
    if (rows.length <= 1) {
      toast.show('Minimal satu varian diperlukan.');
      return;
    }
    button.closest('tr').remove();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const products = getData(STORAGE_KEYS.products, []);

    const photos = Array.from({ length: 4 }, (_, index) => formData.get(`photo-${index}`)?.trim())
      .filter(Boolean);

    const variants = Array.from(form.querySelectorAll('.variant-row')).map(row => {
      const inputs = row.querySelectorAll('input');
      return {
        name: inputs[0].value.trim(),
        sku: inputs[1].value.trim(),
        stock: Number(inputs[2].value) || 0,
        price: Number(inputs[3].value) || 0
      };
    });

    const product = {
      id: crypto.randomUUID(),
      name: formData.get('name').trim(),
      category: formData.get('category').trim(),
      brand: formData.get('brand').trim(),
      link: formData.get('link').trim(),
      description: formData.get('description').trim(),
      tradeIn: form.querySelector('#trade-in-toggle').checked,
      photos,
      variants,
      createdAt: Date.now()
    };

    products.push(product);
    setData(STORAGE_KEYS.products, products);
    toast.show('Produk berhasil disimpan.');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 800);
  });
}

function initDashboard() {
  ensureSeeded();
  renderProducts();
  handleProductActions();
  handleSearch();
  handleSync();
}

function initPage() {
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    handleLogout();

    if (page === 'login') {
      handleLogin();
    }

    if (page === 'register') {
      handleRegister();
    }

    if (['dashboard', 'add-product'].includes(page)) {
      setupSidebarToggle();
      const user = ensureAuthenticatedPage();
      if (!user) return;
      document.querySelectorAll('.avatar').forEach(el => {
        el.textContent = user.name
          .split(' ')
          .map(part => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase();
      });
    }

    if (page === 'dashboard') {
      initDashboard();
    }

    if (page === 'add-product') {
      ensureSeeded();
      handleAddProductForm();
    }
  });
}

initPage();
