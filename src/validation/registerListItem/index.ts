import * as yup from 'yup';

export const RegisterListItem = yup.object({
  nameList: yup.string(),
  futureDate: yup.date(),
  futureList: yup.boolean(),
  actions: yup.array().of(
    yup.object().shape({
      actionName: yup.string().required('Informe o nome da ação'),
      initialTime: yup.date().required('Informe o início'),
      endTime: yup.date().required('Informe o fim'),
      storyPoints: yup.number().required('Informe o Story Point'),
      fixedAction: yup.bool(),
      stayAction: yup.bool(),
    })
  ),
});
