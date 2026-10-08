import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API documentation for the E-commerce backend",
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Local development server",
      },
    ],

    tags: [
      {
        name: "Auth",
        description: "Authentication operations",
      },
      {
        name: "Products",
        description: "Product management operations",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "671234567890abcdef123456",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
          },
        },

        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665f1c2e8b3a4d0012ab34cd",
            },
            name: {
              type: "string",
              example: "Wireless Mouse",
            },
            description: {
              type: "string",
              example: "2.4GHz ergonomic mouse",
            },
            category: {
              type: "string",
              example: "Electronics",
            },
            price: {
              type: "number",
              example: 25.5,
            },
            imageUrl: {
              type: "string",
              example:
                "https://res.cloudinary.com/demo/image/upload/mouse.jpg",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Something went wrong",
            },
          },
        },
      },
    },
  },

  apis: [
    path.join(__dirname, "./routes/*.ts"),
    path.join(__dirname, "./routes/*.js"),
  ],
};

export const Spec = swaggerJSDoc(options);