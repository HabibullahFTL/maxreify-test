import getRequest from '../../../utils/request/getRequest';

interface Handler {
  setIsLoading: (state: boolean) => void;
  formMethods: any;
  values: any;
  goNextStep: () => void;
  setErrorMessage: (state: string) => void;
  setLogin?: any;
}

const handleEmailInput = ({
  setIsLoading,
  formMethods,
  values,
  goNextStep,
  setErrorMessage,
}: Handler) => {
  setIsLoading(true);
  getRequest(`auth/initiate?email=${values?.email}`, {}, {})
    .then((response) => {
      formMethods.setValue('number', response?.data?.number);
      formMethods.setValue('sms_id', response?.data?.sms_id);
      goNextStep();
    })
    .catch((error) => {
      setErrorMessage(error?.data?.message);
    })
    .finally(() => setIsLoading(false));
};

const handleVerifyPhone = ({
  setIsLoading,
  formMethods,
  values,
  goNextStep,
  setErrorMessage,
  setLogin,
}: Handler) => {
  if (values?.code == values?.sms_id?.verification_code?.toString()) {
    setIsLoading(true);
    getRequest(
      `auth/signin?code=${values?.code}&email=${values?.email}&sms_id=${values?.sms_id?.result_1}`,
      {},
      {}
    )
      .then((response) => {
        getRequest(`user/1`, { Authorization: response?.data })
          .then((profileRes) => {
            setLogin({ token: response?.data, user: profileRes?.data });
            goNextStep();
            setIsLoading(false);
          })
          .catch((error) => {
            setErrorMessage(error?.data?.message);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        setErrorMessage(error?.data?.message);
        setIsLoading(false);
      });
  } else {
    setErrorMessage('Your entered code is not valid!');
  }
};

export { handleEmailInput, handleVerifyPhone };
