export interface IWebhookInfo {
  allowed_updates?: string[];
  has_custom_certificate: boolean;
  last_error_date?: number;
  last_error_message?: string;
  max_connections?: number;
  pending_update_count: number;
  url: string;
}
