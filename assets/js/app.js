const STORAGE_KEYS = {
  users: 'entraverse_users',
  session: 'entraverse_session',
  products: 'entraverse_products',
  categories: 'entraverse_categories'
};

const GUEST_USER = Object.freeze({
  id: 'guest-user',
  name: 'Tamu Entraverse',
  company: 'Entraverse',
  email: 'guest@entraverse.local'
});

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

const DEFAULT_CATEGORIES = [
  {
    id: 'cat-virtual-reality',
    name: 'Virtual Reality',
    note: 'Headset, controller, dan aksesoris AR/VR',
    fees: { marketplace: '10.3%', shopee: '8.0%', entraverse: '8.00%' },
    margin: { value: '10.00%', trend: 'up', note: '+1.2% vs bulan lalu' },
    bonus: null
  },
  {
    id: 'cat-konsol-game',
    name: 'Konsol Game',
    note: 'PlayStation, Xbox, dan Nintendo resmi',
    fees: { marketplace: '10.3%', shopee: '8.0%', entraverse: '8.00%' },
    margin: { value: '9.40%', trend: 'up', note: '+0.5% dibanding Q1' },
    bonus: 'Campaign Flash Sale'
  },
  {
    id: 'cat-handphone',
    name: 'Handphone',
    note: 'Smartphone flagship & mid-range',
    fees: { marketplace: '9.5%', shopee: '7.5%', entraverse: '7.40%' },
    margin: { value: '8.20%', trend: 'down', note: '-0.3% vs bulan lalu' },
    bonus: null
  },
  {
    id: 'cat-laptop',
    name: 'Laptop',
    note: 'Laptop consumer dan bisnis',
    fees: { marketplace: '10.0%', shopee: '8.0%', entraverse: '8.25%' },
    margin: { value: '11.40%', trend: 'up', note: '+0.8% vs bulan lalu' },
    bonus: 'Subsidi ongkir'
  },
  {
    id: 'cat-tablet',
    name: 'Tablet',
    note: 'Tablet Android & iPad',
    fees: { marketplace: '9.8%', shopee: '7.8%', entraverse: '7.90%' },
    margin: { value: '9.75%', trend: 'up', note: '+0.2% vs bulan lalu' },
    bonus: null
  },
  {
    id: 'cat-audio',
    name: 'Audio',
    note: 'Headphone, speaker, dan audio pro',
    fees: { marketplace: '8.5%', shopee: '7.0%', entraverse: '7.10%' },
    margin: { value: '12.60%', trend: 'up', note: '+1.0% dibanding Q1' },
    bonus: 'Bundling voucher'
  },
  {
    id: 'cat-smart-home',
    name: 'Smart Home',
    note: 'Perangkat IoT & otomasi rumah',
    fees: { marketplace: '8.0%', shopee: '6.5%', entraverse: '6.75%' },
    margin: { value: '13.20%', trend: 'up', note: '+1.8% vs bulan lalu' },
    bonus: null
  },
  {
    id: 'cat-outdoor-outtam',
    name: 'Outdoor - Outtam',
    note: 'Peralatan outdoor & travelling',
    fees: { marketplace: '7.5%', shopee: '6.2%', entraverse: '6.40%' },
    margin: { value: '10.80%', trend: 'up', note: '+0.6% dibanding Q1' },
    bonus: 'Bonus katalog'
  },
  {
    id: 'cat-aksesoris',
    name: 'Aksesoris',
    note: 'Aksesoris gadget & lifestyle',
    fees: { marketplace: '8.8%', shopee: '6.9%', entraverse: '7.10%' },
    margin: { value: '9.10%', trend: 'down', note: '-0.2% vs bulan lalu' },
    bonus: null
  }
];

const BANK_INDONESIA_EXCHANGE_ENDPOINT = 'https://www.bi.go.id/biwebservice/dataservice.svc/spotrate?$format=json';
const BANK_INDONESIA_SUPPORTED_CURRENCIES = Object.freeze(['IDR', 'USD', 'SGD', 'EUR']);

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

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return '';
  }
  return value
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

function getCategories() {
  const categories = getData(STORAGE_KEYS.categories, null);
  if (!Array.isArray(categories)) {
    return [];
  }
  return categories.filter(category => category && typeof category === 'object');
}

function saveCategories(categories) {
  setData(STORAGE_KEYS.categories, categories);
  document.dispatchEvent(new CustomEvent('categories:changed', {
    detail: { categories: clone(categories) }
  }));
}

function ensureSeeded() {
  const existingProducts = getData(STORAGE_KEYS.products, null);
  if (!existingProducts) {
    setData(STORAGE_KEYS.products, DEFAULT_PRODUCTS);
  }

  const existingCategories = getData(STORAGE_KEYS.categories, null);
  if (!Array.isArray(existingCategories)) {
    setData(STORAGE_KEYS.categories, DEFAULT_CATEGORIES);
  } else {
    const normalized = [];
    let mutated = false;

    existingCategories.forEach(category => {
      if (!category || typeof category !== 'object') {
        mutated = true;
        return;
      }
      const withId = { ...category };
      if (!withId.id) {
        withId.id = crypto.randomUUID();
        mutated = true;
      }
      normalized.push(withId);
    });

    if (!normalized.length && existingCategories.length) {
      setData(STORAGE_KEYS.categories, DEFAULT_CATEGORIES);
    } else if (mutated) {
      setData(STORAGE_KEYS.categories, normalized);
    }
  }
}

function getGuestUser() {
  return { ...GUEST_USER };
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

function parseNumericValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'bigint') {
    return Number(value);
  }

  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const sanitized = trimmed.replace(/\s+/g, '');
  const lastComma = sanitized.lastIndexOf(',');
  const lastDot = sanitized.lastIndexOf('.');
  const hasComma = lastComma !== -1;
  const hasDot = lastDot !== -1;
  let normalized = sanitized;

  if (hasComma || hasDot) {
    const decimalIndex = Math.max(lastComma, lastDot);
    const decimalChar = decimalIndex === -1 ? null : sanitized[decimalIndex];
    const occurrences = decimalChar
      ? (sanitized.match(new RegExp(`\\${decimalChar}`, 'g')) || []).length
      : 0;
    const otherSeparator = decimalChar === ',' ? '.' : ',';
    const hasOtherSeparator = otherSeparator && sanitized.includes(otherSeparator);
    const fractionalCandidate = decimalChar ? sanitized.slice(decimalIndex + 1) : '';
    const shouldTreatAsDecimal = Boolean(decimalChar)
      && fractionalCandidate.length > 0
      && (fractionalCandidate.length !== 3 || occurrences === 1 || hasOtherSeparator);

    if (shouldTreatAsDecimal) {
      const integerPart = sanitized
        .slice(0, decimalIndex)
        .replace(/[^0-9-]/g, '');
      const fractionalPart = sanitized
        .slice(decimalIndex + 1)
        .replace(/[^0-9]/g, '');
      normalized = fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
    } else {
      normalized = sanitized.replace(/[^0-9-]/g, '');
    }
  } else {
    normalized = sanitized.replace(/[^0-9-]/g, '');
  }

  if (!normalized || normalized === '-' || normalized === '.-' || normalized === '-.') {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseDateValue(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === 'number') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (typeof value === 'string') {
    const match = value.match(/Date\((\d+)\)/);
    if (match) {
      const timestamp = Number(match[1]);
      if (Number.isFinite(timestamp)) {
        const date = new Date(timestamp);
        if (!Number.isNaN(date.getTime())) {
          return date;
        }
      }
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
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
    sidebar.setAttribute('aria-hidden', 'false');
  };

  const openSidebar = () => {
    document.body.classList.remove('sidebar-collapsed');
    document.body.classList.add('sidebar-open');
    setExpanded(true);
    sidebar.setAttribute('aria-hidden', 'false');
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

function setupSidebarCollapse() {
  const toggle = document.querySelector('[data-sidebar-collapse]');
  const sidebar = document.querySelector('[data-sidebar]');
  if (!toggle || !sidebar) {
    return;
  }

  const applyState = collapsed => {
    document.body.classList.toggle('sidebar-collapsed', collapsed);
    document.body.classList.remove('sidebar-open');
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', collapsed ? 'Tampilkan navigasi' : 'Sembunyikan navigasi');
    sidebar.setAttribute('aria-hidden', collapsed ? 'true' : 'false');
  };

  const currentCollapsed = document.body.classList.contains('sidebar-collapsed');
  applyState(currentCollapsed);

  toggle.addEventListener('click', () => {
    const collapsed = !document.body.classList.contains('sidebar-collapsed');
    applyState(collapsed);
  });

  const mediaQuery = window.matchMedia('(max-width: 960px)');
  const handleMediaChange = event => {
    if (event.matches) {
      applyState(false);
    }
  };

  handleMediaChange(mediaQuery);

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

function handleGuestAccess() {
  const button = document.querySelector('[data-guest-access]');
  if (!button) return;

  button.addEventListener('click', () => {
    setCurrentUser(null);
    toast.show('Mengalihkan ke dashboard sebagai tamu...');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 400);
  });
}

function ensureAuthenticatedPage() {
  const page = document.body.dataset.page;
  if (['dashboard', 'add-product', 'categories'].includes(page)) {
    const user = getCurrentUser();
    return user ?? getGuestUser();
  }
  return null;
}

function renderCategories(filterText = '') {
  const tbody = document.getElementById('category-table-body');
  if (!tbody) return;

  const categories = getCategories();
  const normalized = (filterText ?? '').toString().trim().toLowerCase();
  const filtered = categories.filter(category => {
    if (!normalized) return true;
    return (
      (category.name ?? '').toString().toLowerCase().includes(normalized) ||
      (category.note ?? '').toString().toLowerCase().includes(normalized)
    );
  });

  tbody.innerHTML = '';

  if (!filtered.length) {
    const emptyRow = document.createElement('tr');
    emptyRow.className = 'empty-state';
    emptyRow.innerHTML = '<td colspan="7">Tidak ada kategori ditemukan.</td>';
    tbody.appendChild(emptyRow);
  } else {
    filtered.forEach(category => {
      const row = document.createElement('tr');
      const safeId = escapeHtml(category.id ?? '');
      const hasBonus = typeof category.bonus === 'string'
        ? category.bonus.trim().toLowerCase() !== 'tidak ada' && category.bonus.trim() !== ''
        : Boolean(category.bonus);
      const bonusLabel = hasBonus
        ? (typeof category.bonus === 'string' ? category.bonus : 'Bonus aktif')
        : 'Tidak Ada';
      const trendClass = category.margin?.trend === 'down' ? 'is-down' : 'is-up';
      const trendSymbol = category.margin?.trend === 'down' ? '↓' : '↑';
      const noteText = category.note ?? '';
      const hasNote = noteText !== null && noteText !== undefined && noteText.toString().trim() !== '';
      const marginNoteRaw = category.margin?.note ?? '';
      const hasMarginNote = marginNoteRaw !== null && marginNoteRaw !== undefined && marginNoteRaw.toString().trim() !== '';
      const marginNote = hasMarginNote ? `${trendSymbol} ${marginNoteRaw}` : '';

      row.dataset.categoryId = category.id ?? '';
      row.innerHTML = `
        <td>
          <div class="category-cell">
            <strong>${escapeHtml(category.name ?? '')}</strong>
            ${hasNote ? `<span class="category-note">${escapeHtml(noteText)}</span>` : ''}
          </div>
        </td>
        <td><span class="fee-chip">${escapeHtml(category.fees?.marketplace ?? '-')}</span></td>
        <td><span class="fee-chip">${escapeHtml(category.fees?.shopee ?? '-')}</span></td>
        <td><span class="fee-chip">${escapeHtml(category.fees?.entraverse ?? '-')}</span></td>
        <td>
          <div class="margin-cell">
            <span class="fee-chip fee-chip--highlight">${escapeHtml(category.margin?.value ?? '-')}</span>
            ${hasMarginNote ? `<span class="trend-indicator ${trendClass}">${escapeHtml(marginNote)}</span>` : ''}
          </div>
        </td>
        <td>
          <span class="status-pill ${hasBonus ? 'is-active' : 'is-muted'}">
            ${hasBonus ? '🎯' : '—'} ${escapeHtml(typeof bonusLabel === 'string' ? bonusLabel : '')}
          </span>
        </td>
        <td>
          <div class="table-actions">
            <button class="icon-btn small" type="button" data-category-action="edit" data-id="${safeId}" title="Edit kategori">✏️</button>
            <button class="icon-btn danger small" type="button" data-category-action="delete" data-id="${safeId}" title="Hapus kategori">🗑️</button>
          </div>
        </td>
      `;

      tbody.appendChild(row);
    });
  }

  const countEl = document.getElementById('category-count');
  const metaEl = document.getElementById('category-meta');
  if (countEl) {
    countEl.textContent = `${filtered.length} kategori`;
  }
  if (metaEl) {
    metaEl.textContent = filtered.length
      ? `Menampilkan ${filtered.length} dari ${categories.length} kategori`
      : 'Tidak ada kategori ditemukan';
  }
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

  filtered.forEach(product => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>
        <div class="photo-preview">
          ${product.photos?.length ? `<img src="${product.photos[0]}" alt="${product.name}">` : 'No Photo'}
        </div>
      </td>
      <td>
        <div class="product-cell">
          <strong>${product.name}</strong>
          ${product.brand ? `<span class="product-meta">${product.brand}</span>` : ''}
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

function handleCategoryActions() {
  const addButton = document.getElementById('add-category-btn');
  const modal = document.getElementById('category-modal');
  const form = document.getElementById('category-form');
  const modalTitle = document.getElementById('category-modal-title');
  const tableBody = document.getElementById('category-table-body');
  if (!addButton || !modal || !form || !modalTitle || !tableBody) return;

  const closeButtons = modal.querySelectorAll('[data-close-modal]');
  const nameInput = form.querySelector('#category-name');
  const noteInput = form.querySelector('#category-note');
  const marketplaceInput = form.querySelector('#category-fee-marketplace');
  const shopeeInput = form.querySelector('#category-fee-shopee');
  const entraverseInput = form.querySelector('#category-fee-entraverse');
  const bonusInput = form.querySelector('#category-bonus');
  const marginValueInput = form.querySelector('#category-margin-value');
  const marginTrendInput = form.querySelector('#category-margin-trend');
  const marginNoteInput = form.querySelector('#category-margin-note');
  const submitBtn = form.querySelector('button[type="submit"]');
  const searchInput = document.getElementById('search-input');

  const getCurrentFilter = () => (searchInput?.value ?? '').toString();

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    form.reset();
    delete form.dataset.editingId;
  };

  const fillForm = category => {
    if (!category) {
      form.reset();
      if (marginTrendInput) {
        marginTrendInput.value = 'up';
      }
      return;
    }

    if (nameInput) nameInput.value = category.name ?? '';
    if (noteInput) noteInput.value = category.note ?? '';
    if (marketplaceInput) marketplaceInput.value = category.fees?.marketplace ?? '';
    if (shopeeInput) shopeeInput.value = category.fees?.shopee ?? '';
    if (entraverseInput) entraverseInput.value = category.fees?.entraverse ?? '';
    if (bonusInput) bonusInput.value = typeof category.bonus === 'string' ? category.bonus : '';
    if (marginValueInput) marginValueInput.value = category.margin?.value ?? '';
    if (marginTrendInput) marginTrendInput.value = category.margin?.trend === 'down' ? 'down' : 'up';
    if (marginNoteInput) marginNoteInput.value = category.margin?.note ?? '';
  };

  const focusNameField = () => {
    if (!nameInput) return;
    requestAnimationFrame(() => {
      nameInput.focus({ preventScroll: true });
      nameInput.select?.();
    });
  };

  const openModal = category => {
    const isEditing = Boolean(category);
    form.reset();
    if (marginTrendInput) {
      marginTrendInput.value = 'up';
    }
    if (isEditing) {
      form.dataset.editingId = category.id;
      modalTitle.textContent = 'Edit Kategori';
      if (submitBtn) submitBtn.textContent = 'Perbarui';
      fillForm(category);
    } else {
      delete form.dataset.editingId;
      modalTitle.textContent = 'Tambah Kategori';
      if (submitBtn) submitBtn.textContent = 'Simpan';
    }
    modal.hidden = false;
    document.body.classList.add('modal-open');
    focusNameField();
  };

  const handleEscape = event => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  };

  addButton.addEventListener('click', () => openModal());
  closeButtons.forEach(button => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', handleEscape);
  modal.addEventListener('click', event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  tableBody.addEventListener('click', event => {
    const button = event.target.closest('[data-category-action]');
    if (!button) return;

    const id = button.dataset.id;
    if (!id) return;

    if (button.dataset.categoryAction === 'edit') {
      const categories = getCategories();
      const category = categories.find(item => item.id === id);
      if (!category) {
        toast.show('Kategori tidak ditemukan.');
        renderCategories(getCurrentFilter());
        return;
      }
      openModal(category);
      return;
    }

    if (button.dataset.categoryAction === 'delete') {
      if (!confirm('Hapus kategori ini?')) {
        return;
      }
      const categories = getCategories();
      const updated = categories.filter(item => item.id !== id);
      saveCategories(updated);
      toast.show('Kategori berhasil dihapus.');
      renderCategories(getCurrentFilter());
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get('name') ?? '').toString().trim();
    const note = (formData.get('note') ?? '').toString().trim();
    const feeMarketplace = (formData.get('feeMarketplace') ?? '').toString().trim();
    const feeShopee = (formData.get('feeShopee') ?? '').toString().trim();
    const feeEntraverse = (formData.get('feeEntraverse') ?? '').toString().trim();
    const bonus = (formData.get('bonus') ?? '').toString().trim();
    const marginValue = (formData.get('marginValue') ?? '').toString().trim();
    const marginTrend = (formData.get('marginTrend') ?? 'up').toString();
    const marginNote = (formData.get('marginNote') ?? '').toString().trim();

    if (!name) {
      toast.show('Nama kategori wajib diisi.');
      nameInput?.focus();
      return;
    }

    const categories = getCategories();
    const editingId = form.dataset.editingId;
    const normalizedName = name.toLowerCase();
    const hasDuplicate = categories.some(category =>
      category.name?.toLowerCase() === normalizedName && category.id !== editingId
    );

    if (hasDuplicate) {
      toast.show('Nama kategori sudah digunakan.');
      nameInput?.focus();
      return;
    }

    const payload = {
      id: editingId || crypto.randomUUID(),
      name,
      note,
      fees: {
        marketplace: feeMarketplace,
        shopee: feeShopee,
        entraverse: feeEntraverse
      },
      margin: {
        value: marginValue,
        trend: marginTrend === 'down' ? 'down' : 'up',
        note: marginNote
      },
      bonus: bonus || null
    };

    if (editingId) {
      const index = categories.findIndex(category => category.id === editingId);
      if (index === -1) {
        toast.show('Kategori tidak ditemukan.');
        closeModal();
        renderCategories(getCurrentFilter());
        return;
      }
      payload.createdAt = categories[index].createdAt ?? Date.now();
      payload.updatedAt = Date.now();
      categories[index] = payload;
      toast.show('Kategori berhasil diperbarui.');
    } else {
      payload.createdAt = Date.now();
      categories.push(payload);
      toast.show('Kategori berhasil ditambahkan.');
    }

    saveCategories(categories);
    closeModal();
    renderCategories(getCurrentFilter());
  });
}

function handleSearch(callback) {
  const input = document.getElementById('search-input');
  if (!input || typeof callback !== 'function') return;

  const handle = event => {
    const value = (event?.target?.value ?? input.value ?? '').trim().toLowerCase();
    callback(value);
  };

  input.addEventListener('input', handle);

  if (input.value) {
    callback(input.value.trim().toLowerCase());
  }
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
    const guest = getGuestUser();
    document.querySelectorAll('.avatar').forEach(el => {
      el.textContent = guest.name
        .split(' ')
        .map(part => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    });
    toast.show('Anda sekarang menjelajah sebagai tamu.');
  });
}

function populateCategorySelect(select, { selectedValue, helperEl } = {}) {
  if (!select) return;

  const placeholder = select.dataset.placeholder || 'Pilih kategori';
  const categories = getCategories()
    .filter(category => typeof category?.name === 'string' && category.name.trim())
    .map(category => ({ id: category.id, name: category.name.trim() }))
    .sort((a, b) => a.name.localeCompare(b.name, 'id', { sensitivity: 'base' }));

  const currentValue = selectedValue ?? select.value ?? '';
  select.innerHTML = '';

  const placeholderOption = document.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = categories.length ? placeholder : 'Belum ada kategori';
  placeholderOption.selected = !currentValue;
  placeholderOption.disabled = categories.length > 0;
  select.appendChild(placeholderOption);

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = category.name;
    select.appendChild(option);
  });

  let hasFallback = false;
  if (currentValue) {
    select.value = currentValue;
    if (select.value !== currentValue) {
      const fallbackOption = document.createElement('option');
      fallbackOption.value = currentValue;
      fallbackOption.textContent = `${currentValue} (tidak tersedia)`;
      select.appendChild(fallbackOption);
      select.value = currentValue;
      hasFallback = true;
    }
  }

  if (!currentValue) {
    select.value = '';
  }

  select.disabled = !categories.length && !hasFallback;

  if (helperEl) {
    if (!categories.length && !hasFallback) {
      helperEl.textContent = 'Belum ada kategori. Tambahkan kategori pada halaman Kategori.';
    } else if (hasFallback) {
      helperEl.textContent = 'Kategori lama tidak lagi tersedia. Pilih kategori terbaru atau tambahkan yang baru.';
    } else {
      helperEl.textContent = 'Kategori diambil dari daftar Kategori yang Anda kelola.';
    }
  }
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
  const categorySelect = form.querySelector('#product-category');
  const categoryHelper = document.getElementById('category-helper-text');
  const exchangeRateSelect = form.querySelector('#exchange-rate-currency');
  const exchangeRateInput = form.querySelector('#exchange-rate');
  const exchangeRateInfo = document.getElementById('exchange-rate-info');
  const params = new URLSearchParams(window.location.search);
  const editingId = params.get('id');
  let suppressPricingRefresh = false;

  const exchangeRateState = {
    rates: new Map(),
    lastUpdated: null,
    loading: false,
    error: null
  };

  const getSelectedCurrency = () => {
    const value = exchangeRateSelect?.value ?? 'IDR';
    return BANK_INDONESIA_SUPPORTED_CURRENCIES.includes(value) ? value : 'IDR';
  };

  const getInputRateValue = () => {
    if (!exchangeRateInput) {
      return null;
    }
    const value = parseNumericValue(exchangeRateInput.value);
    return Number.isFinite(value) ? value : null;
  };

  const formatRateForDisplay = value => {
    if (!Number.isFinite(value)) {
      return null;
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };

  const updateExchangeRateInfo = ({ force = false } = {}) => {
    if (exchangeRateInput) {
      const currency = getSelectedCurrency();
      const shouldSyncInput = force || exchangeRateInput.dataset.userEdited !== 'true';
      exchangeRateInput.readOnly = currency === 'IDR';
      if (currency === 'IDR') {
        if (shouldSyncInput) {
          exchangeRateInput.value = '1';
        }
      } else if (shouldSyncInput) {
        const entry = exchangeRateState.rates.get(currency);
        if (entry && Number.isFinite(entry.rate)) {
          exchangeRateInput.value = entry.rate.toString();
        } else {
          exchangeRateInput.value = '';
        }
      }
    }

    if (!exchangeRateInfo) {
      return;
    }

    if (exchangeRateState.loading) {
      exchangeRateInfo.textContent = 'Memuat kurs Bank Indonesia...';
      return;
    }

    const currency = getSelectedCurrency();
    if (currency === 'IDR') {
      exchangeRateInfo.textContent = 'Kurs Bank Indonesia: 1 IDR = Rp 1';
      return;
    }

    const entry = exchangeRateState.rates.get(currency);
    const inputRate = getInputRateValue();

    if (entry && Number.isFinite(entry.rate)) {
      const formattedRate = formatRateForDisplay(inputRate ?? entry.rate);
      const effectiveDate = entry.date || exchangeRateState.lastUpdated;
      const dateText = effectiveDate
        ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(effectiveDate)
        : '';
      if (formattedRate) {
        exchangeRateInfo.textContent = dateText
          ? `Kurs Bank Indonesia: 1 ${currency} = ${formattedRate} (kurs tengah, ${dateText}).`
          : `Kurs Bank Indonesia: 1 ${currency} = ${formattedRate}.`;
        return;
      }
    }

    if (Number.isFinite(inputRate)) {
      const formattedManualRate = formatRateForDisplay(inputRate);
      if (formattedManualRate) {
        exchangeRateInfo.textContent = `Kurs ${currency} diisi manual: 1 ${currency} = ${formattedManualRate}.`;
        return;
      }
    }

    exchangeRateInfo.textContent = exchangeRateState.error
      ? exchangeRateState.error
      : `Kurs Bank Indonesia untuk ${currency} belum tersedia. Isi nilai kurs secara manual jika diperlukan.`;
  };

  const loadBankIndonesiaRates = async () => {
    if (!exchangeRateSelect) {
      return;
    }

    exchangeRateState.loading = true;
    exchangeRateState.error = null;
    updateExchangeRateInfo();

    try {
      const response = await fetch(BANK_INDONESIA_EXCHANGE_ENDPOINT);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const payload = await response.json();
      const candidates = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.d?.results)
          ? payload.d.results
          : Array.isArray(payload?.d)
            ? payload.d
            : Array.isArray(payload?.value)
              ? payload.value
              : [];

      const rates = new Map();
      let latestDate = null;

      candidates.forEach(item => {
        if (!item) return;
        const code = (item.currency ?? item.Currency ?? item.mata_uang ?? item.kode ?? item.symbol ?? '')
          .toString()
          .trim()
          .toUpperCase();
        if (!BANK_INDONESIA_SUPPORTED_CURRENCIES.includes(code)) {
          return;
        }

        const midRate = parseNumericValue(
          item.kurs_tengah ?? item.kursTengah ?? item.midRate ?? item.mid_rate ?? item.middleRate ?? item.rate
        );
        const buyRate = parseNumericValue(item.kurs_beli ?? item.buyRate ?? item.kursBeli);
        const sellRate = parseNumericValue(item.kurs_jual ?? item.sellRate ?? item.kursJual);

        let resolvedRate = midRate;
        if (!Number.isFinite(resolvedRate)) {
          if (Number.isFinite(buyRate) && Number.isFinite(sellRate)) {
            resolvedRate = (buyRate + sellRate) / 2;
          } else if (Number.isFinite(buyRate)) {
            resolvedRate = buyRate;
          } else if (Number.isFinite(sellRate)) {
            resolvedRate = sellRate;
          }
        }

        if (!Number.isFinite(resolvedRate)) {
          return;
        }

        const dateValue = parseDateValue(
          item.tanggal ?? item.Tanggal ?? item.date ?? item.Date ?? item.tanggal_update ?? item.valid_from
        );

        const existing = rates.get(code);
        if (!existing || (dateValue && (!existing.date || dateValue > existing.date))) {
          rates.set(code, { rate: resolvedRate, date: dateValue });
        }

        if (dateValue && (!latestDate || dateValue > latestDate)) {
          latestDate = dateValue;
        }
      });

      rates.set('IDR', { rate: 1, date: latestDate });

      exchangeRateState.rates = rates;
      exchangeRateState.lastUpdated = latestDate;
    } catch (error) {
      console.error('Gagal memuat kurs Bank Indonesia', error);
      exchangeRateState.error = 'Gagal memuat kurs Bank Indonesia. Masukkan nilai kurs secara manual bila diperlukan.';
    } finally {
      exchangeRateState.loading = false;
      const forceUpdate = exchangeRateInput?.dataset.userEdited !== 'true';
      updateExchangeRateInfo({ force: forceUpdate });
    }
  };

  if (exchangeRateInfo) {
    exchangeRateInfo.textContent = 'Pilih mata uang untuk memuat kurs Bank Indonesia.';
  }

  if (exchangeRateSelect) {
    exchangeRateSelect.addEventListener('change', () => {
      if (exchangeRateInput) {
        delete exchangeRateInput.dataset.userEdited;
      }
      updateExchangeRateInfo({ force: true });
    });
  }

  if (exchangeRateInput) {
    exchangeRateInput.addEventListener('input', () => {
      exchangeRateInput.dataset.userEdited = 'true';
      updateExchangeRateInfo();
    });
  }

  loadBankIndonesiaRates().catch(error => {
    console.error('Tidak dapat memuat kurs Bank Indonesia', error);
  });

  populateCategorySelect(categorySelect, { helperEl: categoryHelper });

  document.addEventListener('categories:changed', () => {
    const selectedValue = categorySelect?.value ?? '';
    populateCategorySelect(categorySelect, { selectedValue, helperEl: categoryHelper });
  });

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

  function buildCombinationKeyFromValues(values = []) {
    return values
      .map(value => (value ?? '').toString().trim().toLowerCase())
      .join('||');
  }

  function buildCombinationKeyFromData(row, variantDefs) {
    if (!row || !variantDefs.length) {
      return '';
    }

    const values = variantDefs.map((variant, index) => {
      if (!Array.isArray(row.variants)) return '';
      const direct = row.variants[index];
      if (direct && typeof direct === 'object') {
        const directValue = (direct.value ?? '').toString().trim();
        if (directValue) {
          return directValue;
        }
      }

      const variantName = (variant.rawName || variant.name || '').toString().trim().toLowerCase();
      const match = row.variants.find(item => (item?.name ?? '').toString().trim().toLowerCase() === variantName);
      return (match?.value ?? '').toString().trim();
    });

    if (values.some(value => !value)) {
      return '';
    }

    return buildCombinationKeyFromValues(values);
  }

  function generateVariantCombinations(variantDefs) {
    if (!Array.isArray(variantDefs) || !variantDefs.length) {
      return [];
    }

    const hasEmptyOptions = variantDefs.some(variant => !Array.isArray(variant.options) || !variant.options.length);
    if (hasEmptyOptions) {
      return [];
    }

    const combinations = [];
    const traverse = (index, currentVariants, currentValues) => {
      if (index === variantDefs.length) {
        combinations.push({
          variants: currentVariants.map(item => ({ name: item.name, value: item.value })),
          key: buildCombinationKeyFromValues(currentValues)
        });
        return;
      }

      const variant = variantDefs[index];
      const variantName = (variant.rawName || variant.name || `Varian ${index + 1}`).toString().trim();

      variant.options.forEach(option => {
        const optionValue = (option ?? '').toString().trim();
        traverse(
          index + 1,
          [...currentVariants, { name: variantName, value: optionValue }],
          [...currentValues, optionValue]
        );
      });
    };

    traverse(0, [], []);
    return combinations;
  }

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

  function createPricingRow(initialData = {}, variantDefs = getVariantDefinitions(), options = {}) {
    if (!pricingBody) return null;

    const row = document.createElement('tr');
    row.className = 'pricing-row';
    const { lockVariantSelection = false } = options;

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
        if (lockVariantSelection) {
          select.disabled = true;
        }
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
    if (lockVariantSelection) {
      actionsCell.classList.add('locked');
    } else {
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'icon-btn danger small remove-pricing-row';
      removeBtn.setAttribute('aria-label', 'Hapus baris harga');
      removeBtn.textContent = '🗑️';
      actionsCell.appendChild(removeBtn);
    }
    row.appendChild(actionsCell);

    pricingBody.appendChild(row);
    hydratePricingRow(row, initialData, variantDefs);
    return row;
  }

  function refreshPricingTableStructure(options = {}) {
    if (!pricingBody || !pricingHeaderRow || suppressPricingRefresh) {
      return;
    }

    const { externalData = null } = options;
    const variantDefs = getVariantDefinitions();
    const sourceData = Array.isArray(externalData) ? externalData : collectPricingRows(variantDefs);
    const combinations = generateVariantCombinations(variantDefs);
    const hasAutoCombinations = combinations.length > 0;

    if (addPricingRowBtn) {
      if (hasAutoCombinations) {
        addPricingRowBtn.classList.add('is-hidden');
        addPricingRowBtn.disabled = true;
      } else {
        addPricingRowBtn.classList.remove('is-hidden');
        addPricingRowBtn.disabled = false;
      }
    }

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

    if (variantDefs.length && hasAutoCombinations) {
      const dataMap = new Map();
      sourceData.forEach(row => {
        const key = buildCombinationKeyFromData(row, variantDefs);
        if (key) {
          dataMap.set(key, row);
        }
      });

      combinations.forEach(combo => {
        const rowData = dataMap.get(combo.key) || {};
        if (!rowData.variants) {
          rowData.variants = combo.variants;
        }
        createPricingRow(rowData, variantDefs, { lockVariantSelection: true });
      });
      return;
    }

    const fallbackData = sourceData.length ? sourceData : [{}];
    fallbackData.forEach(data => {
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
    const variantDefs = getVariantDefinitions();
    const hasAutoCombinations = generateVariantCombinations(variantDefs).length > 0;
    if (hasAutoCombinations) {
      toast.show('Daftar harga dibuat otomatis untuk setiap kombinasi varian.');
      return;
    }
    createPricingRow({}, variantDefs);
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
    if (categorySelect) {
      populateCategorySelect(categorySelect, {
        selectedValue: product.category ?? '',
        helperEl: categoryHelper
      });
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
    const inventoryFields = {
      currency: form.querySelector('#exchange-rate-currency'),
      initialStockPrediction: form.querySelector('#initial-stock-prediction'),
      purchasePrice: form.querySelector('#purchase-price'),
      exchangeRate: form.querySelector('#exchange-rate'),
      dailyAverageSales: form.querySelector('#daily-average-sales'),
      leadTime: form.querySelector('#lead-time'),
      reorderPoint: form.querySelector('#reorder-point')
    };
    const inventory = product.inventory ?? {};
    Object.entries(inventoryFields).forEach(([key, input]) => {
      if (!input) return;
      let value = inventory?.[key] ?? '';

      if (key === 'currency') {
        const normalized = (value ?? '').toString().trim().toUpperCase();
        const finalValue = BANK_INDONESIA_SUPPORTED_CURRENCIES.includes(normalized)
          ? normalized
          : 'IDR';
        input.value = finalValue;
        if (input.value !== finalValue) {
          const option = document.createElement('option');
          option.value = finalValue;
          option.textContent = finalValue;
          option.dataset.temporaryOption = 'true';
          input.appendChild(option);
          input.value = finalValue;
        }
        return;
      }

      if (value === null || typeof value === 'undefined') {
        value = '';
      }

      input.value = value;

      if (input === exchangeRateInput && value) {
        exchangeRateInput.dataset.userEdited = 'true';
      }
    });

    updateExchangeRateInfo();

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
      const pricingData = Array.isArray(product.variantPricing) && product.variantPricing.length
        ? product.variantPricing
        : [{}];
      refreshPricingTableStructure({ externalData: pricingData });
    }
  } else {
    createVariantRow();
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (categorySelect && categorySelect.disabled) {
      toast.show('Tambahkan kategori terlebih dahulu di halaman Kategori.');
      categorySelect.focus();
      return;
    }
      const formData = new FormData(form);
      const products = getData(STORAGE_KEYS.products, []);
      const categoryValue = (formData.get('category') ?? '').toString().trim();
      const rawCurrency = (formData.get('currency') ?? 'IDR').toString().trim().toUpperCase();
      const currencyValue = BANK_INDONESIA_SUPPORTED_CURRENCIES.includes(rawCurrency) ? rawCurrency : 'IDR';
      const inventoryData = {
        currency: currencyValue,
        initialStockPrediction: (formData.get('initialStockPrediction') ?? '').toString().trim(),
        purchasePrice: (formData.get('purchasePrice') ?? '').toString().trim(),
        exchangeRate: (formData.get('exchangeRate') ?? '').toString().trim(),
        dailyAverageSales: (formData.get('dailyAverageSales') ?? '').toString().trim(),
        leadTime: (formData.get('leadTime') ?? '').toString().trim(),
        reorderPoint: (formData.get('reorderPoint') ?? '').toString().trim()
      };
      const hasInventoryData = Object.entries(inventoryData).some(([key, value]) => {
        if (!value) {
          return false;
        }
        if (key === 'currency') {
          return value !== 'IDR';
        }
        if (key === 'exchangeRate') {
          const numeric = parseNumericValue(value);
          if (!Number.isFinite(numeric)) {
            return false;
          }
          if (currencyValue === 'IDR') {
            return numeric !== 1;
          }
          return true;
        }
        return true;
      });

    if (!categoryValue) {
      toast.show('Pilih kategori produk.');
      categorySelect?.focus();
      return;
    }

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
      category: categoryValue,
      brand: (formData.get('brand') ?? '').toString().trim(),
      description: (formData.get('description') ?? '').toString().trim(),
      tradeIn: form.querySelector('#trade-in-toggle')?.checked ?? false,
      inventory: hasInventoryData ? inventoryData : null,
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
  handleSearch(value => renderProducts(value));
  handleSync();
}

function initCategories() {
  ensureSeeded();
  renderCategories();
  handleSearch(value => renderCategories(value));
  handleCategoryActions();
}

function initPage() {
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    handleLogout();
    setupThemeControls();

    if (page === 'login') {
      const existingUser = getCurrentUser();
      if (existingUser) {
        window.location.href = 'dashboard.html';
        return;
      }
      handleLogin();
      handleGuestAccess();
    }

    if (page === 'register') {
      handleRegister();
    }

    if (['dashboard', 'add-product', 'categories'].includes(page)) {
      setupSidebarToggle();
      setupSidebarCollapse();
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

    if (page === 'categories') {
      initCategories();
    }
  });
}

initPage();
