import Layout from '../components/layout';
import Home from '../components/subPages/Home';
import useStore from '../store';
import { getLocalText } from '../utils/localsHandling/getLocalText';

export default function HomePage() {
  const { language } = useStore((state) => state);
  return (
    <Layout title={getLocalText(language, 'dashboard.heading')}>
      <Home />
    </Layout>
  );
}
