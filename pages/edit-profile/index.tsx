import Layout from '../../components/layout';
import EditProfile from '../../components/subPages/EditProfile';
import useStore from '../../store';
import { getLocalText } from '../../utils/localsHandling/getLocalText';

const EditProfilePage = () => {
  const { language } = useStore((state) => state);
  return (
    <Layout title={getLocalText(language, 'profile.heading')}>
      <EditProfile />
    </Layout>
  );
};

export default EditProfilePage;
