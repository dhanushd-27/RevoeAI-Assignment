"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signUpService } from "@/lib/services/authService"
import { FormEvent, useState } from "react"
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation"

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
  
    const response = await signUpService({ 
      name,
      email,
      password
    });

    if(response.status === 200){
      const { message } = response.data as { message: string  };
      toast.success(message, {
        position: "bottom-right"
      });

      router.push('/signin')
    } else if(response.status === 403){
      const { message } = response.data as { message: string  };
      toast.error(message, {
        position: "bottom-right"
      })
    } else if(response.status === 409){
      const { message } = response.data as { message: string };
      toast.error(message, {
        position: "bottom-right"
      })
    } else {
      const { message } = response.data as { message: string };
      toast.error(message, {
        position: "bottom-right"
      })
    }
  }  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">SignUp</CardTitle>
          <CardDescription>
            Enter your email below to create new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
            <div className="grid gap-2">
                <Label htmlFor="uname">Name</Label>
                <Input
                  id="uname"
                  type="text"
                  placeholder="James Gunn"
                  required
                  value={ name }
                  onChange={ (e) => setName(e.target.value) }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  onChange={ (e) => setPassword(e.target.value) }
                  value={ password }
                />
              </div>
              <Button type="submit" className="w-full" onClick={ (e) => { handleSubmit(e) }}>
                Sign Up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href={'/signin'} className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
