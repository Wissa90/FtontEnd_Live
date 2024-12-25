export type LoginCredentials = {
  username: string;
  password: string;
};

export type Register = {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile: {
    birth_date: Date; // Match the expected field name
    location: ""; // Default or user-provided value
    current_grade: number; // Ensure grade is sent as a number
    educational_stage: string;
    parent_email: string;
  };
};
