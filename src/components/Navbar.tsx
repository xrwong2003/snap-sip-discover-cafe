import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera, X } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (elementId: string) => {
    // Always navigate to main page and reset to welcome view
    navigate('/', { replace: true });
    
    // Dispatch custom event to reset the main page to welcome view
    window.dispatchEvent(new CustomEvent('resetToWelcome'));
    
    // Wait for navigation and state reset, then scroll to section
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    // Navigate to main page and reset to welcome view
    navigate('/');
    
    // Dispatch custom event to reset the main page to welcome view
    window.dispatchEvent(new CustomEvent('resetToWelcome'));
    
    // Wait for navigation and state reset, then scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
      setCameraStream(stream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to scan QR codes.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };

  const handleScanSuccess = () => {
    stopCamera();
    const bonusPoints = Math.floor(Math.random() * 50) + 25;
    
    toast({
      title: "✅ Scan Successful!",
      description: `You've entered the Lucky Draw! +${bonusPoints} Aroma Points earned!`,
      duration: 5000,
    });

    localStorage.setItem('lastScanTime', new Date().toISOString());
    localStorage.setItem('scanBonusPoints', bonusPoints.toString());
  };

  const simulateScan = () => {
    setTimeout(() => {
      handleScanSuccess();
    }, 2000);
  };

  useEffect(() => {
    if (showCamera && videoRef.current) {
      simulateScan();
    }
  }, [showCamera]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={handleLogoClick} className="flex items-center">
                <span className="font-bold text-2xl text-nescafe-red">
                  NESCAFÉ
                </span>
                <span className="ml-2 font-medium text-nescafe-brown">
                  Snap & Sip AI
                </span>
              </button>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="font-medium transition-colors duration-300 text-nescafe-brown hover:text-nescafe-red"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('coffee-personas')}
                className="font-medium transition-colors duration-300 text-nescafe-brown hover:text-nescafe-red"
              >
                Coffee Personas
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="font-medium transition-colors duration-300 text-nescafe-brown hover:text-nescafe-red"
              >
                Products
              </button>
              <Button 
                onClick={startCamera}
                className="bg-nescafe-red text-white hover:bg-nescafe-brown border-2 border-nescafe-red font-medium px-6 transition-colors duration-300"
              >
                <Camera className="w-4 h-4 mr-2" />
                Scan Now
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md transition-colors text-nescafe-brown"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 bg-white rounded-xl shadow-lg border">
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="block px-4 py-2 text-left text-nescafe-brown hover:bg-nescafe-cream rounded-md font-medium transition-colors"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('coffee-personas')}
                  className="block px-4 py-2 text-left text-nescafe-brown hover:bg-nescafe-cream rounded-md font-medium transition-colors"
                >
                  Coffee Personas
                </button>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="block px-4 py-2 text-left text-nescafe-brown hover:bg-nescafe-cream rounded-md font-medium transition-colors"
                >
                  Products
                </button>
                <div className="px-4">
                  <Button 
                    onClick={startCamera}
                    className="w-full bg-nescafe-red text-white hover:bg-nescafe-brown border-2 border-nescafe-red font-medium transition-colors duration-300"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Scan Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60]">
          <div className="relative w-full max-w-md mx-4">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-nescafe-brown">Scan QR Code</h3>
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  size="sm"
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 border-2 border-nescafe-red border-dashed rounded-lg flex items-center justify-center">
                  <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg">
                    <p className="text-sm text-nescafe-brown font-medium">
                      📱 Point camera at NESCAFÉ QR code
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Scanning for QR code... This will automatically detect when a valid NESCAFÉ product code is found.
              </p>
              
              <Button
                onClick={stopCamera}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
