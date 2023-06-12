import { Plan } from "../plan/plan.entity";

export interface ReportedPlan  {
  _id?: string;
  plan: Plan;
  comment: string;
}