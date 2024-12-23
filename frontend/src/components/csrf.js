import axios from 'axios';

export const getCSRFToken = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/csrf-token/', {
      withCredentials: true, // Ensure cookies are included
    });
    const csrfToken = response.data.csrfToken;

    // Store CSRF token in a variable or localStorage
    sessionStorage.setItem('csrfToken', csrfToken);
    console.log('CSRF Token fetched:', csrfToken);
    return csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF Token:', error);
  }
};
