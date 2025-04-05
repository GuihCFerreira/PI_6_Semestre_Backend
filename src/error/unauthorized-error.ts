class Unauthorized extends Error {
    code: number;
  
    constructor(message: string | null = null) {
      super(message ?? "Unauthorized!");
      this.name = "Unauthorized!";
      this.code = 401;
    }
  }
  
  export { Unauthorized };
  