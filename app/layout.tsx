import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/lib/Common/globals.css';
import '@/app/layout.css';
import DsElLayout from '@/lib/Elements/ERPComponents/DsElLayout/DsElLayout';

const openSans = localFont({
  src: '../fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf',
  variable: '--font-Open-sans',
  weight: '100 900',
});

// //normal fonts
// const openSans_MediumItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-MediumItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Bold = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans-Bold.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_BoldItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans-BoldItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_ExtraBold = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans-ExtraBold.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_ExtraBoldItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans-ExtraBoldItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Italic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans-Italic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Light = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans-Light.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_LightItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans-LightItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Medium = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans-Medium.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Regular = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans-Regular.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });
// const openSans_SemiBold = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans-SemiBold.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });
// const openSans_SemiBoldItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans-SemiBoldItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// //condenced fonts
// const openSans_Condensed_MediumItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-MediumItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Condensed_Bold = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-Bold.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Condensed_BoldItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-BoldItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Condensed_ExtraBold = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-ExtraBold.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Condensed_ExtraBoldItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-ExtraBoldItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Condensed_Italic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-Italic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Condensed_Light = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-Light.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Condensed_LightItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-LightItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Condensed_Medium = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-Medium.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_Condensed_Regular = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-Regular.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });
// const openSans_Condensed_SemiBold = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-SemiBold.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });
// const openSans_Condensed_SemiBoldItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_Condensed-SemiBoldItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// //SemiCondensed fonts
// const openSans_SemiCondensed_MediumItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-MediumItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_SemiCondensed_Bold = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-Bold.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_SemiCondensed_BoldItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-BoldItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_SemiCondensed_ExtraBold = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-ExtraBold.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_SemiCondensed_ExtraBoldItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-ExtraBoldItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_SemiCondensed_Italic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-Italic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_SemiCondensed_Light = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-Light.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_SemiCondensed_LightItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-LightItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_SemiCondensed_Medium = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-Medium.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const openSans_SemiCondensed_Regular = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-Regular.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });
// const openSans_SemiCondensed_SemiBold = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-SemiBold.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });
// const openSans_SemiCondensed_SemiBoldItalic = localFont({
//   src: "./fonts/Open_Sans/static/OpenSans_SemiCondensed-SemiBoldItalic.ttf",
//   variable: "--font-Open-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
import { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};
// const scaleFactor = window.devicePixelRatio;
// console.log(scaleFactor)
// document.documentElement.style.setProperty('--scale-factor', scaleFactor.toString());
export const metadata: Metadata = {
  title: 'ERP',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${openSans.variable}`}>
        {/* <DsElLayout>{children}</DsElLayout> */}
        {children}
      </body>
    </html>
  );
}
