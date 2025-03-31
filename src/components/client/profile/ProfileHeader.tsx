
import React from 'react';
import Container from '@/components/common/Container';

interface ProfileHeaderProps {
  title: string;
  description: string;
}

const ProfileHeader = ({ title, description }: ProfileHeaderProps) => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Container size="lg">
        <div>
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
            Mon profil
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default ProfileHeader;
