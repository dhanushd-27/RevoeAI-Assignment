import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <Card className="max-w-md mx-auto p-6 shadow-xl rounded-2xl border border-gray-200 bg-white/90 transition-all hover:shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold text-gray-900">Welcome to AppSheet</CardTitle>
        <CardDescription className="text-gray-600 mt-2">
          Fetch information from a public Google Sheet and display it in a table in our app.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center gap-4 mt-4">
        <Button asChild variant={'outline'}>
          <Link href={'/signin'}>Sign In</Link>
        </Button>
        <Button asChild>
          <Link href={'/signup'}>Sign Up</Link>
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
}
