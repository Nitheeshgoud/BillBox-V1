import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import { vendorContent, customerContent } from '@/data/content';
import { useAuth } from '@/contexts/AuthContext';

const PowerfulConnectionsSection = () => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('');
  const { role } = useAuth();

  const content = role === 'vendor' ? vendorContent : customerContent;

  useEffect(() => {
    const processImage = async () => {
      try {
        // Load the new image
        const response = await fetch('/images/vendor.png');
        const blob = await response.blob();
        const imageElement = await loadImage(blob);

        // Remove background
        const processedBlob = await removeBackground(imageElement);
        const url = URL.createObjectURL(processedBlob);
        setProcessedImageUrl(url);
      } catch (error) {
        console.error('Failed to process image:', error);
        // Fallback to original image
        setProcessedImageUrl('/images/vendor.png');
      }
    };

    processImage();
  }, []);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {content.powerfulConnections.title}
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              {content.powerfulConnections.description}
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              See BillBox in Action
            </Button>
          </div>
          
          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <img 
              src={processedImageUrl || '/images/vendor.png'}
              alt="Digital bill experience illustration"
              className="max-w-full h-auto w-full max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowerfulConnectionsSection;
