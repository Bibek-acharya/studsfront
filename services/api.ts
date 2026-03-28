import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// API Service for frontend
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api/v1";

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
  education_level?: string;
}

export interface SavePreferencesPayload {
  preference_role: string;
  preference_flow: string;
  preferences: Record<string, any>;
}

export interface CreateCounsellingBookingPayload {
  college: string;
  program_level: string;
  interested_course: string;
  session_mode: "online" | "in_person";
  session_date: string;
  session_time: string;
  student_name: string;
  student_phone: string;
  student_email: string;
  student_notes?: string;
}

export interface CounsellingBooking {
  id: number;
  user_id: number;
  college: string;
  program_level: string;
  interested_course: string;
  session_mode: "online" | "in_person";
  session_date: string;
  session_time: string;
  student_name: string;
  student_phone: string;
  student_email: string;
  student_notes?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ScholarshipFinderToolPayload {
  education_level: string;
  study_mode?: string;
  academic_score?: string;
  target_country?: string;
  need_type?: string;
  skills?: string[];
  achievements?: string[];
  involvements?: string[];
}

export interface ScholarshipFinderRecommendation {
  id: number;
  title: string;
  provider: string;
  location: string;
  value: string;
  deadline: string;
  degree_level: string;
  funding_type: string;
  scholarship_type: string;
  description: string;
  image_url?: string;
  match_score: number;
  reasons: string[];
}

export interface CollegeRecommenderPayload {
  student_type: string;
  program_interest?: string;
  preferred_location?: string;
  budget_preference?: string;
  campus_life_priority?: string;
  career_goal?: string;
  need_scholarship?: boolean;
  preferred_mode?: string;
  college_type?: string;
  final_priority?: string;
}

export interface CollegeRecommendation {
  id: number;
  name: string;
  location: string;
  affiliation: string;
  type: string;
  rating: number;
  reviews: number;
  image_url?: string;
  website?: string;
  match_score: number;
  reasons: string[];
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
  academic_fit_score?: number;
  campus_life_score?: number;
  career_fit_score?: number;
  balanced_fit_score?: number;
  profile_tags?: string[];
}

export interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    user?: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
      created_at: string;
      updated_at: string;
    };
    token?: string;
    requires_otp?: boolean;
    email?: string;
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
  academic_fit_score?: number;
  campus_life_score?: number;
  career_fit_score?: number;
  balanced_fit_score?: number;
  profile_tags?: string[];
}

export interface ForumCommunity {
  id: number;
  name: string;
  emoji?: string;
  bg_color?: string;
  member_count?: number;
  is_member?: boolean;
  post_count?: number;
  description?: string;
}

export interface ForumPost {
  id: number;
  user_id: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  community_id?: number;
  community?: ForumCommunity;
  category: string;
  title: string;
  content: string;
  image_url?: string;
  video_url?: string;
  poll_options?: string; // JSON string from backend
  poll_results?: Record<number, number>;
  total_votes?: number;
  voted_option?: number;
  upvotes: number;
  comment_count: number;
  is_poll: boolean;
  is_liked: boolean;
  is_disliked: boolean;
  is_saved: boolean;
  downvotes: number;
  created_at: string;
}

export interface ForumComment {
  id: number;
  post_id: number;
  user_id: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  content: string;
  parent_id?: number;
  created_at: string;
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
  cover?: string;
  about?: any;
  contact?: any;
  quick?: any;
  overview?: any;
  leadership?: any;
  courses?: any;
  programs?: any;
  scholarships?: any;
  events?: any;
  news?: any;
  downloads?: any;
  gallery?: any;
  faculties?: any;
  admissions?: any;
  reviews?: any;
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
  scholarship_type?: string;
  funding_type?: string;
  degree_level?: string;
}

export interface EducationSimilarScholarship {
  id: number;
  title: string;
  provider: string;
  deadline: string;
  status: string;
  location?: string;
  funding_type?: string;
  degree_level?: string;
  image_url?: string;
  category?: string;
  description?: string;
}

export interface EducationScholarshipFilters {
  search?: string;
  category?: string;
  type?: string;
  location?: string;
  level?: string;
  status?: string;
  sort?: string;
  order?: "ASC" | "DESC";
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

export interface EducationCourseCurriculumSemester {
  semester: number;
  title: string;
  subtitle: string;
  subjects: string[];
}

export interface EducationCourseCareerOpportunity {
  title: string;
  icon: string;
  color: string;
}

export interface EducationCourseOtherProgram {
  id: string;
  title: string;
  duration: string;
  faculty: string;
}

export interface EducationCourseDetails {
  course: EducationCourse;
  about: string[];
  mode: string;
  degreeLabel: string;
  curriculum: EducationCourseCurriculumSemester[];
  admissionRequirements: string[];
  careerOpportunities: EducationCourseCareerOpportunity[];
  universities: string[];
  contact: {
    email: string;
    phone: string;
  };
  otherPrograms: EducationCourseOtherProgram[];
  highlightsUniversity: string;
  highlightsFaculty: string;
  highlightsDuration: string;
  highlightsDegreeLevel: string;
  offeringCollegesCount: number;
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
        education_level: payload.education_level,
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

  async sendOTP(email: string): Promise<AuthResponse> {
    return this.request<AuthResponse>({
      method: "POST",
      url: "/auth/send-otp",
      data: { email },
    });
  }

  async verifyOTP(email: string, otp: string): Promise<AuthResponse> {
    return this.request<AuthResponse>({
      method: "POST",
      url: "/auth/verify-otp",
      data: { email, otp },
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

  async createCounsellingBooking(
    token: string,
    payload: CreateCounsellingBookingPayload,
  ): Promise<{ success: boolean; message: string; data?: CounsellingBooking }> {
    return this.request<{ success: boolean; message: string; data?: CounsellingBooking }>(
      {
        method: "POST",
        url: "/counselling/bookings",
        data: payload,
      },
      token,
    );
  }

  async getMyCounsellingBookings(
    token: string,
  ): Promise<{ success: boolean; message: string; data?: { bookings: CounsellingBooking[] } }> {
    return this.request<{ success: boolean; message: string; data?: { bookings: CounsellingBooking[] } }>(
      {
        method: "GET",
        url: "/counselling/bookings/my",
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
    courseId?: string;
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

  async getEducationScholarships(
    params?: EducationScholarshipFilters,
  ): Promise<{
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
      params,
    });
  }

  async getEducationScholarshipById(id: string | number): Promise<{
    success: boolean;
    message: string;
    data?: EducationScholarship;
  }> {
    return this.request({
      method: "GET",
      url: `/education/scholarships/${id}`,
    });
  }

  async getEducationSimilarScholarships(id: string | number): Promise<{
    success: boolean;
    message: string;
    data?: { scholarships: EducationSimilarScholarship[] };
  }> {
    return this.request({
      method: "GET",
      url: `/education/scholarships/${id}/similar`,
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

  async getEducationCourseDetailsById(id: string): Promise<{
    success: boolean;
    message: string;
    data?: EducationCourseDetails;
  }> {
    return this.request({
      method: "GET",
      url: `/education/courses/${id}/details`,
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

  async getEducationNews(): Promise<{
    success: boolean;
    message: string;
    data?: { news: any[] };
  }> {
    return this.request({
      method: "GET",
      url: "/education/news",
    });
  }

  async getEducationEvents(): Promise<{
    success: boolean;
    message: string;
    data?: { events: any[] };
  }> {
    return this.request({
      method: "GET",
      url: "/education/events",
    });
  }

  async getScholarshipFinderRecommendations(
    payload: ScholarshipFinderToolPayload,
  ): Promise<{
    success: boolean;
    message: string;
    data?: { recommendations: ScholarshipFinderRecommendation[] };
  }> {
    return this.request({
      method: "POST",
      url: "/tools/scholarship-finder/recommendations",
      data: payload,
    });
  }

  async getCollegeRecommenderRecommendations(
    payload: CollegeRecommenderPayload,
  ): Promise<{
    success: boolean;
    message: string;
    data?: { recommendations: CollegeRecommendation[] };
  }> {
    return this.request({
      method: "POST",
      url: "/tools/college-recommender/recommendations",
      data: payload,
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

  // Admin university endpoints
  async createUniversity(
    token: string,
    university: any,
  ): Promise<{ success: boolean; data?: University; message: string }> {
    return this.request<{ success: boolean; data?: University; message: string }>(
      {
        method: "POST",
        url: "/admin/universities",
        data: university,
      },
      token,
    );
  }

  async updateUniversity(
    token: string,
    id: number,
    updates: any,
  ): Promise<{ success: boolean; data?: University; message: string }> {
    return this.request<{ success: boolean; data?: University; message: string }>(
      {
        method: "PUT",
        url: `/admin/universities/${id}`,
        data: updates,
      },
      token,
    );
  }

  async deleteUniversity(
    token: string,
    id: number,
  ): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      {
        method: "DELETE",
        url: `/admin/universities/${id}`,
      },
      token,
    );
  }

  // --- Forum Endpoints ---
  async getForumPosts(
    category?: string,
    token?: string,
    communityId?: number,
  ): Promise<ForumPost[]> {
    const params: any = {};
    if (category) params.category = category;
    if (communityId) params.community_id = communityId;

    const res = await this.request<{ data: ForumPost[] }>(
      {
        method: "GET",
        url: "/forum/posts",
        params,
      },
      token,
    );
    return res.data;
  }

  async getForumCommunities(token?: string): Promise<ForumCommunity[]> {
    const res = await this.request<{ data: ForumCommunity[] }>(
      {
        method: "GET",
        url: "/forum/communities",
      },
      token,
    );
    return res.data;
  }

  async joinForumCommunity(token: string, communityId: number): Promise<ForumCommunity> {
    const res = await this.request<{ data: ForumCommunity }>(
      {
        method: "POST",
        url: `/forum/communities/${communityId}/join`,
      },
      token,
    );
    return res.data;
  }

  async uploadForumMedia(token: string, files: File[]): Promise<string[]> {
    const form = new FormData();
    files.forEach((f) => form.append("files", f));
    const res = await this.client.post<{ data: { urls: string[] } }>(
      "/forum/upload",
      form,
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } },
    );
    return res.data.data.urls;
  }

  async createForumPost(
    token: string,
    data: { 
      community_id?: number;
      category: string; 
      title: string; 
      content: string;
      image_url?: string;
      video_url?: string;
      poll_options?: string[];
      is_poll?: boolean;
    },
  ): Promise<ForumPost> {
    const res = await this.request<{ data: ForumPost }>(
      {
        method: "POST",
        url: "/forum/posts",
        data,
      },
      token,
    );
    return res.data;
  }

  async likeForumPost(token: string, id: number): Promise<ForumPost> {
    const res = await this.request<{ data: ForumPost }>(
      {
        method: "POST",
        url: `/forum/posts/${id}/like`,
      },
      token,
    );
    return res.data;
  }

  async dislikeForumPost(token: string, id: number): Promise<ForumPost> {
    const res = await this.request<{ data: ForumPost }>(
      {
        method: "POST",
        url: `/forum/posts/${id}/dislike`,
      },
      token,
    );
    return res.data;
  }

  async updateForumPost(
    token: string,
    id: number,
    data: { title?: string; content?: string },
  ): Promise<ForumPost> {
    const res = await this.request<{ data: ForumPost }>(
      {
        method: "PUT",
        url: `/forum/posts/${id}`,
        data,
      },
      token,
    );
    return res.data;
  }

  async deleteForumPost(token: string, id: number): Promise<void> {
    await this.request<void>(
      {
        method: "DELETE",
        url: `/forum/posts/${id}`,
      },
      token,
    );
  }

  async getForumPostComments(
    id: number,
    limit: number = 10,
    offset: number = 0,
  ): Promise<{ comments: ForumComment[]; total_count: number }> {
    const res = await this.request<{
      data: { comments: ForumComment[]; total_count: number };
    }>({
      method: "GET",
      url: `/forum/posts/${id}/comments`,
      params: { limit, offset },
    });
    return res.data;
  }

  async createForumComment(
    token: string,
    id: number,
    data: { content: string; parent_id?: number },
  ): Promise<ForumComment> {
    const res = await this.request<{ data: ForumComment }>(
      {
        method: "POST",
        url: `/forum/posts/${id}/comments`,
        data,
      },
      token,
    );
    return res.data;
  }

  async voteForumPoll(token: string, id: number, optionIdx: number): Promise<ForumPost> {
    const res = await this.request<{ data: ForumPost }>(
      {
        method: "POST",
        url: `/forum/posts/${id}/poll/vote`,
        data: { option_idx: optionIdx },
      },
      token,
    );
    return res.data;
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

  setScholarshipProviderToken(token: string) {
    localStorage.setItem("scholarshipProviderToken", token);
  }

  getScholarshipProviderToken(): string | null {
    return localStorage.getItem("scholarshipProviderToken");
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

  async saveForumPost(token: string, id: number): Promise<ForumPost> {
    const res = await this.request<{ data: ForumPost }>({
      method: "POST",
      url: `/forum/posts/${id}/save`,
    }, token);
    return res.data;
  }

  setScholarshipProviderUser(user: any) {
    localStorage.setItem("scholarshipProviderUser", JSON.stringify(user));
  }

  getScholarshipProviderUser() {
    const user = localStorage.getItem("scholarshipProviderUser");
    return user ? JSON.parse(user) : null;
  }

  async scholarshipProviderLogin(data: any): Promise<any> {
    return this.request<any>({
      method: "POST",
      url: "/scholarship-providers/auth/login",
      data,
    });
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAuthenticatedScholarshipProvider(): boolean {
    return !!this.getScholarshipProviderToken();
  }

  // Clear all auth data
  logout() {
    this.removeToken();
  }

  scholarshipProviderLogout() {
    localStorage.removeItem("scholarshipProviderToken");
    localStorage.removeItem("scholarshipProviderUser");
  }

  // --- Institution Auth ---
  async institutionLogin(data: { email: string; password: string }): Promise<AuthResponse> {
    return this.request<AuthResponse>({
      method: "POST",
      url: "/institutions/auth/login",
      data,
    });
  }

  async institutionRegister(data: {
    institution_name: string;
    registration_number: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    return this.request<AuthResponse>({
      method: "POST",
      url: "/institutions/auth/register",
      data,
    });
  }

  setInstitutionToken(token: string) {
    localStorage.setItem("institutionToken", token);
  }

  getInstitutionToken(): string | null {
    return localStorage.getItem("institutionToken");
  }

  removeInstitutionToken() {
    localStorage.removeItem("institutionToken");
    localStorage.removeItem("institutionUser");
  }

  setInstitutionUser(user: any) {
    localStorage.setItem("institutionUser", JSON.stringify(user));
  }

  getInstitutionUser() {
    const user = localStorage.getItem("institutionUser");
    return user ? JSON.parse(user) : null;
  }

  isAuthenticatedInstitution(): boolean {
    return !!this.getInstitutionToken();
  }

  institutionLogout() {
    this.removeInstitutionToken();
  }
}

export const apiService = new ApiService(API_BASE_URL);
