import { Plan } from "../plan/plan.entity";

export interface ReportedPlan  {
  plan: Plan;
  comment: string;
}