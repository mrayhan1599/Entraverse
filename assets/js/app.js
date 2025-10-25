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
        offlinePrice: '9555000',
        entraversePrice: '9700000',
        tokopediaPrice: '9750000',
        shopeePrice: '9650000',
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
        offlinePrice: '9799000',
        entraversePrice: '9899000',
        tokopediaPrice: '10000000',
        shopeePrice: '9950000',
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
        offlinePrice: '10350000',
        entraversePrice: '10499000',
        tokopediaPrice: '10699000',
        shopeePrice: '10550000',
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
        offlinePrice: '10899000',
        entraversePrice: '10999000',
        tokopediaPrice: '11150000',
        shopeePrice: '11050000',
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

const SUPABASE_TABLES = Object.freeze({
  users: 'users',
  products: 'products',
  categories: 'categories'
});

let supabaseClient = null;
let supabaseInitializationPromise = null;
let supabaseInitializationError = null;

const remoteCache = {
  [STORAGE_KEYS.users]: [],
  [STORAGE_KEYS.products]: [],
  [STORAGE_KEYS.categories]: []
};

let seedingPromise = null;

function getSupabaseConfig() {
  const config = window.entraverseConfig?.supabase ?? {};
  const url = typeof config.url === 'string' ? config.url.trim() : '';
  const anonKey = typeof config.anonKey === 'string' ? config.anonKey.trim() : '';

  if (!url || !anonKey || url.includes('your-project.supabase.co') || anonKey === 'public-anon-key') {
    return null;
  }

  return { url, anonKey };
}

function getSupabaseInitializationError() {
  return supabaseInitializationError;
}

function isSupabaseConfigured() {
  return Boolean(getSupabaseConfig());
}

function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    throw new Error('Library Supabase belum dimuat.');
  }

  const config = getSupabaseConfig();
  if (!config) {
    throw new Error('Konfigurasi Supabase belum diatur.');
  }

  supabaseClient = window.supabase.createClient(config.url, config.anonKey);
  return supabaseClient;
}

async function ensureSupabase() {
  if (supabaseInitializationPromise) {
    return supabaseInitializationPromise;
  }

  supabaseInitializationPromise = (async () => {
    try {
      return getSupabaseClient();
    } catch (error) {
      supabaseInitializationError = error;
      throw error;
    }
  })();

  return supabaseInitializationPromise;
}

function toIsoTimestamp(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value.toISOString();
  }

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      return null;
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  if (typeof value === 'string') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  return null;
}

function setRemoteCache(key, value) {
  if (!Object.prototype.hasOwnProperty.call(remoteCache, key)) {
    return;
  }

  if (!Array.isArray(value)) {
    remoteCache[key] = [];
    return;
  }

  remoteCache[key] = value.map(item => clone(item));
}

function getRemoteCache(key, fallback) {
  if (!Object.prototype.hasOwnProperty.call(remoteCache, key)) {
    return clone(fallback);
  }

  return clone(remoteCache[key]);
}

function mapSupabaseCategory(record) {
  if (!record) {
    return null;
  }

  const fees = typeof record.fees === 'object' && record.fees ? record.fees : {};
  const margin = typeof record.margin === 'object' && record.margin ? record.margin : {};

  return {
    id: record.id,
    name: record.name ?? '',
    note: record.note ?? '',
    fees: {
      marketplace: fees.marketplace ?? '',
      shopee: fees.shopee ?? '',
      entraverse: fees.entraverse ?? ''
    },
    margin: {
      value: margin.value ?? '',
      trend: margin.trend === 'down' ? 'down' : 'up',
      note: margin.note ?? ''
    },
    bonus: typeof record.bonus === 'string' && record.bonus.trim() ? record.bonus : null,
    createdAt: record.created_at ? new Date(record.created_at).getTime() : Date.now(),
    updatedAt: record.updated_at ? new Date(record.updated_at).getTime() : null
  };
}

function mapCategoryToRecord(category) {
  const fees = category.fees ?? {};
  const margin = category.margin ?? {};

  return {
    id: category.id,
    name: category.name,
    note: category.note || null,
    fees: {
      marketplace: fees.marketplace ?? '',
      shopee: fees.shopee ?? '',
      entraverse: fees.entraverse ?? ''
    },
    margin: {
      value: margin.value ?? '',
      trend: margin.trend === 'down' ? 'down' : 'up',
      note: margin.note ?? ''
    },
    bonus: category.bonus || null,
    created_at: toIsoTimestamp(category.createdAt) ?? new Date().toISOString(),
    updated_at: toIsoTimestamp(category.updatedAt)
  };
}

function setCategoryCache(categories) {
  setRemoteCache(STORAGE_KEYS.categories, Array.isArray(categories) ? categories : []);
  document.dispatchEvent(new CustomEvent('categories:changed', {
    detail: { categories: getCategories() }
  }));
}

function getCategoriesFromCache() {
  return getRemoteCache(STORAGE_KEYS.categories, []);
}

async function refreshCategoriesFromSupabase() {
  await ensureSupabase();
  const client = getSupabaseClient();
  const { data, error } = await client
    .from(SUPABASE_TABLES.categories)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  const categories = (data ?? []).map(mapSupabaseCategory).filter(Boolean);
  setCategoryCache(categories);
  return categories;
}

async function deleteCategoryFromSupabase(id) {
  await ensureSupabase();
  const client = getSupabaseClient();
  const { error } = await client
    .from(SUPABASE_TABLES.categories)
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

async function upsertCategoryToSupabase(category) {
  await ensureSupabase();
  const client = getSupabaseClient();
  const payload = mapCategoryToRecord(category);
  if (!payload.id) {
    payload.id = crypto.randomUUID();
  }
  if (!payload.updated_at) {
    payload.updated_at = new Date().toISOString();
  }

  const { error } = await client
    .from(SUPABASE_TABLES.categories)
    .upsert(payload, { onConflict: 'id' })
    .select();

  if (error) {
    throw error;
  }
}

function mapSupabaseProduct(record) {
  if (!record) {
    return null;
  }

  const photos = Array.isArray(record.photos) ? record.photos.filter(Boolean) : [];
  const variants = Array.isArray(record.variants) ? record.variants : [];
  const variantPricing = Array.isArray(record.variant_pricing) ? record.variant_pricing : [];

  return {
    id: record.id,
    name: record.name ?? '',
    category: record.category ?? '',
    brand: record.brand ?? '',
    description: record.description ?? '',
    tradeIn: Boolean(record.trade_in),
    inventory: record.inventory ?? null,
    photos,
    variants,
    variantPricing,
    createdAt: record.created_at ? new Date(record.created_at).getTime() : Date.now(),
    updatedAt: record.updated_at ? new Date(record.updated_at).getTime() : null
  };
}

function mapProductToRecord(product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    brand: product.brand || null,
    description: product.description || null,
    trade_in: Boolean(product.tradeIn),
    inventory: product.inventory ?? null,
    photos: Array.isArray(product.photos) ? product.photos : [],
    variants: Array.isArray(product.variants) ? product.variants : [],
    variant_pricing: Array.isArray(product.variantPricing) ? product.variantPricing : [],
    created_at: toIsoTimestamp(product.createdAt) ?? new Date().toISOString(),
    updated_at: toIsoTimestamp(product.updatedAt)
  };
}

function setProductCache(products) {
  setRemoteCache(STORAGE_KEYS.products, Array.isArray(products) ? products : []);
}

function getProductsFromCache() {
  return getRemoteCache(STORAGE_KEYS.products, []);
}

async function refreshProductsFromSupabase() {
  await ensureSupabase();
  const client = getSupabaseClient();
  const { data, error } = await client
    .from(SUPABASE_TABLES.products)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  const products = (data ?? []).map(mapSupabaseProduct).filter(Boolean);
  setProductCache(products);
  return products;
}

async function deleteProductFromSupabase(id) {
  await ensureSupabase();
  const client = getSupabaseClient();
  const { error } = await client
    .from(SUPABASE_TABLES.products)
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

async function upsertProductToSupabase(product) {
  await ensureSupabase();
  const client = getSupabaseClient();
  const payload = mapProductToRecord(product);
  if (!payload.id) {
    payload.id = crypto.randomUUID();
  }
  if (!payload.updated_at) {
    payload.updated_at = new Date().toISOString();
  }

  const { error } = await client
    .from(SUPABASE_TABLES.products)
    .upsert(payload, { onConflict: 'id' })
    .select();

  if (error) {
    throw error;
  }
}

function sanitizeSessionUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name ?? '',
    company: user.company ?? '',
    email: user.email ?? ''
  };
}

function mapSupabaseUser(record) {
  if (!record) {
    return null;
  }

  return {
    id: record.id,
    name: record.name ?? '',
    company: record.company ?? '',
    email: record.email ?? '',
    passwordHash: record.password_hash ?? '',
    createdAt: record.created_at ? new Date(record.created_at).getTime() : Date.now(),
    updatedAt: record.updated_at ? new Date(record.updated_at).getTime() : null
  };
}

function mapUserToRecord(user) {
  return {
    id: user.id,
    name: user.name,
    company: user.company,
    email: user.email,
    password_hash: user.passwordHash,
    created_at: toIsoTimestamp(user.createdAt) ?? new Date().toISOString(),
    updated_at: toIsoTimestamp(user.updatedAt)
  };
}

async function fetchUserByEmail(email) {
  await ensureSupabase();
  const client = getSupabaseClient();
  const { data, error } = await client
    .from(SUPABASE_TABLES.users)
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    if (error.code === 'PGRST116' || error.code === 'PGRST103') {
      return null;
    }
    if (error.details?.includes('No rows found')) {
      return null;
    }
    throw error;
  }

  return mapSupabaseUser(data);
}

async function fetchUserById(id) {
  await ensureSupabase();
  const client = getSupabaseClient();
  const { data, error } = await client
    .from(SUPABASE_TABLES.users)
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    if (error.code === 'PGRST116' || error.code === 'PGRST103') {
      return null;
    }
    if (error.details?.includes('No rows found')) {
      return null;
    }
    throw error;
  }

  return mapSupabaseUser(data);
}

async function insertUserToSupabase(user) {
  await ensureSupabase();
  const client = getSupabaseClient();
  const payload = mapUserToRecord(user);
  const { data, error } = await client
    .from(SUPABASE_TABLES.users)
    .insert(payload)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return mapSupabaseUser(data);
}

async function ensureSeeded() {
  await ensureSupabase();
  if (!seedingPromise) {
    seedingPromise = (async () => {
      const client = getSupabaseClient();

      const { count: categoryCount, error: categoryError } = await client
        .from(SUPABASE_TABLES.categories)
        .select('id', { count: 'exact', head: true });

      if (categoryError) {
        throw categoryError;
      }

      if (!categoryCount) {
        const now = new Date().toISOString();
        await client.from(SUPABASE_TABLES.categories).insert(
          DEFAULT_CATEGORIES.map(category => {
            const mapped = mapCategoryToRecord({
              ...category,
              createdAt: now,
              updatedAt: now
            });
            mapped.created_at = now;
            mapped.updated_at = now;
            return mapped;
          })
        );
      }

      const { count: productCount, error: productError } = await client
        .from(SUPABASE_TABLES.products)
        .select('id', { count: 'exact', head: true });

      if (productError) {
        throw productError;
      }

      if (!productCount) {
        const now = new Date().toISOString();
        await client.from(SUPABASE_TABLES.products).insert(
          DEFAULT_PRODUCTS.map(product => {
            const mapped = mapProductToRecord({
              ...product,
              createdAt: now,
              updatedAt: now
            });
            mapped.created_at = now;
            mapped.updated_at = now;
            return mapped;
          })
        );
      }

      await refreshCategoriesFromSupabase();
      await refreshProductsFromSupabase();
    })().catch(error => {
      console.error('Gagal melakukan seeding awal Supabase.', error);
      throw error;
    });
  }

  return seedingPromise;
}

async function hashPassword(password) {
  if (typeof password !== 'string') {
    return '';
  }

  try {
    if (typeof crypto?.subtle?.digest === 'function' && typeof TextEncoder === 'function') {
      const encoder = new TextEncoder();
      const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(password));
      return Array.from(new Uint8Array(buffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
    }
  } catch (error) {
    console.warn('Gagal melakukan hashing password, menggunakan fallback.', error);
  }

  return password;
}

const BANK_INDONESIA_SOURCE_TYPES = Object.freeze({
  JSON: 'json',
  HTML: 'html',
  EXCEL: 'excel'
});

const BANK_INDONESIA_EXCHANGE_SOURCES = Object.freeze([
  {
    type: BANK_INDONESIA_SOURCE_TYPES.EXCEL,
    url: 'https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/download-data'
  },
  {
    type: BANK_INDONESIA_SOURCE_TYPES.EXCEL,
    url: 'https://cors.isomorphic-git.org/https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/download-data'
  },
  {
    type: BANK_INDONESIA_SOURCE_TYPES.EXCEL,
    url: 'https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/DownloadData'
  },
  {
    type: BANK_INDONESIA_SOURCE_TYPES.EXCEL,
    url: 'https://cors.isomorphic-git.org/https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/DownloadData'
  },
  {
    type: BANK_INDONESIA_SOURCE_TYPES.JSON,
    url: 'https://www.bi.go.id/biwebservice/dataservice.svc/spotrate?$format=json'
  },
  {
    type: BANK_INDONESIA_SOURCE_TYPES.JSON,
    url: 'https://cors.isomorphic-git.org/https://www.bi.go.id/biwebservice/dataservice.svc/spotrate?$format=json'
  },
  {
    type: BANK_INDONESIA_SOURCE_TYPES.HTML,
    url: 'https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/default.aspx'
  },
  {
    type: BANK_INDONESIA_SOURCE_TYPES.HTML,
    url: 'https://cors.isomorphic-git.org/https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/default.aspx'
  },
  {
    type: BANK_INDONESIA_SOURCE_TYPES.HTML,
    url: 'assets/data/kurs-transaksi-bi.html'
  }
]);
const BANK_INDONESIA_SUPPORTED_CURRENCIES = Object.freeze(['IDR', 'USD', 'SGD', 'EUR']);
const BANK_INDONESIA_CACHE_KEY = 'entraverse_bank_indonesia_rates_v1';
const BANK_INDONESIA_CACHE_VERSION = 1;
const BANK_INDONESIA_REFRESH_TIME = Object.freeze({ hour: 0, minute: 1 });
const BANK_INDONESIA_RATE_TYPE_LABELS = Object.freeze({
  sell: 'kurs jual',
  mid: 'kurs tengah',
  buy: 'kurs beli',
  average: 'kurs rata-rata',
  fixed: 'kurs tetap'
});

function getNextBankIndonesiaRefreshTime(reference = Date.now()) {
  const now = reference instanceof Date ? new Date(reference.getTime()) : new Date(reference);
  if (Number.isNaN(now.getTime())) {
    return Date.now() + 24 * 60 * 60 * 1000;
  }
  const next = new Date(now);
  next.setHours(BANK_INDONESIA_REFRESH_TIME.hour, BANK_INDONESIA_REFRESH_TIME.minute, 0, 0);
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }
  return next.getTime();
}

function getCurrentBankIndonesiaRefreshThreshold(reference = Date.now()) {
  const now = reference instanceof Date ? new Date(reference.getTime()) : new Date(reference);
  if (Number.isNaN(now.getTime())) {
    return Date.now();
  }
  const threshold = new Date(now);
  threshold.setHours(BANK_INDONESIA_REFRESH_TIME.hour, BANK_INDONESIA_REFRESH_TIME.minute, 0, 0);
  if (threshold > now) {
    threshold.setDate(threshold.getDate() - 1);
  }
  return threshold.getTime();
}

function decodeArrayBufferToString(buffer, preferredEncodings = []) {
  if (!buffer) {
    return '';
  }

  const arrayBuffer = buffer instanceof ArrayBuffer ? buffer : buffer.buffer;
  if (!(arrayBuffer instanceof ArrayBuffer)) {
    return '';
  }

  const encodings = Array.isArray(preferredEncodings) ? preferredEncodings.slice() : [];
  if (typeof TextDecoder === 'function') {
    const decoderCandidates = encodings.concat(['utf-8', 'iso-8859-1']);
    for (const encoding of decoderCandidates) {
      if (!encoding) {
        continue;
      }
      try {
        const decoder = new TextDecoder(encoding, { fatal: false });
        return decoder.decode(arrayBuffer);
      } catch (error) {
        if (encoding === decoderCandidates[decoderCandidates.length - 1]) {
          console.warn('Gagal mendekode ArrayBuffer dengan encoding', encoding, error);
        }
      }
    }
  }

  let result = '';
  try {
    const view = new Uint8Array(arrayBuffer);
    const chunkSize = 8192;
    for (let index = 0; index < view.length; index += chunkSize) {
      const chunk = view.subarray(index, index + chunkSize);
      result += String.fromCharCode(...chunk);
    }
  } catch (error) {
    console.warn('Gagal mengubah ArrayBuffer menjadi string.', error);
  }
  return result;
}

function parseDelimitedLine(line, delimiter) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (!inQuotes && char === delimiter) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result.map(value => value.trim());
}

function parseBankIndonesiaCsvPayload(text) {
  if (typeof text !== 'string' || !text.trim()) {
    return null;
  }

  const trimmed = text.trim();
  const lines = trimmed.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  if (lines.length < 2) {
    return null;
  }

  const possibleDelimiters = [',', ';', '\t', '|'];
  const delimiter = possibleDelimiters.find(delim => lines[0].includes(delim)) || ',';
  const headers = parseDelimitedLine(lines[0], delimiter).map(header => header.toLowerCase());

  const currencyIndex = headers.findIndex(header => header.includes('mata uang') || header.includes('currency'));
  if (currencyIndex === -1) {
    return null;
  }

  let rateColumnIndex = headers.findIndex(header => header.includes('kurs jual') || header.includes('selling'));
  let rateType = 'sell';
  if (rateColumnIndex === -1) {
    rateColumnIndex = headers.findIndex(header => header.includes('kurs tengah') || header.includes('middle'));
    rateType = rateColumnIndex === -1 ? 'sell' : 'mid';
  }
  if (rateColumnIndex === -1) {
    rateColumnIndex = headers.findIndex(header => header.includes('kurs beli') || header.includes('buying'));
    rateType = rateColumnIndex === -1 ? 'sell' : 'buy';
  }
  if (rateColumnIndex === -1) {
    rateColumnIndex = headers.length - 1;
    rateType = 'sell';
  }

  const tanggalIndex = headers.findIndex(header => header.includes('tanggal'));

  const rates = new Map();
  let latestDate = null;

  for (let i = 1; i < lines.length; i += 1) {
    const cells = parseDelimitedLine(lines[i], delimiter);
    if (!cells.length) {
      continue;
    }

    const currencyCell = cells[currencyIndex] ?? '';
    const match = currencyCell.toUpperCase().match(/([A-Z]{3})/);
    if (!match) {
      continue;
    }

    const code = match[1];
    if (!BANK_INDONESIA_SUPPORTED_CURRENCIES.includes(code)) {
      continue;
    }

    const rate = parseNumericValue(cells[rateColumnIndex] ?? '');
    if (!Number.isFinite(rate)) {
      continue;
    }

    let entryDate = null;
    if (tanggalIndex !== -1 && tanggalIndex < cells.length) {
      entryDate = parseIndonesianDateString(cells[tanggalIndex]);
    }

    if (entryDate && (!latestDate || entryDate > latestDate)) {
      latestDate = entryDate;
    }

    rates.set(code, { rate, date: entryDate, rateType });
  }

  if (!rates.size) {
    return null;
  }

  rates.set('IDR', { rate: 1, date: latestDate, rateType: 'fixed' });
  return { rates, latestDate };
}

function parseBankIndonesiaExcelPayload(buffer, contentType) {
  if (!buffer) {
    return null;
  }

  const encodingCandidates = [];
  if (typeof contentType === 'string') {
    const charsetMatch = contentType.match(/charset=([^;]+)/i);
    if (charsetMatch) {
      encodingCandidates.push(charsetMatch[1].trim());
    }
  }

  const text = decodeArrayBufferToString(buffer, encodingCandidates);
  if (text && /<table/i.test(text)) {
    return parseBankIndonesiaHtmlPayload(text);
  }

  if (text && text.trim()) {
    const csvResult = parseBankIndonesiaCsvPayload(text);
    if (csvResult) {
      return csvResult;
    }
  }

  return null;
}

function readBankIndonesiaRatesCache() {
  if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') {
    return null;
  }

  try {
    const raw = localStorage.getItem(BANK_INDONESIA_CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== BANK_INDONESIA_CACHE_VERSION) {
      return null;
    }

    if (typeof parsed.fetchedAt !== 'number') {
      return null;
    }

    const threshold = getCurrentBankIndonesiaRefreshThreshold();
    if (parsed.fetchedAt < threshold) {
      return null;
    }

    const expiresAt = typeof parsed.expiresAt === 'number'
      ? parsed.expiresAt
      : getNextBankIndonesiaRefreshTime(parsed.fetchedAt);
    if (expiresAt <= Date.now()) {
      return null;
    }

    const rates = new Map();
    if (Array.isArray(parsed.rates)) {
      parsed.rates.forEach(entry => {
        if (!Array.isArray(entry) || entry.length < 2) {
          return;
        }
        const [code, data] = entry;
        if (typeof code !== 'string' || !data) {
          return;
        }

        const normalizedCode = code.trim().toUpperCase();
        if (!BANK_INDONESIA_SUPPORTED_CURRENCIES.includes(normalizedCode) && normalizedCode !== 'IDR') {
          return;
        }

        const rate = parseNumericValue(data.rate);
        if (!Number.isFinite(rate)) {
          return;
        }

        const entryDate = parseDateValue(data.date);
        const rateType = typeof data.rateType === 'string' ? data.rateType : null;
        rates.set(normalizedCode, { rate, date: entryDate, rateType });
      });
    }

    if (!rates.size) {
      return null;
    }

    if (!rates.has('IDR')) {
      rates.set('IDR', { rate: 1, date: parseDateValue(parsed.lastUpdated) ?? null, rateType: 'fixed' });
    }

    return {
      rates,
      lastUpdated: parseDateValue(parsed.lastUpdated) ?? null,
      source: parsed.source && typeof parsed.source === 'object' ? parsed.source : null,
      fetchedAt: parsed.fetchedAt,
      expiresAt
    };
  } catch (error) {
    console.warn('Tidak dapat membaca cache kurs Bank Indonesia.', error);
    return null;
  }
}

function writeBankIndonesiaRatesCache({ rates, lastUpdated, source }) {
  if (typeof localStorage === 'undefined' || typeof localStorage.setItem !== 'function') {
    return null;
  }

  try {
    const serializedRates = [];
    if (rates instanceof Map) {
      rates.forEach((value, code) => {
        if (!code) {
          return;
        }
        serializedRates.push([
          code,
          {
            rate: value?.rate ?? null,
            date: value?.date instanceof Date ? value.date.getTime() : value?.date ?? null,
            rateType: value?.rateType ?? null
          }
        ]);
      });
    }

    const now = Date.now();
    const expiresAt = getNextBankIndonesiaRefreshTime(now);
    const payload = {
      version: BANK_INDONESIA_CACHE_VERSION,
      fetchedAt: now,
      expiresAt,
      lastUpdated: lastUpdated instanceof Date ? lastUpdated.getTime() : lastUpdated ?? null,
      rates: serializedRates,
      source: source ? { url: source.url ?? null, type: source.type ?? null } : null
    };

    localStorage.setItem(BANK_INDONESIA_CACHE_KEY, JSON.stringify(payload));
    return expiresAt;
  } catch (error) {
    console.warn('Tidak dapat menyimpan cache kurs Bank Indonesia.', error);
    return null;
  }
}

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
  if (Object.prototype.hasOwnProperty.call(remoteCache, key)) {
    return getRemoteCache(key, fallback);
  }

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
  if (Object.prototype.hasOwnProperty.call(remoteCache, key)) {
    setRemoteCache(key, Array.isArray(value) ? value : []);
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

function getCategories() {
  return getCategoriesFromCache();
}

function saveCategories(categories) {
  setCategoryCache(Array.isArray(categories) ? categories : []);
}

function getGuestUser() {
  return { ...GUEST_USER };
}

function getCurrentUser() {
  const session = getData(STORAGE_KEYS.session, null);
  if (!session || !session.user) {
    return null;
  }
  return sanitizeSessionUser(session.user);
}

function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.session);
    return;
  }

  const sanitized = sanitizeSessionUser(user);
  const payload = {
    userId: sanitized.id,
    loggedInAt: Date.now(),
    user: sanitized
  };
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(payload));
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

const INDONESIAN_MONTH_INDEX = Object.freeze({
  januari: 0,
  februari: 1,
  maret: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  agustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  desember: 11
});

function parseIndonesianDateString(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const textualMatch = trimmed.match(
    /(\d{1,2})\s+(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+(\d{4})/i
  );
  if (textualMatch) {
    const day = Number(textualMatch[1]);
    const monthName = textualMatch[2].toLowerCase();
    const year = Number(textualMatch[3]);
    const monthIndex = INDONESIAN_MONTH_INDEX[monthName];
    if (Number.isFinite(day) && Number.isFinite(year) && Number.isFinite(monthIndex)) {
      const candidate = new Date(year, monthIndex, day);
      if (!Number.isNaN(candidate.getTime())) {
        return candidate;
      }
    }
  }

  const slashMatch = trimmed.match(/(\d{1,2})[\/](\d{1,2})[\/](\d{4})/);
  if (slashMatch) {
    const day = Number(slashMatch[1]);
    const month = Number(slashMatch[2]) - 1;
    const year = Number(slashMatch[3]);
    if (Number.isFinite(day) && Number.isFinite(month) && Number.isFinite(year)) {
      const candidate = new Date(year, month, day);
      if (!Number.isNaN(candidate.getTime())) {
        return candidate;
      }
    }
  }

  const isoMatch = trimmed.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]) - 1;
    const day = Number(isoMatch[3]);
    if (Number.isFinite(day) && Number.isFinite(month) && Number.isFinite(year)) {
      const candidate = new Date(year, month, day);
      if (!Number.isNaN(candidate.getTime())) {
        return candidate;
      }
    }
  }

  const direct = new Date(trimmed);
  return Number.isNaN(direct.getTime()) ? null : direct;
}

function extractBankIndonesiaDateFromHtml(doc, rawHtml) {
  const candidates = [];

  if (doc) {
    const targetedElements = doc.querySelectorAll('[id*="tanggal" i], [class*="tanggal" i], [data-tanggal]');
    targetedElements.forEach(element => {
      const text = element?.textContent?.trim();
      if (text) {
        candidates.push(text);
      }
      const value = element?.getAttribute?.('value');
      if (value) {
        candidates.push(value);
      }
      const dataValue = element?.getAttribute?.('data-tanggal');
      if (dataValue) {
        candidates.push(dataValue);
      }
    });

    const hiddenInputs = doc.querySelectorAll('input[type="hidden" i]');
    hiddenInputs.forEach(input => {
      const name = input?.getAttribute?.('name')?.toLowerCase?.() ?? '';
      if (name.includes('tanggal')) {
        const value = input?.getAttribute?.('value')?.trim?.();
        if (value) {
          candidates.push(value);
        }
      }
    });

    const bodyText = doc.body?.textContent;
    if (bodyText) {
      candidates.push(bodyText);
    }
  }

  if (typeof rawHtml === 'string' && rawHtml.trim()) {
    candidates.push(rawHtml);
  }

  const patterns = [
    /Tanggal[^0-9A-Za-z]*:?\s*(\d{1,2}\s+(?:Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+\d{4})/i,
    /Per\s*(\d{1,2}\s+(?:Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+\d{4})/i,
    /(\d{1,2}\s+(?:Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+\d{4})/i,
    /(\d{1,2}[\/](?:\d{1,2})[\/](?:\d{4}))/,
    /(\d{4}-\d{2}-\d{2})/
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    for (const pattern of patterns) {
      const match = candidate.match(pattern);
      if (match && match[1]) {
        const parsed = parseIndonesianDateString(match[1]);
        if (parsed) {
          return parsed;
        }
      }
    }
  }

  return null;
}

function parseBankIndonesiaJsonPayload(payload) {
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

    let resolvedRate = Number.isFinite(sellRate) ? sellRate : null;
    let rateType = Number.isFinite(sellRate) ? 'sell' : null;

    if (!Number.isFinite(resolvedRate) && Number.isFinite(midRate)) {
      resolvedRate = midRate;
      rateType = 'mid';
    }

    if (!Number.isFinite(resolvedRate) && Number.isFinite(buyRate)) {
      resolvedRate = buyRate;
      rateType = 'buy';
    }

    if (!Number.isFinite(resolvedRate) && Number.isFinite(buyRate) && Number.isFinite(sellRate)) {
      resolvedRate = (buyRate + sellRate) / 2;
      rateType = 'average';
    }

    if (!Number.isFinite(resolvedRate)) {
      return;
    }

    const dateValue = parseDateValue(
      item.tanggal ?? item.Tanggal ?? item.date ?? item.Date ?? item.tanggal_update ?? item.valid_from
    );

    const existing = rates.get(code);
    if (!existing || (dateValue && (!existing.date || dateValue > existing.date))) {
      rates.set(code, { rate: resolvedRate, date: dateValue, rateType });
    }

    if (dateValue && (!latestDate || dateValue > latestDate)) {
      latestDate = dateValue;
    }
  });

  if (!rates.size) {
    return null;
  }

  rates.set('IDR', { rate: 1, date: latestDate, rateType: 'fixed' });
  return { rates, latestDate };
}

function parseBankIndonesiaHtmlPayload(html) {
  if (typeof html !== 'string' || !html.trim()) {
    return null;
  }

  if (typeof DOMParser === 'undefined') {
    console.warn('DOMParser tidak tersedia di lingkungan ini.');
    return null;
  }

  let doc;
  try {
    const parser = new DOMParser();
    doc = parser.parseFromString(html, 'text/html');
  } catch (error) {
    console.warn('Tidak dapat mem-parsing HTML kurs Bank Indonesia.', error);
    return null;
  }

  if (!doc) {
    return null;
  }

  const tables = Array.from(doc.querySelectorAll('table'));
  let targetTable = null;
  let headerCells = [];

  for (const table of tables) {
    const headerRows = [
      ...Array.from(table.querySelectorAll('thead tr')),
      table.querySelector('tr')
    ].filter(Boolean);

    for (const row of headerRows) {
      const cells = Array.from(row.querySelectorAll('th,td'));
      if (!cells.length) {
        continue;
      }

      const normalized = cells.map(cell => cell.textContent?.trim().toLowerCase() ?? '');
      const hasCurrencyColumn = normalized.some(text => text.includes('mata uang') || text.includes('currency'));
      const hasRateColumn = normalized.some(text => {
        return (
          text.includes('kurs jual')
          || text.includes('kurs tengah')
          || text.includes('middle rate')
          || text.includes('selling rate')
        );
      });
      if (hasCurrencyColumn && hasRateColumn) {
        targetTable = table;
        headerCells = cells;
        break;
      }
    }

    if (targetTable) {
      break;
    }
  }

  if (!targetTable) {
    return null;
  }

  let currencyColumnIndex = headerCells.findIndex(cell => (cell.textContent ?? '').toLowerCase().includes('mata uang'));
  if (currencyColumnIndex === -1) {
    currencyColumnIndex = 1;
  }

  const tanggalColumnIndex = headerCells.findIndex(cell => (cell.textContent ?? '').toLowerCase().includes('tanggal'));

  let rateColumnIndex = headerCells.findIndex(cell => (cell.textContent ?? '').toLowerCase().includes('kurs jual'));
  let rateType = 'sell';
  if (rateColumnIndex === -1) {
    rateColumnIndex = headerCells.findIndex(cell => {
      const text = (cell.textContent ?? '').toLowerCase();
      return text.includes('kurs tengah') || text.includes('middle rate');
    });
    rateType = rateColumnIndex === -1 ? 'sell' : 'mid';
  }
  if (rateColumnIndex === -1) {
    rateColumnIndex = headerCells.findIndex(cell => {
      const text = (cell.textContent ?? '').toLowerCase();
      return text.includes('kurs beli') || text.includes('buying rate');
    });
    rateType = rateColumnIndex === -1 ? 'sell' : 'buy';
  }
  if (rateColumnIndex === -1) {
    rateColumnIndex = headerCells.length - 1;
    rateType = 'sell';
  }

  const dataRows = Array.from(targetTable.querySelectorAll('tbody tr')).filter(row => row.querySelectorAll('td').length);
  const fallbackRows = Array.from(targetTable.querySelectorAll('tr')).slice(1);
  const rows = dataRows.length ? dataRows : fallbackRows;

  const rates = new Map();
  let latestDate = extractBankIndonesiaDateFromHtml(doc, html);

  rows.forEach(row => {
    const cells = Array.from(row.querySelectorAll('td'));
    if (!cells.length) {
      return;
    }

    const currencyCell = cells[currencyColumnIndex] ?? cells.find(cell => /[A-Z]{3}/.test(cell.textContent ?? ''));
    if (!currencyCell) {
      return;
    }

    const currencyMatch = (currencyCell.textContent ?? '')
      .toUpperCase()
      .match(/([A-Z]{3})/);
    if (!currencyMatch) {
      return;
    }

    const code = currencyMatch[1];
    if (!BANK_INDONESIA_SUPPORTED_CURRENCIES.includes(code)) {
      return;
    }

    const rateCell = cells[rateColumnIndex] ?? cells[cells.length - 1];
    const rate = parseNumericValue(rateCell?.textContent ?? '');
    if (!Number.isFinite(rate)) {
      return;
    }

    let rowDate = null;
    if (tanggalColumnIndex !== -1 && tanggalColumnIndex < cells.length) {
      rowDate = parseIndonesianDateString(cells[tanggalColumnIndex]?.textContent ?? '');
    }

    const entryDate = rowDate || latestDate;
    if (rowDate && (!latestDate || rowDate > latestDate)) {
      latestDate = rowDate;
    }

    rates.set(code, { rate, date: entryDate, rateType });
  });

  if (!rates.size) {
    return null;
  }

  rates.set('IDR', { rate: 1, date: latestDate, rateType: 'fixed' });
  return { rates, latestDate };
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

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get('name') ?? '').toString().trim();
    const company = (formData.get('company') ?? '').toString().trim();
    const email = (formData.get('email') ?? '').toString().trim().toLowerCase();
    const password = (formData.get('password') ?? '').toString().trim();
    const confirm = (formData.get('confirm') ?? '').toString().trim();

    if (password !== confirm) {
      toast.show('Kata sandi dan konfirmasi tidak sama.');
      return;
    }

    if (!email || !password) {
      toast.show('Lengkapi semua bidang formulir.');
      return;
    }

    try {
      await ensureSupabase();
    } catch (error) {
      console.error('Supabase belum siap.', error);
      toast.show('Supabase belum dikonfigurasi. Hubungi administrator.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
    }

    try {
      const existing = await fetchUserByEmail(email);
      if (existing) {
        toast.show('Email sudah terdaftar, silakan masuk.');
        return;
      }

      const passwordHash = await hashPassword(password);
      const now = new Date().toISOString();
      const newUser = {
        id: crypto.randomUUID(),
        name,
        company,
        email,
        passwordHash,
        createdAt: now,
        updatedAt: now
      };

      const saved = await insertUserToSupabase(newUser);
      setCurrentUser(saved);
      toast.show('Pendaftaran berhasil, mengalihkan...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    } catch (error) {
      console.error('Gagal mendaftarkan pengguna.', error);
      toast.show('Gagal melakukan pendaftaran, coba lagi.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
      }
    }
  });
}

function handleLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const email = (formData.get('email') ?? '').toString().trim().toLowerCase();
    const password = (formData.get('password') ?? '').toString().trim();

    if (!email || !password) {
      toast.show('Isi email dan kata sandi Anda.');
      return;
    }

    try {
      await ensureSupabase();
    } catch (error) {
      console.error('Supabase belum siap.', error);
      toast.show('Supabase belum dikonfigurasi. Hubungi administrator.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
    }

    try {
      const user = await fetchUserByEmail(email);
      if (!user) {
        toast.show('Email atau kata sandi salah.');
        return;
      }

      const hashed = await hashPassword(password);
      if (!user.passwordHash || user.passwordHash !== hashed) {
        toast.show('Email atau kata sandi salah.');
        return;
      }

      setCurrentUser(user);
      toast.show('Selamat datang kembali!');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 700);
    } catch (error) {
      console.error('Gagal melakukan login.', error);
      toast.show('Gagal masuk, coba lagi.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
      }
    }
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

async function ensureAuthenticatedPage() {
  const page = document.body.dataset.page;
  if (!['dashboard', 'add-product', 'categories'].includes(page)) {
    return null;
  }

  const sessionUser = getCurrentUser();
  if (!sessionUser) {
    return getGuestUser();
  }

  try {
    await ensureSupabase();
    const remoteUser = await fetchUserById(sessionUser.id);
    if (remoteUser) {
      setCurrentUser(remoteUser);
      return sanitizeSessionUser(remoteUser);
    }
    setCurrentUser(null);
  } catch (error) {
    const supabaseError = getSupabaseInitializationError();
    if (supabaseError) {
      console.error('Supabase belum siap.', supabaseError);
    }
    console.error('Gagal memuat data pengguna.', error);
    return sessionUser;
  }

  return getGuestUser();
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

  const products = getProductsFromCache();
  const normalizedFilter = (filterText ?? '').toString().trim().toLowerCase();

  const filtered = products.filter(product => {
    if (!normalizedFilter) {
      return true;
    }
    const name = (product.name ?? '').toString().toLowerCase();
    const brand = (product.brand ?? '').toString().toLowerCase();
    return name.includes(normalizedFilter) || brand.includes(normalizedFilter);
  });

  tbody.innerHTML = '';

  filtered.forEach(product => {
    const row = document.createElement('tr');
    const firstPhoto = Array.isArray(product.photos) && product.photos.length ? product.photos[0] : null;
    const safeName = escapeHtml(product.name ?? '');
    const safeBrand = product.brand ? escapeHtml(product.brand) : '';

    row.innerHTML = `
      <td>
        <div class="photo-preview">
          ${firstPhoto ? `<img src="${firstPhoto}" alt="${safeName}">` : 'No Photo'}
        </div>
      </td>
      <td>
        <div class="product-cell">
          <strong>${safeName}</strong>
          ${safeBrand ? `<span class="product-meta">${safeBrand}</span>` : ''}
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

  const getCurrentFilter = () => {
    const searchInput = document.getElementById('search-input');
    return (searchInput?.value ?? '').toString().trim().toLowerCase();
  };

  tbody.addEventListener('click', async event => {
    const target = event.target.closest('button');
    if (!target) return;

    const id = target.dataset.id;
    if (!id) return;

    const products = getProductsFromCache();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) return;

    if (target.dataset.action === 'edit') {
      window.location.href = `add-product.html?id=${id}`;
      return;
    }

    if (target.dataset.action === 'delete') {
      if (!confirm('Hapus produk ini?')) {
        return;
      }
      try {
        await deleteProductFromSupabase(id);
        await refreshProductsFromSupabase();
        toast.show('Produk berhasil dihapus.');
        renderProducts(getCurrentFilter());
      } catch (error) {
        console.error('Gagal menghapus produk.', error);
        toast.show('Gagal menghapus produk, coba lagi.');
      }
      return;
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

  tbody.addEventListener('change', async event => {
    const input = event.target.closest('input[data-action="toggle-trade"]');
    if (!input) return;

    const id = input.dataset.id;
    const products = getProductsFromCache();
    const product = products.find(p => p.id === id);
    if (!product) {
      return;
    }

    input.disabled = true;

    try {
      const updated = { ...product, tradeIn: input.checked, updatedAt: Date.now() };
      await upsertProductToSupabase(updated);
      await refreshProductsFromSupabase();
      toast.show(input.checked ? 'Trade-in diaktifkan.' : 'Trade-in dimatikan.');
      renderProducts(getCurrentFilter());
    } catch (error) {
      console.error('Gagal memperbarui status trade-in.', error);
      input.checked = !input.checked;
      toast.show('Gagal memperbarui status trade-in. Coba lagi.');
    } finally {
      input.disabled = false;
    }
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

  tableBody.addEventListener('click', async event => {
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
      try {
        await deleteCategoryFromSupabase(id);
        await refreshCategoriesFromSupabase();
        toast.show('Kategori berhasil dihapus.');
        renderCategories(getCurrentFilter());
      } catch (error) {
        console.error('Gagal menghapus kategori.', error);
        toast.show('Gagal menghapus kategori. Coba lagi.');
      }
    }
  });

  form.addEventListener('submit', async event => {
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

    const timestamp = Date.now();
    if (editingId) {
      const existing = categories.find(category => category.id === editingId);
      if (!existing) {
        toast.show('Kategori tidak ditemukan.');
        await refreshCategoriesFromSupabase();
        renderCategories(getCurrentFilter());
        return;
      }
      payload.createdAt = existing.createdAt ?? timestamp;
      payload.updatedAt = timestamp;
    } else {
      payload.createdAt = timestamp;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
    }

    try {
      await upsertCategoryToSupabase(payload);
      await refreshCategoriesFromSupabase();
      toast.show(editingId ? 'Kategori berhasil diperbarui.' : 'Kategori berhasil ditambahkan.');
      closeModal();
      renderCategories(getCurrentFilter());
    } catch (error) {
      console.error('Gagal menyimpan kategori.', error);
      toast.show('Gagal menyimpan kategori. Coba lagi.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
      }
    }
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

async function handleAddProductForm() {
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
  const params = new URLSearchParams(window.location.search);
  const editingId = params.get('id');
  let suppressPricingRefresh = false;
  const PRESERVED_PURCHASE_FIELDS = ['purchasePrice', 'purchaseCurrency', 'exchangeRate', 'purchasePriceIdr'];

  const applyPurchaseMetadataToRow = (row, data = {}) => {
    if (!row) return;
    PRESERVED_PURCHASE_FIELDS.forEach(field => {
      const hasField = Object.prototype.hasOwnProperty.call(data, field);
      if (!hasField) {
        delete row.dataset[field];
        return;
      }

      const value = data[field];
      row.dataset[field] = value == null ? '' : value.toString();
    });
  };

  try {
    await ensureSeeded();
    await Promise.all([refreshCategoriesFromSupabase(), refreshProductsFromSupabase()]);
  } catch (error) {
    console.error('Gagal menyiapkan data produk.', error);
    toast.show('Gagal memuat data produk. Pastikan Supabase tersambung.');
  }

  const getPricingRows = () => Array.from(pricingBody?.querySelectorAll('.pricing-row') ?? []);

  populateCategorySelect(categorySelect, { helperEl: categoryHelper });
  if (categorySelect) {
    categorySelect.disabled = !getCategories().length;
  }

  document.addEventListener('categories:changed', () => {
    const selectedValue = categorySelect?.value ?? '';
    populateCategorySelect(categorySelect, { selectedValue, helperEl: categoryHelper });
    if (categorySelect) {
      categorySelect.disabled = !getCategories().length;
    }
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
        offlinePrice: getValue('[data-field="offlinePrice"]'),
        entraversePrice: getValue('[data-field="entraversePrice"]'),
        tokopediaPrice: getValue('[data-field="tokopediaPrice"]'),
        shopeePrice: getValue('[data-field="shopeePrice"]'),
        stock: getValue('[data-field="stock"]'),
        weight: getValue('[data-field="weight"]')
      };

      PRESERVED_PURCHASE_FIELDS.forEach(field => {
        if (Object.prototype.hasOwnProperty.call(row.dataset, field)) {
          data[field] = row.dataset[field];
        }
      });

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
      'offlinePrice',
      'entraversePrice',
      'tokopediaPrice',
      'shopeePrice',
      'stock',
      'weight'
    ].forEach(field => {
      const input = row.querySelector(`[data-field="${field}"]`);
      if (input && initialData[field] !== undefined && initialData[field] !== null) {
        input.value = initialData[field];
      }
    });

    applyPurchaseMetadataToRow(row, initialData);
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
    }

    if (!variantDefs.length) {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Nama Varian';
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
      if (['offlinePrice', 'entraversePrice', 'tokopediaPrice', 'shopeePrice'].includes(field)) {
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

    buildInputCell('offlinePrice', 'Rp 0');
    buildInputCell('entraversePrice', 'Rp 0');
    buildInputCell('tokopediaPrice', 'Rp 0');
    buildInputCell('shopeePrice', 'Rp 0');
    buildInputCell('stock', 'Stok');
    buildInputCell('weight', 'Gram');

    const actionsCell = document.createElement('td');
    actionsCell.className = 'variant-actions';
    if (lockVariantSelection) {
      actionsCell.classList.add('locked');
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
      addPricingRowBtn.classList.add('is-hidden');
      addPricingRowBtn.disabled = true;
    }

    pricingHeaderRow.innerHTML = '';
    if (variantDefs.length) {
      variantDefs.forEach(variant => {
        const th = document.createElement('th');
        th.textContent = variant.name;
        pricingHeaderRow.appendChild(th);
      });
    }

    const staticHeaders = [
      'Harga Jual Offline',
      'Harga Jual Entraverse.id',
      'Harga Jual Tokopedia',
      'Harga Jual Shopee',
      'Stok',
      'Berat Barang',
      ''
    ];

    if (!variantDefs.length) {
      staticHeaders.unshift('Varian');
    }

    staticHeaders.forEach(label => {
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
    toast.show('Daftar harga dibuat otomatis dari varian yang tersedia.');
  });

  if (editingId) {
    const products = getProductsFromCache();
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
      initialStockPrediction: form.querySelector('#initial-stock-prediction'),
      dailyAverageSales: form.querySelector('#daily-average-sales'),
      leadTime: form.querySelector('#lead-time'),
      reorderPoint: form.querySelector('#reorder-point')
    };
    const inventory = product.inventory ?? {};
    Object.entries(inventoryFields).forEach(([key, input]) => {
      if (!input) return;
      let value = inventory?.[key] ?? '';

      if (value === null || typeof value === 'undefined') {
        value = '';
      }

      input.value = value;
    });

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
    refreshPricingTableStructure();
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (categorySelect && categorySelect.disabled) {
      toast.show('Tambahkan kategori terlebih dahulu di halaman Kategori.');
      categorySelect.focus();
      return;
    }

    const formData = new FormData(form);
    const categoryValue = (formData.get('category') ?? '').toString().trim();
    const inventoryData = {
      initialStockPrediction: (formData.get('initialStockPrediction') ?? '').toString().trim(),
      dailyAverageSales: (formData.get('dailyAverageSales') ?? '').toString().trim(),
      leadTime: (formData.get('leadTime') ?? '').toString().trim(),
      reorderPoint: (formData.get('reorderPoint') ?? '').toString().trim()
    };
    const hasInventoryData = Object.values(inventoryData).some(value => (value ?? '').toString().trim());

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
        offlinePrice: (row.offlinePrice ?? '').toString().trim(),
        entraversePrice: (row.entraversePrice ?? '').toString().trim(),
        tokopediaPrice: (row.tokopediaPrice ?? '').toString().trim(),
        shopeePrice: (row.shopeePrice ?? '').toString().trim(),
        stock: (row.stock ?? '').toString().trim(),
        weight: (row.weight ?? '').toString().trim()
      };

      PRESERVED_PURCHASE_FIELDS.forEach(field => {
        if (Object.prototype.hasOwnProperty.call(row, field)) {
          normalized[field] = (row[field] ?? '').toString().trim();
        }
      });

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
      const purchaseValues = PRESERVED_PURCHASE_FIELDS.map(field => (row[field] ?? '').toString().trim());
      const detailValues = [
        ...purchaseValues,
        row.offlinePrice,
        row.entraversePrice,
        row.tokopediaPrice,
        row.shopeePrice,
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

    let existingProduct = null;
    if (isEditing) {
      const products = getProductsFromCache();
      existingProduct = products.find(p => p.id === productId) ?? null;
      if (!existingProduct) {
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
      productPayload.createdAt = existingProduct?.createdAt ?? timestamp;
      productPayload.updatedAt = timestamp;
    } else {
      productPayload.createdAt = timestamp;
      productPayload.updatedAt = timestamp;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
    }

    try {
      await upsertProductToSupabase(productPayload);
      await refreshProductsFromSupabase();
      toast.show(isEditing ? 'Produk berhasil diperbarui.' : 'Produk berhasil disimpan.');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    } catch (error) {
      console.error('Gagal menyimpan produk.', error);
      toast.show('Gagal menyimpan produk. Coba lagi.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
      }
    }
  });
}

async function initDashboard() {
  let supabaseReady = true;

  try {
    await ensureSeeded();
  } catch (error) {
    supabaseReady = false;
    console.error('Gagal menyiapkan data dashboard.', error);
    toast.show('Gagal memuat data dashboard. Pastikan Supabase tersambung.');
  }

  if (supabaseReady) {
    try {
      await Promise.all([
        refreshProductsFromSupabase(),
        refreshCategoriesFromSupabase()
      ]);
    } catch (error) {
      console.error('Gagal memperbarui data dashboard.', error);
      toast.show('Data dashboard mungkin tidak terbaru.');
    }
  }

  renderProducts();
  handleProductActions();
  handleSearch(value => renderProducts(value));
  handleSync();
}

async function initCategories() {
  let supabaseReady = true;

  try {
    await ensureSeeded();
  } catch (error) {
    supabaseReady = false;
    console.error('Gagal menyiapkan data kategori.', error);
    toast.show('Gagal memuat data kategori. Pastikan Supabase tersambung.');
  }

  if (supabaseReady) {
    try {
      await refreshCategoriesFromSupabase();
    } catch (error) {
      console.error('Gagal memperbarui data kategori.', error);
      toast.show('Data kategori mungkin tidak terbaru.');
    }
  }

  renderCategories();
  handleSearch(value => renderCategories(value));
  handleCategoryActions();
}

function initPage() {
  document.addEventListener('DOMContentLoaded', async () => {
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
      const user = await ensureAuthenticatedPage();
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
      await initDashboard();
    }

    if (page === 'add-product') {
      handleAddProductForm();
    }

    if (page === 'categories') {
      await initCategories();
    }
  });
}

initPage();
