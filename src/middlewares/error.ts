// import { ErrorRequestHandler } from 'express';
// import { ZodError } from 'zod';

// const errorHandler: ErrorRequestHandler = (
//   err,
//   _req,
//   res,
// ) => {
//   console.log('chegou aqui!');
//   if (err instanceof ZodError) { 
//     // se for nós sabemos que é um erro de validação e podemos usar o status 400 e a própria mensagem do zod para retornar a response
//     return res.status(400).json({ message: err.issues });
//   }
//   console.log(err);
//   return res.status(400).json({ meuErroTeste: 'Deu pau' });
// };

// export default errorHandler;
