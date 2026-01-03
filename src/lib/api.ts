import { logger } from "./logger";

interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

interface ProfileResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

interface UserState {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

class ApiService {
  private baseUrl = 'https://dummyjson.com';
  private user: UserState | null = null;
  private accessToken: string | null = null; // Store access token in memory instead of localStorage

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      logger.log('Attempting login with credentials:', credentials);
      
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          expiresInMins: 30
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Login failed with status ${response.status}`);
      }

      const data = await response.json();
      logger.log('Login successful, received data:', data);
      
      // Store access token in memory and refresh token in localStorage
      // Access token in memory is more secure against XSS
      if (data.accessToken) {
        this.accessToken = data.accessToken;
      }
     
      // Store user data
      this.user = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image
      };
      
      return data;
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  async getProfile(): Promise<ProfileResponse> {
    try {
      // Use access token from memory
      if (!this.accessToken) {
        throw new Error('No authentication token found');
      }

      logger.log('Fetching profile with token');
      
      const response = await fetch(`${this.baseUrl}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Clear invalid token
          this.accessToken = null;
          this.user = null;
          throw new Error('Unauthorized: Invalid or expired token');
        }
        throw new Error(`Profile fetch failed with status ${response.status}`);
      }

      const data = await response.json();
      logger.log('Profile fetched successfully:', data);
      
      // Update user data
      this.user = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image
      };
      
      return data;
    } catch (error) {
      logger.error('Profile fetch error:', error);
      throw error;
    }
  }

  logout(): void {
    logger.log('Logging out, clearing tokens');
    this.accessToken = null;
    localStorage.removeItem('refreshToken');
    this.user = null;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getCurrentUser(): UserState | null {
    return this.user;
  }

  setCurrentUser(userData: UserState): void {
    this.user = userData;
  }
}

export const apiService = new ApiService();