import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

// Define types
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Custom styles for the zoom animation
const styles = `
@keyframes zoom {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-45deg);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(1.2) rotate(-45deg);
  }
}

.animate-zoom {
  animation: zoom 5s infinite;
}
`;

const ContactUsPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="relative min-h-screen">
      {/* Custom styles injection */}
      <style>{styles}</style>

      {/* Main container */}
      <div className="fixed inset-0 w-full min-h-screen overflow-y-auto text-white font-sans bg-gradient-to-b from-[#1B2735] to-[#090A0F]">
        {/* Animated stars background */}
        <div className="fixed inset-0 w-full h-[120%] animate-zoom bg-[radial-gradient(2px_2px_at_20px_30px,#eee,rgba(0,0,0,0)),radial-gradient(2px_2px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_50px_160px,#ddd,rgba(0,0,0,0)),radial-gradient(2px_2px_at_90px_40px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_130px_80px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_160px_120px,#ddd,rgba(0,0,0,0))] bg-repeat bg-[length:200px_200px] -rotate-45" />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 md:px-8 pt-24 md:pt-32 pb-8">
          <h1 className="mb-12 text-3xl md:text-4xl font-bold tracking-widest uppercase text-center drop-shadow-lg">
            {t('contactUs.title')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Contact Form Card */}
            <div className="p-6 md:p-8 bg-white/10 rounded-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20">
              <h2 className="text-xl md:text-2xl font-bold tracking-wide uppercase mb-6 text-center drop-shadow-md">
                {t('contactUs.form.title')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 text-center">
                <div>
                  <label htmlFor="name" className="block mb-2 font-semibold text-center">
                    {t('contactUs.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full md:w-2/3 p-3 rounded bg-white/10 text-white border-0 mx-auto block text-center"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-center">
                    {t('contactUs.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full md:w-2/3 p-3 rounded bg-white/10 text-white border-0 mx-auto block text-center"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 font-semibold text-center">
                    {t('contactUs.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full md:w-2/3 p-3 rounded bg-white/10 text-white border-0 h-36 resize-y mx-auto block text-center"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors duration-300"
                  >
                    {t('contactUs.form.submit')}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info Card */}
            <div className="p-6 md:p-8 bg-white/10 rounded-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20">
              <h2 className="text-xl md:text-2xl font-bold tracking-wide uppercase mb-6 text-center drop-shadow-md">
                {t('contactUs.info.title')}
              </h2>
              
              <div className="space-y-4 text-center">
                <p className="flex flex-col items-center gap-2">
                  <strong>{t('contactUs.info.email')}:</strong>
                  <span>efexzium@gmail.com</span>
                </p>
                <p className="flex flex-col items-center gap-2">
                  <strong>{t('contactUs.info.phone')}:</strong>
                  <span>+1 (787) 525-6420</span>
                </p>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <a
                  href="#"
                  className="font-semibold text-white hover:text-green-500 transition-colors duration-300"
                >
                  {t('contactUs.info.linkedin')}
                </a>
                <a
                  href="#"
                  className="font-semibold text-white hover:text-green-500 transition-colors duration-300"
                >
                  {t('contactUs.info.youtube')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;