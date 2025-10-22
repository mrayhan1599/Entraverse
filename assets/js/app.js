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
    photos: [
      'https://images.unsplash.com/photo-1580894897617-4812950f48cd?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Headset VR canggih untuk pengalaman imersif dalam dunia virtual.',
    tradeIn: true,
    variants: [
      { name: 'Warna', options: ['Green', 'Clear', 'Dusty Blue'] },
      { name: 'Garansi', options: ['1 Tahun', 'Tanpa Garansi'] },
      { name: 'Kapasitas', options: ['128 GB', '256 GB', '1 TB'] }
    ],
    variantPricing: [
      {
        id: crypto.randomUUID(),
        variants: [
          { name: 'Warna', value: 'Green' },
          { name: 'Garansi', value: '1 Tahun' },
          { name: 'Kapasitas', value: '128 GB' }
        ],
        supplierPrice: '9000000',
        offlinePrice: '9555000',
        entraversePrice: '9700000',
        tokopediaPrice: '9750000',
        skuSeller: 'MQ3S-GRN-128',
        skuEntraverse: 'MQ3S-GRN-128-ENT',
        stock: '25',
        weight: '2000'
      },
      {
        id: crypto.randomUUID(),
        variants: [
          { name: 'Warna', value: 'Dusty Blue' },
          { name: 'Garansi', value: 'Tanpa Garansi' },
          { name: 'Kapasitas', value: '256 GB' }
        ],
        supplierPrice: '9250000',
        offlinePrice: '9799000',
        entraversePrice: '9899000',
        tokopediaPrice: '10000000',
        skuSeller: 'MQ3S-DBL-256',
        skuEntraverse: 'MQ3S-DBL-256-ENT',
        stock: '18',
        weight: '2050'
      }
    ],
    createdAt: Date.now()
  },
  {
    id: crypto.randomUUID(),
    name: 'Meta Quest 3S 256 GB Virtual Reality Headset',
    category: 'Virtual Reality',
    brand: 'Meta',
    photos: [
      'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Versi penyimpanan besar untuk koleksi aplikasi VR favorit.',
    tradeIn: false,
    variants: [
      { name: 'Warna', options: ['Graphite', 'Pearl'] },
      { name: 'Garansi', options: ['1 Tahun', '2 Tahun'] },
      { name: 'Kapasitas', options: ['256 GB'] }
    ],
    variantPricing: [
      {
        id: crypto.randomUUID(),
        variants: [
          { name: 'Warna', value: 'Graphite' },
          { name: 'Garansi', value: '1 Tahun' },
          { name: 'Kapasitas', value: '256 GB' }
        ],
        supplierPrice: '9800000',
        offlinePrice: '10350000',
        entraversePrice: '10499000',
        tokopediaPrice: '10699000',
        skuSeller: 'MQ3S-GPH-256',
        skuEntraverse: 'MQ3S-GPH-256-ENT',
        stock: '12',
        weight: '2100'
      },
      {
        id: crypto.randomUUID(),
        variants: [
          { name: 'Warna', value: 'Pearl' },
          { name: 'Garansi', value: '2 Tahun' },
          { name: 'Kapasitas', value: '256 GB' }
        ],
        supplierPrice: '10250000',
        offlinePrice: '10899000',
        entraversePrice: '10999000',
        tokopediaPrice: '11150000',
        skuSeller: 'MQ3S-PRL-256',
        skuEntraverse: 'MQ3S-PRL-256-ENT',
        stock: '9',
        weight: '2100'
      }
    ],
    createdAt: Date.now()
  }
];

const THEME_STORAGE_KEY = 'entraverse_theme_mode';
const THEME_MODES = ['system', 'light', 'dark'];
const DEFAULT_THEME_MODE = 'system';
const THEME_LABELS = {
  system: 'Auto (System)',
  light: 'Light Mode',
  dark: 'Dark Mode'
};
const THEME_ICON_MARKUP = {
  system: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v18m0 0a9 9 0 1 0 0-18"/></svg>',
  light: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.5v1.5m0 12v1.5m7.5-7.5h1.5m-18 0H3m13.364-6.364 1.06-1.06m-12.728 0-1.06-1.06m12.728 12.728 1.06 1.06m-12.728 0-1.06 1.06M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z"/></svg>',
  dark: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12.79A9 9 0 1 1 11.21 3a7.5 7.5 0 0 0 9.79 9.79z"/></svg>'
};

const systemDarkQuery = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : null;

let themeControls = [];
let themeListenersAttached = false;
let systemPreferenceListenerAttached = false;

function isValidThemeMode(mode) {
  return THEME_MODES.includes(mode);
}

function resolveTheme(mode) {
  if (mode === 'dark') return 'dark';
  if (mode === 'light') return 'light';
  if (systemDarkQuery && typeof systemDarkQuery.matches === 'boolean') {
    return systemDarkQuery.matches ? 'dark' : 'light';
  }
  return 'light';
}

function getStoredThemeMode() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.warn('Unable to read stored theme mode', error);
    return null;
  }
}

function persistThemeMode(mode) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (error) {
    console.warn('Unable to persist theme mode', error);
  }
}

function setColorScheme(resolved) {
  document.documentElement.style.setProperty('color-scheme', resolved === 'dark' ? 'dark' : 'light');
}

function refreshSystemTheme() {
  if (document.body.dataset.themeMode !== 'system') {
    return;
  }
  const resolved = resolveTheme('system');
  document.body.dataset.theme = resolved;
  setColorScheme(resolved);
  updateThemeControlsUI('system');
}

function handleSystemPreferenceChange() {
  refreshSystemTheme();
}

function attachSystemPreferenceListener() {
  if (!systemDarkQuery || systemPreferenceListenerAttached) {
    return;
  }
  if (typeof systemDarkQuery.addEventListener === 'function') {
    systemDarkQuery.addEventListener('change', handleSystemPreferenceChange);
  } else if (typeof systemDarkQuery.addListener === 'function') {
    systemDarkQuery.addListener(handleSystemPreferenceChange);
  }
  systemPreferenceListenerAttached = true;
}

function detachSystemPreferenceListener() {
  if (!systemDarkQuery || !systemPreferenceListenerAttached) {
    return;
  }
  if (typeof systemDarkQuery.removeEventListener === 'function') {
    systemDarkQuery.removeEventListener('change', handleSystemPreferenceChange);
  } else if (typeof systemDarkQuery.removeListener === 'function') {
    systemDarkQuery.removeListener(handleSystemPreferenceChange);
  }
  systemPreferenceListenerAttached = false;
}

function updateThemeControlsUI(mode) {
  if (!themeControls.length) return;
  const normalizedMode = isValidThemeMode(mode) ? mode : DEFAULT_THEME_MODE;
  const resolved = resolveTheme(normalizedMode);

  themeControls.forEach(control => {
    const label = control.querySelector('[data-theme-label]');
    if (label) {
      label.textContent = THEME_LABELS[normalizedMode] ?? THEME_LABELS[DEFAULT_THEME_MODE];
    }

    const iconTarget = control.querySelector('[data-theme-icon]');
    if (iconTarget) {
      const markup = THEME_ICON_MARKUP[normalizedMode] ?? '';
      iconTarget.innerHTML = markup;
      iconTarget.dataset.iconMode = normalizedMode;
      iconTarget.dataset.iconTheme = resolved;
    }

    control.querySelectorAll('[data-theme-option]').forEach(option => {
      const isActive = option.dataset.themeOption === normalizedMode;
      option.setAttribute('aria-selected', isActive ? 'true' : 'false');
      option.classList.toggle('is-active', isActive);
    });
  });
}

function setThemeControlOpen(control, open) {
  if (!control) return;
  const trigger = control.querySelector('[data-theme-trigger]');
  if (trigger) {
    trigger.setAttribute('aria-expanded', String(open));
  }
  control.classList.toggle('open', open);
  control.querySelectorAll('[data-theme-option]').forEach(option => {
    option.tabIndex = open ? 0 : -1;
  });
}

function closeThemeControls(except) {
  themeControls.forEach(control => {
    if (control !== except) {
      setThemeControlOpen(control, false);
    }
  });
}

function handleThemeControlDocumentClick(event) {
  if (!themeControls.length) return;
  const control = event.target.closest('[data-theme-control]');
  if (!control || !themeControls.includes(control)) {
    closeThemeControls();
  }
}

function handleThemeControlEscape(event) {
  if (event.key === 'Escape') {
    closeThemeControls();
  }
}

function applyTheme(mode, { skipStorage } = {}) {
  const normalizedMode = isValidThemeMode(mode) ? mode : DEFAULT_THEME_MODE;
  const resolved = resolveTheme(normalizedMode);

  document.body.dataset.themeMode = normalizedMode;
  document.body.dataset.theme = resolved;
  setColorScheme(resolved);

  if (!skipStorage) {
    persistThemeMode(normalizedMode);
  }

  updateThemeControlsUI(normalizedMode);

  if (normalizedMode === 'system') {
    refreshSystemTheme();
    attachSystemPreferenceListener();
  } else {
    detachSystemPreferenceListener();
  }

  return resolved;
}

function initializeTheme() {
  const storedMode = getStoredThemeMode();
  const initialMode = isValidThemeMode(storedMode) ? storedMode : DEFAULT_THEME_MODE;
  applyTheme(initialMode, { skipStorage: true });
}

function setupThemeControls() {
  themeControls = Array.from(document.querySelectorAll('[data-theme-control]'));
  if (!themeControls.length) {
    return;
  }

  const currentMode = document.body.dataset.themeMode || DEFAULT_THEME_MODE;

  themeControls.forEach(control => {
    const trigger = control.querySelector('[data-theme-trigger]');
    const options = Array.from(control.querySelectorAll('[data-theme-option]'));

    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
    }

    options.forEach(option => {
      option.tabIndex = -1;
      const icon = option.querySelector('[data-theme-option-icon]');
      const optionMode = option.dataset.themeOption;
      if (icon && optionMode && THEME_ICON_MARKUP[optionMode]) {
        icon.innerHTML = THEME_ICON_MARKUP[optionMode];
      }
    });

    const openMenu = () => {
      closeThemeControls(control);
      setThemeControlOpen(control, true);
      options[0]?.focus();
    };

    trigger?.addEventListener('click', event => {
      event.preventDefault();
      const isOpen = control.classList.contains('open');
      if (isOpen) {
        setThemeControlOpen(control, false);
      } else {
        openMenu();
      }
    });

    trigger?.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const isOpen = control.classList.contains('open');
        if (isOpen) {
          setThemeControlOpen(control, false);
        } else {
          openMenu();
        }
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (!control.classList.contains('open')) {
          openMenu();
        } else {
          options[0]?.focus();
        }
      }
    });

    options.forEach((option, index) => {
      const selectOption = () => {
        applyTheme(option.dataset.themeOption);
        closeThemeControls();
        setThemeControlOpen(control, false);
        trigger?.focus();
      };

      option.addEventListener('click', selectOption);

      option.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectOption();
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          setThemeControlOpen(control, false);
          trigger?.focus();
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          options[(index + 1) % options.length]?.focus();
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          options[(index - 1 + options.length) % options.length]?.focus();
        }
      });
    });
  });

  if (!themeListenersAttached) {
    document.addEventListener('click', handleThemeControlDocumentClick);
    document.addEventListener('keydown', handleThemeControlEscape);
    window.addEventListener('focus', refreshSystemTheme);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        refreshSystemTheme();
      }
    });
    themeListenersAttached = true;
  }

  updateThemeControlsUI(currentMode);
  if (currentMode === 'system') {
    attachSystemPreferenceListener();
    refreshSystemTheme();
  } else {
    detachSystemPreferenceListener();
  }
}

initializeTheme();

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

function normalizeVariants(variants) {
  if (!Array.isArray(variants)) {
    return [];
  }

  return variants
    .map(variant => {
      if (!variant) return null;
      const name = (variant.name ?? '').toString().trim() || 'Varian';

      if (Array.isArray(variant.options)) {
        const options = variant.options
          .map(option => option?.toString().trim())
          .filter(Boolean);
        if (options.length) {
          return { name, options };
        }
      }

      const fallback = [];
      const pushOption = value => {
        if (value === null || value === undefined) return;
        const text = value.toString().trim();
        if (text) {
          fallback.push(text);
        }
      };

      pushOption(variant.option);
      pushOption(variant.value);
      pushOption(variant.label);

      if (variant.sku) {
        pushOption(`SKU ${variant.sku}`);
      }

      if (variant.stock !== undefined) {
        pushOption(`Stok ${variant.stock}`);
      }

      if (typeof variant.price === 'number' && !Number.isNaN(variant.price)) {
        pushOption(formatCurrency(variant.price));
      }

      if (!fallback.length && variant.name) {
        pushOption(variant.name);
      }

      if (!fallback.length) {
        return null;
      }

      return { name, options: fallback };
    })
    .filter(Boolean);
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
        </div>
      </td>
      <td>
        <div class="photo-preview">
          ${product.photos?.length ? `<img src="${product.photos[0]}" alt="${product.name}">` : 'No Photo'}
        </div>
      </td>
      <td>
        <label class="switch">
          <input type="checkbox" ${product.tradeIn ? 'checked' : ''} data-action="toggle-trade" data-id="${product.id}">
          <span class="slider"></span>
        </label>
      </td>
      <td>
        <div class="table-actions">
          <button class="icon-btn small" type="button" data-action="edit" data-id="${product.id}" title="Edit">✏️</button>
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

    if (target.dataset.action === 'edit') {
      window.location.href = `add-product.html?id=${id}`;
      return;
    }

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
      const normalizedVariants = normalizeVariants(product.variants);
      const variantText = normalizedVariants.length
        ? normalizedVariants.map(v => `• ${v.name}: ${v.options.join(', ')}`).join('\n')
        : 'Belum ada varian yang disimpan.';
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

  const hiddenLabel = button.querySelector('[data-label]');
  const defaultLabel = button.dataset.labelDefault || 'Sync ke Mekari Jurnal';
  const loadingLabel = button.dataset.labelLoading || 'Menyinkronkan...';

  const setLabel = value => {
    if (hiddenLabel) {
      hiddenLabel.textContent = value;
    }
    button.setAttribute('aria-label', value);
  };

  setLabel(defaultLabel);

  button.addEventListener('click', () => {
    if (button.disabled) return;

    button.disabled = true;
    button.classList.add('is-loading');
    setLabel(loadingLabel);
    setTimeout(() => {
      button.disabled = false;
      button.classList.remove('is-loading');
      setLabel(defaultLabel);
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
  const pricingBody = document.getElementById('variant-pricing-body');
  const pricingHeaderRow = document.getElementById('variant-pricing-header');
  const addVariantBtn = document.getElementById('add-variant-btn');
  const addPricingRowBtn = document.getElementById('add-pricing-row-btn');
  const photoInputs = Array.from(form.querySelectorAll('[data-photo-field]'));
  const titleEl = document.getElementById('product-form-title');
  const subtitleEl = document.getElementById('product-form-subtitle');
  const submitBtn = form.querySelector('.primary-btn');
  const params = new URLSearchParams(window.location.search);
  const editingId = params.get('id');
  let suppressPricingRefresh = false;

  const clearPreview = (container, preview, input) => {
    if (!container || !preview) return;
    preview.removeAttribute('src');
    preview.hidden = true;
    container.classList.remove('has-image');
    delete container.dataset.photoValue;
    if (input) {
      input.value = '';
    }
  };

  photoInputs.forEach(input => {
    const container = input.closest('.image-upload');
    const dropzone = container?.querySelector('[data-photo-preview]');
    const preview = container?.querySelector('[data-preview-image]');

    if (!container || !dropzone || !preview) {
      return;
    }

    const handleFileChange = () => {
      const [file] = input.files ?? [];
      if (!file) {
        clearPreview(container, preview, input);
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.show('Pilih file gambar dengan format yang didukung.');
        clearPreview(container, preview, input);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result !== 'string') {
          toast.show('Gagal membaca file gambar.');
          clearPreview(container, preview, input);
          return;
        }

        preview.src = result;
        preview.alt = file.name ? `Foto ${file.name}` : 'Foto produk';
        preview.hidden = false;
        container.classList.add('has-image');
        container.dataset.photoValue = result;
      };

      reader.onerror = () => {
        toast.show('Gagal memuat gambar, coba lagi.');
        clearPreview(container, preview, input);
      };

      reader.readAsDataURL(file);
    };

    dropzone.addEventListener('click', event => {
      event.preventDefault();
      input.click();
    });

    dropzone.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        input.click();
      }
    });

    dropzone.addEventListener('focus', () => {
      dropzone.classList.add('is-focused');
    });

    dropzone.addEventListener('blur', () => {
      dropzone.classList.remove('is-focused');
    });

    input.addEventListener('focus', () => {
      dropzone.classList.add('is-focused');
    });

    input.addEventListener('blur', () => {
      dropzone.classList.remove('is-focused');
    });

    input.addEventListener('change', handleFileChange);

    preview.addEventListener('error', () => {
      toast.show('Tidak dapat menampilkan gambar tersebut.');
      clearPreview(container, preview, input);
    });
  });

  const getVariantDefinitions = () => {
    if (!variantBody) return [];
    return Array.from(variantBody.querySelectorAll('.variant-row')).map((row, index) => {
      const nameInput = row.querySelector('.variant-name');
      const rawName = (nameInput?.value ?? '').toString().trim();
      const options = Array.from(row.querySelectorAll('[data-option-chip]'))
        .map(chip => chip.dataset.optionValue?.toString().trim())
        .filter(Boolean);
      return {
        name: rawName || `Varian ${index + 1}`,
        rawName,
        options
      };
    });
  };

  function collectPricingRows(variantDefs = getVariantDefinitions()) {
    if (!pricingBody) return [];
    return Array.from(pricingBody.querySelectorAll('.pricing-row')).map(row => {
      const getValue = selector => {
        const field = row.querySelector(selector);
        if (!field) return '';
        return (field.value ?? '').toString().trim();
      };

      const data = {
        id: row.dataset.pricingId || null,
        supplierPrice: getValue('[data-field="supplierPrice"]'),
        offlinePrice: getValue('[data-field="offlinePrice"]'),
        entraversePrice: getValue('[data-field="entraversePrice"]'),
        tokopediaPrice: getValue('[data-field="tokopediaPrice"]'),
        skuSeller: getValue('[data-field="skuSeller"]'),
        skuEntraverse: getValue('[data-field="skuEntraverse"]'),
        stock: getValue('[data-field="stock"]'),
        weight: getValue('[data-field="weight"]')
      };

      if (variantDefs.length) {
        data.variants = variantDefs.map((variant, index) => {
          const select = row.querySelector(`[data-variant-select="${index}"]`);
          const value = select ? (select.value ?? '').toString().trim() : '';
          return {
            name: variant.rawName || variant.name,
            value
          };
        });
      } else {
        data.variantLabel = getValue('[data-field="variantLabel"]');
      }

      return data;
    });
  }

  function hydratePricingRow(row, initialData = {}, variantDefs = getVariantDefinitions()) {
    if (!row) return;

    if (initialData.id) {
      row.dataset.pricingId = initialData.id;
    }

    if (variantDefs.length) {
      const valueMap = new Map();
      if (Array.isArray(initialData.variants)) {
        initialData.variants.forEach(item => {
          if (!item) return;
          const key = (item.name ?? '').toString().trim().toLowerCase();
          if (!key) return;
          valueMap.set(key, (item.value ?? '').toString().trim());
        });
      }

      variantDefs.forEach((variant, index) => {
        const select = row.querySelector(`[data-variant-select="${index}"]`);
        if (!select) return;
        const keys = [variant.rawName, variant.name]
          .map(name => (name ?? '').toString().trim().toLowerCase())
          .filter(Boolean);

        let value = '';
        for (const key of keys) {
          if (valueMap.has(key)) {
            value = valueMap.get(key) ?? '';
            break;
          }
        }

        if (value) {
          const exists = Array.from(select.options).some(option => option.value === value);
          if (!exists) {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            option.dataset.temporaryOption = 'true';
            select.appendChild(option);
          }
          select.value = value;
        }
      });
    } else if (initialData.variantLabel) {
      const variantInput = row.querySelector('[data-field="variantLabel"]');
      if (variantInput) {
        variantInput.value = initialData.variantLabel;
      }
    }

    [
      'supplierPrice',
      'offlinePrice',
      'entraversePrice',
      'tokopediaPrice',
      'skuSeller',
      'skuEntraverse',
      'stock',
      'weight'
    ].forEach(field => {
      const input = row.querySelector(`[data-field="${field}"]`);
      if (input && initialData[field] !== undefined && initialData[field] !== null) {
        input.value = initialData[field];
      }
    });
  }

  function createPricingRow(initialData = {}, variantDefs = getVariantDefinitions()) {
    if (!pricingBody) return null;

    const row = document.createElement('tr');
    row.className = 'pricing-row';

    if (variantDefs.length) {
      variantDefs.forEach((variant, index) => {
        const cell = document.createElement('td');
        cell.dataset.pricingVariantCell = 'true';
        const select = document.createElement('select');
        select.dataset.variantSelect = index;
        select.innerHTML = `<option value="">Pilih ${variant.name}</option>`;
        variant.options.forEach(option => {
          const opt = document.createElement('option');
          opt.value = option;
          opt.textContent = option;
          select.appendChild(opt);
        });
        select.setAttribute('aria-label', `Pilih ${variant.name}`);
        cell.appendChild(select);
        row.appendChild(cell);
      });
    } else {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Contoh: Varian Utama';
      input.dataset.field = 'variantLabel';
      cell.appendChild(input);
      row.appendChild(cell);
    }

    const buildInputCell = (field, placeholder, type = 'text') => {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = type;
      input.placeholder = placeholder;
      input.dataset.field = field;
      if (['supplierPrice', 'offlinePrice', 'entraversePrice', 'tokopediaPrice'].includes(field)) {
        input.inputMode = 'numeric';
        input.classList.add('numeric-input');
      }
      if (field === 'stock' || field === 'weight') {
        input.inputMode = 'numeric';
        input.pattern = '[0-9]*';
      }
      cell.appendChild(input);
      row.appendChild(cell);
    };

    buildInputCell('supplierPrice', 'Rp 0');
    buildInputCell('offlinePrice', 'Rp 0');
    buildInputCell('entraversePrice', 'Rp 0');
    buildInputCell('tokopediaPrice', 'Rp 0');
    buildInputCell('skuSeller', 'SKU Penjual');
    buildInputCell('skuEntraverse', 'SKU Entraverse');
    buildInputCell('stock', 'Stok');
    buildInputCell('weight', 'Gram');

    const actionsCell = document.createElement('td');
    actionsCell.className = 'variant-actions';
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'icon-btn danger small remove-pricing-row';
    removeBtn.setAttribute('aria-label', 'Hapus baris harga');
    removeBtn.textContent = '🗑️';
    actionsCell.appendChild(removeBtn);
    row.appendChild(actionsCell);

    pricingBody.appendChild(row);
    hydratePricingRow(row, initialData, variantDefs);
    return row;
  }

  function refreshPricingTableStructure() {
    if (!pricingBody || !pricingHeaderRow || suppressPricingRefresh) {
      return;
    }

    const variantDefs = getVariantDefinitions();
    const existingData = collectPricingRows(variantDefs);

    pricingHeaderRow.innerHTML = '';
    if (variantDefs.length) {
      variantDefs.forEach(variant => {
        const th = document.createElement('th');
        th.textContent = variant.name;
        pricingHeaderRow.appendChild(th);
      });
    } else {
      const th = document.createElement('th');
      th.textContent = 'Varian';
      pricingHeaderRow.appendChild(th);
    }

    [
      'Harga Supplier',
      'Harga Jual Offline',
      'Harga Jual Entraverse.id',
      'Harga Jual Tokopedia',
      'SKU Penjual',
      'SKU Entraverse',
      'Stok',
      'Berat Barang',
      ''
    ].forEach(label => {
      const th = document.createElement('th');
      th.textContent = label;
      if (!label) {
        th.className = 'actions-col';
      }
      pricingHeaderRow.appendChild(th);
    });

    pricingBody.innerHTML = '';
    if (!existingData.length) {
      existingData.push({});
    }

    existingData.forEach(data => {
      createPricingRow(data, variantDefs);
    });
  }

  const variantRowTemplate = () => `
    <td>
      <input type="text" class="variant-name" placeholder="Contoh: Warna" required>
    </td>
    <td>
      <div class="variant-options" data-options>
        <div class="variant-options-list" data-options-list></div>
        <div class="variant-options-input">
          <input type="text" class="variant-option-field" placeholder="Tambah opsi (Enter)" aria-label="Tambah opsi varian" data-option-input>
          <button type="button" class="btn ghost-btn small" data-add-option>Tambah</button>
        </div>
        <p class="field-hint">Contoh: Merah, Biru, Hijau.</p>
      </div>
    </td>
    <td class="variant-actions">
      <button type="button" class="icon-btn danger remove-variant" aria-label="Hapus varian">🗑️</button>
    </td>
  `;

  function addOptionChip(list, rawValue, { silent = false } = {}) {
    if (!list) return false;
    const value = rawValue?.toString().trim();
    if (!value) {
      if (!silent) {
        toast.show('Masukkan nama opsi terlebih dahulu.');
      }
      return false;
    }

    const normalized = value.toLowerCase();
    const exists = Array.from(list.querySelectorAll('[data-option-chip]')).some(
      chip => chip.dataset.optionValue?.toLowerCase() === normalized
    );

    if (exists) {
      if (!silent) {
        toast.show('Opsi tersebut sudah ada.');
      }
      return false;
    }

    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'option-chip';
    chip.dataset.optionChip = 'true';
    chip.dataset.optionValue = value;
    chip.innerHTML = `<span>${value}</span><span aria-hidden="true">×</span>`;
    chip.setAttribute('aria-label', `Hapus opsi ${value}`);
    list.appendChild(chip);

    if (!silent && !suppressPricingRefresh) {
      refreshPricingTableStructure();
    }

    return true;
  }

  function hydrateVariantRow(row, initialVariant = null) {
    if (!row) return;
    const optionsList = row.querySelector('[data-options-list]');
    if (initialVariant?.name) {
      const nameInput = row.querySelector('.variant-name');
      if (nameInput) {
        nameInput.value = initialVariant.name;
      }
    }

    if (Array.isArray(initialVariant?.options)) {
      initialVariant.options.forEach(option => addOptionChip(optionsList, option, { silent: true }));
    }
  }

  function createVariantRow(initialVariant = null) {
    if (!variantBody) return null;
    const row = document.createElement('tr');
    row.className = 'variant-row';
    row.innerHTML = variantRowTemplate();
    variantBody.appendChild(row);
    hydrateVariantRow(row, initialVariant);
    if (!suppressPricingRefresh) {
      refreshPricingTableStructure();
    }
    return row;
  }

  const handleAddOption = container => {
    if (!container) return;
    const input = container.querySelector('[data-option-input]');
    const list = container.querySelector('[data-options-list]');
    if (!input || !list) return;

    const added = addOptionChip(list, input.value);
    if (added) {
      input.value = '';
    }
    input.focus();
  };

  addVariantBtn?.addEventListener('click', () => {
    createVariantRow();
  });

  variantBody?.addEventListener('click', event => {
    const addButton = event.target.closest('[data-add-option]');
    if (addButton) {
      handleAddOption(addButton.closest('[data-options]'));
      return;
    }

    const chip = event.target.closest('[data-option-chip]');
    if (chip) {
      chip.remove();
      if (!suppressPricingRefresh) {
        refreshPricingTableStructure();
      }
      return;
    }

    const button = event.target.closest('.remove-variant');
    if (!button) return;
    const rows = Array.from(variantBody.querySelectorAll('.variant-row'));
    if (rows.length <= 1) {
      toast.show('Minimal satu varian diperlukan.');
      return;
    }
    button.closest('tr')?.remove();
    if (!suppressPricingRefresh) {
      refreshPricingTableStructure();
    }
  });

  variantBody?.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    if (!event.target.matches('[data-option-input]')) return;
    event.preventDefault();
    handleAddOption(event.target.closest('[data-options]'));
  });

  variantBody?.addEventListener('input', event => {
    if (!event.target.matches('.variant-name')) return;
    if (!suppressPricingRefresh) {
      refreshPricingTableStructure();
    }
  });

  addPricingRowBtn?.addEventListener('click', () => {
    createPricingRow({}, getVariantDefinitions());
  });

  pricingBody?.addEventListener('click', event => {
    const button = event.target.closest('.remove-pricing-row');
    if (!button) return;
    const rows = Array.from(pricingBody.querySelectorAll('.pricing-row'));
    if (rows.length <= 1) {
      const fields = rows[0]?.querySelectorAll('input, select');
      fields?.forEach(field => {
        if (field.tagName === 'SELECT') {
          field.value = '';
        } else {
          field.value = '';
        }
      });
      return;
    }
    button.closest('tr')?.remove();
  });

  if (editingId) {
    const products = getData(STORAGE_KEYS.products, []);
    const product = products.find(p => p.id === editingId);

    if (!product) {
      toast.show('Produk tidak ditemukan.');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 900);
      if (!variantBody?.children.length) {
        createVariantRow();
      }
      return;
    }

    form.dataset.editingId = product.id;

    if (titleEl) {
      titleEl.textContent = 'Edit Produk';
    }
    if (subtitleEl) {
      subtitleEl.textContent = 'Perbarui detail produk dan varian Anda.';
    }
    if (submitBtn) {
      submitBtn.textContent = 'Simpan Perubahan';
    }

    const nameInput = form.querySelector('#product-name');
    if (nameInput) {
      nameInput.value = product.name ?? '';
    }
    const categoryInput = form.querySelector('#product-category');
    if (categoryInput) {
      categoryInput.value = product.category ?? '';
    }
    const brandInput = form.querySelector('#product-brand');
    if (brandInput) {
      brandInput.value = product.brand ?? '';
    }
    const descriptionInput = form.querySelector('#product-description');
    if (descriptionInput) {
      descriptionInput.value = product.description ?? '';
    }
    const tradeToggle = form.querySelector('#trade-in-toggle');
    if (tradeToggle) {
      tradeToggle.checked = Boolean(product.tradeIn);
    }

    if (Array.isArray(product.photos)) {
      product.photos.slice(0, photoInputs.length).forEach((photo, index) => {
        const inputField = photoInputs[index];
        if (!inputField) return;
        const container = inputField.closest('.image-upload');
        const preview = container?.querySelector('[data-preview-image]');
        if (!container || !preview) return;
        preview.src = photo;
        preview.alt = product.name ? `Foto ${product.name}` : 'Foto produk';
        preview.hidden = false;
        container.classList.add('has-image');
        container.dataset.photoValue = photo;
      });
    }

    if (variantBody) {
      suppressPricingRefresh = true;
      variantBody.innerHTML = '';
      if (Array.isArray(product.variants) && product.variants.length) {
        product.variants.forEach(variant => createVariantRow(variant));
      } else {
        createVariantRow();
      }
      suppressPricingRefresh = false;
      refreshPricingTableStructure();
    }

    if (pricingBody) {
      pricingBody.innerHTML = '';
      const defs = getVariantDefinitions();
      const pricingData = Array.isArray(product.variantPricing) && product.variantPricing.length
        ? product.variantPricing
        : [{}];
      pricingData.forEach(data => createPricingRow(data, defs));
    }
  } else {
    createVariantRow();
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const products = getData(STORAGE_KEYS.products, []);

    const photos = photoInputs
      .map(input => input.closest('.image-upload')?.dataset.photoValue)
      .filter(Boolean);

    const variantRows = Array.from(form.querySelectorAll('.variant-row'));
    const variants = [];

    for (const row of variantRows) {
      const nameInput = row.querySelector('.variant-name');
      const optionChips = Array.from(row.querySelectorAll('[data-option-chip]'));
      const name = nameInput?.value.trim();
      const options = optionChips.map(chip => chip.dataset.optionValue).filter(Boolean);

      if (!name) {
        toast.show('Nama varian tidak boleh kosong.');
        nameInput?.focus();
        return;
      }

      if (!options.length) {
        toast.show(`Tambahkan minimal satu opsi untuk ${name}.`);
        row.querySelector('[data-option-input]')?.focus();
        return;
      }

      variants.push({ name, options });
    }

    const variantDefs = getVariantDefinitions();
    const rawPricingRows = collectPricingRows(variantDefs);
    const normalizedPricing = rawPricingRows.map(row => {
      const normalized = {
        supplierPrice: (row.supplierPrice ?? '').toString().trim(),
        offlinePrice: (row.offlinePrice ?? '').toString().trim(),
        entraversePrice: (row.entraversePrice ?? '').toString().trim(),
        tokopediaPrice: (row.tokopediaPrice ?? '').toString().trim(),
        skuSeller: (row.skuSeller ?? '').toString().trim(),
        skuEntraverse: (row.skuEntraverse ?? '').toString().trim(),
        stock: (row.stock ?? '').toString().trim(),
        weight: (row.weight ?? '').toString().trim()
      };

      if (row.id) {
        normalized.id = row.id;
      }

      if (variantDefs.length) {
        normalized.variants = variantDefs.map((variant, index) => {
          const source = row.variants?.[index];
          const value = (source?.value ?? '').toString().trim();
          const variantName = (variant.rawName || variant.name).toString().trim();
          return { name: variantName, value };
        });
      } else {
        normalized.variantLabel = (row.variantLabel ?? '').toString().trim();
      }

      return normalized;
    });

    const filteredPricing = normalizedPricing.filter(row => {
      const detailValues = [
        row.supplierPrice,
        row.offlinePrice,
        row.entraversePrice,
        row.tokopediaPrice,
        row.skuSeller,
        row.skuEntraverse,
        row.stock,
        row.weight
      ].map(value => (value ?? '').toString().trim());
      const hasDetails = detailValues.some(Boolean);

      if (variantDefs.length) {
        const hasVariantValue = row.variants?.some(variant => (variant?.value ?? '').toString().trim());
        return hasDetails || hasVariantValue;
      }

      return hasDetails || (row.variantLabel ?? '').toString().trim();
    });

    if (variantDefs.length) {
      const invalidCombination = filteredPricing.some(row => row.variants?.some(variant => !variant.value));
      if (invalidCombination) {
        toast.show('Lengkapi pilihan varian pada daftar harga.');
        return;
      }
    }

    filteredPricing.forEach(row => {
      if (!row.id) {
        row.id = crypto.randomUUID();
      }
    });

    const isEditing = Boolean(form.dataset.editingId);
    const timestamp = Date.now();
    const productId = isEditing ? form.dataset.editingId : crypto.randomUUID();
    let productIndex = -1;

    if (isEditing) {
      productIndex = products.findIndex(p => p.id === productId);
      if (productIndex === -1) {
        toast.show('Produk tidak ditemukan.');
        return;
      }
    }

    const productPayload = {
      id: productId,
      name: (formData.get('name') ?? '').toString().trim(),
      category: (formData.get('category') ?? '').toString().trim(),
      brand: (formData.get('brand') ?? '').toString().trim(),
      description: (formData.get('description') ?? '').toString().trim(),
      tradeIn: form.querySelector('#trade-in-toggle')?.checked ?? false,
      photos,
      variants,
      variantPricing: filteredPricing
    };

    if (isEditing) {
      const existing = products[productIndex];
      productPayload.createdAt = existing?.createdAt ?? timestamp;
      productPayload.updatedAt = timestamp;
      products[productIndex] = productPayload;
    } else {
      productPayload.createdAt = timestamp;
      products.push(productPayload);
    }

    setData(STORAGE_KEYS.products, products);
    toast.show(isEditing ? 'Produk berhasil diperbarui.' : 'Produk berhasil disimpan.');
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
    setupThemeControls();

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
