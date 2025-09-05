
export type Industry =
  | "OilGas" | "Utilities" | "Logistics" | "Manufacturing"
  | "Healthcare" | "Retail" | "Financial" | "PublicSector" | "CrossDomain";

export type ProductLine = "OperationalAI" | "DataAnalytics" | "AIPlatforms";
export type Speed = "Solutions" | "Product";
export type Stage = "G0" | "G1" | "G2" | "G3";

export type CaseStudy = {
  id:string; title:string; year:number; industry:Industry[];
  summary:string; valueDriver:string;
  outcome:"Success"|"Failure"|"Mixed";
  reasons:string[]; maturity:"Prototype"|"Pilot"|"Scaling"|"GA";
  hypeVsRevenue:{hype:1|2|3|4|5; revenue:1|2|3|4|5};
  notes?:string;
}

export type ChallengeCard = {
  id:string; prompt:string; signals:string[];
  correct:"Success"|"Failure"|"It depends"; rationale:string;
}

export type ProblemStatement = {
  id:string; text:string; industry:Industry;
  correctProductLine: ProductLine; explanation:string; tricky?:boolean;
}

export type Scenario = {
  id:string; title:string; client:string; industry:Industry; problem:string;
  correctProductLine: ProductLine; recommendedStartSpeed: Speed; startingStage: Stage;
  evolution:string; timelineWeeks:{solution:number; product:number};
  economics:{projectUSD:number; productPerMonthUSD:number};
  rationale:{productLine:string; speed:string; stage:string};
}

export function currency(n:number){ return '$' + n.toLocaleString(); }
