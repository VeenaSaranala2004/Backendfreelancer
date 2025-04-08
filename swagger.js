
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Management & Profile API",
      version: "1.0.0",
      description: "API Documentation for User and Profile Management System",
    },
    servers: [
      {
        url: "https://backendfreelancer-u9ba.onrender.com/api",
      },
    ],
  },
  apis: ["./routes/userRoutes.js", "./routes/profileRoutes.js", "./routes/projectRoutes.js", "./routes/messageRoutes.js"], // Include profileRoutes.js
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  console.log("🚀 Swagger Docs available at https://backendfreelancer-u9ba.onrender.com/");
};

module.exports = swaggerDocs;
