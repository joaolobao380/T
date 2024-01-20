import * as yup from 'yup';

export const ForgotPasswordSchema = yup.object({
  email: yup.string().required('Informe o e-mail'),
});
