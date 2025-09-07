"use client";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

const NotFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        priority={true}
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
      />
      <div className="p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested resource</p>
        <Button variant="outline" className="mt-4 ml-2">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
