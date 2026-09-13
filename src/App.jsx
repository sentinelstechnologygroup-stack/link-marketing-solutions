import { Toaster } from '@/components/ui/toaster';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Layout from '@/components/site/Layout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import HowItWorks from '@/pages/HowItWorks';
import Industries from '@/pages/Industries';
import IndustryDetail from '@/pages/IndustryDetail';
import Pricing from '@/pages/Pricing';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import GetStarted from '@/pages/GetStarted';
import Legal from '@/pages/Legal';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:industry" element={<IndustryDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/privacy" element={<Legal doc="privacy" />} />
          <Route path="/terms" element={<Legal doc="terms" />} />
          <Route path="/communications-policy" element={<Legal doc="communications" />} />
          <Route path="/accessibility" element={<Legal doc="accessibility" />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
