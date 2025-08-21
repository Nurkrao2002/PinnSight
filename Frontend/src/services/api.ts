const API_BASE_URL = 'http://localhost:3001/api';

export const getSalesData = async () => {
  const response = await fetch(`${API_BASE_URL}/sales`);
  if (!response.ok) {
    throw new Error('Failed to fetch sales data');
  }
  return response.json();
};

export const getRecentActivity = async () => {
  const response = await fetch(`${API_BASE_URL}/activity`);
  if (!response.ok) {
    throw new Error('Failed to fetch recent activity');
  }
  return response.json();
};

export const getStatCardData = async () => {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) {
        throw new Error('Failed to fetch stat card data');
    }
    return response.json();
};

export const getUserData = async () => {
    const response = await fetch(`${API_BASE_URL}/user`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return response.json();
};
