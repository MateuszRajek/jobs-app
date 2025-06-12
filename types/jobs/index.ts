export type Jobs = Job[];

export interface Job {
  jobId: string;
  jobTitle: JobTitle;
  company: Company;
  wagePerHourInCents: number;
  milesToTravel: number;
  shifts: Shift[];
  branch: string;
  branchPhoneNumber: string;
  requirements?: string[];
}

export interface JobTitle {
  name: string;
  imageUrl: string;
}

export interface Company {
  name: string;
  address: Address;
  reportTo: ReportTo;
}

export interface Address {
  formattedAddress: string;
  zoneId: string;
}

export interface ReportTo {
  name: string;
  phone?: string;
}

export interface Shift {
  startDate: string;
  endDate: string;
}

export interface AcceptanceJobResponse {
  success: boolean;
  message?: string;
  errorCode?: string;
}

export interface UseAcceptJobOfferResult {
  acceptJobOffer: (actionType: jobAcceptType) => Promise<void>;
  data: AcceptanceJobResponse | null;
  isLoading: boolean;
  error: string | null;
}

export interface AcceptJobOfferParams {
  workerId: string;
  jobId: string;
}

export type jobAcceptType = "accept" | "reject";
