export const API_BASE_URL = 'http://127.0.0.1:8000';
fetch("http://127.0.0.1:8000")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));

// Fonction utilitaire pour les appels API
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`; // <--- maintenant API_BASE_URL est défini
  
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}



// API pour l'authentification
export const authAPI = {
  login: (email, password) => 
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  validateToken: (token) => 
    fetchAPI(`/auth/validate?token=${token}`),

  logout: (token) =>
    fetchAPI('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ token })
    })
};

// API pour les QR Codes
export const qrAPI = {
  generateQR: (id_seance, duree_validite_secondes = 30) =>
    fetchAPI('/qr/generate', {
      method: 'POST',
      body: JSON.stringify({ 
        id_seance, 
        duree_validite_secondes 
      })
    }),

  scanQR: (qr_token, etudiant_id) =>
    fetchAPI('/qr/scan', {
      method: 'POST',
      body: JSON.stringify({ qr_token, etudiant_id })
    }),

  getActiveQR: (id_enseignant = null) => {
    const url = id_enseignant 
      ? `/qr/active?id_enseignant=${id_enseignant}`
      : '/qr/active';
    return fetchAPI(url);
  }
};

// API pour les présences
export const attendanceAPI = {
  getStudentStats: (etudiant_id) =>
    fetchAPI(`/attendance/student/${etudiant_id}`),

  getTeacherReport: (enseignant_id) =>
    fetchAPI(`/attendance/teacher/${enseignant_id}`),

  addSession: (sessionData) =>
    fetchAPI('/attendance/session', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    }),

  addPresence: (id_seance, id_etudiant, present = 1) =>
    fetchAPI('/attendance/presence', {
      method: 'POST',
      body: JSON.stringify({ id_seance, id_etudiant, present })
    })
};

// Gestion du token dans le localStorage
export const tokenManager = {
  setToken: (tokenData) => {
    localStorage.setItem('access_token', tokenData.access_token);
    localStorage.setItem('user_id', tokenData.user_id.toString());
    localStorage.setItem('user_role', tokenData.role);
    localStorage.setItem('token_expires', tokenData.expires_at);
  },

  getToken: () => localStorage.getItem('access_token'),
  
  getUserId: () => parseInt(localStorage.getItem('user_id')),
  
  getUserRole: () => localStorage.getItem('user_role'),
  
  isTokenValid: () => {
    const token = localStorage.getItem('access_token');
    const expires = localStorage.getItem('token_expires');
    return token && expires && new Date() < new Date(expires);
  },

  clearToken: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    localStorage.removeItem('token_expires');
  }
};

export default fetchAPI;