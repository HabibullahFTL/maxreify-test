import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import useStore from '../../../store';
import { getLocalText } from '../../../utils/localsHandling/getLocalText';
import postRequest from '../../../utils/request/postRequest';
import { Button, FormInput } from '../../reusable';

const EditProfile = () => {
  const { auth, language, updateProfile } = useStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  const formMethods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        full_name: yup
          .string()
          .min(3, 'Name must be minimum 3 character.')
          .max(50, 'Name can not be greater than 50'),
      })
    ),
    defaultValues: {
      full_name: auth?.user?.full_name,
    },
  });

  const onSubmit = (values: any) => {
    setIsLoading(true);

    postRequest(
      `user/4?full_name=${values?.full_name}`,
      {},
      { Authorization: auth?.token }
    )
      ?.then((response) => {
        const finalData = {
          ...auth,
          user: { ...auth?.user, full_name: values?.full_name },
        };
        console.log({ finalData });

        updateProfile(finalData);
        push('/');
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="px-3">
      <div className="relative mx-auto w-20 rounded-full overflow-hidden aspect-square mb-4">
        {auth?.user?.avatar?.url ? (
          <Image
            src={auth?.user?.avatar?.url}
            className="object-cover"
            fill
            alt="Profile"
          />
        ) : null}
      </div>

      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit((values) => onSubmit(values))}
          className="space-y-10"
        >
          <FormInput
            label={getLocalText(language, 'profile.input.name.label')}
            name="full_name"
            placeholder={getLocalText(
              language,
              'profile.input.name.placeholder'
            )}
          />
          <Button
            type="submit"
            isLoading={isLoading}
            className="mt-2"
            text={getLocalText(language, 'profile.button.submit.label')}
          />
          <Link className="block text-center font-semibold" href="/">
            Cancel
          </Link>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditProfile;
