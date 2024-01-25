import * as yup from 'yup';

export const LoginSchema = yup.object({
  name: yup.string(),
  initialDate: yup.string().required('Informe a data de início'),
  endDate: yup.string().required('Informe a data de fim'),
  futureDate: yup.string(),
});
