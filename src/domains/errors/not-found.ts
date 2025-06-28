export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFound";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
    };
  }
}
