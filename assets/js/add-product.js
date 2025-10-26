const SUPPORTED_PURCHASE_CURRENCIES = ['USD', 'IDR', 'CNY', 'EUR', 'SGD'];

function createSupabaseClient() {
  const config = window.addProductConfig?.supabase ?? {};
  const url = config.url?.trim();
  const anonKey = config.anonKey?.trim();

  if (!url || !anonKey || url.includes('your-project.supabase.co')) {
    throw new Error('Konfigurasi Supabase belum diatur. Perbarui url dan anon key.');
  }

  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    throw new Error('Library Supabase belum dimuat. Pastikan koneksi internet tersedia.');
  }

  return window.supabase.createClient(url, anonKey);
}

function parseNumber(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const text = value.toString().trim();
  if (!text) {
    return null;
  }

  const normalized = text.replace(/[^0-9,.-]/g, '').replace(',', '.');
  if (!normalized) {
    return null;
  }

  const numeric = Number.parseFloat(normalized);
  if (!Number.isFinite(numeric)) {
    return null;
  }

  return numeric;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return '';
  }

  return Number(value).toString();
}

function escapeAttribute(value) {
  return (value ?? '')
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function setStatus(statusEl, message, { tone = 'info', busy = false } = {}) {
  if (!statusEl) return;

  statusEl.hidden = !message;
  statusEl.textContent = message ?? '';
  statusEl.dataset.tone = tone;
  statusEl.setAttribute('aria-busy', busy ? 'true' : 'false');
}

function createVariantItem({ name = '', options = [] } = {}) {
  const container = document.createElement('div');
  container.className = 'variant-item';
  container.dataset.variantItem = 'true';

  const nameField = document.createElement('label');
  nameField.className = 'field';
  const nameLabel = document.createElement('span');
  nameLabel.className = 'field__label';
  nameLabel.textContent = 'Nama Varian';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.setAttribute('data-variant-name', '');
  nameInput.placeholder = 'Contoh: Warna';
  nameInput.value = name;
  nameField.append(nameLabel, nameInput);

  const optionField = document.createElement('label');
  optionField.className = 'field';
  const optionLabel = document.createElement('span');
  optionLabel.className = 'field__label';
  optionLabel.textContent = 'Opsi (pisahkan dengan koma)';
  const optionInput = document.createElement('input');
  optionInput.type = 'text';
  optionInput.setAttribute('data-variant-options', '');
  optionInput.placeholder = 'Contoh: Merah, Biru';
  optionInput.value = Array.isArray(options) ? options.join(', ') : options;
  optionField.append(optionLabel, optionInput);

  const actions = document.createElement('div');
  actions.className = 'variant-item__actions';
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn btn--danger';
  removeBtn.textContent = 'Hapus';
  removeBtn.addEventListener('click', () => {
    container.remove();
  });
  actions.appendChild(removeBtn);

  container.append(nameField, optionField, actions);
  return container;
}

function createPricingRow(data = {}) {
  const row = document.createElement('tr');
  row.dataset.pricingRow = 'true';

  const currencyOptions = SUPPORTED_PURCHASE_CURRENCIES.map(code => {
    const selected = (data.purchaseCurrency ?? 'USD').toUpperCase() === code ? 'selected' : '';
    return `<option value="${code}" ${selected}>${code}</option>`;
  }).join('');

  row.innerHTML = `
    <td><input type="text" data-field="variantLabel" placeholder="Contoh: Warna - Merah" value="${escapeAttribute(data.variantLabel)}"></td>
    <td><input type="number" step="0.01" min="0" data-field="purchasePrice" value="${escapeAttribute(data.purchasePrice)}"></td>
    <td>
      <select data-field="purchaseCurrency">
        ${currencyOptions}
      </select>
    </td>
    <td><input type="number" step="0.0001" min="0" data-field="exchangeRate" value="${escapeAttribute(data.exchangeRate)}"></td>
    <td>
      <select data-field="shippingMethod">
        ${['air', 'sea', 'land'].map(method => {
          const label = method === 'air' ? 'Udara' : method === 'sea' ? 'Laut' : 'Darat';
          const selected = (data.shippingMethod ?? '').toLowerCase() === method ? 'selected' : '';
          return `<option value="${method}" ${selected}>${label}</option>`;
        }).join('')}
      </select>
    </td>
    <td><input type="number" step="0.01" min="0" data-field="arrivalCost" value="${escapeAttribute(data.arrivalCost)}"></td>
    <td><input type="number" step="0.01" min="0" data-field="purchasePriceIdr" value="${escapeAttribute(data.purchasePriceIdr)}"></td>
    <td><input type="number" step="0.01" min="0" data-field="offlinePrice" value="${escapeAttribute(data.offlinePrice)}"></td>
    <td><input type="number" step="0.01" min="0" data-field="entraversePrice" value="${escapeAttribute(data.entraversePrice)}"></td>
    <td><input type="number" step="0.01" min="0" data-field="tokopediaPrice" value="${escapeAttribute(data.tokopediaPrice)}"></td>
    <td><input type="number" step="0.01" min="0" data-field="shopeePrice" value="${escapeAttribute(data.shopeePrice)}"></td>
    <td><input type="number" step="0.01" min="0" data-field="stock" value="${escapeAttribute(data.stock)}"></td>
    <td><input type="number" step="0.01" min="0" data-field="weight" value="${escapeAttribute(data.weight)}"></td>
    <td><button type="button" class="btn btn--danger" data-remove-row>✕</button></td>
  `;

  const purchasePriceInput = row.querySelector('[data-field="purchasePrice"]');
  const exchangeRateInput = row.querySelector('[data-field="exchangeRate"]');
  const currencySelect = row.querySelector('[data-field="purchaseCurrency"]');
  const arrivalCostInput = row.querySelector('[data-field="arrivalCost"]');
  const purchaseIdrInput = row.querySelector('[data-field="purchasePriceIdr"]');

  const updateIdrValue = () => {
    const price = parseNumber(purchasePriceInput.value);
    const rate = parseNumber(exchangeRateInput.value);
    const currency = (currencySelect.value ?? '').toUpperCase();
    const arrival = parseNumber(arrivalCostInput.value) ?? 0;

    if (currency === 'IDR' && Number.isFinite(price)) {
      purchaseIdrInput.value = formatNumber(price + arrival);
      return;
    }

    if (Number.isFinite(price) && Number.isFinite(rate) && rate > 0) {
      purchaseIdrInput.value = formatNumber(price * rate + arrival);
    }
  };

  [purchasePriceInput, exchangeRateInput, currencySelect, arrivalCostInput].forEach(element => {
    element.addEventListener('input', updateIdrValue);
    element.addEventListener('change', updateIdrValue);
  });

  const removeButton = row.querySelector('[data-remove-row]');
  removeButton.addEventListener('click', () => row.remove());

  if (!purchaseIdrInput.value) {
    updateIdrValue();
  }

  return row;
}

async function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject(reader.error || new Error('Gagal membaca file.')));
    reader.readAsDataURL(file);
  });
}

function collectVariants(variantList) {
  if (!variantList) return [];

  return Array.from(variantList.querySelectorAll('[data-variant-item]')).map(item => {
    const rawName = item.querySelector('[data-variant-name]')?.value ?? '';
    const rawOptions = item.querySelector('[data-variant-options]')?.value ?? '';
    const options = rawOptions
      .split(',')
      .map(option => option.trim())
      .filter(Boolean);

    return {
      name: rawName.trim(),
      options
    };
  }).filter(variant => variant.name);
}

function collectPricingRows(tbody) {
  if (!tbody) return [];

  const numericFields = new Set([
    'purchasePrice',
    'exchangeRate',
    'arrivalCost',
    'purchasePriceIdr',
    'offlinePrice',
    'entraversePrice',
    'tokopediaPrice',
    'shopeePrice',
    'stock',
    'weight'
  ]);

  return Array.from(tbody.querySelectorAll('[data-pricing-row]')).map(row => {
    const getValue = name => row.querySelector(`[data-field="${name}"]`)?.value ?? '';
    const normalizeValue = name => {
      const raw = getValue(name);
      if (!numericFields.has(name)) {
        return raw.trim();
      }

      const parsed = parseNumber(raw);
      return parsed === null ? null : parsed;
    };
    return {
      id: row.dataset.rowId || crypto.randomUUID(),
      variantLabel: normalizeValue('variantLabel'),
      purchasePrice: normalizeValue('purchasePrice'),
      purchaseCurrency: getValue('purchaseCurrency'),
      exchangeRate: normalizeValue('exchangeRate'),
      shippingMethod: getValue('shippingMethod'),
      arrivalCost: normalizeValue('arrivalCost'),
      purchasePriceIdr: normalizeValue('purchasePriceIdr'),
      offlinePrice: normalizeValue('offlinePrice'),
      entraversePrice: normalizeValue('entraversePrice'),
      tokopediaPrice: normalizeValue('tokopediaPrice'),
      shopeePrice: normalizeValue('shopeePrice'),
      stock: normalizeValue('stock'),
      weight: normalizeValue('weight')
    };
  }).filter(entry => {
    const numericValues = [
      entry.purchasePrice,
      entry.exchangeRate,
      entry.arrivalCost,
      entry.purchasePriceIdr,
      entry.offlinePrice,
      entry.entraversePrice,
      entry.tokopediaPrice,
      entry.shopeePrice,
      entry.stock,
      entry.weight
    ];

    const hasNumeric = numericValues.some(value => value !== null);
    const hasText = Boolean((entry.variantLabel ?? '').trim());
    return hasNumeric || hasText;
  });
}

function calculateVolume({ length, width, height }) {
  if (!Number.isFinite(length) || !Number.isFinite(width) || !Number.isFinite(height)) {
    return null;
  }

  const volumeCubicCentimeter = length * width * height;
  const volumeCbm = volumeCubicCentimeter / 1_000_000;
  return volumeCbm;
}

function updateVolumeField(lengthInput, widthInput, heightInput, volumeInput) {
  if (!lengthInput || !widthInput || !heightInput || !volumeInput) return;

  const length = parseNumber(lengthInput.value);
  const width = parseNumber(widthInput.value);
  const height = parseNumber(heightInput.value);
  const volume = calculateVolume({ length, width, height });

  volumeInput.value = volume === null ? '' : volume.toFixed(4);
}

function populateExistingPhotos(container, photos, onRemove) {
  if (!container) return;
  container.innerHTML = '';

  const items = (photos ?? []).filter(Boolean);
  if (!items.length) {
    container.hidden = true;
    return;
  }

  items.forEach((photo, index) => {
    const pill = document.createElement('div');
    pill.className = 'photo-pill';
    const label = typeof photo === 'string' && photo.startsWith('data:') ? `Foto ${index + 1}` : photo.split('/').pop();
    pill.textContent = label || `Foto ${index + 1}`;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.setAttribute('aria-label', `Hapus foto ${index + 1}`);
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => onRemove(index));

    pill.appendChild(removeBtn);
    container.appendChild(pill);
  });

  container.hidden = false;
}

function populateVariantList(container, variants) {
  if (!container) return;
  container.innerHTML = '';
  variants.forEach(variant => {
    container.appendChild(createVariantItem(variant));
  });
}

function populatePricingTable(tbody, rows) {
  if (!tbody) return;
  tbody.innerHTML = '';
  rows.forEach(rowData => {
    const row = createPricingRow(rowData);
    row.dataset.rowId = rowData.id ?? crypto.randomUUID();
    tbody.appendChild(row);
  });
}

async function init() {
  const form = document.getElementById('add-product-form');
  if (!form) return;

  const statusEl = form.querySelector('.form__status');
  const categorySelect = document.getElementById('product-category');
  const categoryHint = document.getElementById('category-hint');
  const variantList = document.getElementById('variant-list');
  const addVariantBtn = document.getElementById('add-variant-btn');
  const pricingBody = document.getElementById('pricing-body');
  const addPricingRowBtn = document.getElementById('add-pricing-row-btn');
  const lengthInput = document.getElementById('length-cm');
  const widthInput = document.getElementById('width-cm');
  const heightInput = document.getElementById('height-cm');
  const volumeInput = document.getElementById('volume-cbm');
  const currentPhotosContainer = document.getElementById('current-photos');

  let supabase;
  try {
    supabase = createSupabaseClient();
  } catch (error) {
    setStatus(statusEl, error.message, { tone: 'danger' });
    form.querySelector('button[type="submit"]').disabled = true;
    return;
  }

  const storedPhotos = [];
  const removePhotoAtIndex = index => {
    storedPhotos.splice(index, 1);
    populateExistingPhotos(currentPhotosContainer, storedPhotos, removePhotoAtIndex);
  };

  populateExistingPhotos(currentPhotosContainer, storedPhotos, removePhotoAtIndex);

  const handleVolumeChange = () => updateVolumeField(lengthInput, widthInput, heightInput, volumeInput);
  [lengthInput, widthInput, heightInput].forEach(input => {
    input?.addEventListener('input', handleVolumeChange);
    input?.addEventListener('change', handleVolumeChange);
  });

  addVariantBtn?.addEventListener('click', () => {
    variantList.appendChild(createVariantItem());
  });

  addPricingRowBtn?.addEventListener('click', () => {
    pricingBody.appendChild(createPricingRow());
  });

  const loadCategories = async () => {
    if (!categorySelect) return;
    categorySelect.innerHTML = '<option value="" disabled selected>Memuat kategori...</option>';
    setStatus(statusEl, 'Mengambil daftar kategori...', { busy: true });

    const { data, error } = await supabase.from('categories').select('name').order('name');
    if (error) {
      console.error('Gagal memuat kategori', error);
      categorySelect.innerHTML = '<option value="" disabled selected>Gagal memuat kategori</option>';
      categorySelect.disabled = true;
      if (categoryHint) {
        categoryHint.textContent = 'Kategori tidak dapat dimuat. Coba muat ulang halaman ini.';
      }
      setStatus(statusEl, 'Tidak dapat memuat kategori Supabase.', { tone: 'danger' });
      return;
    }

    categorySelect.disabled = false;
    categorySelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = data?.length ? 'Pilih kategori' : 'Belum ada kategori';
    placeholder.disabled = true;
    placeholder.selected = true;
    categorySelect.appendChild(placeholder);

    (data ?? []).forEach(entry => {
      if (!entry?.name) return;
      const option = document.createElement('option');
      option.value = entry.name;
      option.textContent = entry.name;
      categorySelect.appendChild(option);
    });

    if (categoryHint) {
      categoryHint.textContent = data?.length
        ? 'Pilih salah satu kategori yang tersedia.'
        : 'Belum ada kategori di Supabase.';
    }

    setStatus(statusEl, '', { busy: false });
  };

  await loadCategories();

  const searchParams = new URLSearchParams(window.location.search);
  const editingId = searchParams.get('id')?.trim();

  if (editingId) {
    setStatus(statusEl, 'Memuat detail produk...', { busy: true });
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', editingId)
      .maybeSingle();

    if (error || !data) {
      setStatus(statusEl, 'Produk tidak ditemukan atau gagal dimuat.', { tone: 'danger' });
    } else {
      populateFormWithProduct(form, data, {
        storedPhotos,
        onPhotosUpdated: () => populateExistingPhotos(currentPhotosContainer, storedPhotos, removePhotoAtIndex),
        variantList,
        pricingBody
      });
      setStatus(statusEl, 'Mode sunting produk aktif.');
    }
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    setStatus(statusEl, editingId ? 'Memperbarui produk...' : 'Menyimpan produk...', { busy: true });

    try {
      const formData = new FormData(form);
      const photos = Array.from(form.querySelectorAll('input[type="file"][name^="photo-"]'))
        .map(input => input.files?.[0] ?? null)
        .filter(Boolean);

      const newPhotoData = await Promise.all(photos.map(file => readFileAsDataUrl(file)));
      const mergedPhotos = [...storedPhotos, ...newPhotoData].slice(0, 5);

      const payload = buildProductPayload({ formData, variantList, pricingBody, photos: mergedPhotos });
      const supabasePayload = {
        ...payload,
        trade_in: payload.tradeIn,
        variant_pricing: payload.variantPricing,
        updated_at: new Date().toISOString()
      };
      delete supabasePayload.tradeIn;
      delete supabasePayload.variantPricing;

      let supabaseResult;
      if (editingId) {
        supabaseResult = await supabase
          .from('products')
          .update(supabasePayload)
          .eq('id', editingId)
          .select();
      } else {
        supabasePayload.id = crypto.randomUUID();
        supabasePayload.created_at = new Date().toISOString();
        supabaseResult = await supabase
          .from('products')
          .insert(supabasePayload)
          .select();
      }

      if (supabaseResult.error) {
        throw supabaseResult.error;
      }

      setStatus(statusEl, editingId ? 'Produk berhasil diperbarui.' : 'Produk berhasil disimpan.');
      if (editingId) {
        storedPhotos.splice(0, storedPhotos.length, ...mergedPhotos);
        populateExistingPhotos(currentPhotosContainer, storedPhotos, removePhotoAtIndex);
      } else {
        form.reset();
        storedPhotos.splice(0, storedPhotos.length);
        populateExistingPhotos(currentPhotosContainer, storedPhotos, removePhotoAtIndex);
        variantList.innerHTML = '';
        pricingBody.innerHTML = '';
      }
    } catch (error) {
      console.error('Gagal menyimpan produk', error);
      setStatus(statusEl, 'Terjadi kesalahan saat menyimpan produk. Coba lagi.', { tone: 'danger' });
    } finally {
      submitButton.disabled = false;
      submitButton.focus();
      setStatus(statusEl, statusEl.textContent, { tone: statusEl.dataset.tone ?? 'info' });
    }
  });
}

function buildProductPayload({ formData, variantList, pricingBody, photos }) {
  const payload = Object.fromEntries(formData.entries());

  const inventory = {
    initialStockPrediction: parseNumber(payload.initialStockPrediction),
    dailyAverageSales: parseNumber(payload.dailyAverageSales),
    leadTime: parseNumber(payload.leadTime),
    reorderPoint: parseNumber(payload.reorderPoint),
    weightGram: parseNumber(payload.weightGram),
    lengthCm: parseNumber(payload.lengthCm),
    widthCm: parseNumber(payload.widthCm),
    heightCm: parseNumber(payload.heightCm),
    volumeCbm: parseNumber(payload.volumeCbm),
    shippingSeaRate: parseNumber(payload.shippingSeaRate),
    shippingAirRate: parseNumber(payload.shippingAirRate)
  };

  const cleanPayload = {
    name: (payload.name ?? '').toString().trim(),
    category: (payload.category ?? '').toString().trim(),
    brand: (payload.brand ?? '').toString().trim(),
    description: (payload.description ?? '').toString().trim(),
    tradeIn: formData.get('tradeIn') === 'on',
    photos: photos.filter(Boolean),
    inventory,
    variants: collectVariants(variantList),
    variantPricing: collectPricingRows(pricingBody)
  };

  return cleanPayload;
}

function populateFormWithProduct(form, product, { storedPhotos, onPhotosUpdated, variantList, pricingBody }) {
  form.elements.name.value = product.name ?? '';
  const categoryValue = product.category ?? '';
  if (categoryValue) {
    const categorySelect = form.elements.category;
    const hasOption = Array.from(categorySelect.options).some(option => option.value === categoryValue);
    if (!hasOption) {
      const option = document.createElement('option');
      option.value = categoryValue;
      option.textContent = `${categoryValue} (tidak lagi tersedia)`;
      categorySelect.appendChild(option);
    }
    categorySelect.value = categoryValue;
  }
  form.elements.brand.value = product.brand ?? '';
  form.elements.description.value = product.description ?? '';

  if (product.trade_in ?? product.tradeIn) {
    form.elements.tradeIn.checked = true;
  }

  form.elements.initialStockPrediction.value = product.inventory?.initialStockPrediction ?? '';
  form.elements.dailyAverageSales.value = product.inventory?.dailyAverageSales ?? '';
  form.elements.leadTime.value = product.inventory?.leadTime ?? '';
  form.elements.reorderPoint.value = product.inventory?.reorderPoint ?? '';
  form.elements.weightGram.value = product.inventory?.weightGram ?? '';
  form.elements.lengthCm.value = product.inventory?.lengthCm ?? '';
  form.elements.widthCm.value = product.inventory?.widthCm ?? '';
  form.elements.heightCm.value = product.inventory?.heightCm ?? '';
  form.elements.volumeCbm.value = product.inventory?.volumeCbm ?? '';
  form.elements.shippingSeaRate.value = product.inventory?.shippingSeaRate ?? '';
  form.elements.shippingAirRate.value = product.inventory?.shippingAirRate ?? '';

  storedPhotos.splice(0, storedPhotos.length, ...(product.photos ?? []));
  onPhotosUpdated?.();

  populateVariantList(variantList, Array.isArray(product.variants) ? product.variants : []);
  populatePricingTable(pricingBody, Array.isArray(product.variant_pricing) ? product.variant_pricing : product.variantPricing ?? []);
}

init();
