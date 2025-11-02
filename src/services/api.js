/*export const API_BASE_URL = 'http://127.0.0.1:8000';
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

export default fetchAPI;*/

// src/services/api.js
export const API_BASE_URL = 'http://127.0.0.1:8000';

// Test de connexion au serveur (optionnel)
export const testConnection = () => {
  return fetch(`${API_BASE_URL}/`)
    .then(res => res.json())
    .then(data => {
      console.log('Connexion API réussie:', data);
      return data;
    })
    .catch(err => {
      console.error('Erreur connexion API:', err);
      throw err;
    });
};

// Fonction utilitaire pour les appels API
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Récupérer le token d'authentification si disponible
  const token = localStorage.getItem('access_token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  // Supprimer les headers dupliqués
  if (options.body && typeof options.body === 'string') {
    config.body = options.body;
  }

  try {
    const response = await fetch(url, config);
    
    // Gérer les réponses sans contenu (204 No Content)
    if (response.status === 204) {
      return { success: true, message: 'Operation completed successfully' };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || data.message || `HTTP error! status: ${response.status}`);
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

  register: (userData) =>
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  validateToken: (token) => 
    fetchAPI(`/auth/validate?token=${token}`),

  logout: () =>
    fetchAPI('/auth/logout', {
      method: 'POST'
    })
};

// API pour les QR Codes
export const qrAPI = {
  generateQR: (id_seance, duree_validite_secondes = 300) =>
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
  },

  validateQR: (qr_token) =>
    fetchAPI('/qr/validate', {
      method: 'POST',
      body: JSON.stringify({ qr_token })
    })
};

// API pour les présences
export const attendanceAPI = {
  getStudentStats: (etudiant_id) =>
    fetchAPI(`/attendance/student/${etudiant_id}`),

  getTeacherReport: (enseignant_id) =>
    fetchAPI(`/attendance/teacher/${enseignant_id}`),

  getSessionStats: (session_id) =>
    fetchAPI(`/attendance/session/${session_id}`),

  addSession: (sessionData) =>
    fetchAPI('/attendance/session', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    }),

  addPresence: (id_seance, id_etudiant, present = true) =>
    fetchAPI('/attendance/presence', {
      method: 'POST',
      body: JSON.stringify({ id_seance, id_etudiant, present })
    }),

  updatePresence: (presence_id, present) =>
    fetchAPI(`/attendance/presence/${presence_id}`, {
      method: 'PUT',
      body: JSON.stringify({ present })
    }),

  getStudentHistory: (etudiant_id, start_date = null, end_date = null) => {
    let url = `/attendance/history/student/${etudiant_id}`;
    const params = new URLSearchParams();
    
    if (start_date) params.append('start_date', start_date);
    if (end_date) params.append('end_date', end_date);
    
    if (params.toString()) url += `?${params.toString()}`;
    
    return fetchAPI(url);
  }
};

// API pour la gestion des utilisateurs
export const userAPI = {
  getProfile: (user_id) =>
    fetchAPI(`/users/${user_id}`),

  updateProfile: (user_id, profileData) =>
    fetchAPI(`/users/${user_id}`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    }),

  getStudents: (enseignant_id = null) => {
    const url = enseignant_id 
      ? `/users/students?enseignant_id=${enseignant_id}`
      : '/users/students';
    return fetchAPI(url);
  },

  getTeachers: () =>
    fetchAPI('/users/teachers')
};

// API pour les cours et séances
export const courseAPI = {
  getCourses: (enseignant_id = null) => {
    const url = enseignant_id 
      ? `/courses?enseignant_id=${enseignant_id}`
      : '/courses';
    return fetchAPI(url);
  },

  getCourse: (course_id) =>
    fetchAPI(`/courses/${course_id}`),

  createCourse: (courseData) =>
    fetchAPI('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData)
    }),

  getSessions: (course_id = null) => {
    const url = course_id 
      ? `/sessions?course_id=${course_id}`
      : '/sessions';
    return fetchAPI(url);
  },

  createSession: (sessionData) =>
    fetchAPI('/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    })
};

// Gestion du token dans le localStorage
export const tokenManager = {
  setToken: (tokenData) => {
    if (tokenData.access_token) {
      localStorage.setItem('access_token', tokenData.access_token);
    }
    if (tokenData.user_id) {
      localStorage.setItem('user_id', tokenData.user_id.toString());
    }
    if (tokenData.role) {
      localStorage.setItem('user_role', tokenData.role);
    }
    if (tokenData.expires_at) {
      localStorage.setItem('token_expires', tokenData.expires_at);
    }
  },

  getToken: () => localStorage.getItem('access_token'),
  
  getUserId: () => {
    const userId = localStorage.getItem('user_id');
    return userId ? parseInt(userId) : null;
  },
  
  getUserRole: () => localStorage.getItem('user_role'),
  
  isTokenValid: () => {
    const token = localStorage.getItem('access_token');
    const expires = localStorage.getItem('token_expires');
    
    if (!token || !expires) return false;
    
    // Vérifier si le token n'a pas expiré
    const now = new Date();
    const expiryDate = new Date(expires);
    return now < expiryDate;
  },

  clearToken: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    localStorage.removeItem('token_expires');
  },

  // Nouvelle méthode pour rafraîchir le token
  refreshToken: async () => {
    try {
      const response = await fetchAPI('/auth/refresh', {
        method: 'POST'
      });
      
      if (response.access_token) {
        tokenManager.setToken(response);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }
};

// Intercepteur pour rafraîchir automatiquement le token si expiré
let isRefreshing = false;

// Vous pouvez ajouter cette fonction pour gérer les appels API avec rafraîchissement automatique
export const authenticatedFetch = async (endpoint, options = {}) => {
  if (!tokenManager.isTokenValid() && !isRefreshing) {
    isRefreshing = true;
    const refreshed = await tokenManager.refreshToken();
    isRefreshing = false;
    
    if (!refreshed) {
      tokenManager.clearToken();
      window.location.href = '/login';
      throw new Error('Token expired and refresh failed');
    }
  }
  
  return fetchAPI(endpoint, options);
};

export default fetchAPI;