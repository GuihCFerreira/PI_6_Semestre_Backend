class Conflict extends Error {
  code: number;

  constructor(message: string | null = null) {
    super(message ?? "Conflict!");
    this.name = "Conflict!";
    this.code = 409;
  }
}

export { Conflict };
