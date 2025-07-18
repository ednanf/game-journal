const allowedOrigins = ['http://localhost:9000'];

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  optionsSuccessStatus: 200, // For legacy browser support
};

export default corsOptions;
