import React from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Users, Calendar, BookOpen } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              {t('welcome')} MYISU - Ibn Sina University
            </h1>
            <p className="text-xl text-white mb-8">
              {t('heroDescription')}
            </p>
            <a href="/dashboard" className="btn-primary">
              {t('goDashboard')}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            {t('keyFeatures')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<GraduationCap size={40} />}
              title={t('studentPortal')}
              description={t('studentPortalDesc')}
            />
            <FeatureCard
              icon={<Users size={40} />}
              title={t('facultyDashboard')}
              description={t('facultyDashboardDesc')}
            />
            <FeatureCard
              icon={<Calendar size={40} />}
              title={t('attendance')}
              description={t('attendanceDesc')}
            />
            <FeatureCard
              icon={<BookOpen size={40} />}
              title={t('courses')}
              description={t('coursesDesc')}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">{t('aboutTitle')}</h2>
            <p className="text-xl text-gray-600">
              {t('aboutDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <p>&copy; 2025 MYISU - Ibn Sina University | {t('allRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="feature-card">
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;