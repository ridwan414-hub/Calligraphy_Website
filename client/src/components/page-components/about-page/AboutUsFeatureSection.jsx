import {
  UsersIcon,
  AcademicCapIcon,
  HeartIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Wide Selection of Calligraphy Products',
    description:
      'We offer a wide range of calligraphy products, including pens, inks, papers, and more. Whether you are a beginner or an experienced calligrapher, we have everything you need to create beautiful works of art.',
    icon: UsersIcon,
  },
  {
    name: 'Calligraphy Workshops and Classes',
    description:
      'Join our calligraphy workshops and classes to learn new techniques and improve your skills. Our experienced instructors will guide you through the art of calligraphy, helping you unleash your creativity.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Custom Calligraphy Services',
    description:
      'Looking for a personalized touch? Our custom calligraphy services allow you to create unique pieces for special occasions, such as weddings, birthdays, and anniversaries. Let us bring your vision to life.',
    icon: HeartIcon,
  },
  {
    name: 'Calligraphy Community',
    description:
      'Become part of our vibrant calligraphy community, where you can connect with fellow enthusiasts, share your work, and get inspired. Join us in celebrating the beauty of calligraphy.',
    icon: GlobeAltIcon,
  },
];

const AboutUsFeatureSection = () => {
  return (
    <div className="bg-transparent glass shadow-lg rounded-lg my-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-5 mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl text-center sm:text-5xl py-6 font-semibold text-indigo-600">
            Our Missions and Initiatives
          </h2>
          <p className=" text-xl md:text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Making a Difference in the Community
          </p>
          <p className=" md:text-lg leading-8 text-gray-600">
            Our initiatives are designed to uplift and support individuals and
            communities. We believe in the power of education, health, and
            cultural understanding to create a better world for everyone.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AboutUsFeatureSection;
