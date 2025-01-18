export interface TestResult {
  created_at: string;
  expected_output: string;
  actual_output: string;
  id: number;
  input: string;
  question_id: number;
  pass: boolean;
}

export interface TestCase {
  id: number;
  input: string;
  expected_output: string;
  actual_output?: string;
  status?: "pending" | "success" | "error";
}

export interface Solutions {
  id: number;
  is_correct: boolean;
  question_id: number;
  submitted_at: string;
  submitted_code: string;
}

export interface Question {
  id: number;
  title: string;
  description: string;
}
