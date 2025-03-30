class BadRequest extends Error {
  code: number;

  constructor(message: string | null = null) {
    super(message ?? "Bad Request!");
    this.name = "Bad Request!";
    this.code = 400;
  }
}

export { BadRequest };
