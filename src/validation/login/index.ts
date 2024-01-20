import * as yup from 'yup';

export const LoginSchema = yup.object({
  email: yup.string().required('Informe o e-mail'),
  password: yup.string().required('Informe a senha'),
});
