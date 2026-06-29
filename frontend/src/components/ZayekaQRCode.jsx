import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Check } from 'lucide-react';

export default function ZayekaQRCode({ text, size = 180, fileName = 'zayeka-qr.png' }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clear previous error
    setError(null);

    // Get the device pixel ratio (e.g., 2 for Retina, 3 for modern phones, 1 for standard displays)
    const dpr = window.devicePixelRatio || 1;
    // Scale the canvas backing store size by dpr
    const targetSize = size * dpr;

    // Generate the QR code on the canvas at high resolution
    QRCode.toCanvas(
      canvas,
      text,
      {
        width: targetSize,
        margin: 1,
        errorCorrectionLevel: 'H', // High error correction to support central logo overlay
        color: {
          dark: '#23180f',  // Deep chocolate brown matching Zayeka text
          light: '#ffffff', // Clean white background for contrast/scannability
        },
      },
      (err) => {
        if (err) {
          console.error('QR Code generation error:', err);
          setError('Could not generate QR code.');
          return;
        }

        // Once the QR code is drawn, draw the Zayeka brand badge in the center
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // In the high-resolution canvas space:
        const center = targetSize / 2;
        const logoHeight = targetSize * 0.25; // 25% of QR size (vertical height)
        const logoWidth = logoHeight * 1.28;   // Exactly 1.28 aspect ratio (32% of QR size) to prevent stretching
        const radius = 4 * dpr;               // Rounded corner radius scaled by dpr

        // Draw solid rounded rectangle background shield (fully compatible drawing)
        ctx.beginPath();
        ctx.moveTo(center - logoWidth / 2 + radius, center - logoHeight / 2);
        ctx.lineTo(center + logoWidth / 2 - radius, center - logoHeight / 2);
        ctx.quadraticCurveTo(center + logoWidth / 2, center - logoHeight / 2, center + logoWidth / 2, center - logoHeight / 2 + radius);
        ctx.lineTo(center + logoWidth / 2, center + logoHeight / 2 - radius);
        ctx.quadraticCurveTo(center + logoWidth / 2, center + logoHeight / 2, center + logoWidth / 2 - radius, center + logoHeight / 2);
        ctx.lineTo(center - logoWidth / 2 + radius, center + logoHeight / 2);
        ctx.quadraticCurveTo(center - logoWidth / 2, center + logoHeight / 2, center - logoWidth / 2, center + logoHeight / 2 - radius);
        ctx.lineTo(center - logoWidth / 2, center - logoHeight / 2 + radius);
        ctx.quadraticCurveTo(center - logoWidth / 2, center - logoHeight / 2, center - logoWidth / 2 + radius, center - logoHeight / 2);
        ctx.closePath();
        
        ctx.fillStyle = '#ffffff'; // Solid white background shield to isolate the logo
        ctx.fill();

        // Draw gold border around the rounded rectangle
        ctx.lineWidth = 1.5 * dpr; // Scale border thickness by dpr
        ctx.strokeStyle = '#c5a059'; // Zayeka's signature gold
        ctx.stroke();

        // Draw the Zayeka brand mark (flame + vector text) SYNCHRONOUSLY and CRISPLY using native canvas operations.
        // This completely bypasses asynchronous image loading, browser SVG sandboxing limitations,
        // and SVG mask rendering bugs, rendering pixel-perfect results instantly.
        ctx.save();
        
        const innerWidth = logoWidth * 0.88;
        const innerHeight = logoHeight * 0.88;
        const xOffset = center - innerWidth / 2;
        const yOffset = center - innerHeight / 2;
        const scale = innerWidth / 160; // 160 is the viewBox width, matches innerHeight / 125 exactly

        // Translate and scale to the logo bounding box
        ctx.translate(xOffset, yOffset);
        ctx.scale(scale, scale);
        ctx.translate(0, 2.5); // Shift origin to align Y = -2.5 to Y = 0 (perfect vertical centering)

        // 1. Draw Terracotta Flame Silhouette
        ctx.beginPath();
        ctx.moveTo(80, 90);
        ctx.bezierCurveTo(101.5, 90, 117, 74, 117, 54);
        ctx.bezierCurveTo(117, 35.5, 104.5, 26, 89, 4);
        ctx.bezierCurveTo(84, 15.5, 75.5, 23.5, 67.5, 35);
        ctx.bezierCurveTo(55, 53, 43, 61, 43, 72.5);
        ctx.bezierCurveTo(43, 82.2, 58.5, 90, 80, 90);
        ctx.closePath();
        ctx.fillStyle = '#b85c46'; // Official Terracotta brand color
        ctx.fill();

        // 2. Draw White Swirl Cutouts on top of the Flame (simulating the SVG mask with 100% canvas compatibility)
        ctx.fillStyle = '#ffffff';

        // Left swirl
        ctx.beginPath();
        ctx.moveTo(76, 88);
        ctx.bezierCurveTo(67, 79, 61, 66, 61, 52);
        ctx.bezierCurveTo(61, 42, 66, 34, 71, 29);
        ctx.bezierCurveTo(64, 36, 56, 46, 56, 59);
        ctx.bezierCurveTo(56, 72, 65, 82, 76, 88);
        ctx.closePath();
        ctx.fill();

        // Center swirl
        ctx.beginPath();
        ctx.moveTo(82, 89);
        ctx.bezierCurveTo(80, 74, 77, 58, 81, 43);
        ctx.bezierCurveTo(83, 36, 87, 30, 91, 25);
        ctx.bezierCurveTo(85, 32, 80, 44, 80, 60);
        ctx.bezierCurveTo(80, 72, 82, 83, 82, 89);
        ctx.closePath();
        ctx.fill();

        // Right swirl
        ctx.beginPath();
        ctx.moveTo(88, 87);
        ctx.bezierCurveTo(96, 78, 104, 65, 103, 51);
        ctx.bezierCurveTo(103, 42, 98, 35, 93, 30);
        ctx.bezierCurveTo(99, 37, 107, 47, 107, 59);
        ctx.bezierCurveTo(107, 72, 97, 81, 88, 87);
        ctx.closePath();
        ctx.fill();

        // 3. Draw Brand Typography "ZAYEKA" in Terracotta
        ctx.strokeStyle = '#b85c46'; // Official Terracotta brand color
        ctx.lineWidth = 2.4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Z
        ctx.beginPath();
        ctx.moveTo(39.5, 100);
        ctx.lineTo(48.5, 100);
        ctx.lineTo(39.5, 116);
        ctx.lineTo(48.5, 116);
        ctx.moveTo(41.5, 108);
        ctx.lineTo(46.5, 108);
        ctx.stroke();

        // A
        ctx.beginPath();
        ctx.moveTo(53.5, 116);
        ctx.lineTo(58.5, 100);
        ctx.lineTo(63.5, 116);
        ctx.moveTo(55.5, 109);
        ctx.lineTo(61.5, 109);
        ctx.stroke();

        // Y
        ctx.beginPath();
        ctx.moveTo(69.5, 100);
        ctx.lineTo(74.5, 108);
        ctx.lineTo(79.5, 100);
        ctx.moveTo(74.5, 108);
        ctx.lineTo(74.5, 116);
        ctx.stroke();

        // E
        ctx.beginPath();
        ctx.moveTo(92.5, 100);
        ctx.lineTo(85.5, 100);
        ctx.lineTo(85.5, 116);
        ctx.lineTo(92.5, 116);
        ctx.moveTo(85.5, 108);
        ctx.lineTo(91.5, 108);
        ctx.moveTo(88.5, 105);
        ctx.lineTo(88.5, 111);
        ctx.stroke();

        // K
        ctx.beginPath();
        ctx.moveTo(97.5, 100);
        ctx.lineTo(97.5, 116);
        ctx.moveTo(105.5, 100);
        ctx.lineTo(97.5, 108);
        ctx.lineTo(105.5, 116);
        ctx.stroke();

        // A
        ctx.beginPath();
        ctx.moveTo(110.5, 116);
        ctx.lineTo(115.5, 100);
        ctx.lineTo(120.5, 116);
        ctx.moveTo(112.5, 109);
        ctx.lineTo(118.5, 109);
        ctx.stroke();

        ctx.restore();
      }
    );
  }, [text, size]);

  const handleDownload = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success state briefly
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (err) {
      console.error('Failed to download QR code image:', err);
    }
  };

  return (
    <div className="zayeka-qr-wrapper">
      {error ? (
        <div className="qr-error-message">{error}</div>
      ) : (
        <div className="qr-container">
          <canvas ref={canvasRef} className="qr-canvas" style={{ width: size, height: size }} />
        </div>
      )}
      
      <button 
        type="button" 
        className={`qr-download-btn ${downloaded ? 'downloaded' : ''}`} 
        onClick={handleDownload}
        disabled={!!error}
        title="Download QR Code Image"
      >
        {downloaded ? (
          <>
            <Check size={14} className="btn-icon" />
            <span>Saved</span>
          </>
        ) : (
          <>
            <Download size={14} className="btn-icon" />
            <span>Download QR</span>
          </>
        )}
      </button>
    </div>
  );
}
