export class RowNotAffectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RowNotAffectedError";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
    };
  }
}
