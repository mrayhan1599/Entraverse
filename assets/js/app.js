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
      { name: 'Memori Internal', options: ['128 GB', '256 GB'] },
      { name: 'Warna', options: ['Putih'] }
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
      { name: 'Memori Internal', options: ['256 GB'] },
      { name: 'Warna', options: ['Hitam'] }
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
  const addVariantBtn = document.getElementById('add-variant-btn');

  const photoInputs = Array.from(form.querySelectorAll('[data-photo-field]'));

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

  if (!variantBody) return;

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

  const addOptionChip = (list, rawValue, { silent = false } = {}) => {
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
    return true;
  };

  const hydrateVariantRow = (row, initialVariant = null) => {
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
  };

  const createVariantRow = (initialVariant = null) => {
    const row = document.createElement('tr');
    row.className = 'variant-row';
    row.innerHTML = variantRowTemplate();
    variantBody.appendChild(row);
    hydrateVariantRow(row, initialVariant);
    return row;
  };

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

  if (variantBody && variantBody.children.length === 0) {
    createVariantRow();
  }

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
      return;
    }

    const button = event.target.closest('.remove-variant');
    if (!button) return;
    const rows = Array.from(variantBody.querySelectorAll('.variant-row'));
    if (rows.length <= 1) {
      toast.show('Minimal satu varian diperlukan.');
      return;
    }
    button.closest('tr').remove();
  });

  variantBody?.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    if (!event.target.matches('[data-option-input]')) return;
    event.preventDefault();
    handleAddOption(event.target.closest('[data-options]'));
  });

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

    const product = {
      id: crypto.randomUUID(),
      name: (formData.get('name') ?? '').toString().trim(),
      category: (formData.get('category') ?? '').toString().trim(),
      brand: (formData.get('brand') ?? '').toString().trim(),
      description: (formData.get('description') ?? '').toString().trim(),
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
