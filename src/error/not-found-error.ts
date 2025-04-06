class NotFound extends Error {
  code: number;

  constructor(message: string | null = null) {
    super(message ?? "Not Found!");
    this.name = "Not Found!";
    this.code = 404;
  }
}

export { NotFound };
