import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// API Service for frontend
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: string;
}

export interface SavePreferencesPayload {
  preference_role: string;
  preference_flow: string;
  preferences: Record<string, any>;
}

export interface CreateCollegePayload {
  university_id: number;
  name: string;
  location: string;
  affiliation?: string;
  type?: string;
  verified?: boolean;
  popular?: boolean;
  rating?: number;
  reviews?: number;
  programs?: number;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  image_url?: string;
  featured_programs?: string[];
  amenities?: string[];
}

export interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    user: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
      created_at: string;
      updated_at: string;
    };
    token: string;
  };
}

export interface ErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  error?: string;
}

export interface College {
  id: number;
  university_id?: number;
  name: string;
  full_name?: string;
  location: string;
  affiliation: string;
  type: string;
  verified: boolean;
  popular: boolean;
  rating: number;
  reviews: number;
  programs: number;
  established?: string;
  students?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  image_url?: string;
  featured_programs?: string[];
  amenities?: string[];
  courses?: string | any;
  scholarships?: string | any;
  gallery?: string | any;
  programs_list?: string | any;
  about?: string | any;
  admissions?: string | any;
  admission_cards?: string | any;
  offered_programs?: string | any;
  alumni?: string | any;
  departments?: string | any;
  college_reviews?: string | any;
}

export interface University {
  id: number;
  name: string;
  logo: string;
  location: string;
  rating: number;
  type: string;
  rank: number;
  isPopular: boolean;
  programsCount: number;
  collegesCount: number;
  popularPrograms: string[];
  description?: string;
  established?: string;
  website?: string;
}

export interface UniversityCollege {
  id: number;
  universityId: number;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  affiliation: string;
  type: string;
}

export interface UniversitiesResponse {
  success: boolean;
  message: string;
  data?: {
    universities: University[];
  };
}

export interface UniversityDetailsResponse {
  success: boolean;
  message: string;
  data?: {
    university: University;
    colleges: UniversityCollege[];
  };
}

export interface RankingCollege {
  id: number;
  name: string;
  location: string;
  rank: number;
  color: string;
  logo: string;
  stats: {
    year: string;
    rating: number;
  };
  tags: string[];
}

export interface EducationExam {
  id: string;
  title: string;
  board: string;
  badges: string[];
  level: string;
  type: string;
  examDate: string;
  formDeadline: string;
  fee: string;
  highlights: string[];
  description: string;
  status: string;
}

export interface EducationExamDetails {
  title: string;
  shortTitle: string;
  board: string;
  location: string;
  badges: string[];
  examDate: string;
  deadline: string;
  overview: string;
  weightage: any[];
  timeline: any[];
  notices: any[];
  faqs: any[];
}

export interface EducationScholarship {
  id: number;
  title: string;
  provider: string;
  logoColor?: string;
  initials?: string;
  logoText?: string;
  logoBg?: string;
  location: string;
  type: string;
  amount: string;
  deadline: string;
  status: string;
  category: string;
  description: string;
  image: string;
  eligibility?: string;
  tags?: string[];
}

export interface EducationScholarshipCategory {
  id: string;
  name?: string;
  title?: string;
  count: number;
  subtitle?: string;
  desc?: string;
  icon?: string;
  color?: string;
}

export interface EducationCourse {
  id: string;
  title: string;
  shortTitle: string;
  colleges: number;
  affiliation: string;
  badges: string[];
  level: string;
  faculty?: string;
  field: string;
  duration: string;
  estFee: string;
  highlights: string[];
  careerPath: string;
  description: string;
  location: string;
  govtFee: string;
  privateFee: string;
  icon?: string;
  color?: string;
}

export interface EducationAdmissionProgram {
  name: string;
  level: string;
  status: "Ongoing" | "Closed";
}

export interface EducationAdmissionCollege {
  id: string;
  name: string;
  location: string;
  logo: string;
  rating: number;
  university: string;
  description: string;
  facilities: string[];
  programs: EducationAdmissionProgram[];
  phoneNumber: string;
  contactEmail: string;
  website: string;
}

export interface CollegesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    colleges: College[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}

class ApiService {
  private baseURL: string;
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
    });
  }

  private getHeaders(token?: string) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  private async request<T>(
    config: AxiosRequestConfig,
    token?: string,
  ): Promise<T> {
    try {
      const response = await this.client.request<T>({
        ...config,
        headers: {
          ...this.getHeaders(token),
          ...(config.headers || {}),
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as any)?.message ||
          (error.response?.data as any)?.error ||
          error.message;
        throw new Error(message || "Request failed");
      }
      throw error;
    }
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return this.request<AuthResponse>({
      method: "POST",
      url: "/auth/register",
      data: {
        email: payload.email,
        password: payload.password,
        first_name: payload.first_name,
        last_name: payload.last_name,
        role: payload.role || "student",
      },
    });
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    return this.request<AuthResponse>({
      method: "POST",
      url: "/auth/login",
      data: payload,
    });
  }

  async getProfile(token: string) {
    return this.request<any>(
      {
        method: "GET",
        url: "/profile",
      },
      token,
    );
  }
  async savePreferences(
    token: string,
    preferences: SavePreferencesPayload,
  ) {
    return this.request<any>(
      {
        method: "POST",
        url: "/preferences",
        data: preferences,
      },
      token,
    );
  }

  // College endpoints (public)
  async getColleges(params?: {
    location?: string;
    affiliation?: string;
    type?: string;
    verified?: boolean;
    popular?: boolean;
    minRating?: number;
    search?: string;
    sort?: string;
    order?: "ASC" | "DESC";
    page?: number;
    pageSize?: number;
  }): Promise<CollegesResponse> {
    return this.request<CollegesResponse>({
      method: "GET",
      url: "/colleges",
      params,
    });
  }

  async getCollegeById(
    id: number,
  ): Promise<{ success: boolean; data?: College; message: string }> {
    return this.request<{ success: boolean; data?: College; message: string }>({
      method: "GET",
      url: `/colleges/${id}`,
    });
  }

  async getUniversities(params?: {
    search?: string;
    type?: string;
    popular?: boolean;
  }): Promise<UniversitiesResponse> {
    return this.request<UniversitiesResponse>({
      method: "GET",
      url: "/universities",
      params,
    });
  }

  async getUniversityById(id: number): Promise<UniversityDetailsResponse> {
    return this.request<UniversityDetailsResponse>({
      method: "GET",
      url: `/universities/${id}`,
    });
  }

  async getEducationRankings(): Promise<{
    success: boolean;
    message: string;
    data?: { colleges: RankingCollege[] };
  }> {
    return this.request({
      method: "GET",
      url: "/education/rankings",
    });
  }

  async getEducationExams(): Promise<{
    success: boolean;
    message: string;
    data?: { exams: EducationExam[] };
  }> {
    return this.request({
      method: "GET",
      url: "/education/exams",
    });
  }

  async getEducationExamById(id: string): Promise<{
    success: boolean;
    message: string;
    data?: EducationExamDetails;
  }> {
    return this.request({
      method: "GET",
      url: `/education/exams/${id}`,
    });
  }

  async getEducationScholarships(): Promise<{
    success: boolean;
    message: string;
    data?: {
      scholarships: EducationScholarship[];
      categories: EducationScholarshipCategory[];
    };
  }> {
    return this.request({
      method: "GET",
      url: "/education/scholarships",
    });
  }

  async getEducationCourses(): Promise<{
    success: boolean;
    message: string;
    data?: { courses: EducationCourse[] };
  }> {
    return this.request({
      method: "GET",
      url: "/education/courses",
    });
  }

  async getEducationCourseById(id: string): Promise<{
    success: boolean;
    message: string;
    data?: EducationCourse;
  }> {
    return this.request({
      method: "GET",
      url: `/education/courses/${id}`,
    });
  }

  async getEducationAdmissions(): Promise<{
    success: boolean;
    message: string;
    data?: { colleges: EducationAdmissionCollege[] };
  }> {
    return this.request({
      method: "GET",
      url: "/education/admissions",
    });
  }

  // Admin college endpoints
  async createCollege(
    token: string,
    college: CreateCollegePayload,
  ): Promise<{ success: boolean; data?: College; message: string }> {
    return this.request<{ success: boolean; data?: College; message: string }>(
      {
        method: "POST",
        url: "/admin/colleges",
        data: college,
      },
      token,
    );
  }

  async updateCollege(
    token: string,
    id: number,
    updates: Partial<College>,
  ): Promise<{ success: boolean; data?: College; message: string }> {
    return this.request<{ success: boolean; data?: College; message: string }>(
      {
        method: "PUT",
        url: `/admin/colleges/${id}`,
        data: updates,
      },
      token,
    );
  }

  async deleteCollege(
    token: string,
    id: number,
  ): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      {
        method: "DELETE",
        url: `/admin/colleges/${id}`,
      },
      token,
    );
  }
  // Store token in localStorage
  setToken(token: string) {
    localStorage.setItem("authToken", token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  // Remove token from localStorage
  removeToken() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  }

  // Store user data in localStorage
  setUser(user: any) {
    localStorage.setItem("authUser", JSON.stringify(user));
  }

  // Get user data from localStorage
  getUser() {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Clear all auth data
  logout() {
    this.removeToken();
  }
}

export const apiService = new ApiService(API_BASE_URL);
