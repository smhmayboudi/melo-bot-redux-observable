export interface IError {
  error: {
    errors: [
      {
        domain: string;
        reason: string;
        message: string;
        locationType: string;
        location: string;
      }
    ];
    code: number;
    message: string;
  };
}
