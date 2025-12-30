
export type Platform = 'YouTube' | 'Instagram' | 'TikTok';

export interface AnalyticsData {
  platform: Platform;
  followers: number;
  growth: number;
  revenue: number;
  views: number;
}

export interface BrandDeal {
  id: string;
  brandName: string;
  status: 'Draft' | 'Sent' | 'Negotiating' | 'Signed' | 'Completed';
  amount: number;
  dueDate: string;
}

export interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: 'Pending' | 'Paid' | 'Overdue';
  date: string;
}

export interface ScheduledPost {
  id: string;
  title: string;
  platform: Platform;
  postDate: string;
  status: 'Planned' | 'Scheduled' | 'Published';
}
