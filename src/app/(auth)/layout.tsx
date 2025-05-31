import { Fullscreen } from "lucide-react";
import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main className="min-h-screen w-full bg-blue-50 flex items-center justify-between">
    {children}
    <div >
    <Image src={'/icons/auth-image.svg'} alt="auth-image"  width={600} height={400}/>
    </div>
   </main>
  );
}