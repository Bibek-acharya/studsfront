import { EducationCourse } from "../../../services/api";

export interface CourseFinderFilters {
  quickVerified: boolean;
  quickNew: boolean;
  quickClosing: boolean;
  academicLevels: string[];
  fields: string[];
  providerTypes: string[];
  province: string;
  nationalWide: boolean;
  feeRanges: string[];
  scholarships: string[];
  durations: string[];
  admissions: string[];
  popularity: string[];
}

export interface CourseFilterCounts {
  byAcademic: Record<string, number>;
  byField: Record<string, number>;
  byProvider: Record<string, number>;
  byDuration: Record<string, number>;
  total: number;
}

export const defaultCourseFinderFilters: CourseFinderFilters = {
  quickVerified: false,
  quickNew: false,
  quickClosing: false,
  academicLevels: [],
  fields: [],
  providerTypes: [],
  province: "All Provinces",
  nationalWide: false,
  feeRanges: [],
  scholarships: [],
  durations: [],
  admissions: [],
  popularity: [],
};

const normalized = (value: string) => value.toLowerCase();

const matchesAnyKeyword = (value: string, keywords: string[]) => {
  const text = normalized(value);
  return keywords.some((keyword) => text.includes(keyword));
};

const parseMoneyToken = (token: string) => {
  const clean = token.replace(/,/g, "").trim().toLowerCase();
  const numberMatch = clean.match(/\d+(\.\d+)?/);
  if (!numberMatch) return null;
  const number = Number(numberMatch[0]);
  if (Number.isNaN(number)) return null;

  if (clean.includes("l")) return number * 100000;
  if (clean.includes("k")) return number * 1000;
  return number;
};

const getEstimatedMaxFee = (course: EducationCourse) => {
  const estFee = course.estFee || "";
  const parts = estFee.split("-").map((part) => parseMoneyToken(part));
  const valid = parts.filter((num): num is number => typeof num === "number");

  if (valid.length > 0) {
    return Math.max(...valid);
  }

  const fallback = parseMoneyToken(estFee);
  return typeof fallback === "number" ? fallback : null;
};

const getDurationInMonths = (course: EducationCourse) => {
  const text = normalized(course.duration || "");
  const numberMatch = text.match(/\d+(\.\d+)?/);
  if (!numberMatch) return null;
  const number = Number(numberMatch[0]);
  if (Number.isNaN(number)) return null;

  if (text.includes("year")) return number * 12;
  if (text.includes("month")) return number;
  return null;
};

const isAcademicMatch = (course: EducationCourse, id: string) => {
  const level = normalized(course.level || "");
  switch (id) {
    case "plus2":
      return matchesAnyKeyword(level, ["+2", "higher secondary", "intermediate"]);
    case "bachelor":
      return level.includes("bachelor");
    case "master":
      return level.includes("master");
    case "diploma":
      return matchesAnyKeyword(level, ["diploma", "ctevt"]);
    case "shortterm":
      return matchesAnyKeyword(level, ["short", "training"]);
    case "cert":
      return matchesAnyKeyword(level, ["certification", "professional"]);
    case "distance":
      return matchesAnyKeyword(course.location || "", ["online", "distance"]);
    default:
      return false;
  }
};

const isFieldMatch = (course: EducationCourse, id: string) => {
  const field = normalized(course.field || "");
  switch (id) {
    case "it":
      return matchesAnyKeyword(field, ["it", "computer", "data", "software", "ai"]);
    case "engineering":
      return field.includes("engineering");
    case "management":
      return matchesAnyKeyword(field, ["management", "business", "commerce"]);
    case "medical":
      return matchesAnyKeyword(field, ["medical", "health", "nursing", "pharmacy"]);
    default:
      return false;
  }
};

const isProviderMatch = (course: EducationCourse, id: string) => {
  const affiliation = normalized(course.affiliation || "");
  switch (id) {
    case "govt":
      return matchesAnyKeyword(affiliation, ["public", "government"]);
    case "private":
      return matchesAnyKeyword(affiliation, ["private", "foreign"]);
    case "univ":
      return matchesAnyKeyword(affiliation, ["affiliated", "university", "tu", "ku", "pu"]);
    case "auto":
      return matchesAnyKeyword(affiliation, ["autonomous", "independent"]);
    case "ctevt":
      return affiliation.includes("ctevt");
    case "onlinep":
      return matchesAnyKeyword(course.location || "", ["online", "distance"]);
    default:
      return false;
  }
};

const isDurationMatch = (course: EducationCourse, id: string) => {
  const months = getDurationInMonths(course);
  if (months === null) return false;

  switch (id) {
    case "dur_lt1":
      return months < 1;
    case "dur_1_3":
      return months >= 1 && months <= 3;
    case "dur_3_6":
      return months > 3 && months <= 6;
    case "dur_6_1":
      return months > 6 && months <= 12;
    case "dur_1_2":
      return months > 12 && months <= 24;
    case "dur_3_4":
      return months >= 36 && months <= 48;
    case "dur_4plus":
      return months > 48;
    default:
      return false;
  }
};

const isFeeRangeMatch = (course: EducationCourse, id: string) => {
  const maxFee = getEstimatedMaxFee(course);
  if (maxFee === null) return false;

  switch (id) {
    case "free":
      return maxFee === 0;
    case "under50":
      return maxFee < 50000;
    case "range50_100":
      return maxFee >= 50000 && maxFee <= 100000;
    case "range100_200":
      return maxFee > 100000 && maxFee <= 200000;
    case "above200":
      return maxFee > 200000;
    default:
      return false;
  }
};

const hasKeywordInHighlights = (course: EducationCourse, keywords: string[]) => {
  const highlights = (course.highlights || []).join(" ").toLowerCase();
  return keywords.some((keyword) => highlights.includes(keyword));
};

export const applyCourseFinderFilters = (
  courses: EducationCourse[],
  filters: CourseFinderFilters,
) => {
  return courses.filter((course) => {
    if (
      filters.quickVerified &&
      !matchesAnyKeyword((course.badges || []).join(" "), ["verified"])
    ) {
      return false;
    }

    if (
      filters.quickNew &&
      !matchesAnyKeyword((course.badges || []).join(" "), ["new"])
    ) {
      return false;
    }

    if (
      filters.quickClosing &&
      !matchesAnyKeyword((course.badges || []).join(" "), ["closing", "last date"])
    ) {
      return false;
    }

    if (
      filters.academicLevels.length > 0 &&
      !filters.academicLevels.some((id) => isAcademicMatch(course, id))
    ) {
      return false;
    }

    if (
      filters.fields.length > 0 &&
      !filters.fields.some((id) => isFieldMatch(course, id))
    ) {
      return false;
    }

    if (
      filters.providerTypes.length > 0 &&
      !filters.providerTypes.some((id) => isProviderMatch(course, id))
    ) {
      return false;
    }

    if (!filters.nationalWide && filters.province !== "All Provinces") {
      const location = normalized(course.location || "");
      if (!location.includes(normalized(filters.province.replace(" Province", "")))) {
        return false;
      }
    }

    if (
      filters.feeRanges.length > 0 &&
      !filters.feeRanges.some((id) => isFeeRangeMatch(course, id))
    ) {
      return false;
    }

    if (
      filters.scholarships.length > 0 &&
      !filters.scholarships.every((id) => {
        if (id === "sch-avail") return hasKeywordInHighlights(course, ["scholarship"]);
        if (id === "sch-govt") return hasKeywordInHighlights(course, ["government scholarship", "govt scholarship"]);
        if (id === "sch-college") return hasKeywordInHighlights(course, ["college scholarship", "merit"]);
        return true;
      })
    ) {
      return false;
    }

    if (
      filters.durations.length > 0 &&
      !filters.durations.some((id) => isDurationMatch(course, id))
    ) {
      return false;
    }

    if (
      filters.admissions.includes("entrance") &&
      !hasKeywordInHighlights(course, ["entrance"])
    ) {
      return false;
    }

    if (
      filters.admissions.includes("interview") &&
      !hasKeywordInHighlights(course, ["interview"])
    ) {
      return false;
    }

    if (
      filters.popularity.includes("trending") &&
      !matchesAnyKeyword((course.badges || []).join(" "), ["trending"])
    ) {
      return false;
    }

    if (
      filters.popularity.includes("recommended") &&
      !matchesAnyKeyword((course.badges || []).join(" "), ["recommended", "top choice"])
    ) {
      return false;
    }

    if (
      filters.popularity.includes("newPrograms") &&
      !matchesAnyKeyword((course.badges || []).join(" "), ["new"])
    ) {
      return false;
    }

    return true;
  });
};

export const getCourseFilterCounts = (
  courses: EducationCourse[],
): CourseFilterCounts => {
  const byAcademic: Record<string, number> = {};
  const byField: Record<string, number> = {};
  const byProvider: Record<string, number> = {};
  const byDuration: Record<string, number> = {};

  const academicKeys = ["plus2", "bachelor", "master", "diploma", "shortterm", "cert", "distance"];
  const fieldKeys = ["it", "engineering", "management", "medical"];
  const providerKeys = ["govt", "private", "univ", "auto", "ctevt", "onlinep"];
  const durationKeys = ["dur_lt1", "dur_1_3", "dur_3_6", "dur_6_1", "dur_1_2", "dur_3_4", "dur_4plus"];

  academicKeys.forEach((key) => (byAcademic[key] = courses.filter((course) => isAcademicMatch(course, key)).length));
  fieldKeys.forEach((key) => (byField[key] = courses.filter((course) => isFieldMatch(course, key)).length));
  providerKeys.forEach((key) => (byProvider[key] = courses.filter((course) => isProviderMatch(course, key)).length));
  durationKeys.forEach((key) => (byDuration[key] = courses.filter((course) => isDurationMatch(course, key)).length));

  return {
    byAcademic,
    byField,
    byProvider,
    byDuration,
    total: courses.length,
  };
};
