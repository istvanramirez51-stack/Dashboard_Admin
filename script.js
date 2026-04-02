/* ══════════════════════════════════════
   ADMINX — Complete Script
   ══════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════
// ── GLOBAL STATE
// ════════════════════════════════════════
let currentSection = 'overview';
let salesChartInstance = null;
let donutChartInstance = null;
let currentUser = null;

// Pagination state
const paginationState = {
  users:    { page: 1, perPage: 8 },
  products: { page: 1, perPage: 8 },
  orders:   { page: 1, perPage: 8 }
};

// Sort state
const sortState = {
  users:    { col: 'name', dir: 'asc' },
  products: { col: 'name', dir: 'asc' },
  orders:   { col: 'date', dir: 'desc' }
};

// Filter/search state
const filterState = {
  users:    { search: '', role: '', status: '' },
  products: { search: '', category: '' },
  orders:   { search: '', status: '' }
};

// ════════════════════════════════════════
// ── MOCK DATA
// ════════════════════════════════════════

const DEMO_USERS = [
  { id: 1,  name: 'Alice Morgan',     email: 'alice@example.com',   role: 'Admin',  status: 'Active',   joinDate: '2024-01-12' },
  { id: 2,  name: 'Bob Chen',         email: 'bob@example.com',     role: 'Editor', status: 'Active',   joinDate: '2024-02-05' },
  { id: 3,  name: 'Carol White',      email: 'carol@example.com',   role: 'User',   status: 'Inactive', joinDate: '2024-03-18' },
  { id: 4,  name: 'David Kim',        email: 'david@example.com',   role: 'User',   status: 'Active',   joinDate: '2024-04-22' },
  { id: 5,  name: 'Eva Martinez',     email: 'eva@example.com',     role: 'Viewer', status: 'Active',   joinDate: '2024-05-09' },
  { id: 6,  name: 'Frank Johnson',    email: 'frank@example.com',   role: 'Editor', status: 'Active',   joinDate: '2024-06-01' },
  { id: 7,  name: 'Grace Lee',        email: 'grace@example.com',   role: 'User',   status: 'Inactive', joinDate: '2024-06-15' },
  { id: 8,  name: 'Hank Williams',    email: 'hank@example.com',    role: 'Viewer', status: 'Active',   joinDate: '2024-07-20' },
  { id: 9,  name: 'Iris Brown',       email: 'iris@example.com',    role: 'Admin',  status: 'Active',   joinDate: '2024-08-03' },
  { id: 10, name: 'Jake Davis',       email: 'jake@example.com',    role: 'User',   status: 'Active',   joinDate: '2024-09-10' },
  { id: 11, name: 'Kira Wilson',      email: 'kira@example.com',    role: 'Editor', status: 'Inactive', joinDate: '2024-10-05' },
  { id: 12, name: 'Leo Thompson',     email: 'leo@example.com',     role: 'User',   status: 'Active',   joinDate: '2024-11-12' },
  { id: 13, name: 'Maya Anderson',    email: 'maya@example.com',    role: 'Viewer', status: 'Active',   joinDate: '2024-12-01' },
  { id: 14, name: 'Nathan Garcia',    email: 'nathan@example.com',  role: 'User',   status: 'Active',   joinDate: '2025-01-08' },
  { id: 15, name: 'Olivia Jackson',   email: 'olivia@example.com',  role: 'Admin',  status: 'Active',   joinDate: '2025-02-14' },
];

const DEMO_PRODUCTS = [
  { id: 1,  name: 'Ultra HD Monitor 4K',  category: 'Electronics', price: 699.99,  stock: 24,  status: 'Active',   emoji: '🖥️',  sales: 142 },
  { id: 2,  name: 'Wireless Earbuds Pro', category: 'Electronics', price: 149.99,  stock: 87,  status: 'Active',   emoji: '🎧',  sales: 398 },
  { id: 3,  name: 'Ergonomic Chair',      category: 'Home',        price: 329.99,  stock: 12,  status: 'Active',   emoji: '🪑',  sales: 65  },
  { id: 4,  name: 'Running Shoes X2',     category: 'Sports',      price: 89.99,   stock: 54,  status: 'Active',   emoji: '👟',  sales: 210 },
  { id: 5,  name: 'Slim Fit Jacket',      category: 'Fashion',     price: 119.99,  stock: 33,  status: 'Active',   emoji: '🧥',  sales: 177 },
  { id: 6,  name: 'Mechanical Keyboard',  category: 'Electronics', price: 189.99,  stock: 41,  status: 'Active',   emoji: '⌨️',  sales: 289 },
  { id: 7,  name: 'JavaScript Deep Dive', category: 'Books',       price: 39.99,   stock: 200, status: 'Active',   emoji: '📚',  sales: 512 },
  { id: 8,  name: 'Yoga Mat Premium',     category: 'Sports',      price: 49.99,   stock: 0,   status: 'Inactive', emoji: '🧘',  sales: 88  },
  { id: 9,  name: 'Smart Watch Series 5', category: 'Electronics', price: 399.99,  stock: 18,  status: 'Active',   emoji: '⌚',  sales: 156 },
  { id: 10, name: 'Ceramic Coffee Mug',   category: 'Home',        price: 24.99,   stock: 150, status: 'Active',   emoji: '☕',  sales: 723 },
  { id: 11, name: 'Leather Wallet',       category: 'Fashion',     price: 59.99,   stock: 76,  status: 'Active',   emoji: '👛',  sales: 344 },
  { id: 12, name: 'Protein Shaker',       category: 'Sports',      price: 19.99,   stock: 5,   status: 'Inactive', emoji: '🥤',  sales: 101 },
  { id: 13, name: 'Desk Lamp LED',        category: 'Home',        price: 44.99,   stock: 62,  status: 'Active',   emoji: '💡',  sales: 234 },
  { id: 14, name: 'Python Mastery Book',  category: 'Books',       price: 34.99,   stock: 180, status: 'Active',   emoji: '🐍',  sales: 421 },
  { id: 15, name: 'USB-C Hub 7-in-1',     category: 'Electronics', price: 59.99,   stock: 37,  status: 'Active',   emoji: '🔌',  sales: 367 },
];

const DEMO_ORDERS = [
  { id: '#ORD-1001', customer: 'Alice Morgan',   product: 'Ultra HD Monitor 4K',  amount: 699.99, date: '2025-01-15', status: 'Delivered'  },
  { id: '#ORD-1002', customer: 'Bob Chen',       product: 'Wireless Earbuds Pro', amount: 149.99, date: '2025-01-16', status: 'Processing' },
  { id: '#ORD-1003', customer: 'Carol White',    product: 'Ergonomic Chair',      amount: 329.99, date: '2025-01-17', status: 'Pending'    },
  { id: '#ORD-1004', customer: 'David Kim',      product: 'Running Shoes X2',     amount: 89.99,  date: '2025-01-18', status: 'Delivered'  },
  { id: '#ORD-1005', customer: 'Eva Martinez',   product: 'Slim Fit Jacket',      amount: 119.99, date: '2025-01-19', status: 'Cancelled'  },
  { id: '#ORD-1006', customer: 'Frank Johnson',  product: 'Mechanical Keyboard',  amount: 189.99, date: '2025-01-20', status: 'Delivered'  },
  { id: '#ORD-1007', customer: 'Grace Lee',      product: 'JavaScript Deep Dive', amount: 39.99,  date: '2025-01-21', status: 'Processing' },
  { id: '#ORD-1008', customer: 'Hank Williams',  product: 'Smart Watch Series 5', amount: 399.99, date: '2025-01-22', status: 'Pending'    },
  { id: '#ORD-1009', customer: 'Iris Brown',     product: 'Ceramic Coffee Mug',   amount: 24.99,  date: '2025-01-23', status: 'Delivered'  },
  { id: '#ORD-1010', customer: 'Jake Davis',     product: 'Leather Wallet',       amount: 59.99,  date: '2025-01-24', status: 'Delivered'  },
  { id: '#ORD-1011', customer: 'Kira Wilson',    product: 'Desk Lamp LED',        amount: 44.99,  date: '2025-01-25', status: 'Processing' },
  { id: '#ORD-1012', customer: 'Leo Thompson',   product: 'Python Mastery Book',  amount: 34.99,  date: '2025-01-26', status: 'Delivered'  },
  { id: '#ORD-1013', customer: 'Maya Anderson',  product: 'USB-C Hub 7-in-1',     amount: 59.99,  date: '2025-01-27', status: 'Cancelled'  },
  { id: '#ORD-1014', customer: 'Nathan Garcia',  product: 'Yoga Mat Premium',     amount: 49.99,  date: '2025-01-28', status: 'Pending'    },
  { id: '#ORD-1015', customer: 'Olivia Jackson', product: 'Protein Shaker',       amount: 19.99,  date: '2025-01-29', status: 'Delivered'  },
  { id: '#ORD-1016', customer: 'Alice Morgan',   product: 'Ergonomic Chair',      amount: 329.99, date: '2025-01-30', status: 'Delivered'  },
  { id: '#ORD-1017', customer: 'Bob Chen',       product: 'USB-C Hub 7-in-1',     amount: 59.99,  date: '2025-01-31', status: 'Processing' },
  { id: '#ORD-1018', customer: 'Carol White',    product: 'Smart Watch Series 5', amount: 399.99, date: '2025-02-01', status: 'Pending'    },
];

const NOTIFICATIONS = [
  { id: 1, type: 'order', icon: 'fa-receipt',     iconBg: 'rgba(79,142,255,0.15)',   iconColor: '#4f8eff', title: 'New Order Received',     msg: '#ORD-1019 from Emily Davis',           time: '2 min ago',  read: false },
  { id: 2, type: 'user',  icon: 'fa-user-plus',   iconBg: 'rgba(52,211,153,0.15)',   iconColor: '#34d399', title: 'New User Registered',    msg: 'James Wilson joined the platform',     time: '15 min ago', read: false },
  { id: 3, type: 'alert', icon: 'fa-box',         iconBg: 'rgba(251,146,60,0.15)',   iconColor: '#fb923c', title: 'Low Stock Alert',        msg: 'Yoga Mat Premium is out of stock',     time: '1 hr ago',   read: false },
  { id: 4, type: 'sale',  icon: 'fa-dollar-sign', iconBg: 'rgba(167,139,250,0.15)', iconColor: '#a78bfa', title: 'Revenue Milestone',      msg: 'You reached $80k in monthly revenue!', time: '3 hr ago',   read: false },
  { id: 5, type: 'sys',   icon: 'fa-gear',        iconBg: 'rgba(100,116,139,0.15)', iconColor: '#64748b', title: 'System Update Available', msg: 'AdminX v2.5.0 is ready to install',   time: '1 day ago',  read: true  },
];

// ════════════════════════════════════════
// ── INIT
// ════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
  // Only run dashboard logic on dashboard page
  if (!document.getElementById('sidebar')) return;

  // Auth guard
  const session = localStorage.getItem('adminx_session');
  if (!session) {
    window.location.href = 'index.html';
    return;
  }

  currentUser = JSON.parse(session);

  // Apply saved theme
  const savedTheme = currentUser.theme || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const darkToggle = document.getElementById('darkModeToggle');
  if (darkToggle) darkToggle.checked = (savedTheme === 'dark');
  updateThemeIcon(savedTheme);

  // Init all modules
  initUserInfo();
  initNav();
  initNotifications();
  initDropdowns();
  initSidebar();
  initWelcome();
  initData();
  navigateTo('overview');
});

// ════════════════════════════════════════
// ── AUTH / SESSION
// ════════════════════════════════════════

function doLogout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('adminx_session');
    window.location.href = 'index.html';
  }
}

function initUserInfo() {
  if (!currentUser) return;
  const initials = getInitials(currentUser.name);
  
  setText('sidebarUserName', currentUser.name);
  setText('sidebarUserRole', currentUser.role);
  setText('navUserName', currentUser.name);
  setText('navUserRole', currentUser.role);
  setText('navAvatar', initials);
  setText('sidebarAvatar', initials);
  setText('settingsAvatar', initials);
  setText('settingsAvatarName', currentUser.name);
  setText('settingsAvatarRole', currentUser.role);
  setText('welcomeName', currentUser.name.split(' ')[0]);

  const nameInput = document.getElementById('settingsName');
  if (nameInput) nameInput.value = currentUser.name;
}

function getInitials(name) {
  if (!name) return 'U';
  return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

// ════════════════════════════════════════
// ── NAVIGATION
// ════════════════════════════════════════

function initNav() {
  document.querySelectorAll('.nav-item[data-section]').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      navigateTo(section);
      // Close mobile sidebar
      document.getElementById('sidebar').classList.remove('mobile-open');
      document.getElementById('mobileOverlay').classList.remove('show');
    });
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    doLogout();
  });
}

function navigateTo(section) {
  currentSection = section;

  // Update sections visibility
  document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('section-' + section);
  if (target) target.classList.add('active');

  // Update nav items
  document.querySelectorAll('.nav-item[data-section]').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-section') === section);
  });

  // Update page title
  const titles = {
    overview: 'Dashboard', users: 'User Management',
    products: 'Product Management', orders: 'Order Management', settings: 'Settings'
  };
  const title = titles[section] || section;
  setText('pageTitle', title);
  setText('breadcrumbCurrent', title);

  // Lazy init charts on overview
  if (section === 'overview') {
    setTimeout(initCharts, 50);
  }

  // Close dropdowns
  closeAllDropdowns();
}

// ════════════════════════════════════════
// ── SIDEBAR
// ════════════════════════════════════════

function initSidebar() {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('mainContent');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const compactToggle = document.getElementById('compactSidebar');

  if (toggle) {
    toggle.addEventListener('click', function () {
      const isCollapsed = sidebar.classList.toggle('collapsed');
      main.classList.toggle('expanded', isCollapsed);
      if (compactToggle) compactToggle.checked = isCollapsed;
    });
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      sidebar.classList.toggle('mobile-open');
      mobileOverlay.classList.toggle('show');
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileSidebar);
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobileOverlay');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (overlay) overlay.classList.remove('show');
}

function toggleSidebarCompact() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('mainContent');
  const isCollapsed = document.getElementById('compactSidebar').checked;
  sidebar.classList.toggle('collapsed', isCollapsed);
  main.classList.toggle('expanded', isCollapsed);
}

// ════════════════════════════════════════
// ── THEME
// ════════════════════════════════════════

function toggleTheme() {
  const isDark = document.getElementById('darkModeToggle').checked;
  const theme = isDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);

  // Save to session
  if (currentUser) {
    currentUser.theme = theme;
    localStorage.setItem('adminx_session', JSON.stringify(currentUser));
  }

  // Re-render charts with new theme
  if (salesChartInstance) {
    salesChartInstance.destroy(); salesChartInstance = null;
  }
  if (donutChartInstance) {
    donutChartInstance.destroy(); donutChartInstance = null;
  }
  if (currentSection === 'overview') initCharts();

  showToast('Theme updated to ' + (isDark ? 'Dark' : 'Light') + ' mode', 'info');
}

document.addEventListener('DOMContentLoaded', function () {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const darkToggle = document.getElementById('darkModeToggle');
      if (darkToggle) {
        darkToggle.checked = !darkToggle.checked;
        toggleTheme();
      }
    });
  }
});

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}

// ════════════════════════════════════════
// ── WELCOME / DATE
// ════════════════════════════════════════

function initWelcome() {
  const hour = new Date().getHours();
  let greeting = 'morning';
  if (hour >= 12 && hour < 17) greeting = 'afternoon';
  else if (hour >= 17) greeting = 'evening';
  setText('timeOfDay', greeting);

  const dateEl = document.getElementById('welcomeDate');
  if (dateEl) {
    const now = new Date();
    dateEl.innerHTML = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}

// ════════════════════════════════════════
// ── NOTIFICATIONS
// ════════════════════════════════════════

let notifications = [...NOTIFICATIONS];

function initNotifications() {
  renderNotifications();

  const notifBtn = document.getElementById('notifBtn');
  const notifDropdown = document.getElementById('notifDropdown');
  if (notifBtn) {
    notifBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = notifDropdown.classList.toggle('open');
      // Close profile dropdown
      document.getElementById('profileDropdown')?.classList.remove('open');
    });
  }

  const markAll = document.getElementById('markAllRead');
  if (markAll) {
    markAll.addEventListener('click', function () {
      notifications.forEach(n => n.read = true);
      renderNotifications();
    });
  }
}

function renderNotifications() {
  const list = document.getElementById('notifList');
  const badge = document.getElementById('notifBadge');
  if (!list) return;

  const unread = notifications.filter(n => !n.read).length;
  badge.textContent = unread;
  badge.style.display = unread > 0 ? 'flex' : 'none';

  list.innerHTML = notifications.map(n => `
    <div class="notif-item ${n.read ? 'read' : 'unread'}" onclick="markNotifRead(${n.id})">
      <div class="notif-dot"></div>
      <div class="notif-icon" style="background:${n.iconBg};color:${n.iconColor}">
        <i class="fa-solid ${n.icon}"></i>
      </div>
      <div class="notif-content">
        <div class="notif-title">${n.title}</div>
        <div class="notif-msg">${n.msg}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

function markNotifRead(id) {
  const n = notifications.find(n => n.id === id);
  if (n) { n.read = true; renderNotifications(); }
}

// ════════════════════════════════════════
// ── DROPDOWNS
// ════════════════════════════════════════

function initDropdowns() {
  const profileBtn = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');

  if (profileBtn) {
    profileBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle('open');
      document.getElementById('notifDropdown')?.classList.remove('open');
    });
  }

  document.addEventListener('click', function () {
    closeAllDropdowns();
  });
}

function closeAllDropdowns() {
  document.getElementById('profileDropdown')?.classList.remove('open');
  document.getElementById('notifDropdown')?.classList.remove('open');
}

// ════════════════════════════════════════
// ── DATA INIT (localStorage)
// ════════════════════════════════════════

let users = [];
let products = [];
let orders = [];

function initData() {
  // Load from localStorage or use demo data
  users    = JSON.parse(localStorage.getItem('adminx_users'))    || [...DEMO_USERS];
  products = JSON.parse(localStorage.getItem('adminx_products')) || [...DEMO_PRODUCTS];
  orders   = JSON.parse(localStorage.getItem('adminx_orders'))   || [...DEMO_ORDERS];

  // Update stat cards
  updateStatCards();

  // Render recent orders preview on overview
  renderRecentOrders();
  renderTopProducts();
}

function saveUsers()    { localStorage.setItem('adminx_users',    JSON.stringify(users));    }
function saveProducts() { localStorage.setItem('adminx_products', JSON.stringify(products)); }
function saveOrders()   { localStorage.setItem('adminx_orders',   JSON.stringify(orders));   }

function updateStatCards() {
  setText('statUsers',    users.length.toLocaleString());
  setText('statProducts', products.length.toLocaleString());
  setText('statOrders',   orders.length.toLocaleString());
  const revenue = orders.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.amount, 0);
  setText('statRevenue', '$' + revenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
}

// ════════════════════════════════════════
// ── CHARTS
// ════════════════════════════════════════

const chartData = {
  monthly: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    revenue: [32000,28000,42000,38000,51000,47000,63000,58000,72000,68000,84000,91000],
    orders:  [210,185,268,245,312,298,387,354,432,408,512,553]
  },
  weekly: {
    labels: ['W1','W2','W3','W4','W5','W6','W7','W8'],
    revenue: [8200,9100,7800,10300,11200,9800,12400,13100],
    orders:  [52,61,48,72,78,65,88,94]
  },
  daily: {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    revenue: [1200,1850,1400,2100,2300,1700,900],
    orders:  [12,18,14,22,25,17,9]
  }
};

let currentChartMode = 'monthly';

function initCharts() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? '#64748b' : '#94a3b8';

  // Sales Chart
  const salesCtx = document.getElementById('salesChart');
  if (!salesCtx) return;

  if (salesChartInstance) salesChartInstance.destroy();

  const data = chartData[currentChartMode];

  salesChartInstance = new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Revenue ($)',
          data: data.revenue,
          borderColor: '#4f8eff',
          backgroundColor: function(ctx) {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 250);
            gradient.addColorStop(0, 'rgba(79,142,255,0.25)');
            gradient.addColorStop(1, 'rgba(79,142,255,0.0)');
            return gradient;
          },
          borderWidth: 2.5, pointRadius: 4, pointHoverRadius: 7,
          pointBackgroundColor: '#4f8eff', pointBorderColor: isDark ? '#070c18' : '#f0f4ff',
          pointBorderWidth: 2, fill: true, tension: 0.45,
          yAxisID: 'y'
        },
        {
          label: 'Orders',
          data: data.orders,
          borderColor: '#a78bfa',
          backgroundColor: 'transparent',
          borderWidth: 2, pointRadius: 3, pointHoverRadius: 6,
          pointBackgroundColor: '#a78bfa', borderDash: [5, 4],
          fill: false, tension: 0.45,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: { color: textColor, font: { family: 'Outfit', size: 12 }, boxWidth: 24, padding: 20 }
        },
        tooltip: {
          backgroundColor: isDark ? '#0f1a2e' : '#fff',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          titleColor: isDark ? '#f1f5f9' : '#1a2444',
          bodyColor: isDark ? '#94a3b8' : '#4a5578',
          padding: 12, cornerRadius: 10,
          callbacks: {
            label: ctx => ctx.dataset.label === 'Revenue ($)' ? ' $' + ctx.raw.toLocaleString() : ' ' + ctx.raw + ' orders'
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor }, border: { dash: [4, 4] },
          ticks: { color: textColor, font: { family: 'Outfit', size: 11 } }
        },
        y: {
          position: 'left', grid: { color: gridColor }, border: { dash: [4, 4] },
          ticks: { color: textColor, font: { family: 'Outfit', size: 11 }, callback: v => '$' + (v >= 1000 ? (v/1000).toFixed(0)+'k' : v) }
        },
        y1: {
          position: 'right', display: false,
          ticks: { color: textColor }
        }
      }
    }
  });

  // Donut Chart
  const donutCtx = document.getElementById('donutChart');
  if (!donutCtx) return;
  if (donutChartInstance) donutChartInstance.destroy();

  donutChartInstance = new Chart(donutCtx, {
    type: 'doughnut',
    data: {
      labels: ['Delivered', 'Processing', 'Pending', 'Cancelled'],
      datasets: [{
        data: [58, 24, 12, 6],
        backgroundColor: ['#4f8eff', '#a78bfa', '#fb923c', '#f472b6'],
        borderWidth: 0, hoverOffset: 8
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#0f1a2e' : '#fff',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          titleColor: isDark ? '#f1f5f9' : '#1a2444',
          bodyColor: isDark ? '#94a3b8' : '#4a5578',
          padding: 10, cornerRadius: 8,
          callbacks: { label: ctx => ' ' + ctx.label + ': ' + ctx.raw + '%' }
        }
      }
    }
  });
}

function updateChart(mode, btn) {
  currentChartMode = mode;
  document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (salesChartInstance) salesChartInstance.destroy();
  salesChartInstance = null;
  initCharts();
}

// ════════════════════════════════════════
// ── RECENT ORDERS (Overview)
// ════════════════════════════════════════

function renderRecentOrders() {
  const tbody = document.getElementById('recentOrdersBody');
  if (!tbody) return;
  const recent = [...orders].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
  tbody.innerHTML = recent.map(o => `
    <tr>
      <td><span class="text-mono" style="font-size:0.8rem;color:var(--accent)">${o.id}</span></td>
      <td>${o.customer}</td>
      <td class="truncate" style="max-width:140px">${o.product}</td>
      <td><span class="text-mono">$${o.amount.toFixed(2)}</span></td>
      <td>${statusBadge(o.status)}</td>
    </tr>
  `).join('');
}

function renderTopProducts() {
  const list = document.getElementById('topProductsList');
  if (!list) return;
  const top = [...products].sort((a,b) => b.sales - a.sales).slice(0, 6);
  list.innerHTML = top.map((p, i) => `
    <div class="product-list-item">
      <span class="prod-rank">${i+1}</span>
      <div class="prod-img">${p.emoji}</div>
      <div class="prod-info">
        <div class="prod-name">${p.name}</div>
        <div class="prod-sales">${p.sales} sales</div>
      </div>
      <div class="prod-revenue">$${(p.price * p.sales).toLocaleString('en-US',{maximumFractionDigits:0})}</div>
    </div>
  `).join('');
}

// ════════════════════════════════════════
// ── USERS CRUD
// ════════════════════════════════════════

let editingUserId = null;

function getFilteredUsers() {
  let data = [...users];
  const { search, role, status } = filterState.users;

  if (search) {
    const q = search.toLowerCase();
    data = data.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }
  if (role) data = data.filter(u => u.role === role);
  if (status) data = data.filter(u => u.status === status);

  // Sort
  const { col, dir } = sortState.users;
  data.sort((a, b) => {
    const va = (a[col] || '').toString().toLowerCase();
    const vb = (b[col] || '').toString().toLowerCase();
    return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  return data;
}

function filterUsers() {
  filterState.users.search = document.getElementById('userSearch')?.value || '';
  filterState.users.role   = document.getElementById('userRoleFilter')?.value || '';
  filterState.users.status = document.getElementById('userStatusFilter')?.value || '';
  paginationState.users.page = 1;
  renderUsersTable();
}

function renderUsersTable() {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;

  const filtered = getFilteredUsers();
  const { page, perPage } = paginationState.users;
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  if (paged.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><i class="fa-solid fa-users-slash"></i>No users found</div></td></tr>`;
  } else {
    tbody.innerHTML = paged.map(u => `
      <tr>
        <td>
          <div class="user-cell">
            <div class="user-cell-avatar">${getInitials(u.name)}</div>
            <div>
              <div class="user-cell-name">${esc(u.name)}</div>
              <div class="user-cell-email">${esc(u.email)}</div>
            </div>
          </div>
        </td>
        <td>${esc(u.email)}</td>
        <td>${roleBadge(u.role)}</td>
        <td style="color:var(--text-muted);font-size:0.825rem">${formatDate(u.joinDate)}</td>
        <td>${u.status === 'Active' ? '<span class="badge badge-success">● Active</span>' : '<span class="badge badge-muted">● Inactive</span>'}</td>
        <td>
          <div class="action-btns">
            <button class="btn-icon edit" title="Edit" onclick="editUser(${u.id})"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-icon delete" title="Delete" onclick="confirmDelete('user',${u.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderPagination('users', total, page, perPage);
}

function editUser(id) {
  const u = users.find(u => u.id === id);
  if (!u) return;
  editingUserId = id;
  setText('userModalTitle', 'Edit User');
  document.getElementById('userModalId').value = id;
  document.getElementById('mUserName').value  = u.name;
  document.getElementById('mUserEmail').value = u.email;
  document.getElementById('mUserRole').value  = u.role;
  document.getElementById('mUserStatus').value = u.status;
  openModal('user');
}

function saveUser() {
  const name   = document.getElementById('mUserName').value.trim();
  const email  = document.getElementById('mUserEmail').value.trim();
  const role   = document.getElementById('mUserRole').value;
  const status = document.getElementById('mUserStatus').value;

  clearModalErrors(['mUserName','mUserEmail','mUserRole']);
  let valid = true;

  if (!name)  { setFieldErr('mUserNameErr',  'Name is required'); valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldErr('mUserEmailErr', 'Valid email required'); valid = false; }
  if (!role)  { setFieldErr('mUserRoleErr',  'Role is required'); valid = false; }
  if (!valid) return;

  if (editingUserId) {
    const idx = users.findIndex(u => u.id === editingUserId);
    if (idx !== -1) { users[idx] = { ...users[idx], name, email, role, status }; }
    showToast('User updated successfully', 'success');
  } else {
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    users.push({ id: newId, name, email, role, status, joinDate: new Date().toISOString().split('T')[0] });
    showToast('User added successfully', 'success');
  }

  saveUsers();
  updateStatCards();
  closeModal('userModal');
  renderUsersTable();
}

function deleteUser(id) {
  users = users.filter(u => u.id !== id);
  saveUsers();
  updateStatCards();
  renderUsersTable();
  renderRecentOrders();
  showToast('User deleted', 'warning');
}

// ════════════════════════════════════════
// ── PRODUCTS CRUD
// ════════════════════════════════════════

let editingProductId = null;
let currentProductImage = null;

function getFilteredProducts() {
  let data = [...products];
  const { search, category } = filterState.products;

  if (search) {
    const q = search.toLowerCase();
    data = data.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }
  if (category) data = data.filter(p => p.category === category);

  const { col, dir } = sortState.products;
  data.sort((a, b) => {
    const va = typeof a[col] === 'number' ? a[col] : (a[col]||'').toString().toLowerCase();
    const vb = typeof b[col] === 'number' ? b[col] : (b[col]||'').toString().toLowerCase();
    if (typeof va === 'number') return dir === 'asc' ? va - vb : vb - va;
    return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  return data;
}

function filterProducts() {
  filterState.products.search   = document.getElementById('productSearch')?.value || '';
  filterState.products.category = document.getElementById('productCategoryFilter')?.value || '';
  paginationState.products.page = 1;
  renderProductsTable();
}

function renderProductsTable() {
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;

  const filtered = getFilteredProducts();
  const { page, perPage } = paginationState.products;
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  if (paged.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="fa-solid fa-box-open"></i>No products found</div></td></tr>`;
  } else {
    tbody.innerHTML = paged.map(p => `
      <tr>
        <td>
          <div class="prod-table-img" ${p.imageData ? `style="background-image:url('${p.imageData}');background-size:cover;background-position:center"` : ''}>
            ${!p.imageData ? p.emoji : ''}
          </div>
        </td>
        <td style="font-weight:500;color:var(--text-primary)">${esc(p.name)}</td>
        <td><span class="badge badge-info">${esc(p.category)}</span></td>
        <td><span class="text-mono">$${p.price.toFixed(2)}</span></td>
        <td>
          <span style="font-weight:600;color:${p.stock === 0 ? 'var(--danger)' : p.stock < 10 ? 'var(--warning)' : 'var(--text-primary)'}">
            ${p.stock === 0 ? '⚠ Out' : p.stock}
          </span>
        </td>
        <td>${p.status === 'Active' ? '<span class="badge badge-success">● Active</span>' : '<span class="badge badge-muted">● Inactive</span>'}</td>
        <td>
          <div class="action-btns">
            <button class="btn-icon edit" title="Edit" onclick="editProduct(${p.id})"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-icon delete" title="Delete" onclick="confirmDelete('product',${p.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderPagination('products', total, page, perPage);
}

function editProduct(id) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  editingProductId = id;
  currentProductImage = p.imageData || null;
  setText('productModalTitle', 'Edit Product');
  document.getElementById('productModalId').value = id;
  document.getElementById('mProdName').value     = p.name;
  document.getElementById('mProdCategory').value = p.category;
  document.getElementById('mProdPrice').value    = p.price;
  document.getElementById('mProdStock').value    = p.stock;
  document.getElementById('mProdStatus').value   = p.status;

  // Show image preview
  const preview = document.getElementById('imagePreview');
  const placeholder = document.getElementById('uploadPlaceholder');
  if (p.imageData) {
    preview.src = p.imageData; preview.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
  } else {
    preview.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  }

  openModal('product');
}

function saveProduct() {
  const name     = document.getElementById('mProdName').value.trim();
  const category = document.getElementById('mProdCategory').value;
  const price    = parseFloat(document.getElementById('mProdPrice').value);
  const stock    = parseInt(document.getElementById('mProdStock').value);
  const status   = document.getElementById('mProdStatus').value;

  clearModalErrors(['mProdName','mProdCategory','mProdPrice','mProdStock']);
  let valid = true;

  if (!name)     { setFieldErr('mProdNameErr',  'Name is required'); valid = false; }
  if (!category) { setFieldErr('mProdCatErr',   'Category required'); valid = false; }
  if (isNaN(price) || price < 0) { setFieldErr('mProdPriceErr', 'Valid price required'); valid = false; }
  if (isNaN(stock) || stock < 0) { setFieldErr('mProdStockErr', 'Valid stock required'); valid = false; }
  if (!valid) return;

  const categoryEmojis = { Electronics:'💻', Fashion:'👔', Home:'🏠', Sports:'⚽', Books:'📖' };
  const emoji = categoryEmojis[category] || '📦';

  if (editingProductId) {
    const idx = products.findIndex(p => p.id === editingProductId);
    if (idx !== -1) {
      products[idx] = { ...products[idx], name, category, price, stock, status, emoji,
        imageData: currentProductImage || products[idx].imageData || null };
    }
    showToast('Product updated successfully', 'success');
  } else {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    products.push({ id: newId, name, category, price, stock, status, emoji, imageData: currentProductImage || null, sales: 0 });
    showToast('Product added successfully', 'success');
  }

  saveProducts();
  updateStatCards();
  closeModal('productModal');
  renderProductsTable();
  renderTopProducts();
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  saveProducts();
  updateStatCards();
  renderProductsTable();
  renderTopProducts();
  showToast('Product deleted', 'warning');
}

function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) { showToast('Image must be under 5MB', 'error'); return; }

  const reader = new FileReader();
  reader.onload = function (e) {
    currentProductImage = e.target.result;
    const preview = document.getElementById('imagePreview');
    const placeholder = document.getElementById('uploadPlaceholder');
    preview.src = e.target.result;
    preview.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

// ════════════════════════════════════════
// ── ORDERS
// ════════════════════════════════════════

function getFilteredOrders() {
  let data = [...orders];
  const { search, status } = filterState.orders;

  if (search) {
    const q = search.toLowerCase();
    data = data.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q)
    );
  }
  if (status) data = data.filter(o => o.status === status);

  const { col, dir } = sortState.orders;
  data.sort((a, b) => {
    if (col === 'amount') return dir === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    if (col === 'date') return dir === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    const va = (a[col]||'').toString().toLowerCase();
    const vb = (b[col]||'').toString().toLowerCase();
    return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  return data;
}

function filterOrders() {
  filterState.orders.search = document.getElementById('orderSearch')?.value || '';
  filterState.orders.status = document.getElementById('orderStatusFilter')?.value || '';
  paginationState.orders.page = 1;
  renderOrdersTable();
}

function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;

  const filtered = getFilteredOrders();
  const { page, perPage } = paginationState.orders;
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  if (paged.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="fa-solid fa-receipt"></i>No orders found</div></td></tr>`;
  } else {
    tbody.innerHTML = paged.map(o => `
      <tr>
        <td><span class="text-mono" style="color:var(--accent);font-size:0.8rem">${o.id}</span></td>
        <td style="font-weight:500;color:var(--text-primary)">${esc(o.customer)}</td>
        <td class="truncate" style="max-width:160px;color:var(--text-secondary)">${esc(o.product)}</td>
        <td><span class="text-mono" style="font-weight:600">$${o.amount.toFixed(2)}</span></td>
        <td style="color:var(--text-muted);font-size:0.825rem">${formatDate(o.date)}</td>
        <td>${statusBadge(o.status)}</td>
        <td>
          <div class="action-btns">
            <button class="btn-icon edit" title="View Details" onclick="viewOrder('${o.id}')"><i class="fa-solid fa-eye"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderPagination('orders', total, page, perPage);
}

function viewOrder(id) {
  const o = orders.find(o => o.id === id);
  if (!o) return;
  showToast(`Order ${id} — ${o.customer} — $${o.amount.toFixed(2)} — ${o.status}`, 'info');
}

// ════════════════════════════════════════
// ── SORT
// ════════════════════════════════════════

function sortTable(table, col, th) {
  const state = sortState[table];

  // Toggle direction
  if (state.col === col) {
    state.dir = state.dir === 'asc' ? 'desc' : 'asc';
  } else {
    state.col = col;
    state.dir = 'asc';
  }

  // Update header icons
  const tableId = table === 'users' ? 'usersTable' : table === 'products' ? 'productsTable' : 'ordersTable';
  document.querySelectorAll(`#${tableId} th.sortable`).forEach(t => {
    t.classList.remove('sort-asc', 'sort-desc');
    t.querySelector('.sort-icon')?.classList.replace('fa-sort-up', 'fa-sort');
    t.querySelector('.sort-icon')?.classList.replace('fa-sort-down', 'fa-sort');
  });
  if (th) {
    th.classList.add(state.dir === 'asc' ? 'sort-asc' : 'sort-desc');
  }

  if (table === 'users') renderUsersTable();
  else if (table === 'products') renderProductsTable();
  else if (table === 'orders') renderOrdersTable();
}

// ════════════════════════════════════════
// ── PAGINATION
// ════════════════════════════════════════

function renderPagination(table, total, page, perPage) {
  const wrap = document.getElementById(table + 'Pagination');
  if (!wrap) return;

  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  let btns = '';
  // Prev
  btns += `<button class="pg-btn" ${page === 1 ? 'disabled' : ''} onclick="goPage('${table}',${page-1})"><i class="fa-solid fa-chevron-left"></i></button>`;

  // Pages
  const pages = getPageNumbers(page, totalPages);
  pages.forEach(p => {
    if (p === '...') {
      btns += `<button class="pg-btn" disabled>…</button>`;
    } else {
      btns += `<button class="pg-btn ${p === page ? 'active' : ''}" onclick="goPage('${table}',${p})">${p}</button>`;
    }
  });

  // Next
  btns += `<button class="pg-btn" ${page === totalPages || totalPages === 0 ? 'disabled' : ''} onclick="goPage('${table}',${page+1})"><i class="fa-solid fa-chevron-right"></i></button>`;

  wrap.innerHTML = `
    <div class="pagination-info">Showing ${total > 0 ? start : 0}–${end} of ${total} records</div>
    <div class="pagination-btns">${btns}</div>
  `;
}

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);
  const pages = [];
  if (current <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push('...', total);
  } else if (current >= total - 3) {
    pages.push(1, '...');
    for (let i = total - 4; i <= total; i++) pages.push(i);
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }
  return pages;
}

function goPage(table, page) {
  paginationState[table].page = page;
  if (table === 'users') renderUsersTable();
  else if (table === 'products') renderProductsTable();
  else if (table === 'orders') renderOrdersTable();
}

// ════════════════════════════════════════
// ── MODALS
// ════════════════════════════════════════

function openModal(type) {
  if (type === 'user') {
    if (!editingUserId) {
      setText('userModalTitle', 'Add New User');
      document.getElementById('userModalId').value = '';
      document.getElementById('mUserName').value  = '';
      document.getElementById('mUserEmail').value = '';
      document.getElementById('mUserRole').value  = '';
      document.getElementById('mUserStatus').value = 'Active';
      clearModalErrors(['mUserName','mUserEmail','mUserRole']);
    }
    document.getElementById('userModalOverlay').classList.add('open');
  } else if (type === 'product') {
    if (!editingProductId) {
      setText('productModalTitle', 'Add New Product');
      document.getElementById('productModalId').value = '';
      document.getElementById('mProdName').value     = '';
      document.getElementById('mProdCategory').value = '';
      document.getElementById('mProdPrice').value    = '';
      document.getElementById('mProdStock').value    = '';
      document.getElementById('mProdStatus').value   = 'Active';
      document.getElementById('imagePreview').style.display = 'none';
      document.getElementById('uploadPlaceholder').style.display = 'flex';
      currentProductImage = null;
      document.getElementById('productImage').value = '';
      clearModalErrors(['mProdName','mProdCategory','mProdPrice','mProdStock']);
    }
    document.getElementById('productModalOverlay').classList.add('open');
  }
}

function closeModal(id) {
  document.getElementById(id + 'Overlay')?.classList.remove('open');
  editingUserId = null;
  editingProductId = null;
}

function closeModalIfOverlay(event, id) {
  if (event.target === event.currentTarget) closeModal(id);
}

// Confirm Delete
let pendingDeleteAction = null;

function confirmDelete(type, id) {
  const name = type === 'user'
    ? users.find(u => u.id === id)?.name
    : products.find(p => p.id === id)?.name;

  document.getElementById('confirmText').textContent =
    `Are you sure you want to delete "${name}"? This action cannot be undone.`;

  pendingDeleteAction = () => {
    if (type === 'user') deleteUser(id);
    else deleteProduct(id);
    closeConfirm();
  };

  document.getElementById('confirmOverlay').classList.add('open');
  document.getElementById('confirmDeleteBtn').onclick = pendingDeleteAction;
}

function closeConfirm() {
  document.getElementById('confirmOverlay').classList.remove('open');
  pendingDeleteAction = null;
}

document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('confirmOverlay');
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeConfirm();
    });
  }
});

// ════════════════════════════════════════
// ── SETTINGS
// ════════════════════════════════════════

function saveProfile() {
  const name = document.getElementById('settingsName')?.value.trim();
  if (!name) { showToast('Name cannot be empty', 'error'); return; }

  currentUser.name = name;
  localStorage.setItem('adminx_session', JSON.stringify(currentUser));

  // Update UI
  const initials = getInitials(name);
  setText('sidebarUserName', name);
  setText('navUserName', name);
  setText('navAvatar', initials);
  setText('sidebarAvatar', initials);
  setText('settingsAvatar', initials);
  setText('settingsAvatarName', name);
  setText('welcomeName', name.split(' ')[0]);

  showToast('Profile updated successfully', 'success');
}

function changePassword() {
  const current = document.getElementById('currentPw')?.value;
  const newPw   = document.getElementById('newPw')?.value;
  const confirm = document.getElementById('confirmPw')?.value;

  if (!current || !newPw || !confirm) { showToast('All password fields are required', 'error'); return; }
  if (current !== 'Admin123!') { showToast('Current password is incorrect', 'error'); return; }
  if (newPw.length < 8) { showToast('New password must be at least 8 characters', 'error'); return; }
  if (newPw !== confirm) { showToast('Passwords do not match', 'error'); return; }

  document.getElementById('currentPw').value = '';
  document.getElementById('newPw').value = '';
  document.getElementById('confirmPw').value = '';

  showToast('Password updated successfully! (Demo mode)', 'success');
}

function toggleFieldPw(fieldId) {
  const field = document.getElementById(fieldId);
  const btn   = field?.nextElementSibling;
  if (!field) return;
  field.type = field.type === 'password' ? 'text' : 'password';
  if (btn) btn.querySelector('i').className = field.type === 'password' ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash';
}

// ════════════════════════════════════════
// ── TOAST
// ════════════════════════════════════════

function showToast(message, type = 'info') {
  const icons = {
    success: 'fa-circle-check', error: 'fa-circle-xmark',
    warning: 'fa-triangle-exclamation', info: 'fa-circle-info'
  };
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon"><i class="fa-solid ${icons[type] || icons.info}"></i></span>
    <span class="toast-msg">${message}</span>
  `;
  container.appendChild(toast);

  toast.addEventListener('click', () => removeToast(toast));

  setTimeout(() => removeToast(toast), 3500);
}

function removeToast(toast) {
  if (!toast.parentElement) return;
  toast.classList.add('out');
  setTimeout(() => toast.remove(), 300);
}

// ════════════════════════════════════════
// ── HELPERS
// ════════════════════════════════════════

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function esc(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function statusBadge(status) {
  const map = {
    'Delivered':  'badge-success',
    'Processing': 'badge-info',
    'Pending':    'badge-warning',
    'Cancelled':  'badge-danger'
  };
  return `<span class="badge ${map[status] || 'badge-muted'}">${status}</span>`;
}

function roleBadge(role) {
  const map = {
    'Admin':  'badge-danger',
    'Editor': 'badge-info',
    'User':   'badge-success',
    'Viewer': 'badge-muted'
  };
  return `<span class="badge ${map[role] || 'badge-muted'}">${role}</span>`;
}

function setFieldErr(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearModalErrors(_fieldIds) {
  ['mUserNameErr','mUserEmailErr','mUserRoleErr',
   'mProdNameErr','mProdCatErr','mProdPriceErr','mProdStockErr'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

// ════════════════════════════════════════
// ── Section-specific render on navigate
// ════════════════════════════════════════

// Override navigateTo to also render tables
const _navigateTo = navigateTo;
window.navigateTo = function (section) {
  _navigateTo(section);
  if (section === 'users')    { filterState.users = {search:'',role:'',status:''}; renderUsersTable(); }
  if (section === 'products') { filterState.products = {search:'',category:''}; renderProductsTable(); }
  if (section === 'orders')   { filterState.orders = {search:'',status:''}; renderOrdersTable(); }
};

// Global search → switch section
document.addEventListener('DOMContentLoaded', function () {
  const gs = document.getElementById('globalSearch');
  if (gs) {
    gs.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && this.value.trim()) {
        const q = this.value.trim();
        // Search users
        const foundUser = users.some(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()));
        if (foundUser) {
          navigateTo('users');
          document.getElementById('userSearch').value = q;
          filterUsers();
          this.value = '';
          return;
        }
        // Search products
        const foundProd = products.some(p => p.name.toLowerCase().includes(q.toLowerCase()));
        if (foundProd) {
          navigateTo('products');
          document.getElementById('productSearch').value = q;
          filterProducts();
          this.value = '';
          return;
        }
        showToast('No results found for "' + q + '"', 'warning');
        this.value = '';
      }
    });
  }
});