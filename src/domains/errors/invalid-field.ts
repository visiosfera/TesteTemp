export class InvalidFieldError extends Error {
  public fields: Record<string, string>;

  constructor(field: string, message: string) {
    super(message);
    this.name = "InvalidFieldError";
    this.fields = { [field]: message };
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      fields: this.fields,
    };
  }
}
