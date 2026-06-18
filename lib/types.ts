export const statusOptions = [
  "not_started",
  "announced",
  "in_progress",
  "partial",
  "fulfilled",
  "delayed",
  "abandoned",
] as const;

export type Status = (typeof statusOptions)[number];

export const categoryOptions = [
  "Social Welfare",
  "Healthcare",
  "Education",
  "Employment",
  "Agriculture",
  "Fisheries",
  "Women Empowerment",
  "Youth Development",
  "Housing",
  "Infrastructure",
  "Transport",
  "Energy",
  "Tourism",
  "Technology",
  "Environment",
  "Governance",
  "Law & Order",
  "Culture & Sports",
] as const;

export type Category = (typeof categoryOptions)[number];
export type Importance = "high" | "medium" | "low";

export interface TimelineEntry {
  date: string;
  title: string;
  summary: string;
  status_from?: Status;
  status_to?: Status;
  source_title?: string;
  source_url?: string;
}

export interface PromiseItem {
  id: string;
  category: Category;
  department: string;
  minister: string;
  promise_en: string;
  promise_ml: string;
  simple_explanation: string;
  why_it_matters: string;
  if_not_done: string;
  source_page: number;
  source_pages: number[];
  importance: Importance;
  has_deadline: boolean;
  deadline_note: string;
  status: Status;
  progress: number;
  last_updated: string;
  timeline: TimelineEntry[];
  needs_review?: boolean;
  source_section?: string;
  extraction_method?: string;
}

export interface Meta {
  government: string;
  chief_minister: string;
  election_result_date: string;
  sworn_in_date: string;
  last_checked: string;
  total_promises: number;
  fulfilled: number;
  announced: number;
  in_progress: number;
  partial: number;
  not_started: number;
  delayed: number;
  abandoned: number;
  overall_progress_percent: number;
}
